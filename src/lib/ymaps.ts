import type {
    BehaviorMapEventHandler,
    BehaviorType,
    DomEventHandler,
    DrawingStyle,
    LngLat,
    LngLatBounds,
    MapEventUpdateHandler,
    Margin,
    YMapLocationRequest,
    YMapMarkerProps,
    YMapProps
} from '@yandex/ymaps3';
import * as ymaps3 from '@yandex/ymaps3';
import {YMapLocation} from '@yandex/ymaps3/imperative/YMap';
import type {Geometry} from '@yandex/ymaps3/imperative/YMapFeature/types';
import * as YMapDefaultMarkerPrototype from '@yandex/ymaps3/packages/markers';
import * as YMapClustererPrototype from '@yandex/ymaps3/packages/clusterer';
import {reactify} from '@yandex/ymaps3/reactify';
import React from 'react';
import ReactDom from 'react-dom';

const reactified = reactify.bindTo(React, ReactDom);
const {
    YMap,
    YMapDefaultFeaturesLayer,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapControlButton,
    YMapMarker,
    YMapFeature,
    YMapListener,
    YMapContainer,
    YMapControl,
    YMapLayer,
    YMapFeatureDataSource
} = reactified.module(ymaps3);

const {YMapDefaultMarker} = reactified.module(YMapDefaultMarkerPrototype);
const {YMapClusterer} = reactified.module(YMapClustererPrototype);
const {clusterByGrid} = YMapClustererPrototype;

export {
    YMap,
    YMapContainer,
    YMapControl,
    YMapControlButton,
    YMapControls,
    YMapDefaultFeaturesLayer,
    YMapDefaultMarker,
    YMapDefaultSchemeLayer,
    YMapFeature,
    YMapListener,
    YMapMarker,
    YMapClusterer,
    clusterByGrid,
    YMapFeatureDataSource,
    YMapLayer,
    reactified
};

export type {
    BehaviorMapEventHandler,
    BehaviorType,
    DomEventHandler,
    DrawingStyle,
    Geometry,
    LngLat,
    LngLatBounds,
    MapEventUpdateHandler,
    Margin,
    YMapLocation,
    YMapLocationRequest,
    YMapMarkerProps,
    YMapProps
};
