import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from '../components/Layout';
import SubstationsPage from '../pages/SubstationsPage';
import DriversRoutesPage from '../pages/DriversRoutesPage';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<SubstationsPage />} />
                <Route path="/drivers-routes" element={<DriversRoutesPage />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
