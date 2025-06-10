import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import NewsFeed from "./components/NewsFeed";
import "./App.css";
import "./global.css";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  return (
    <>
      <div className="container">
        <Header />
        <SearchBar onSearch={handleSearch} />
        <NewsFeed searchTerm={searchTerm} page={page} setPage={setPage}/>
        <Footer />
      </div>
    </>
  );
}

export default App;
