import os
import urllib.parse
import requests

from flask import Flask
from flask_cors import CORS
from spotipy import Spotify
from spotipy.exceptions import SpotifyException
from spotipy.oauth2 import SpotifyClientCredentials
from bs4 import BeautifulSoup

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
KG_SEARCH_API_KEY = os.getenv("KG_SEARCH_API_KEY")

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
CORS(app, resources={r"/*": {"origins": "https://alternify.vercel.app"}})

def get_spotify_info(track_id):
    spotify = Spotify(client_credentials_manager=SpotifyClientCredentials(
        client_id=SPOTIFY_CLIENT_ID,
        client_secret=SPOTIFY_CLIENT_SECRET
    ))

    track_uri = f"spotify:track:{track_id}"
    try:
        track_data = spotify.track(track_uri)
    except SpotifyException as e:
        return None

    track_url = track_data['external_urls']['spotify']
    track_data.pop('available_markets', None)
    track_data['album'].pop('available_markets', None)

    # map result['artists'] and return names separated by comma
    artists_in_track = ', '.join([artist['name'] for artist in track_data['artists']])
    song_name = track_data['name']
    track_query = f"{artists_in_track} - {song_name}"

    # encode the query string
    track_query_encoded = urllib.parse.quote(track_query)

    return track_query_encoded, song_name, track_url, track_query


def get_google_musician_info(query, company_urls):
    urls = []
    google_search_url = f"https://www.google.com/search?q={query}"

    google_search_response = requests.get(google_search_url)
    soup = BeautifulSoup(google_search_response.text, 'html.parser')

    # get all anchor tags having href and data-ved attributes
    anchor_tags = soup.find_all('a', href=True, attrs={'data-ved': True})

    # remove '/url?q=' and '&sa=U&ved=' from the href url
    links_list = [urllib.parse.unquote(tag['href'].replace('/url?q=', '').split('&sa=U&ved=')[0]) for tag in anchor_tags]

    # remove links of images 'imgres?imgurl='
    links_list = [link for link in links_list if 'imgres?imgurl=' not in link]

    # keep first youtube link only, remove other youtube links
    youtube_links = [link for link in links_list if 'youtube.com' in link]
    if youtube_links:
        youtube_link = youtube_links[0]
    else:
        youtube_link = None

    links_list = [link for link in links_list if 'youtube.com' not in link]
    urls.append({"youtube": youtube_link})

    seen_links = set()
    for link in links_list:
        for company, url in company_urls.items():
            if url in link and link not in seen_links:
                urls.append({company: link})
                seen_links.add(link)

    return urls

def get_kg_search_result(query):
    KG_SEARCH_API_URL = "https://kgsearch.googleapis.com/v1/entities:search"
    KG_SEARCH_API_KEY = os.getenv("KG_SEARCH_API_KEY")
    response = requests.get(f"{KG_SEARCH_API_URL}?query={query}&key={KG_SEARCH_API_KEY}&indent=True")
    return response.json()

def get_from_deezer(query, song_name):
    DEEZER_API_URL = "https://api.deezer.com/search"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    response = requests.get(f"{DEEZER_API_URL}?q={query}", headers=headers)
    if response.status_code != 200:
        return None
    result = response.json()['data']
    
    for item in result:
        if item['title'] == song_name:
            return item['link']


@app.route('/')
def home():
    return "Welcome to Alternify!, a music search engine."

@app.route('/track/<id>')
def track(id):
    if len(id) != 22:
        return {"error": "Invalid Track ID"}

    track_info = get_spotify_info(id)
    if not track_info:
        return {"data": [], "artist": "Not found", "song": "Not found"}

    track_query_encoded, song_name, track_url, track_query = track_info

    print(track_query_encoded, "🔍")

    company_urls = {
        "genius": "genius.com",
        "youtube": "youtube.com",
        "deezer": "deezer.com",
        "amazon": "music.amazon",
        "apple": "music.apple",
        "musixmatch": "musixmatch.com",
        "letras": "letras.com",
        "soundcloud": "soundcloud.com"
    }

    musician_result = get_google_musician_info(track_query_encoded, company_urls)

    deezer_result = get_from_deezer(track_query_encoded, song_name)
    if deezer_result:
        musician_result.append({"deezer": deezer_result})
    musician_result.append({"spotify": track_url})


    # return { data: [], artist: "", song: "" } 

    return {"data": musician_result, "song": song_name, "artist": track_query }

if __name__ == '__main__':
    app.run(debug=True)
