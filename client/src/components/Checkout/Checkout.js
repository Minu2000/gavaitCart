import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');
    const order_id = location.state.order_id;

    async function fetchWishlist() {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/get_wishlist/${user_id}`);
        const data = await response.json();
        if (response.ok) {
          setWishlist(data.wishlist);
          await addToOrderItems(user_id, order_id, data.wishlist);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching the wishlist.');
      }
    }

    fetchWishlist();
  }, [location.state.order_id]);

  async function addToOrderItems(user_id, order_id, wishlist) {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/add_to_orderitems/${user_id}/${order_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, order_id, wishlist }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while adding the products to the order items.');
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <h1>Checkout</h1>
      {/* Render the user's wishlist */}
      {wishlist.map(item => (
        <div key={item._id}>
          <p>{item.product_name}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Checkout;
