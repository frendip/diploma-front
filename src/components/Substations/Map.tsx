import React, {useCallback, useEffect} from 'react';
import {useGetBasesQuery, useGetSubstationsQuery} from '../../api/SubstationsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import type {Margin, YMapProps} from '../../lib/ymaps';
import {setActiveSubstation} from '../../store/slices/substationsFilterSlice';
import MapLayout, {DEFAULT_LOCATION} from '../MapLayout';
import MapSubstationMarker from '../MapSubstationMarker';
interface MapProps {
    className?: string;
}

const MAP_MARGIN: Margin = [0, 0, 250, 0];

const markerColorOption = {
    active: 'green',
    waiting: 'yellow',
    disabled: 'red',
    base: 'blue'
} as const;

function Map({className: externalStyles}: MapProps) {
    const dispatch = useAppDispatch();

    const [mapLocation, setMapLocation] = React.useState<YMapProps['location']>(DEFAULT_LOCATION);

    const {status, activeId, panelActiveType} = useAppSelector((state) => state.substationsFilterSlice);
    const {data: substationData, isLoading: substationDataIsLoading} = useGetSubstationsQuery({status});
    const {data: basesData, isLoading: basesDataIsLoading} = useGetBasesQuery(null);

    const onClickHandler = useCallback(
        (substationId: number) => {
            dispatch(setActiveSubstation(substationId));
        },
        [dispatch]
    );

    useEffect(() => {
        if (panelActiveType === 'substations') {
            if (!substationData) return;

            if (activeId) {
                const activeSubstation = substationData.data.find(
                    (substation) => substation.substation_id === activeId
                );
                if (!activeSubstation) return;
                setMapLocation({center: activeSubstation.coordinates, zoom: 12, duration: 300});
            } else {
                setMapLocation({...DEFAULT_LOCATION, duration: 300});
            }
        } else {
            if (!basesData) return;

            if (activeId) {
                const activeSubstation = basesData.data.find((substation) => substation.substation_id === activeId);
                if (!activeSubstation) return;
                setMapLocation({center: activeSubstation.coordinates, zoom: 12, duration: 300});
            } else {
                setMapLocation({...DEFAULT_LOCATION, duration: 300});
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout location={mapLocation} margin={MAP_MARGIN}>
                {panelActiveType === 'substations'
                    ? !substationDataIsLoading &&
                      substationData?.data.map((substation) => (
                          <MapSubstationMarker
                              key={substation.substation_id}
                              isActive={substation.substation_id === activeId}
                              color={markerColorOption[substation.status]}
                              coordinates={substation.coordinates}
                              onClick={() => onClickHandler(substation.substation_id)}
                          />
                      ))
                    : !basesDataIsLoading &&
                      basesData?.data.map((substation) => (
                          <MapSubstationMarker
                              key={substation.substation_id}
                              isActive={substation.substation_id === activeId}
                              color={markerColorOption['base']}
                              coordinates={substation.coordinates}
                              onClick={() => onClickHandler(substation.substation_id)}
                          />
                      ))}
            </MapLayout>
        </div>
    );
}

export default Map;
