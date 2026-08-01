# Nexis

A full-stack video platform built with the MERN stack, featuring a mixed content 
feed, efficient pagination, and a modern React frontend.

🔗 **Live:** [nexis-7.vercel.app](https://nexis-7.vercel.app/)

## Features

- **Mixed content feed** — combines videos, tweets, and playlists into a single 
  home feed using MongoDB's `$unionWith` aggregation
- **Dual-pool pagination** for smooth infinite scroll performance
- **Authentication** — secure auth flow using httpOnly cookies
- **Channel & dashboard system** — user channels with video management
- **Upload flow** for videos with metadata handling
- **Animated interactions** — like buttons and UI transitions via Framer Motion (if used) / CSS

## Tech Stack

**Frontend:** React, Redux Toolkit, React Query, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Aggregation Pipelines)  
**Deployment:** Vercel

## Folder Structure

nexis/
├── backend/ # Express API, MongoDB models, aggregation logic
└── frontend/ # React app, Redux store, React Query hooks

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Dev-T007/nexis.git

# Install dependencies (backend)
cd backend && npm install

# Install dependencies (frontend)
cd ../frontend && npm install

# Set up environment variables (see .env.example)

# Run backend
npm run dev

# Run frontend
npm run dev
```

## Author

Built by [Dev](https://github.com/Dev-T007) — Full-stack developer, final-year CS Engineering student.
