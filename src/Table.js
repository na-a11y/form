// src/Table.js
import React from 'react';

function Table({ data, deleteData, editData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>DOB</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.dob}</td>
              <td>
                <button className="edit" onClick={() => editData(item)}>Edit</button>
                <button className="delete" onClick={() => deleteData(item.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
