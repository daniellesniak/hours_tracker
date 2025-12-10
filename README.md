# Hours Tracker

A simple hours tracking application built with Express, React, shadcn/ui, and SQLite.

## Features

- Track work hours by day
- Navigate between days (previous/next/specific date)
- Add hour entries with time ranges (from - to)
- Edit and delete existing entries
- Automatic calculation of total time worked
- Clean, modern UI with shadcn components

## Tech Stack

- **Backend**: Express.js with SQLite database
- **Frontend**: React with Vite
- **UI Components**: shadcn/ui with Tailwind CSS
- **Database**: SQLite (sqlite3)

## Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

## Running the Application

### Option 1: Run both backend and frontend together (recommended)

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend dev server on http://localhost:5173

### Option 2: Run separately

In one terminal, start the backend:
```bash
npm run server
```

In another terminal, start the frontend:
```bash
npm run client
```

## Usage

1. Open your browser to http://localhost:5173
2. The app opens on the current day
3. Use the arrow buttons or date picker to navigate between days
4. Add hour entries by filling in the "From" and "To" time fields
5. Click "Add Hour Entry" to save
6. Edit entries by clicking the edit icon
7. Delete entries by clicking the trash icon
8. View total time worked at the top of the entries list

## Project Structure

```
hours_tracker/
├── server/
│   ├── database.js      # SQLite database setup
│   ├── index.js         # Express API server
│   └── hours.db         # SQLite database file (created on first run)
├── client/
│   ├── src/
│   │   ├── components/ui/  # shadcn components
│   │   ├── lib/           # utility functions
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── package.json
```

## API Endpoints

- `GET /api/hours/:date` - Get all hours for a specific date
- `POST /api/hours` - Add a new hour entry
- `PUT /api/hours/:id` - Update an hour entry
- `DELETE /api/hours/:id` - Delete an hour entry
