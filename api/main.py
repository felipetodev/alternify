import os
import urllib.parse
import requests
import base64

from flask import Flask
from flask_cors import CORS
from spotipy import Spotify
from spotipy.exceptions import SpotifyException
from spotipy.oauth2 import SpotifyClientCredentials

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
KG_SEARCH_API_KEY = os.getenv("KG_SEARCH_API_KEY")
TIDAL_CLIENT_ID = os.getenv("TIDAL_CLIENT_ID")
TIDAL_CLIENT_SECRET = os.getenv("TIDAL_CLIENT_SECRET")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(64)
CORS(app, resources={r"/*": {"origins": "https://alternify.vercel.app"}})

# skip genius urls
skip_urls = ['/q/producer', '/q/release-date']

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
    track_image = track_data['album']['images'][0]['url']
    track_query = f"{artists_in_track} - {song_name}"

    # encode the query string
    track_query_encoded = urllib.parse.quote(track_query)

    return track_query_encoded, song_name, track_url, track_query, track_image

def get_youtube_url(query):
    youtube_api_url = "https://www.googleapis.com/youtube/v3/search"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    response = requests.get(f"{youtube_api_url}?q={query}&key={YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=5", headers=headers)
    if response.status_code != 200:
        return None
    result = response.json()['items']

    for item in result:
        video_id = item['id']['videoId']
        return f"https://www.youtube.com/watch?v={video_id}"

def get_deezer_url(query, song_name):
    deezer_api_url = "https://api.deezer.com/search"
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    response = requests.get(f"{deezer_api_url}?q={query}", headers=headers)
    if response.status_code != 200:
        return None
    result = response.json()['data']

    for item in result:
        if item['title'] == song_name:
            return item['link']

def get_tidal_url(query, song_name):
    tidal_oauth_url = "https://auth.tidal.com/v1/oauth2/token"
    tidal_api_url = "https://openapi.tidal.com/v2"
    # Encode credentials to Base64
    credentials = f"{TIDAL_CLIENT_ID}:{TIDAL_CLIENT_SECRET}"
    b64_credentials = base64.b64encode(credentials.encode()).decode()

    oauth_headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": f"Basic {b64_credentials}"
    }
    data = {
        "grant_type": "client_credentials"
    }
    response = requests.post(tidal_oauth_url, headers=oauth_headers, data=data)
    if response.status_code == 200:
        token_data = response.json()
        access_token = token_data['access_token']
    else:
        return None

    if access_token:
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }

        response = requests.get(f"{tidal_api_url}/searchresults/{query}/relationships/tracks?countryCode=US&include=tracks", headers=headers)
        if response.status_code != 200:
            return None
        result = response.json()

        track_url = None
        try:
            for track in result['included']:
                if track['attributes']['title'] == song_name:
                    track_url = track['attributes']['externalLinks'][0]['href']
                    track_url = f"https://listen.tidal.com/track/{track_url.split('/')[-1]}"
                    break
            return track_url
        except KeyError:
            return None

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

    track_query_encoded, song_name, track_url, track_query, track_image = track_info

    print(track_query_encoded, "🔍")

    musician_result = []
    musician_result.append({"spotify": track_url})

    youtube_result = get_youtube_url(track_query_encoded)
    if youtube_result:
        musician_result.append({"youtube": youtube_result})
        yt_music_url = youtube_result.replace("www.youtube.com", "music.youtube.com")
        musician_result.append({"youtube-music": yt_music_url})

    deezer_result = get_deezer_url(track_query_encoded, song_name)
    if deezer_result:
        musician_result.append({"deezer": deezer_result})

    tidal_result = get_tidal_url(track_query_encoded, song_name)
    if tidal_result:
        musician_result.append({"tidal": tidal_result})

    return {"data": musician_result, "song": song_name, "artist": track_query, "image": track_image}

if __name__ == '__main__':
    app.run(debug=True)
