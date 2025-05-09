import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>{product.brand} - {product.category}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>
    </div>
  );
}
