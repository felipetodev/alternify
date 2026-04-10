# Alternify

Find Alternatives to your Spotify Tracks & **share them with your friends!**

https://github.com/user-attachments/assets/9a50901d-3e72-4977-a913-651c92c76fc2

## 🛠️ Stack

- [**Astro**](https://astro.build/) - Web framework for content-driven websites.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**Tailwindcss**](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [**Vercel**](https://vercel.com/) - Provides the developer tools and cloud infrastructure.
- [**Flask**](https://flask.palletsprojects.com/) - A lightweight WSGI web application framework.
- [**Spotify API**](https://developer.spotify.com/documentation/web-api/) - Web API that provides access to Spotify music catalog.
- [**Turso (LibSQL)**](https://turso.tech/) - edge-hosted SQLite database.
- [**svgl**](https://svgl.app/) - Beautiful library with SVG logos.

## 🚀 Quick start (Frontend)

1. [Fork](https://github.com/felipetodev/alternify/fork) this repository and clone it locally:

```bash
git clone git@github.com:your_username/alternify.git
```

2. Go to the [**`frontend/`**](https://github.com/felipetodev/alternify/blob/main/frontend) folder and follow next steps.

3. Install dependencies:

```bash
# Install dependencies:
npm install

# Start the development server:
npm run dev
```

### Database setup (Turso)

Apply the SQL migration in [db/migrations/001_create_share.sql](frontend/db/migrations/001_create_share.sql) to your Turso database.

If you use the Turso CLI:

```bash
turso db shell <your-db-name> < db/migrations/001_create_share.sql
```

Or use npm/pnpm scripts (recommended):

```bash
pnpm db:migrate
pnpm db:seed
# or both
pnpm db:setup
```

## 🚀 Quick start (Backend)

1. Go to the [**`api/`**](https://github.com/felipetodev/alternify/blob/main/api) folder and follow next steps.

2. Create a virtual environment:

```bash
# activate the virtual environment
# Windows
venv\Scripts\activate
# Unix
source venv/bin/activate
```

3. Install dependencies:

```bash
# Install dependencies:
pip install -r requirements.txt

# Start the development server:
python main.py
```

4. Create a `.env` file in the root of the project and add the following variables (check the `.env.example` file):

```bash
# Get your client id and secret from https://developer.spotify.com
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
# Get your client id and secret from https://developer.tidal.com
TIDAL_CLIENT_ID=
TIDAL_CLIENT_SECRET=
# Get api key from https://developers.google.com/youtube
YOUTUBE_API_KEY=
# Get access token from https://genius.com/api-clients
GENIUS_ACCESS_TOKEN=
# Turso database URL (libsql://...)
TURSO_DATABASE_URL=
# Turso auth token (optional for local sqlite, required for hosted Turso)
TURSO_AUTH_TOKEN=
```

## 🔑 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/felipetodev/alternify/blob/main/LICENSE) file for details.

## 🤝 Contributing

Want to contribute? [**Open an issue**](https://github.com/felipetodev/alternify/issues/new) with your proposal ✨ (soon we will have a contributing guide).
