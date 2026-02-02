import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';
import styles from './ChartCommon.module.css';

const AvgRangeByMakeChart = React.memo(function AvgRangeByMakeChart({ data }) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Average Electric Range</h3>
          <p className={styles.chartSubtitle}>Miles per charge by manufacturer</p>
        </div>
        <div className={styles.chartBadge}>Performance</div>
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
          <defs>
            <linearGradient id="rangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
          <XAxis
            dataKey="make"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis
            tick={{ fill: '#94a3b8' }}
            label={{ value: 'Miles', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="avgRange" fill="url(#rangeGradient)" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
export default AvgRangeByMakeChart;
