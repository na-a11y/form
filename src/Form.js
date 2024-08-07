// src/Form.js
import React, { useState, useEffect } from 'react';
import './App.css';

function Form({ addData, editing, currentData, updateData }) {
  const [formData, setFormData] = useState(currentData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate the form on each change
    const newErrors = validateForm({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const validateForm = (data) => {
    const { name, email, mobile, dob } = data;
    const newErrors = {};

    // Name validation
    if (name && name.charAt(0) !== name.charAt(0).toUpperCase()) {
      newErrors.name = "Name must start with a capital letter.";
    }

    // Email validation
    if (email && (!email.includes('@') || !email.includes('.com'))) {
      newErrors.email = "Email must be in the format example@domain.com.";
    }

    // Mobile validation
    if (mobile && (!/^[789]\d{9}$/.test(mobile))) {
      newErrors.mobile = "Mobile number must start with 7, 8, or 9 and be exactly 10 digits long.";
    }

    // DOB validation
    if (dob && new Date(dob) > new Date()) {
      newErrors.dob = "Date of Birth cannot be in the future.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      if (editing) {
        updateData(formData.id, formData);
      } else {
        addData(formData);
      }
      setFormData({ id: null, name: '', email: '', mobile: '', dob: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile:</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        {errors.mobile && <div className="error-message">{errors.mobile}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="dob">DOB:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        {errors.dob && <div className="error-message">{errors.dob}</div>}
      </div>
      <button type="submit">{editing ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default Form;
