import React from 'react';
import LendForm from '../components/LendForm';
import BorrowForm from '../components/BorrowForm';

const Home = () => {
  return (
    <div>
      <LendForm />
      <hr />
      <BorrowForm />
    </div>
  );
};

export default Home;
