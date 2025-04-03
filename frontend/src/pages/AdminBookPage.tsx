import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBookPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNumber, []);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNumber]);

    const handleDelete = async (bookID: number) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this book?'
        );
        if (!confirmDelete) return;
        try {
            await deleteBook(bookID);
            setBooks(books.filter((b) => b.bookID !== bookID));
        } catch (error) {
            alert('failed to delete book');
        }
    };

    if (loading) return <p>Loading books...</p>;
    if (error)
        return <p className="text-red-500">Error loading books: {error}</p>;

    return (
        <div>
            <h1>Admin - books</h1>
            {!showForm && (
                <button
                    className="btn btn-success mb-3"
                    onClick={() => setShowForm(true)}
                >
                    Add book
                </button>
            )}
            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNumber, []).then((data) =>
                            setBooks(data.books)
                        );
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(pageSize, pageNumber, []).then((data) =>
                            setBooks(data.books)
                        );
                    }}
                    onCancel={() => setEditingBook(null)}
                />
            )}

            <table className=" table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Page Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((p) => (
                        <tr key={p.bookID}>
                            <td>{p.bookID}</td>
                            <td>{p.title}</td>
                            <td>{p.author}</td>
                            <td>{p.publisher}</td>
                            <td>{p.isbn}</td>
                            <td>{p.classification}</td>
                            <td>{p.category}</td>
                            <td>{p.price}</td>
                            <td>{p.pageCount}</td>
                            <td>
                                <button onClick={() => setEditingBook(p)}>
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(p.bookID)
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNumber}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNumber(1); // Reset page number when page size changes
                }}
            />
        </div>
    );
};

export default AdminBookPage;
