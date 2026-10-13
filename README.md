# 📚 BookShelf Manager

A MERN stack web application to manage a personal reading list.

- **Live App:** YOUR-VERCEL-LINK
- **API:** YOUR-RENDER-LINK
- **GitHub:** https://github.com/Mirza220055/bookshelf-manager

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose
- **Tools:** VS Code, Postman, Git/GitHub
- **Deployment:** Vercel (frontend), Render (backend)

## Features

- Add a new book (title and author)
- View all books
- Mark a book as read (strikethrough and green badge)
- Delete a book
- Input validation and error handling
- Data persists in MongoDB
- Responsive UI for desktop and mobile

## API Endpoints

| Method | Endpoint     | Description          |
|--------|--------------|----------------------|
| GET    | /books       | Get all books        |
| POST   | /books       | Add a new book       |
| PUT    | /books/:id   | Mark a book as read  |
| DELETE | /books/:id   | Delete a book        |

Response format:

```json
{
  "id": "671d...",
  "title": "Atomic Habits",
  "author": "James Clear",
  "status": "unread",
  "createdAt": "2026-10-14T..."
}
```

Error responses (400, 404, 500) return `{ "message": "..." }`.

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

## Screenshots

(Add Postman test screenshots and UI screenshots here)