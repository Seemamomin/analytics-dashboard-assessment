// Utility to calculate analytics from vehicle data
export function getAnalytics(data) {
  if (!data.length) return null;

  const typeCount = data.reduce((acc, vehicle) => {
    const type = vehicle['Electric Vehicle Type'];
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const makeCount = data.reduce((acc, vehicle) => {
    const make = vehicle.Make;
    acc[make] = (acc[make] || 0) + 1;
    return acc;
  }, {});

  const topMakes = Object.entries(makeCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  const yearCount = data.reduce((acc, vehicle) => {
    const year = vehicle['Model Year'];
    if (year && year !== '0') {
      acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {});

  const yearTrends = Object.entries(yearCount)
    .sort(([a], [b]) => a - b)
    .map(([year, count]) => ({ year, count }));

  const countyCount = data.reduce((acc, vehicle) => {
    const county = vehicle.County;
    acc[county] = (acc[county] || 0) + 1;
    return acc;
  }, {});

  const topCounties = Object.entries(countyCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));

  const cafvCount = data.reduce((acc, vehicle) => {
    const cafv = vehicle['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
    const shortName = cafv.includes('Eligible') ? 'Eligible' :
      cafv.includes('Not eligible') ? 'Not Eligible' : 'Unknown';
    acc[shortName] = (acc[shortName] || 0) + 1;
    return acc;
  }, {});

  const rangeByMake = {};
  topMakes.forEach(({ name }) => {
    rangeByMake[name] = { total: 0, count: 0 };
  });
  data.forEach(vehicle => {
    const make = vehicle.Make;
    const range = parseInt(vehicle['Electric Range']);
    if (range && range > 0 && rangeByMake[make]) {
      rangeByMake[make].total += range;
      rangeByMake[make].count += 1;
    }
  });

  const avgRangeByMake = Object.entries(rangeByMake)
    .filter(([, { count }]) => count > 0)
    .map(([make, { total, count }]) => ({
      make,
      avgRange: Math.round(total / count)
    }))
    .sort((a, b) => b.avgRange - a.avgRange);

  return {
    totalVehicles: data.length,
    typeDistribution: Object.entries(typeCount).map(([name, value]) => ({
      name: name.includes('BEV') ? 'Battery EV' : 'Plug-in Hybrid',
      value,
      fullName: name
    })),
    topMakes,
    yearTrends,
    topCounties,
    cafvDistribution: Object.entries(cafvCount).map(([name, value]) => ({ name, value })),
    avgRangeByMake,
    bevCount: typeCount['Battery Electric Vehicle (BEV)'] || 0,
    phevCount: typeCount['Plug-in Hybrid Electric Vehicle (PHEV)'] || 0
  };
}
