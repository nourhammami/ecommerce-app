import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => toast.error("Failed to load product details"));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} width={300} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.brand} - {product.category}</p>
      <p>{product.description}</p>
      <Link to="/">Back to Search</Link>
    </div>
  );
}
