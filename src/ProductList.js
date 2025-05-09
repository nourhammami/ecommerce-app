import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ refresh, onRefresh }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch products based on the search query or refresh
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products', {
          params: { search }
        });
        setProducts(response.data);
      } catch {
        alert('Failed to load products');
      }
    };
    fetchProducts();
  }, [search, refresh]); // Fetch whenever search or refresh changes

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/products/${id}`)
      .then(() => {
        alert('Product deleted');
        onRefresh?.();
      })
      .catch(() => alert('Failed to delete product'));
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Product List</h3>

      {/* Search input field */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or brand"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
        />
      </div>

      {/* Product grid */}
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm">
                {p.imageUrl && <img src={p.imageUrl} className="card-img-top" alt={p.name} />}
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.brand} - ${p.price}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(p.id)}>Update</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
