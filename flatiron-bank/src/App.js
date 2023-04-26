import React, { useEffect, useState } from "react";
import './App.css'

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3003/transactions")
      .then((res) => res.json())
      .then((transactions) => setTransactions(transactions));
  }, []);

  // deleting functionality
  const handleDelete = (id) => {
    fetch(`http://localhost:3003/transactions/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
    })
    .catch(err => console.error(err));
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>
              <button className="delete-button"
              onClick={() => handleDelete(transaction.id)}
              >Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
