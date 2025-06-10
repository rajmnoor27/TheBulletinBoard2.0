import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import styles from "../module.css/SavedArticles.module.css";

function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth();
  useEffect(() => {
    
    const fetchSavedArticles = async () => {
      if(!currentUser) return;
      const q = query(
        collection(db, "saved_articles"),
        where("userId", "==", currentUser.uid)
      );
      try {
        const snapshot = await getDocs(q);
        const articles = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSavedArticles(articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching saved articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedArticles();
  }, [currentUser]);
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "saved_articles", id));
      setSavedArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== id)
      );
      console.log("Article deleted successfully", id);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  return (
    <div className={styles.container}>
      <a href="/"><h1 className={styles.header}>The Bulletin Board</h1></a>
      <h2 className={styles.title}>Saved Articles</h2>
      {loading ? (
        <p>Loading saved articles...</p>
      ) : savedArticles.length === 0 ? (
        <p>No saved articles yet.</p>
      ) : (
        savedArticles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <p className={styles.articleDescription}>{article.description}</p>
            {article.urlToImage && (
              <img src={article.urlToImage} alt="News" width="100%" />
            )}
            <a className={styles.readMore} href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(article.id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default SavedArticles;
