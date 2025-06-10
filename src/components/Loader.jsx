import styles from '../module.css/Loader.module.css';
function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p>Loading articles...</p>
    </div>
  );
}

export default Loader;
