import { useNavigate } from 'react-router-dom';
import { Book } from '../types/book.ts';
import { useEffect, useState } from 'react';
import { fetchBooks } from '../api/BooksAPI.tsx';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageOrder, setPageOrder] = useState<string>('az');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        
        const loadBooks = async () => {
            try{
                setLoading(true);
                const data = await fetchBooks(
                    pageSize,
                    pageNumber,
                    selectedCategories
                );
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            }
            finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNumber, pageOrder, selectedCategories]); //dependency array or what to watch for

    if (loading) {
        return <p>Loading books...</p>;
    }
    if (error) {
        return <p className="text-red-500">Error loading books: {error}</p>;
    }


    return (
        <>
            <h1 style={{ color: 'red' }}>Book List</h1>
            <br />
            <div className="book-grid">
                {books.map((b, index) => (
                    <div key={index} className="flip-card">
                        <div className="flip-card-inner">
                            {/* Front of the card */}
                            <div className="flip-card-front">
                                <h3 className="card-title">{b.title}</h3>
                            </div>
                            {/* Back of the card */}
                            <div className="flip-card-back">
                                <div className="card-body">
                                    <ul className="list-unstyled">
                                        <li>
                                            <strong>Author:</strong> {b.author}
                                        </li>
                                        <li>
                                            <strong>Publisher:</strong>{' '}
                                            {b.publisher}
                                        </li>
                                        <li>
                                            <strong>ISBN:</strong> {b.isbn}
                                        </li>
                                        <li>
                                            <strong>Classification:</strong>{' '}
                                            {b.classification}
                                        </li>
                                        <li>
                                            <strong>Page Count:</strong>{' '}
                                            {b.pageCount}
                                        </li>
                                    </ul>
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            navigate(
                                                `/confirmation/${b.bookID}/${b.title}/${b.price}`
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <br />
            <button
                disabled={pageNumber === 1}
                onClick={() => setPageNumber(pageNumber - 1)}
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setPageNumber(index + 1)}
                    disabled={pageNumber === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button
                disabled={pageNumber === totalPages}
                onClick={() => setPageNumber(pageNumber + 1)}
            >
                Next
            </button>
            <br />
            <label>
                Results per page:
                <select
                    value={pageSize}
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNumber(1); // Reset page number when page size changes
                    }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
            <br />
            <label>
                Page Order:
                <select
                    value={pageOrder}
                    onChange={(p) => {
                        setPageOrder(String(p.target.value));
                        setPageNumber(1); // Reset page number when page size changes
                    }}
                >
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                </select>
            </label>
        </>
    );
}

export default BookList;
