import React from 'react';
import styles from './StatsGrid.module.css';

const StatsGrid = React.memo(function StatsGrid({ analytics, animateStats }) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statIconWrapper}>⚡</div>
        <div className={styles.statLabel}>Total Vehicles</div>
        <div className={`${styles.statValue}${animateStats ? ' ' + styles.animate : ''}`}>
          {analytics.totalVehicles.toLocaleString()}
        </div>
        <div className={styles.statChange}>↗ Active registrations</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIconWrapper}>🔋</div>
        <div className={styles.statLabel}>Battery EVs</div>
        <div className={`${styles.statValue}${animateStats ? ' ' + styles.animate : ''}`}>
          {analytics.bevCount.toLocaleString()}
        </div>
        <div className={styles.statChange}>
          {Math.round((analytics.bevCount / analytics.totalVehicles) * 100)}% of fleet
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIconWrapper}>🔌</div>
        <div className={styles.statLabel}>Plug-in Hybrids</div>
        <div className={`${styles.statValue}${animateStats ? ' ' + styles.animate : ''}`}>
          {analytics.phevCount.toLocaleString()}
        </div>
        <div className={styles.statChange}>
          {Math.round((analytics.phevCount / analytics.totalVehicles) * 100)}% of fleet
        </div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statIconWrapper}>🌱</div>
        <div className={styles.statLabel}>Clean Fuel Eligible</div>
        <div className={`${styles.statValue}${animateStats ? ' ' + styles.animate : ''}`}>
          {Math.round((analytics.cafvDistribution.find(c => c.name === 'Eligible')?.value || 0) / analytics.totalVehicles * 100)}%
        </div>
        <div className={styles.statChange}>CAFV certified</div>
      </div>
    </div>
  );
});
export default StatsGrid;
