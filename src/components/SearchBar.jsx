import { useState } from "react";
import styles from "../module.css/SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue);
  };
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search news..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && handleSearch();
        }}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
