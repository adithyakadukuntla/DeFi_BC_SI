import React from 'react';
import DemoPanel from '../components/DemoPanel';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <DemoPanel/>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
