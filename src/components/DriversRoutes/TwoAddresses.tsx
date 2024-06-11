import React from 'react';
import {ReactComponent as SubstationBlueIcon} from '../../assets/substation-blue-icon.svg';
import {ReactComponent as SubstationRedIcon} from '../../assets/substation-red-icon.svg';
import {useGetCarRouteQuery} from '../../api/CarsService';

interface TwoAddressesProps {
    carId: number;
}

function TwoAddresses({carId}: TwoAddressesProps) {
    const {data, isLoading} = useGetCarRouteQuery(carId);

    return (
        <div className="flex flex-col">
            <div className="flex gap-x-5">
                <div className="basis-9 self-end">
                    <SubstationBlueIcon />
                </div>
                <div className="flex flex-col">
                    <div className="font-medium">{data?.data.start_substation.name}</div>
                    <div className="line-clamp-1">{data?.data.start_substation.address}</div>
                    <div className="text-sm text-gray-500/85">{data?.data.start_substation.coordinates.join(', ')}</div>
                </div>
            </div>
            <div className="ml-4 h-7 border-l-2 border-dashed border-gray-400/50" />
            <div className="flex gap-x-5">
                <div className="basis-9">
                    <SubstationRedIcon />
                </div>
                <div className="flex flex-col">
                    <div className="font-medium">{data?.data.end_substation.name}</div>
                    <div className="line-clamp-1">{data?.data.end_substation.address}</div>
                    <div className="text-sm text-gray-500/85">{data?.data.end_substation.coordinates.join(', ')}</div>
                </div>
            </div>
        </div>
    );
}

export default TwoAddresses;
