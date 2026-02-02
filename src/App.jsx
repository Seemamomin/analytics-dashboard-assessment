import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { parseCSV } from './utils/parseCSV';
import { getAnalytics } from './utils/analytics';
import LoadingSpinner from './components/LoadingSpinner';
import StatsGrid from './components/StatsGrid';
import VehicleTypeChart from './components/VehicleTypeChart';
import CAFVChart from './components/CAFVChart';
import TopManufacturersChart from './components/TopManufacturersChart';
import AvgRangeByMakeChart from './components/AvgRangeByMakeChart';
import YearTrendsChart from './components/YearTrendsChart';
import TopCountiesChart from './components/TopCountiesChart';

const csvData = `
  VIN (1-10),County,City,State,Postal Code,Model Year,Make,Model,Electric Vehicle Type,Clean Alternative Fuel Vehicle (CAFV) Eligibility,Electric Range,Base MSRP,Legislative District,DOL Vehicle ID,Vehicle Location,Electric Utility,2020 Census Tract
  5YJYGDEE1L,King,Seattle,WA,98122,2020,TESLA,MODEL Y,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,291,0,37,125701579,POINT (-122.30839 47.610365),CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA),53033007800
  7SAYGDEE9P,Snohomish,Bothell,WA,98021,2023,TESLA,MODEL Y,Battery Electric Vehicle (BEV),Eligibility unknown as battery range has not been researched,0,0,1,244285107,POINT (-122.179458 47.802589),PUGET SOUND ENERGY INC,53061051938
  5YJSA1E4XK,King,Seattle,WA,98109,2019,TESLA,MODEL S,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,270,0,36,156773144,POINT (-122.34848 47.632405),CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA),53033006800
  5YJSA1E27G,King,Issaquah,WA,98027,2016,TESLA,MODEL S,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,210,0,5,165103011,POINT (-122.03646 47.534065),PUGET SOUND ENERGY INC||CITY OF TACOMA - (WA),53033032104
  5YJYGDEE5M,Kitsap,Suquamish,WA,98392,2021,TESLA,MODEL Y,Battery Electric Vehicle (BEV),Eligibility unknown as battery range has not been researched,0,0,23,205138552,POINT (-122.55717 47.733415),PUGET SOUND ENERGY INC,53035940100
  3FA6P0SU8H,Thurston,Yelm,WA,98597,2017,FORD,FUSION,Plug-in Hybrid Electric Vehicle (PHEV),Not eligible due to low battery range,21,0,2,122057736,POINT (-122.61023 46.94126),PUGET SOUND ENERGY INC,53067012532
  1N4AZ0CP2D,Yakima,Yakima,WA,98903,2013,NISSAN,LEAF,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,75,0,14,150126840,POINT (-120.477805 46.553505),PACIFICORP,53077003003
  KNAGV4LD9J,Snohomish,Bothell,WA,98012,2018,KIA,OPTIMA,Plug-in Hybrid Electric Vehicle (PHEV),Not eligible due to low battery range,29,0,1,290605598,POINT (-122.1873 47.820245),PUGET SOUND ENERGY INC,53061052107
  1N4AZ0CP8F,Kitsap,Port Orchard,WA,98366,2015,NISSAN,LEAF,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,84,0,26,137322111,POINT (-122.639265 47.5373),PUGET SOUND ENERGY INC,53035092400
  5UXTA6C03N,King,Auburn,WA,98001,2022,BMW,X5,Plug-in Hybrid Electric Vehicle (PHEV),Clean Alternative Fuel Vehicle Eligible,30,0,47,240226332,POINT (-122.2849393 47.3384055),PUGET SOUND ENERGY INC||CITY OF TACOMA - (WA),53033029902
  5YJYGDEEXL,King,Seattle,WA,98144,2020,TESLA,MODEL Y,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,291,0,37,113323024,POINT (-122.30823 47.581975),CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA),53033009500
  WBY8P8C53K,Kitsap,Bainbridge Island,WA,98110,2019,BMW,I3,Plug-in Hybrid Electric Vehicle (PHEV),Clean Alternative Fuel Vehicle Eligible,126,0,23,228846642,POINT (-122.5235781 47.6293323),PUGET SOUND ENERGY INC,53035091002
  1G1FZ6S07M,Yakima,Yakima,WA,98908,2021,CHEVROLET,BOLT EV,Battery Electric Vehicle (BEV),Eligibility unknown as battery range has not been researched,0,0,14,156686106,POINT (-120.6027202 46.5965625),PACIFICORP,53077000903
  WA1E2AFY4M,Snohomish,Lynnwood,WA,98036,2021,AUDI,Q5 E,Plug-in Hybrid Electric Vehicle (PHEV),Not eligible due to low battery range,18,0,1,168371122,POINT (-122.316675 47.819365),PUGET SOUND ENERGY INC,53061051913
  1N4AZ0CP0F,King,Seattle,WA,98119,2015,NISSAN,LEAF,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,84,0,36,126304132,POINT (-122.363815 47.63046),CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA),53033005901
  1N4AZ0CP6D,King,Seattle,WA,98107,2013,NISSAN,LEAF,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,75,0,43,100938848,POINT (-122.37815 47.66866),CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA),53033004800
  1N4AZ0CP6D,Snohomish,Lynnwood,WA,98087,2013,NISSAN,LEAF,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,75,0,21,139800496,POINT (-122.2551991 47.8650827),PUGET SOUND ENERGY INC,53061042004
  1N4BZ0CP3H,Snohomish,Bothell,WA,98021,2017,NISSAN,LEAF,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,107,0,1,348979466,POINT (-122.179458 47.802589),PUGET SOUND ENERGY INC,53061051937
  5YJ3E1EB4L,King,Seattle,WA,98126,2020,TESLA,MODEL 3,Battery Electric Vehicle (BEV),Clean Alternative Fuel Vehicle Eligible,322,0,34,121690915,POINT (-122.374105 47.54468),CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA),53033009900
`;


const COLORS = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f43f5e', '#84cc16'];

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const parsed = parseCSV(csvData);
      setData(parsed);
      setLoading(false);
      setTimeout(() => setAnimateStats(true), 100);
    }, 1200);
  }, []);

  const analytics = useMemo(() => getAnalytics(data), [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dashboard">
      <div className="header">
        <div className="header-badge">Washington State Data</div>
        <h1>Electric Vehicle Analytics</h1>
        <p className="subtitle">Comprehensive insights into EV adoption and trends</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span>📊 Overview</span>
        </button>
        <button
          className={`tab ${activeTab === 'manufacturers' ? 'active' : ''}`}
          onClick={() => setActiveTab('manufacturers')}
        >
          <span>🏭 Manufacturers</span>
        </button>
        <button
          className={`tab ${activeTab === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveTab('trends')}
        >
          <span>📈 Trends</span>
        </button>
        <button
          className={`tab ${activeTab === 'geography' ? 'active' : ''}`}
          onClick={() => setActiveTab('geography')}
        >
          <span>🗺️ Geography</span>
        </button>
      </div>

      {activeTab === 'overview' && analytics && (
        <>
          <StatsGrid analytics={analytics} animateStats={animateStats} />
          <div className="charts-grid grid-2">
            <VehicleTypeChart data={analytics.typeDistribution} />
            <CAFVChart data={analytics.cafvDistribution} />
          </div>
        </>
      )}

      {activeTab === 'manufacturers' && analytics && (
        <div className="charts-grid">
          <TopManufacturersChart data={analytics.topMakes} />
          <AvgRangeByMakeChart data={analytics.avgRangeByMake} />
        </div>
      )}

      {activeTab === 'trends' && analytics && (
        <div className="charts-grid grid-1">
          <YearTrendsChart data={analytics.yearTrends} />
        </div>
      )}

      {activeTab === 'geography' && analytics && (
        <div className="charts-grid grid-1">
          <TopCountiesChart data={analytics.topCounties} />
        </div>
      )}
    </div>
  );
};

export default App;