import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/cartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    return (
        <div>
            <h2>Your cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li key={item.bookID}>
                                {item.title}:   <strong>Qty:</strong>
                                {item.quantity}{' '}
                                <br /><strong>$</strong>{item.subtotal}{' '}
                                <button
                                    onClick={() =>
                                        removeFromCart(item.bookID)
                                    }
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3>Total: </h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/')}>
                Continue Browsing
            </button>
        </div>
    );
}

export default CartPage;
