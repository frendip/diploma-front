import {YMapProps} from '@yandex/ymaps3';
import React from 'react';
import Panel from '../components/AddSubstation/Panel';
import MapLayout, {DEFAULT_LOCATION} from '../components/MapLayout';

function AddSubstationPage() {
    const [mapLocation, setMapLocation] = React.useState<YMapProps['location']>(DEFAULT_LOCATION);

    return (
        <>
            <Panel className="w-add-substation-panel h-add-substation-panel absolute bottom-0 left-0 z-50" />
            <div className="absolute bottom-0 left-0 right-0 top-0">
                <MapLayout location={mapLocation}></MapLayout>
            </div>
        </>
    );
}

export default AddSubstationPage;
