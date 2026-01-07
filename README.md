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

## Running the Application

### Option 1: Docker (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
docker-compose up -d
```

This will:
- Build and start both backend and frontend containers
- Backend API available on http://localhost:3001
- Frontend application available on http://localhost:80

To stop the containers:
```bash
docker-compose down
```

To view logs:
```bash
docker-compose logs -f
```

To rebuild after code changes:
```bash
docker-compose up -d --build
```

### Option 2: Local Development

#### Installation

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

#### Running

**Run both backend and frontend together:**

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:3001
- Frontend dev server on http://localhost:5173

**Or run separately:**

In one terminal, start the backend:
```bash
node server/index.js
```

In another terminal, start the frontend:
```bash
cd client && npm run dev
```

## Usage

1. Open your browser:
   - Docker: http://localhost (port 80)
   - Local dev: http://localhost:5173
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
│   ├── database.js         # SQLite database setup
│   ├── index.js            # Express API server
│   └── hours.db            # SQLite database file (created on first run)
├── client/
│   ├── src/
│   │   ├── components/ui/  # shadcn components
│   │   ├── lib/            # utility functions
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── Dockerfile          # Frontend Docker configuration
│   ├── nginx.conf          # Nginx configuration for production
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Dockerfile.backend      # Backend Docker configuration
├── docker-compose.yml      # Docker Compose orchestration
└── package.json
```

## API Endpoints

- `GET /api/hours/:date` - Get all hours for a specific date
- `POST /api/hours` - Add a new hour entry
- `PUT /api/hours/:id` - Update an hour entry
- `DELETE /api/hours/:id` - Delete an hour entry
