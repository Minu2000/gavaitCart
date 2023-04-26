import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Card, CardMedia, CardContent, Typography, Button, CircularProgress} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

  function Viewproduct() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id'); // get user_id from localStorage

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/viewproducts')  
      .then((response) => response.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
        } else {
          toast.error('something went wrong!');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const add_to_wishlist = (product_id) => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      navigate('/login');
      return;
    }
  
    fetch(`http://localhost:5000/api/v1/add_to_wishlist/${userId}/${product_id}`, { // use userId from localStorage
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("product added to cart 🎉",
            {
              onClick: () => navigate('/wishlist'),
            }
          );
          //fetch products again to update quantity
          fetch('http://localhost:5000/api/v1/viewproducts')  
            .then((response) => response.json())
            .then((data) => {
              if (data.products) {
                setProducts(data.products);
              } else {
                //toast.error('Your not logged in. Kindly CLICK HERE 👉 to!');
              }
            })
            .catch((error) => {
              console.error(error);
              toast.error('login required!');
            });
        } else {
          toast.error(data.message || 'Something went wrong!');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Something went wrong!');
      });
  };
  
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => navigate('/')} style={{ marginBottom: 20, marginLeft: 10 }} >
        Go Back
      </Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/wishlist')} style={{ marginBottom: 20, marginLeft: 10 }}>
        Next page
      </Button>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Paper className={classes.paper}>
                <Card className={classes.card}>
                  {product.image ? (
                    <CardMedia className={classes.media} image={`data:image/png;base64,${product.image}`} />
                  ) : null}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                                          {product.name}
                                          </Typography>
                                          <Typography variant="body2" color="textSecondary" component="p">
                                            {product.description}
                                          </Typography>
                                          <Typography gutterBottom variant="h6" component="h3">
                                            ${product.price}
                                          </Typography>
                                        </CardContent>
                                        <CardActions>
                                          <Button size="small" color="primary" onClick={() => add_to_wishlist(product.id)}>
                                            Add to Wishlist
                                          </Button>
                                        </CardActions>
                                      </Card>
                                    </Paper>
                                  </Grid>
                                ))}
                              </Grid>
                            )}
                          </div>
                          
                          );
}

export default Viewproduct;