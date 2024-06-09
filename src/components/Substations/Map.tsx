import React, {useCallback, useEffect} from 'react';
import MapLayout, {DEFAULT_LOCATION} from '../MapLayout';
import {useGetSubstationsQuery} from '../../api/SubstationsService';
import MapSubstationMarker from '../MapSubstationMarker';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setActiveSubstation} from '../../store/slices/substationsFilterSlice';
import type {YMapProps, Margin} from '../../lib/ymaps';
interface MapProps {
    className?: string;
}

const MAP_MARGIN: Margin = [0, 0, 250, 0];

const markerColorOption = {
    active: 'green',
    waiting: 'yellow',
    disabled: 'red'
} as const;

function Map({className: externalStyles}: MapProps) {
    const dispatch = useAppDispatch();

    const [mapLocation, setMapLocation] = React.useState<YMapProps['location']>(DEFAULT_LOCATION);

    const {status, activeId} = useAppSelector((state) => state.substationsFilterSlice);
    const {data, isLoading} = useGetSubstationsQuery({status});

    const onClickHandler = useCallback(
        (substationId: number) => {
            dispatch(setActiveSubstation(substationId));
        },
        [dispatch]
    );

    useEffect(() => {
        if (!data) return;

        if (activeId) {
            const activeSubstation = data.data.find((substation) => substation.substation_id === activeId);
            if (!activeSubstation) return;
            setMapLocation({center: activeSubstation.coordinates, zoom: 12, duration: 300});
        } else {
            setMapLocation({...DEFAULT_LOCATION, duration: 300});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout location={mapLocation} margin={MAP_MARGIN}>
                {!isLoading &&
                    data?.data.map((substation) => (
                        <MapSubstationMarker
                            key={substation.substation_id}
                            isActive={substation.substation_id === activeId}
                            color={markerColorOption[substation.status]}
                            coordinates={substation.coordinates}
                            onClick={() => onClickHandler(substation.substation_id)}
                        />
                    ))}
            </MapLayout>
        </div>
    );
}

export default Map;
