import {Route, Routes} from 'react-router-dom';
import Layout from '../components/Layout';
import AddSubstationPage from '../pages/AddSubstationPage';
import DriverPage from '../pages/DriverPage';
import DriversRoutesPage from '../pages/DriversRoutesPage';
import SubstationsPage from '../pages/SubstationsPage';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<SubstationsPage />} />
                <Route path="/drivers-routes" element={<DriversRoutesPage />} />
                <Route path="/add-substation" element={<AddSubstationPage />} />
                <Route path="/driver/:id" element={<DriverPage />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
