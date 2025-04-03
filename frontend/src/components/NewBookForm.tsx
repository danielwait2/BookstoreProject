import { useState } from 'react';
import { Book } from '../types/book';
import { addBook } from '../api/BooksAPI';

interface NewbookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}
const NewBookForm = ({ onSuccess, onCancel }: NewbookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookID: 0,
        title: '',
        author: '',
        category: '',
        classification: '',
        isbn: 0,
        pageCount: 0,
        price: 0,
        publisher: ''
        });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New book</h2>
            <div className="form-grid">
            <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Author:
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Classification:
                    <input
                        type="text"
                        name="classification"
                        value={formData.classification}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    ISBN:
                    <input
                        type="number"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Page Count:
                    <input
                        type="number"
                        name="pageCount"
                        value={formData.pageCount}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Publisher:
                    <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Add book</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};
export default NewBookForm;
