import React from 'react';
import MapLayout from '../MapLayout';

interface MapProps {
    className?: string;
}

function Map({className: externalStyles}: MapProps) {
    return (
        <div className={`${externalStyles}`}>
            <MapLayout></MapLayout>
        </div>
    );
}

export default Map;
