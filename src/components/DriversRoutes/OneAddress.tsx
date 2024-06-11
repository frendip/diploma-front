import React from 'react';
import {ReactComponent as SubstationBlueIcon} from '../../assets/substation-blue-icon.svg';
import {useGetSubstationByIdQuery} from '../../api/SubstationsService';

interface OneAddressProps {
    substationId: number;
}

function OneAddress({substationId}: OneAddressProps) {
    const {data, isLoading} = useGetSubstationByIdQuery(substationId);

    return (
        <div className="flex items-center gap-x-5">
            <div className="basis-9">
                <SubstationBlueIcon />
            </div>
            <div className="flex flex-col">
                <div className="font-medium">{data?.data.name}</div>
                <div className="line-clamp-2">{data?.data.address}</div>
                <div className="text-sm text-gray-500/85">{data?.data.coordinates.join(', ')}</div>
            </div>
        </div>
    );
}

export default OneAddress;
