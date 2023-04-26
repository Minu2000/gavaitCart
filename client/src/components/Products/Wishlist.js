import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchWishlistProducts() {
      const user_id = localStorage.getItem('user_id');
      const access_token = localStorage.getItem('access_token');
      
      const response = await fetch(`http://localhost:5000/api/v1/get_wishlist/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      const data = await response.json();
      setWishlistProducts(data.wishlist_products);
    }

    fetchWishlistProducts();
  }, []);

  async function handleDelete(productId) {
    const user_id = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');
      
    const response = await fetch(`http://localhost:5000/api/v1/deletewishlist/${user_id}/${productId}`, {
      method: 'DELETE',
      // headers: {
      //   Authorization: `Bearer ${access_token}`
      // }
      headers: {
        //'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      }
      
    });

    const data = await response.json();
    if (data.message === 'Product deleted from wishlist') {
      setWishlistProducts(wishlistProducts.filter((product) => product._id !== productId));
    }
  }

  return (
    <div>
      <h1>Wishlist</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wishlistProducts.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell><img src={`data:image/png;base64,${product.image}`} alt="Product Image" style={{ width: '200px', height: '200px' }} /></TableCell>
              <TableCell>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(product._id)}>Delete</Button>
             </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Button variant="contained" color="primary" onClick={() => navigate('/viewproducts')}  style={{ marginBottom: 20, marginLeft: 10 }}>Go Back</Button>
        <Button variant="contained" color="primary" onClick={()=>navigate('/address')}style={{ marginBottom: 20, marginLeft: 10 }}>Next</Button>
      </div>
    </div>
  );
}

export default Wishlist;
