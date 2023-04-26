// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography } from '@material-ui/core';
// import HomeIcon from '@material-ui/icons/Home';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function AddressForm() {
//   const [street, setStreet] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [phone, setPhone] = useState('');
//   const navigate = useNavigate();
//   const access_token = localStorage.getItem('access_token');
//   const nameRegex = /^[a-zA-Z\s]*$/;
//   const cityRegex = /^[a-zA-Z\s]*$/;
//   const stateRegex = /^[a-zA-Z\s]*$/;
//   const zipRegex = /^\d{6}$/;

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!street.match(nameRegex)) {
//       toast.error('Please enter a valid street name😐');
//       return;
//     }
//     if (!city.match(cityRegex)) {
//       toast.error('Please enter a valid city name.');
//       return;
//     }
//     if (!state.match(stateRegex)) {
//       toast.error('Please enter a valid state name.');
//       return;
//     }
//     if (!pincode.match(zipRegex)) {
//       toast.error('Please enter a valid 6-digit pincode.');
//       return;
//     }
//     if (!phone) {
//       toast.error('Please enter a phone number.');
//       return;
//     }
//     const formData = {
//       street: street,
//       city: city,
//       state: state,
//       pincode: pincode,
//       phone: phone,
//     };
//     console.log(formData);

//     try {
//       const response = await fetch('http://localhost:5000/api/v1/create_address', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${access_token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       // localStorage.setItem('formResponse', JSON.stringify(data));
//       localStorage.setItem('address_id', data.address_id); // assign `data.addressId` directly
//       alert('Form submitted successfully!🤩✅');
//       navigate('/match_credit_card');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('An error occurred while submitting the form.');
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center">
//       <Typography variant='h5' gutterBottom >
//         Shipping Address
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Box display="flex" flexDirection='column '>
//         <TextField label="Street" variant="outlined"
//   required value={street} onChange={(event) => setStreet(event.target.value)} />
// <TextField label="City" variant="outlined"
//   required value={city} onChange={(event) => setCity(event.target.value)} />
// <TextField label="State" variant="outlined"
//   required value={state} onChange={(event) => setState(event.target.value)} />
// <TextField label="Pincode" variant="outlined"
//   required value={pincode} onChange={(event) => setPincode(event.target.value)} />
// <TextField label="Phone" variant="outlined"
//   required value={phone} onChange={(event) => setPhone(event.target.value)} />

        
//         </Box>
//         <Button type="submit" variant="contained" color="secondary" style={{backgroundColor:'#4fc3f7', color:'black'}}>Submit</Button>
//         <Button variant='contained' color='secondary ' style={{backgroundColor:'hotpink', color:'black'}} onClick={()=> navigate('/wishlist')}>
//           Go Back to {<HomeIcon/>}
//         </Button>
//       </form>
//       <ToastContainer/>
//     </Box>

//   );

// }
// export default AddressForm;
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddressForm() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const access_token = localStorage.getItem('access_token');
  const user_id = localStorage.getItem('user_id')
  const nameRegex = /^[a-zA-Z\s]*$/;
  const cityRegex = /^[a-zA-Z\s]*$/;
  const stateRegex = /^[a-zA-Z\s]*$/;
  const zipRegex = /^\d{6}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!street.match(nameRegex)) {
      toast.error('Please enter a valid street name😐');
      return;
    }
    if (!city.match(cityRegex)) {
      toast.error('Please enter a valid city name.');
      return;
    }
    if (!state.match(stateRegex)) {
      toast.error('Please enter a valid state name.');
      return;
    }
    if (!pincode.match(zipRegex)) {
      toast.error('Please enter a valid 6-digit pincode.');
      return;
    }
    if (!phone) {
      toast.error('Please enter a phone number.');
      return;
    }
  
    const addressData = {
      street: street,
      city: city,
      state: state,
      pincode: pincode,
      phone: phone,
    };
  
    try {
      const addressResponse = await fetch('http://localhost:5000/api/v1/create_address', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressData),
      });
  
      const addressJson = await addressResponse.json();
      localStorage.setItem('address_id', addressJson.address_id);
  
      const orderResponse = await fetch(`http://localhost:5000/api/v1/orders/${user_id}/${addressJson.address_id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
      });
  
      const orderJson = await orderResponse.json();
      localStorage.setItem('order_id', orderJson.order_id);

      console.log(orderJson);
      alert('Order created successfully!🤩✅');
      navigate('/checkout');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };
  
  

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant='h5' gutterBottom >
        Shipping Address
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection='column '>
        <TextField label="Street" variant="outlined"
  required value={street} onChange={(event) => setStreet(event.target.value)} />
<TextField label="City" variant="outlined"
  required value={city} onChange={(event) => setCity(event.target.value)} />
<TextField label="State" variant="outlined"
  required value={state} onChange={(event) => setState(event.target.value)} />
<TextField label="Pincode" variant="outlined"
  required value={pincode} onChange={(event) => setPincode(event.target.value)} />
<TextField label="Phone" variant="outlined"
  required value={phone} onChange={(event) => setPhone(event.target.value)} />

        
        </Box>
        <Button type="submit" variant="contained"  color="secondary" style={{backgroundColor:'#4fc3f7', color:'black'}}>Submit</Button>
        <Button variant='contained' color='secondary ' style={{backgroundColor:'hotpink', color:'black'}} onClick={()=> navigate('/')}>
          Go to veedu {<HomeIcon/>}
        </Button>
        {/* <Button variant='contained' color='secondary ' style={{backgroundColor:'hotpink', color:'black'}} onClick={()=> navigate('/')}>
          Next
        </Button> */}
      </form>
      <ToastContainer/>
    </Box>

  );

}
export default AddressForm;