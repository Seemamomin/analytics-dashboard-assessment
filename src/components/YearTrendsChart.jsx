import React from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';
import styles from './YearTrendsChart.module.css';
const YearTrendsChart = React.memo(function YearTrendsChart({ data }) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>EV Adoption Timeline</h3>
          <p className={styles.chartSubtitle}>Year-over-year growth in electric vehicle registrations</p>
        </div>
        <div className={styles.chartBadge}>Historical Data</div>
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis dataKey="year" tick={{ fill: '#94a3b8' }} />
          <YAxis tick={{ fill: '#94a3b8' }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8b5cf6"
            strokeWidth={3}
            fill="url(#areaGradient)"
            name="Vehicles Registered"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});
export default YearTrendsChart;
