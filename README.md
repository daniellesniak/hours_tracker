# Hours Tracker

A simple hours tracking application built with React, shadcn/ui, and browser localStorage.

## Features

- Track work hours by day
- Navigate between days (previous/next/specific date)
- Add hour entries with time ranges (from - to)
- Edit and delete existing entries
- Automatic calculation of total time worked
- Clean, modern UI with shadcn components
- **100% client-side** - No backend server required!
- Data stored locally in your browser

## Tech Stack

- **Frontend**: React with Vite
- **UI Components**: shadcn/ui with Tailwind CSS
- **Storage**: Browser localStorage (fully client-side)
- **Deployment**: Static files served with Nginx

## Running the Application

### Option 1: Docker (Recommended)

The easiest way to run the application is using Docker:

```bash
docker-compose up -d
```

This will:
- Build and start the application container
- Application available on http://localhost:80

To stop the container:
```bash
docker-compose down
```

To rebuild after code changes:
```bash
docker-compose up -d --build
```

### Option 2: Local Development

#### Installation

Install dependencies:
```bash
cd client
npm install
```

#### Running

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173

#### Build for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` folder and can be served by any static file server.

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

**Note**: All data is stored in your browser's localStorage. Data persists across sessions but is specific to the browser and domain.

## Project Structure

```
hours_tracker/
├── client/
│   ├── src/
│   │   ├── components/ui/  # shadcn components
│   │   ├── lib/
│   │   │   ├── storage.js  # localStorage utility functions
│   │   │   └── utils.js    # general utilities
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── Dockerfile          # Docker configuration
│   ├── nginx.conf          # Nginx configuration for production
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── docker-compose.yml      # Docker Compose orchestration
```

## Data Storage

The application uses browser localStorage to store all data client-side. Data structure:

```javascript
{
  id: number,           // Unique identifier (timestamp)
  date: string,         // Date in YYYY-MM-DD format
  time_from: string,    // Start time in HH:MM format
  time_to: string,      // End time in HH:MM format
  created_at: string    // ISO timestamp
}
```

## Deployment

Since this is a fully client-side application, you can deploy it anywhere that serves static files:

- **GitHub Pages**: Push the `dist` folder after running `npm run build`
- **Netlify/Vercel**: Connect your repository and deploy automatically
- **Any static file hosting**: Upload the contents of `dist` folder
- **Docker**: Use the provided `docker-compose.yml` for containerized deployment

No server-side configuration needed!
