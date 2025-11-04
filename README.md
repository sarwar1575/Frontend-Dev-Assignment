# ⭐ Star Wars Character Explorer

A modern, responsive web application for exploring Star Wars characters using the [Star Wars API (SWAPI)](https://swapi.dev/). Browse characters, search by name, filter by species/film/homeworld, and view detailed information in an elegant card-based interface.

## 🚀 What It Does

- **Browse Characters**: Paginated list of Star Wars characters with beautiful card layouts
- **Search**: Find characters by name with real-time search
- **Filter**: Filter characters by species, films, or homeworld
- **View Details**: Click any character card to see full details in a modal:
  - Physical attributes (height, mass, birth year)
  - Number of films appeared in
  - Homeworld information (name, terrain, climate, population)
  - Date added to the API
- **Authentication**: Simple login system with mock JWT tokens and automatic token refresh

## 🛠️ How It Works

### Architecture

The app uses a component-based React architecture with custom hooks for data fetching and authentication:

- **Pages**: `Home` (main character list) and `Login` (authentication)
- **Components**: Reusable UI components (CharacterCard, CharacterModal, SearchBar, Pagination, etc.)
- **Hooks**: 
  - `useFetch`: Handles API calls with loading and error states
  - `useAuth`: Manages authentication state and token refresh
- **Utils**: Helper functions for date formatting and species color mapping

### Data Flow

1. App loads → Login page shown
2. User logs in with `admin/admin` → Mock JWT token stored in localStorage
3. Authenticated users → Redirected to Home page
4. Home page → Fetches characters from SWAPI `/people` endpoint
5. User interacts → Can search, filter, or click cards
6. Character click → Fetches additional data (homeworld, species, films) and displays in modal
7. Pagination → Navigate through pages of characters

### Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: Built with Framer Motion for polished interactions
- **Loading States**: Shows loading indicators during API calls
- **Error Handling**: Graceful error messages with retry functionality
- **Smart Caching**: Aggregates character data across pages for efficient filtering
- **Color-Coded Species**: Each character card has a unique accent color based on species

## 🏃 How to Run

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Frontend-Dev-Assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Login Credentials

- **Username**: `admin`
- **Password**: `admin`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI

## 📦 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vitest** - Testing framework
- **SWAPI** - Star Wars API

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components (Home, Login)
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── test/            # Test setup files
```

## 🎨 Design Highlights

- Dark theme with Star Wars-inspired color scheme
- Custom fonts (Orbitron for headings, Poppins for body text)
- Card-based layout with hover effects
- Modal dialogs for character details
- Responsive grid system that adapts to screen size

---

Built with ⚡ by the Force

