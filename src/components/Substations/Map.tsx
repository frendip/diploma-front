import React, {useCallback, useEffect, useMemo} from 'react';
import {useGetBasesQuery, useGetSubstationsQuery} from '../../api/SubstationsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {
    YMapClusterer,
    YMapMarker,
    clusterByGrid,
    type Margin,
    type YMapProps,
    YMapFeatureDataSource,
    YMapLayer
} from '../../lib/ymaps';
import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';
import MapLayout, {DEFAULT_LOCATION} from '../MapLayout';
import MapSubstationMarker from '../MapSubstationMarker';
import {LngLat} from '@yandex/ymaps3';
import {Substation} from '../../types/substations.types';
import {Feature} from '@yandex/ymaps3/packages/clusterer';
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
                setMapLocation({...DEFAULT_LOCATION, center: activeSubstation.coordinates, zoom: 14});
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
                setMapLocation({...DEFAULT_LOCATION, center: activeSubstation.coordinates, zoom: 14});
            } else {
                setMapLocation({...DEFAULT_LOCATION});
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSubstationId]);

    const gridSizedMethod = useMemo(() => clusterByGrid({gridSize: 128}), []);

    const substationMarker = useCallback(
        (substation: Feature) => {
            return (
                <MapSubstationMarker
                    //@ts-ignore
                    key={substation.properties.substation_id}
                    //@ts-ignore
                    isActive={substation.properties.substation_id === activeSubstationId}
                    //@ts-ignore
                    color={markerColorOption[substation.properties.status]}
                    //@ts-ignore
                    coordinates={substation.properties.coordinates}
                    onClick={() => onClickHandler(+substation.id)}
                />
            );
        },
        [activeSubstationId, onClickHandler]
    );

    const cluster = useCallback((coordinates: LngLat, substations: Feature[]) => {
        return (
            <YMapMarker
                key={`${substations[0].id}-${substations.length}`}
                coordinates={coordinates}
                source="clusterer-source"
            >
                <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#192F82] text-2xl font-bold text-white shadow-lg">
                        {substations.length}
                    </div>
                    <span className="absolute right-0 top-0 flex h-6 w-6 -translate-y-2 translate-x-2 transform items-center justify-center rounded-full bg-active text-xs text-white">
                        +
                    </span>
                </div>
            </YMapMarker>
        );
    }, []);

    return (
        <div className={`${externalStyles}`}>
            <MapLayout location={mapLocation} margin={MAP_MARGIN}>
                {panelActiveType === 'substations'
                    ? substationData && (
                          <>
                              <YMapFeatureDataSource id="clusterer-source" />
                              <YMapLayer source="clusterer-source" type="markers" zIndex={1800} />
                              <YMapClusterer
                                  marker={substationMarker}
                                  cluster={cluster}
                                  method={gridSizedMethod}
                                  // @ts-ignore
                                  features={substationData.data.map((substation) => ({
                                      type: 'Feature',
                                      id: substation.substation_id,
                                      geometry: {
                                          type: 'Point',
                                          coordinates: substation.coordinates
                                      },
                                      properties: {...substation}
                                  }))}
                              />
                          </>
                      )
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
