import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';
import styles from './ChartCommon.module.css';
const TopCountiesChart = React.memo(function TopCountiesChart({ data }) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Regional Distribution</h3>
          <p className={styles.chartSubtitle}>Top counties by EV population</p>
        </div>
        <div className={styles.chartBadge}>Geographic Analysis</div>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 120, bottom: 20 }}>
          <defs>
            <linearGradient id="countyGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis type="number" tick={{ fill: '#94a3b8' }} />
          <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="url(#countyGradient)" radius={[0, 12, 12, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
export default TopCountiesChart;
