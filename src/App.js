// src/App.js
import React, { useState } from 'react';
import Form from './Form';
import Table from './Table';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentData, setCurrentData] = useState({ id: null, name: '', email: '', mobile: '', dob: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [notification, setNotification] = useState('');

  const addData = (newData) => {
    newData.id = data.length + 1;
    setData([...data, newData]);
    setIsFormVisible(false);
    setNotification('Data added successfully!');
    setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
  };

  const deleteData = (id) => {
    setData(data.filter((item) => item.id !== id));
    setNotification('Data deleted successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const editData = (item) => {
    const confirmed = window.confirm('Are you sure you want to edit this item?');
    if (confirmed) {
      setEditing(true);
      setCurrentData({ id: item.id, name: item.name, email: item.email, mobile: item.mobile, dob: item.dob });
      setIsFormVisible(true);
    }
  };

  const updateData = (id, updatedData) => {
    setEditing(false);
    setData(data.map((item) => (item.id === id ? updatedData : item)));
    setIsFormVisible(false);
    setNotification('Data updated successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>
      {notification && <div className="notification">{notification}</div>}
      <button className="add-button" onClick={() => setIsFormVisible(true)}>Add</button>
      <Table data={data} deleteData={deleteData} editData={editData} />
      {isFormVisible && (
        <div className="form-container">
          <Form
            addData={addData}
            editing={editing}
            currentData={currentData}
            updateData={updateData}
          />
          <button className="close-button" onClick={() => setIsFormVisible(false)}>X</button>
        </div>
      )}
    </div>
  );
}

export default App;
