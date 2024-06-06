import React from 'react';
import DriversRoutesList from '../components/DriversRoutesList';
import DriversRoutesMap from '../components/DriversRoutesMap';

function DriversRoutesPage() {
    return (
        <>
            <DriversRoutesList className="absolute bottom-0 left-0 top-0 z-50 w-routes-panel" />
            <DriversRoutesMap className="absolute bottom-0 left-0 right-0 top-0" />
        </>
    );
}

export default DriversRoutesPage;
