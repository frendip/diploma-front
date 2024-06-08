import React from 'react';
import DriversRoutesItem from './DriversRoutesItem';

interface DriversRoutesListProps {
    className?: string;
}

function DriversRoutesList({className: externalStyles}: DriversRoutesListProps) {
    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 overflow-auto bg-white/85 px-4 py-9`}>
            {[...new Array(10)].map((_, index) => (
                <DriversRoutesItem key={index} />
            ))}
        </div>
    );
}

export default DriversRoutesList;
