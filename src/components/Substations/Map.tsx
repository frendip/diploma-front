import React from 'react';
import MapLayout from '../MapLayout';
import {useGetSubstationsQuery} from '../../api/SubstationsService';
import MapSubstationMarker from '../MapSubstationMarker';
import {useAppSelector} from '../../hooks/useAppSelector';

interface MapProps {
    className?: string;
}

const markerColorOption = {
    active: 'green',
    waiting: 'yellow',
    disabled: 'red'
} as const;

function Map({className: externalStyles}: MapProps) {
    const {status} = useAppSelector((state) => state.substationsFilterSlice);
    const {data, isLoading} = useGetSubstationsQuery({status});

    return (
        <div className={`${externalStyles}`}>
            <MapLayout>
                {!isLoading &&
                    data?.data.map((substation) => (
                        <MapSubstationMarker
                            key={substation.substation_id}
                            color={markerColorOption[substation.status]}
                            coordinates={substation.coordinates}
                        />
                    ))}
            </MapLayout>
        </div>
    );
}

export default Map;
