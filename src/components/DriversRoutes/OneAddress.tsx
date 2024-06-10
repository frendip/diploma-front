import React from 'react';
import {ReactComponent as SubstationBlueIcon} from '../../assets/substation-blue-icon.svg';
import type {Substation} from '../../types/substations.types';

interface OneAddressProps {
    substation: Substation;
}

function OneAddress({substation}: OneAddressProps) {
    return (
        <div className="flex items-center gap-x-5">
            <SubstationBlueIcon />
            <div className="flex flex-col">
                <div className="font-medium">{substation.name}</div>
                <div className="line-clamp-2">{substation.address}</div>
                <div className="text-sm text-gray-500/85">{substation.coordinates.join(', ')}</div>
            </div>
        </div>
    );
}

export default OneAddress;
