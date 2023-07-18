import React, { useState, useEffect } from 'react';
import './App.css'; 

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  useEffect(() => {
    const delay = setTimeout(() => {
      const data = [
        { id: 1, name: 'John Doe', country: 'India' },
        { id: 2, name: 'Jane Smith', country: 'USA' },
        { id: 3, name: 'David Johnson', country: 'UK' },
        { id: 4, name: 'Maria Garcia', country: 'Spain' },
        { id: 5, name: 'Mohamed Ahmed', country: 'Egypt' },
        { id: 6, name: 'Sophie Martin', country: 'France' },
        { id: 7, name: 'Luca Rossi', country: 'Italy' },
        { id: 8, name: 'Luis Hernandez', country: 'Mexico' },
        { id: 9, name: 'Oliver Müller', country: 'Germany' },
        { id: 10, name: 'Anna Kim', country: 'South Korea' },
        { id: 11, name: 'Carlos Santos', country: 'Brazil' },
        { id: 12, name: 'Liam Wilson', country: 'Canada' },
        { id: 13, name: 'Sophia Lee', country: 'Australia' },
        { id: 14, name: 'Hiroshi Tanaka', country: 'Japan' },
        { id: 15, name: 'Emilia Rodriguez', country: 'Spain' },
        { id: 16, name: 'Mia Andersson', country: 'Sweden' },
        { id: 17, name: 'Ali Khan', country: 'Pakistan' },
        { id: 18, name: 'Elena Petrova', country: 'Russia' },
        { id: 19, name: 'Pedro Martinez', country: 'Dominican Republic' },
        { id: 20, name: 'Sofia Lopez', country: 'Argentina' },
      ];
      setCustomers(data);
      setFilteredCustomers(data);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  const handleFilter = (filterValue) => {
    if (filterValue === 'India') {
      setFilteredCustomers(customers.filter(customer => customer.country === 'India'));
    } else if (filterValue === 'Outside India') {
      setFilteredCustomers(customers.filter(customer => customer.country !== 'India'));
    } else {
      setFilteredCustomers(customers);
    }
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    const searchInput = event.target.value.toLowerCase();
    setSearchValue(searchInput);
    const filteredData = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchInput) ||
      customer.country.toLowerCase().includes(searchInput)
    );
    setFilteredCustomers(filteredData);
    setCurrentPage(1);
  };

  const handleSort = () => {
    const sortedData = [...filteredCustomers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredCustomers(sortedData);
  };

  const handleSelectCustomer = (customerId) => {
    const isSelected = selectedCustomers.includes(customerId);
    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const renderCustomerRows = currentCustomers.map(customer => (
    <tr key={customer.id}>
      <td>
        <input
          type="checkbox"
          checked={selectedCustomers.includes(customer.id)}
          onChange={() => handleSelectCustomer(customer.id)}
        />
      </td>
      <td>{customer.name}</td>
      <td>{customer.country}</td>
      <td>{customer.id}</td>
    </tr>
  ));

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    console.log('Selected Customers:', selectedCustomers);
  }, [selectedCustomers]);

  return (
    <div className="container">
      
      <div className="filter-container">
        <label>Filter by Country:</label>
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="">All</option>
          <option value="India">India</option>
          <option value="Outside India">Outside India</option>
        </select>
      </div>
      <div className="search-container">
        <label>Search:</label>
        <input type="text" value={searchValue} onChange={handleSearch} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={handleSort}>Name</th>
            <th>Country</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {renderCustomerRows}
        </tbody>
      </table>
      <div className="pagination-container">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default CustomerTable;
