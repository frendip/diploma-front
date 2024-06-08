import React from 'react';
import List from '../components/DriversRoutes/List';
import Map from '../components/DriversRoutes/Map';

function DriversRoutesPage() {
    return (
        <>
            <List className="absolute bottom-0 left-0 top-0 z-50 w-routes-panel" />
            <Map className="absolute bottom-0 left-0 right-0 top-0" />
        </>
    );
}

export default DriversRoutesPage;
