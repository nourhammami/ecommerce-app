import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import UpdateProduct from './UpdateProduct';
import Navbar from './navbar'; // Import the new Navbar

const App = () => {
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/add" element={<ProductForm onProductAdded={triggerRefresh} />} />
          <Route path="/products" element={<ProductList refresh={refresh} onRefresh={triggerRefresh} />} />
          <Route path="/update/:id" element={<UpdateProduct onProductUpdated={triggerRefresh} />} />
          <Route path="/" element={<ProductList refresh={refresh} onRefresh={triggerRefresh} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
