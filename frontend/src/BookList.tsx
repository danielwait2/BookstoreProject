import { Book } from './types/book.ts';
import { useEffect, useState } from 'react';

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [pageOrder, setPageOrder] = useState<string>('az');

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(
                `https://localhost:5000/api/BookStore/AllProjects?pageSize=${pageSize}&pageNumber=${pageNumber}&pageOrder=${pageOrder}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchProjects();
    }, [pageSize, pageNumber, totalItems, pageOrder]); //dependency array or what to watch for
    return (
        <>
            <h1>Book List</h1>
            <br />
            {books.map((b) => (
                <div id="bookCard" className="card">
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li>
                                <strong>Author: </strong>
                                {b.author}
                            </li>
                            <li>
                                <strong>Regional Program: </strong>
                                {b.publisher}
                            </li>
                            <li>
                                <strong>Impact: </strong>
                                {b.isbn} Individuals Served
                            </li>
                            <li>
                                <strong>Phase: </strong>
                                {b.classification}
                            </li>
                            <li>
                                <strong>Functionality Status: </strong>

                                {b.pageCount}
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
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
