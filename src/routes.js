import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import WelcomePage from './components/welcome/WelcomePage';
//import WelcomePageAr from './components/welcome_ar/WelcomePageAr';
import HomePage from './components/home/HomePage';
//import HomePageAr from './components/home_ar/HomePageAr';
//import MapPage from './components/map/MapPage';;
import WorldMapPage from './components/worldmap/WorldMapPage';
//import WorldMapPageAr from './components/worldmapar/WorldMapPageAr';
//import StatsPage from './components/FullStats/StatsPage';
import StatsPage from './components/FullStats/FullStatsMain';
import GenerateGraphics from './components/graphics/GenerateGraphics';
import PreLoader from './components/worldmap/PreLoader';
////import GenerateGraphicsAr from './components/graphics_ar/GenerateGraphics';
//import StatsPageAr from './components/FullStats_ar/FullStatsMain';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={WelcomePage} />
        <Route path="stats" component={StatsPage} />
        <Route path="welcome" component={HomePage} />
        
     
        <Route path="worldmap" component={WorldMapPage} />
        <Route path="graphics" component={GenerateGraphics} />
        <Route path="worldmap?:kpiId?:countryId" component={WorldMapPage} />
        <Route path="PreLoader" component={PreLoader} />
        

    </Route>
);
