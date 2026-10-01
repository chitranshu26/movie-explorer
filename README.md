# 🎬 Movie Explorer

Movie Explorer is a responsive React web application that allows users to search, discover, and save movies using the TMDB (The Movie Database) API.

## 🚀 Features

- 🔐 User Login interface
- 🔥 Trending movies
- 🔎 Search movies by title
- 📄 Load More pagination for search results
- 🎬 Movie details page
- ⭐ Movie ratings
- 🏷️ Movie genres
- 👥 Cast information
- ▶️ YouTube trailer links
- ❤️ Add/remove favorite movies
- 💾 Favorites stored using LocalStorage
- 🔍 Last searched movie stored using LocalStorage
- 🌙 Light/Dark mode
- 📱 Mobile-first responsive UI
- ⚠️ User-friendly API error handling
- ⚛️ React Context API for state management
- 🧭 React Router for navigation
- 🎨 Material UI for styling

## 🛠️ Technologies Used

- React
- React Router
- Material UI (MUI)
- Axios
- TMDB API
- React Context API
- JavaScript
- LocalStorage
- CSS

## 📁 Project Structure

```text
movie-explorer/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   └── SearchBar.jsx
│   │
│   ├── context/
│   │   └── MovieContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── Favorites.jsx
│   │   └── Login.jsx
│   │
│   ├── services/
│   │   └── tmdb.js
│   │
│   ├── App.js
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
└── README.md