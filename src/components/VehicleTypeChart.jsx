import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';
import styles from './ChartCommon.module.css';

const gradients = [
  { id: 'gradient1', stops: [
    { offset: '0%', color: '#06b6d4' },
    { offset: '100%', color: '#0891b2' }
  ] },
  { id: 'gradient2', stops: [
    { offset: '0%', color: '#8b5cf6' },
    { offset: '100%', color: '#7c3aed' }
  ] }
];

const VehicleTypeChart = React.memo(function VehicleTypeChart({ data }) {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Vehicle Type Distribution</h3>
          <p className={styles.chartSubtitle}>BEV vs PHEV comparison</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <defs>
            {gradients.map(g => (
              <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="1" y2="1">
                {g.stops.map((s, i) => (
                  <stop key={i} offset={s.offset} stopColor={s.color} />
                ))}
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={120}
            innerRadius={70}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient${index + 1})`} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});
export default VehicleTypeChart;
