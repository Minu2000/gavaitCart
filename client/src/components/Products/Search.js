import React, { useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Card, CardHeader, CardMedia, CardContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

function App() {
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?name=${productName}`);
      setProductDetails(response.data);
      setError('');
    } catch (error) {
      setProductDetails(null);
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Search Product
          </Typography>
          <IconButton edge="end" color="primary" aria-label="favorite">
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        <TextField
          label="Product Name"
          variant="outlined"
          color="primary"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div style={{ paddingTop: '80px' }}>
        {error && <p>{error}</p>}
        {productDetails && (
          <Card  style={{ width: '60%', height:'60%' ,margin: '0 auto' }}>
          
            <CardHeader title={productDetails.name} />
            <CardMedia
              component="img"
              src={`data:image/png;base64,${productDetails.image}`}
              alt={productDetails.name}
              style={{ width: '20%', height: '20%' }}
            />
            <CardContent>
              <Typography variant="body2" color="textPrimary" component="p">
                {productDetails.description}
              </Typography>
              <Typography variant="h6" color="textPrimary" component="p">
                Price: {productDetails.price}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      {/* <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '20px', backgroundColor: 'white' }}> */}
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Homepage
        </Button>
      {/* </div> */}
    </div>
  );
}

export default App;