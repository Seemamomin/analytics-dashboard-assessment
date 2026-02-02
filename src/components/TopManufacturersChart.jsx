import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';
import styles from './ChartCommon.module.css';

const TopManufacturersChart = React.memo(function TopManufacturersChart({ data }) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Top 10 Manufacturers</h3>
          <p className={styles.chartSubtitle}>Market leaders by vehicle count</p>
        </div>
        <div className={styles.chartBadge}>Market Share</div>
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="url(#barGradient)" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
export default TopManufacturersChart;
