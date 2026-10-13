import { useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/books`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setBooks)
      .catch(() => setError('Could not load books. Is the server running?'))
      .finally(() => setLoading(false));
  }, []);

  const addBook = async (title, author) => {
    const res = await fetch(`${API}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add book');
    setBooks((prev) => [data, ...prev]);
  };

  const markRead = async (id) => {
    try {
      const res = await fetch(`${API}/books/${id}`, { method: 'PUT' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBooks((prev) => prev.map((b) => (b.id === id ? data : b)));
    } catch (err) {
      setError(err.message || 'Failed to update book');
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await fetch(`${API}/books/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete book');
    }
  };

  const readCount = books.filter((b) => b.status === 'read').length;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-2">
          📚 BookShelf Manager
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {books.length} books · {readCount} read
        </p>

        <BookForm onAdd={addBook} />

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="font-bold">×</button>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <BookList books={books} onMarkRead={markRead} onDelete={deleteBook} />
        )}
      </div>
    </div>
  );
}