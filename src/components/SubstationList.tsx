import React from 'react';
import SubstationItem from './SubstationItem';

interface SubstationListProps {
    className?: string;
}

function SubstationList(props: SubstationListProps) {
    return (
        <div className={`${props.className} flex flex-col`}>
            <div className="pb-3 text-2xl font-medium text-white">Подстанции</div>
            <div className="mb-2 flex h-full flex-col gap-y-2 overflow-auto">
                {[...new Array(10)].map((val) => (
                    <SubstationItem />
                ))}
            </div>
        </div>
    );
}

export default SubstationList;
