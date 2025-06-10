import { useEffect, useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import styles from "../module.css/NewsFeed.module.css";
import Loader from "./Loader";

function NewsFeed({ searchTerm, page, setPage }) {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const feedRef = useRef(null);

  const pageSize = 5;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Replace YOUR_NEWSAPI_KEY with your actual NewsAPI key.
        // You can get your API key by signing up at https://newsapi.org/register
        const apiKey = "YOUR_NEWSAPI_KEY";
        const url = searchTerm
          ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(
              searchTerm
            )}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
          : `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
        setLoading(false);

        setTimeout(() => {
          setLoading(false);
          if (feedRef.current) {
            feedRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 1000);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, [searchTerm, page]);

  const handleSave = async (article) => {
    if (!currentUser) {
      alert("Please log in to save articles.");
      return;
    }
    try {
      await addDoc(collection(db, "saved_articles"), {
        userId: currentUser.uid,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
      });
      console.log(`Article saved successfully! ${article.title}`);
      alert(`Article saved successfully! ${article.title}`);
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className={styles.feed} ref={feedRef}>
      <h2 className={styles.title}>
        {searchTerm ? `Results for "${searchTerm}"` : "Top News"}
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          {articles.map((article, index) => (
            <div key={index} className={styles.articleCard}>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              {article.urlToImage && (
                <img src={article.urlToImage} alt="News" width="100%" />
              )}
              <p className={styles.articleDescription}>{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.articleLink}
              >
                Read more
              </a>
              <button
                className={styles.saveButton}
                onClick={() => handleSave(article)}
              >
                Save Article
              </button>
            </div>
          ))}
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NewsFeed;
