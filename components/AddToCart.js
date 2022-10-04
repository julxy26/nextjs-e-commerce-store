import React, { useState } from 'react';
import Products from '../pages/products';
import Header from './Header';

export default function AddToCart() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header count={count} />
      <Products setCount={setCount} />
    </div>
  );
}
