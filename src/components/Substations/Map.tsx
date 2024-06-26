import React, {useCallback, useEffect} from 'react';
import {useGetBasesQuery, useGetSubstationsQuery} from '../../api/SubstationsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import type {Margin, YMapProps} from '../../lib/ymaps';
import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';
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

    const {status, activeSubstationId, panelActiveType} = useAppSelector((state) => state.vinaigretteSlice);
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

            if (activeSubstationId) {
                const activeSubstation = substationData.data.find(
                    (substation) => substation.substation_id === activeSubstationId
                );
                if (!activeSubstation) return;
                setMapLocation({center: activeSubstation.coordinates, zoom: 12});
            } else {
                setMapLocation({...DEFAULT_LOCATION});
            }
        } else {
            if (!basesData) return;

            if (activeSubstationId) {
                const activeSubstation = basesData.data.find(
                    (substation) => substation.substation_id === activeSubstationId
                );
                if (!activeSubstation) return;
                setMapLocation({center: activeSubstation.coordinates, zoom: 12});
            } else {
                setMapLocation({...DEFAULT_LOCATION});
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSubstationId]);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout location={mapLocation} margin={MAP_MARGIN}>
                {panelActiveType === 'substations'
                    ? !substationDataIsLoading &&
                      substationData?.data.map((substation) => (
                          <MapSubstationMarker
                              key={substation.substation_id}
                              isActive={substation.substation_id === activeSubstationId}
                              color={markerColorOption[substation.status]}
                              coordinates={substation.coordinates}
                              onClick={() => onClickHandler(substation.substation_id)}
                          />
                      ))
                    : !basesDataIsLoading &&
                      basesData?.data.map((substation) => (
                          <MapSubstationMarker
                              key={substation.substation_id}
                              isActive={substation.substation_id === activeSubstationId}
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
