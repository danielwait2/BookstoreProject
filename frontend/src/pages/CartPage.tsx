import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/cartItem';
import { useCart } from '../context/CartContext';

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0); 
    
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
                                <br /><strong>$</strong>{item.subtotal = item.price * item.quantity}{' '}
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
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/')}>
                Continue Browsing
            </button>
        </div>
    );
}

export default CartPage;
