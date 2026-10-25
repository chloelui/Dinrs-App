# dinrs

**Meet students who eat where you eat.**

dinrs is a React app for college students who want to find dining buddies. The Discover page shows student profiles with their year, major, usual dining spots, and favorite foods.

## Features
- **Search** by name or major
- **Filter** by dining hall, food type, and year (filters combine)
- **Connect / Connected** toggle on each card
- **Load more** reveals four more students at a time
- **Log in / Log out** toggle in the navbar
- Browser tab title shows your connection count

## Built with
React (hooks: `useState`, `useEffect`), Vite, and plain CSS (Flexbox and Grid).

## Components
- `App`: holds all state and the filtering logic
- `NavBar`: logo, links, login button
- `StudentCard`: one profile card

## State
`isLoggedIn` (boolean), `searchTerm` (string), `filters` (object), `connectedIds` (array), `visibleCount` (number).

## Run it
```npm install```
```npm run dev```