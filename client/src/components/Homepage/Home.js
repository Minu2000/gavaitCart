
import React from 'react'
import './Home.scss'
// import video from '../Assets/video.mp4';
import video from '../Homepage/video.mp4';

function Home() {
    return (
      <section className="home">
        <video src={video} muted autoPlay loop type="video/mp4"></video>
      </section>  
    );
  }

export default Home;