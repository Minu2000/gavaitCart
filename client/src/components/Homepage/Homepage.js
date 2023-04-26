import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Home  from './Home';
import Footer from './Footer';

function Homepage() {
  return (
    <div>
      <Navbar />
      <Home/>
      <Sidebar/>
      <Footer/>
      
    </div>
  );
}

export default Homepage;
