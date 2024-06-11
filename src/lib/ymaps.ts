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
    YMapControl
} = reactified.module(ymaps3);

const {YMapDefaultMarker} = reactified.module(YMapDefaultMarkerPrototype);

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
