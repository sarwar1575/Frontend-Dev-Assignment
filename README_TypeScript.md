# 🌌 Star Wars Character Explorer (TypeScript)

A modern and responsive React + TypeScript application that explores characters from the Star Wars universe using the [SWAPI](https://swapi.dev/) API.  
This project emphasizes **type safety**, **clean architecture**, and **cinematic UI design** inspired by the Star Wars universe.

---

## 🚀 Features

- 🔍 **Fetch & Display Characters** — Lists Star Wars characters with pagination.
- 💫 **Dynamic Character Cards** — Each card displays a random image and color accent based on species.
- 🧠 **Character Details Modal** — Shows full details like height, mass, films, birth year, and homeworld data.
- 📱 **Responsive Design** — Fully optimized for mobile, tablet, and desktop.
- ⚙️ **Error & Loading Handling** — Smooth loading states and descriptive error UI.
- 🎨 **Tailwind + TypeScript Combo** — Ensures maintainable and scalable codebase.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React + Vite (TypeScript)** | Frontend Framework |
| **Tailwind CSS** | Styling and Responsive Design |
| **Axios** | API Requests |
| **React Testing Library** | Testing |
| **Framer Motion** *(optional)* | UI Animations |

---

## 🏗️ Project Structure

```
src/
│
├── components/
│   ├── Navbar.tsx
│   ├── SearchBar.tsx
│   ├── CharacterCard.tsx
│   ├── CharacterModal.tsx
│   ├── Pagination.tsx
│   ├── Loader.tsx
│   └── ErrorMessage.tsx
│
├── pages/
│   ├── Home.tsx
│   └── Login.tsx
│
├── hooks/
│   └── useFetch.ts
│
├── types/
│   └── characterTypes.ts
│
├── utils/
│   └── formatDate.ts
│
├── App.tsx
└── main.tsx
```

---

## 🧩 Core Functionality

### 1. Fetch & Display Characters
Data fetched from:
```
https://swapi.dev/api/people/?page=1
```
Handled with a custom `useFetch` hook (with loading and error state).

### 2. Character Cards
Each card:
- Displays a random image using [Picsum Photos](https://picsum.photos/)
- Color-coded by **species**
- Opens a **modal** with extended details on click

### 3. Character Modal Details
The modal includes:
- **Name**
- **Height (m)**  
- **Mass (kg)**
- **Birth Year**
- **Film Count**
- **Homeworld** (name, terrain, climate, population)
- **Date Added** — formatted as `dd-MM-yyyy`

---

## 💫 Bonus Features (Optional but Impressive)

- 🔎 **Search by Name**
- 🪐 **Filter by Species / Film / Homeworld**
- 🔐 **Mock Authentication**
  - Simple login/logout using fake credentials
  - Mock JWT token stored in `localStorage`
  - Simulated silent refresh
- 🧪 **Testing:** Verify modal opens with the correct details.

---

## 🧰 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/starwars-character-explorer.git

# Navigate into the project
cd starwars-character-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🎨 UI/UX Design Highlights

**Color Palette**
- Background: `#0b0c10`
- Accent: `#ffe81f`
- Text: `#ffffff` / `#c5c6c7`

**Fonts**
- [Orbitron](https://fonts.google.com/specimen/Orbitron) + [Poppins](https://fonts.google.com/specimen/Poppins)

**Layout Example**
```html
<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
```

**Animations**
- Smooth hover transitions and modal fade-in using `framer-motion`.

---

## 💡 Code Design Philosophy

> “Clean, cinematic, and type-safe UI — blending Star Wars nostalgia with modern engineering.”

Focus:
- Strong type definitions (`characterTypes.ts`)
- Reusable hooks & components
- Robust error handling
- Maintainable, scalable code structure

---

## 📷 Demo / Screenshots
*(Add screenshots or your live deployed link here)*  
Example:  
[Live Demo](https://starwars-character-explorer.vercel.app/)

---

## 🧾 Credits
- **API:** [SWAPI — Star Wars API](https://swapi.dev/)
- **Images:** [Picsum Photos](https://picsum.photos/)
- **Design Inspiration:** Star Wars Universe ✨

---

## 🛡️ License
This project is licensed under the [MIT License](LICENSE).

---

**Developed with ❤️ by [Your Name]**  
*May the force be with your TypeScript!*
