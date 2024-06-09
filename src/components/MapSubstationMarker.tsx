import type {YMapMarkerProps} from '../lib/ymaps';
import {YMapMarker} from '../lib/ymaps';
import {ReactComponent as SubstationBlue} from '../assets/substation-marker-blue.svg';
import {ReactComponent as SubstationRed} from '../assets/substation-marker-red.svg';
import {ReactComponent as SubstationYellow} from '../assets/substation-marker-yellow.svg';
import {ReactComponent as SubstationGreen} from '../assets/substation-marker-green.svg';
import {ReactComponent as SubstationBlueActive} from '../assets/substation-marker-blue-active.svg';
import {ReactComponent as SubstationRedActive} from '../assets/substation-marker-red-active.svg';
import {ReactComponent as SubstationYellowActive} from '../assets/substation-marker-yellow-active.svg';
import {ReactComponent as SubstationGreenActive} from '../assets/substation-marker-green-active.svg';
import React, {useMemo} from 'react';

interface MapSubstationMarkerProps extends YMapMarkerProps {
    color: keyof typeof substationColorOption;
    isActive?: boolean;
}

const substationColorOption = {
    red: SubstationRed,
    blue: SubstationBlue,
    yellow: SubstationYellow,
    green: SubstationGreen
};

const substationActiveColorOption = {
    red: SubstationRedActive,
    blue: SubstationBlueActive,
    yellow: SubstationYellowActive,
    green: SubstationGreenActive
};

function MapSubstationMarker({color, isActive = false, ...markerProps}: MapSubstationMarkerProps) {
    const SubstationIcon = useMemo(() => {
        if (isActive) {
            return substationActiveColorOption[color];
        } else {
            return substationColorOption[color];
        }
    }, [color, isActive]);

    return (
        <YMapMarker {...markerProps}>
            <div className={`relative -translate-x-2/4 -translate-y-full cursor-pointer`}>
                <SubstationIcon />
            </div>
        </YMapMarker>
    );
}

export default MapSubstationMarker;
