import styles from "../module.css/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <header className={styles.header}>
      <h1>The Bulletin Board</h1>
      <nav>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/saved" className={styles.link}>
          Saved Articles
        </Link>
        {currentUser ? (
          <>
            <span className={styles.userEmail}>
              Welcome, {currentUser.email}
            </span>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
