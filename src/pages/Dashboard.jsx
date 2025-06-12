import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, deleteBook } from '../services/bookservice';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast } from 'react-toastify';
import './dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  const [localBooks, setLocalBooks] = useState([]);
  const [publicBooks, setPublicBooks] = useState([]);
  const [showPublicBooks, setShowPublicBooks] = useState(false);

  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    setLocalBooks(getBooks());
  }, []);

  useEffect(() => {
    fetch('https://openlibrary.org/search.json?q=programming')
      .then(res => res.json())
      .then(data => {
        const mappedBooks = data.docs.map((book, index) => ({
          _id: index,
          title: book.title,
          author: book.author_name?.[0] || 'Unknown',
          genre: book.subject?.[0] || 'General',
          publishedYear: book.first_publish_year || 'N/A',
          status: 'Available',
          coverId: book.cover_i,
        }));
        setPublicBooks(mappedBooks);
      });
  }, []);

  const handleDelete = (book) => {
    setSelectedBook(book);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBook) {
      deleteBook(selectedBook._id);
      setLocalBooks(getBooks());
      toast.success('Book deleted successfully');
      setConfirmOpen(false);
    }
  };

  const books = showPublicBooks ? publicBooks : localBooks;

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genreFilter ? book.genre === genreFilter : true;
      const matchesStatus = statusFilter ? book.status === statusFilter : true;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, search, genreFilter, statusFilter]);

  const rowsPerPage = 10;
  const paginatedBooks = filteredBooks.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-controls">
        <input
          type="text"
          placeholder="Search by Title/Author"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="General">General</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>

        <div className="button-group">
          <button
            className="toggle-button"
            onClick={() => setShowPublicBooks(false)}
            disabled={!showPublicBooks}
          >
            Show My Books
          </button>

          <button
            className="toggle-button"
            onClick={() => setShowPublicBooks(true)}
            disabled={showPublicBooks}
          >
            Show Public Books
          </button>

          {!showPublicBooks && (
            <button
              className="add-button"
              style={{ marginLeft: '10px' }}
              onClick={() => navigate('/add')}
            >
              Add Book
            </button>
          )}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {showPublicBooks && <th>Image</th>}
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Status</th>
              {!showPublicBooks && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedBooks.map((book) => (
              <tr key={book._id}>
                {showPublicBooks && (
                  <td>
                    {book.coverId ? (
                      <img
                        src={`https://covers.openlibrary.org/b/id/${book.coverId}-S.jpg`}
                        alt="Cover"
                        style={{ height: '50px' }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                )}
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publishedYear}</td>
                <td>{book.status}</td>
                {!showPublicBooks && (
                  <td className="actions">
                    <button onClick={() => navigate(`/edit/${book._id}`)}>Edit</button>
                    <button onClick={() => handleDelete(book)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
            {paginatedBooks.length === 0 && (
              <tr>
                <td colSpan={showPublicBooks ? 6 : 7} className="no-books">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        bookTitle={selectedBook?.title || ''}
      />
    </div>
  );
}

export default Dashboard;
