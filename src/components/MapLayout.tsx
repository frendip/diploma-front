import React, {useEffect} from 'react';
import {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} from '../lib/ymaps';
import type {YMapLocationRequest, YMapProps} from '../lib/ymaps';

export const DEFAULT_LOCATION: YMapLocationRequest = {
    center: [37.623082, 55.75254], // starting position [lng, lat]
    zoom: 9 // starting zoom
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type MapContextType = {
    mapProps: YMapProps;
    setMapProps: React.Dispatch<React.SetStateAction<YMapProps>>;
};

const defaultContext: MapContextType = {
    mapProps: {} as YMapProps,
    setMapProps: () => {}
};

export const MapContext = React.createContext<MapContextType>(defaultContext);

function MapLayout(props: React.PropsWithChildren<PartialBy<YMapProps, 'location'>>) {
    const {children, ...initialMapProps} = props;

    const [mapProps, setMapProps] = React.useState<YMapProps>({
        location: DEFAULT_LOCATION,
        ...initialMapProps
    });

    useEffect(() => {
        setMapProps({
            location: DEFAULT_LOCATION,
            ...initialMapProps
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.values(initialMapProps)]);

    return (
        <MapContext.Provider value={{mapProps, setMapProps}}>
            <YMap {...mapProps}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                {props.children}
            </YMap>
        </MapContext.Provider>
    );
}

export default MapLayout;
