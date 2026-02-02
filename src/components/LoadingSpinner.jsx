
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.loadingSpinnerWrapper}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingSpinnerGlow}></div>
        </div>
        <h2 className={styles.loadingTitle}>Electric Vehicle Analytics</h2>
        <p className={styles.loadingText}>Initializing dashboard...</p>
        <div className={styles.loadingBar}>
          <div className={styles.loadingBarFill}></div>
        </div>
      </div>
    </div>
  );
}
