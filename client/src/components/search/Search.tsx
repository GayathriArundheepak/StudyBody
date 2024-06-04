import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss'; 

interface SearchProps {
  onSearch: (query: string) => void; // Function to handle search
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = async () => {
    try {
      console.log(searchQuery);
      // Call the onSearch prop with the search query
      await onSearch(searchQuery);
      console.log(onSearch);
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="search"
        name="search-form"
        id="search-form"
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search courses"
      />
      <SearchIcon className="search-icon" onClick={handleSearch} />
    </div>
  );
};
export default Search;
