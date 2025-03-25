import { useState } from 'react';
import './App.css';
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import ConfirmationPage from './pages/ConfirmationPage';


function App() {

    return (
        <>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<BookPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/home" element={<BookPage />} />
                        <Route path="confirmation/:bookID/:title/:price" element={<ConfirmationPage />} />
                    
                    </Routes>
                </Router>
            </CartProvider>
        </>
    );
}

export default App;
