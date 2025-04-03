import { Book } from "../types/book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = 'https://daniel-books.azurewebsites.net/api/bookstore';

export const fetchBooks = async (
    pageSize: number,
    pageNumber: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((cat: any) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');
        const response = await fetch(
            `${API_URL}/AllProjects?pageSize=${pageSize}&pageNumber=${pageNumber}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`
        );    
    if (!response.ok){
        throw new Error('Failed to fetch book');
    }   
        return await response.json();
    } catch (error) {
        console.error('Error fetching book', error);
        throw error;
    }
    

};

// Promise means that the function will return a value in the future ( not immediate)
// await means that the function will wait for the promise to resolve before continuing
export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding book', error);
        throw error;
    }
};

export const updateBook = async (
    bookId: number,
    updatedBook: Book
): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error('Failed to update Book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating book', error);
        throw error;
    }
};

export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch (error) {
        console.error('Error deleting book', error);
        throw error;
    }
};
