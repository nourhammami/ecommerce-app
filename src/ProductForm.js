import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onProductAdded }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    imageUrl: '' // Initially empty, will be set when an image is selected
  });

  const categories = [
    'ELECTRONICS',
    'FASHION',
    'BOOKS',
    'FOOD',
    'COSMETICS',
    'CLOTHES',
    'FURNITURE',
    'OTHER'
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the image (for immediate preview before uploading)
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isNaN(formData.price) || formData.price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      await axios.post('http://localhost:8080/products', productData);
      alert('Product added');
      onProductAdded();
      navigate('/products');
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Add Product</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        {Object.entries(formData).map(([key, value]) => {
          if (key === 'category') {
            return (
              <div className="col-md-6" key={key}>
                <label className="form-label text-capitalize">{key}</label>
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (key === 'imageUrl') {
            return (
              <div className="col-md-6" key={key}>
                <label className="form-label text-capitalize">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
                {value && (
                  <div className="mt-2">
                    <img
                      src={value}
                      alt="Selected"
                      className="img-fluid"
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className="col-md-6" key={key}>
              <label className="form-label text-capitalize">{key}</label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                required={key !== 'imageUrl'}
                type={key === 'price' ? 'number' : 'text'}
                className="form-control"
              />
            </div>
          );
        })}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
