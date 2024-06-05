import React from 'react';
import MapLayout from '../components/MapLayout';
import DriversRoutesList from '../components/DriversRoutesList';

function DriversRoutesPage() {
    return (
        <>
            <DriversRoutesList className="w-routes-panel absolute bottom-0 left-0 top-0 z-50" />
            <div className="absolute bottom-0 left-0 right-0 top-0">
                <MapLayout></MapLayout>
            </div>
        </>
    );
}

export default DriversRoutesPage;
