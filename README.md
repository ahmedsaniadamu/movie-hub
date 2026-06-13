# Movie Hub  

Movie Hub is a modern movie discovery dashboard built for a frontend engineering assessment. It features a sleek, responsive UI with real-time movie data fetching, advanced filtering, and a premium dark mode experience.

## ✨ Features

- **Modern Dashboard**: A clean and intuitive layout showcasing popular, top-rated, and upcoming movies.
- **Search & Discovery**: Real-time debounced search functionality to find any movie in the TMDb database.
- **Advanced Filtering**: Filter movies by genre with dynamic refetching and state synchronization.
- **Rich Movie Details**: Comprehensive details for each movie, including:
  - Cast and Director information.
  - Budget and Revenue breakdown.
  - Languages and Genre badges.
  - Interactive "Similar Movies" section.
- **Dark Mode**: A full-featured dark/light mode toggle with system preference support and persistent state.
- **Premium UX**:
  - **Skeleton Loaders**: Custom loading states that prevent layout shift.
  - **Framer Motion Animations**: Smooth page transitions and element entry effects.
  - **URL-based State**: Filters and categories are synced with the URL for shareability.
  - **Responsive Design**: Mobile-optimized with a slide-out sidebar.

## 🛠️ Tech Stack

- **Core**: [React.js](https://react.dev/) (Vite)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management & Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API**: [TMDb API](https://developer.themoviedb.org/docs)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your TMDb credentials:
   ```env
   VITE_API_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODMwMGUzZmI4NDUwNjlkYzUyYjY5MDJkN2U1YmVhMCIsIm5iZiI6MTc4MTMzNDkwOS45MjMsInN1YiI6IjZhMmQwMzdkZDY3ZDliY2JlNjYyYWZlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bpxbOzb5Dj_J1MyJ_KfZltG_XwHuLwvA1NnpzAGxybA
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```text
src/
├── assets/             # Images and static assets
├── components/         # Reusable UI and Layout components
│   ├── layout/         # AppSidebar, Navbar, etc.
│   ├── movie/          # MovieCard, MoviePagination, etc.
│   ├── providers/      # ThemeProvider, QueryProvider, etc.
│   └── ui/             # Shadcn and generic UI primitives
├── hooks/              # Custom React hooks (useMovies, etc.)
├── lib/                # Utilities and shared configurations
├── pages/              # Page components (Home, MovieDetails)
├── services/           # API abstraction layers (Axios config)
└── App.tsx             # Root component and Routing
```

## 🌐 Live URL

[View Live Project](https://movie-hub123.vercel.app/)

