import React from 'react';
import {ReactComponent as SubstationRedIcon} from '../../assets/substation-red-icon.svg';
import {useGetCarRepairingSubstationQuery} from '../../api/CarsService';

interface EndAddressProps {
    carId: number;
}

function EndAddress({carId}: EndAddressProps) {
    const {data, isLoading} = useGetCarRepairingSubstationQuery(carId);

    return (
        <div className="flex items-center gap-x-5">
            <div className="basis-9">
                <SubstationRedIcon />
            </div>
            <div className="flex flex-col">
                <div className="font-medium">{data?.data.substation.name}</div>
                <div className="line-clamp-2">{data?.data.substation.address}</div>
                <div className="text-sm text-gray-500/85">{data?.data.substation.coordinates.join(', ')}</div>
            </div>
        </div>
    );
}

export default EndAddress;
