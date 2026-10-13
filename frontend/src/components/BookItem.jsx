export default function BookItem({ book, onMarkRead, onDelete }) {
  const isRead = book.status === 'read';

  return (
    <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div>
        <h3
          className={`text-lg font-semibold ${
            isRead ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {book.title}
        </h3>
        <p className="text-gray-500 text-sm">by {book.author}</p>
        <span
          className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full ${
            isRead ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {isRead ? '✓ Read' : 'Unread'}
        </span>
      </div>

      <div className="flex gap-2">
        {!isRead && (
          <button
            onClick={() => onMarkRead(book.id)}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 rounded-lg transition"
          >
            Mark as Read
          </button>
        )}
        <button
          onClick={() => onDelete(book.id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
}