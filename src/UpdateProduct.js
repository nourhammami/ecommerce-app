import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = ({ onProductUpdated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => alert('Failed to load product'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/products/${id}`, {
      ...product,
      price: parseFloat(product.price)
    })
      .then(() => {
        alert('Product updated');
        onProductUpdated?.();
        navigate('/products'); // ✅ Redirect to product list
      })
      .catch(() => alert('Failed to update product'));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Product</h3>
      {Object.entries(product).map(([key, value]) => (
        key !== 'id' && (
          <div key={key}>
            <label>{key}</label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              required={key !== 'imageUrl'}
              type={key === 'price' ? 'number' : 'text'}
            />
          </div>
        )
      ))}
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProduct;
