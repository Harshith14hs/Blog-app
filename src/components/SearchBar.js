import React from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts..."
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
} 