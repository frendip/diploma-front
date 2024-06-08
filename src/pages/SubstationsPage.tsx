import React from 'react';
import MapLayout from '../components/MapLayout';
import Panel from '../components/Substations/Panel';

function SubstationsPage() {
    return (
        <>
            <Panel className="h-substations-panel absolute bottom-0 left-0 right-0 z-50" />
            <div className="absolute bottom-0 left-0 right-0 top-0">
                <MapLayout></MapLayout>
            </div>
        </>
    );
}

export default SubstationsPage;
