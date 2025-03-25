import WelcomeBand from '../components/WelcomeBand';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/cartItem';

function DonatePage() {
    const navigate = useNavigate();
    const { bookID, title, price } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || 'No book found',
            quantity,
            price: Number(price),
            subtotal: (Number(price) * quantity)
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <>
            <WelcomeBand />
            <h2>Add <i>{title}</i> to cart</h2>

            <div>
                <input type="number" placeholder="Enter quantity" value={quantity} onChange= {(x) => setQuantity(Number(x.target.value))}/>
                <button onClick={handleAddToCart}>Add to cart</button>
            </div>

            <button onClick={() => navigate('/')}>Go Back</button>
        </>
    );
}

export default DonatePage;
