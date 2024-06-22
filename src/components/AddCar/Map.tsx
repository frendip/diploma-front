import {useEffect, useState} from 'react';
import {Substation} from '../../types/substations.types';
import MapLayout, {DEFAULT_LOCATION} from '../MapLayout';
import MapSubstationMarker from '../MapSubstationMarker';

interface MapProps {
    bases: Substation[];
    activeBaseId: number;
}

function Map({bases, activeBaseId}: MapProps) {
    const [mapLocation, setMapLocation] = useState(DEFAULT_LOCATION);

    useEffect(() => {
        const base = bases.find((base) => base.substation_id === activeBaseId);

        if (base) {
            setMapLocation((prev) => ({...prev, center: base.coordinates, zoom: 12}));
        }
    }, [activeBaseId, bases]);

    return (
        <div className="absolute bottom-0 left-0 right-0 top-0">
            <MapLayout location={mapLocation}>
                {bases.map((base) => (
                    <MapSubstationMarker
                        key={base.substation_id}
                        color="blue"
                        coordinates={base.coordinates}
                    ></MapSubstationMarker>
                ))}
            </MapLayout>
        </div>
    );
}

export default Map;
