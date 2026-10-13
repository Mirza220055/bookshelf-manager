import BookItem from './BookItem';

export default function BookList({ books, onMarkRead, onDelete }) {
  if (books.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Your shelf is empty. Add your first book!
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onMarkRead={onMarkRead}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}