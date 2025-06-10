import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../module.css/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.header}>The Bulletin Board</h1>
      <div className={styles.loginContainer}>
        <h2>{isNew ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className={styles.submit} type="submit">{isNew ? "Create Account" : "Login"}</button>
          <p>
            {isNew ? "Already have an account?" : "New user?"}{" "}
            <button type="button" onClick={() => setIsNew(!isNew)}>
              {isNew ? "Login" : "Register"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
