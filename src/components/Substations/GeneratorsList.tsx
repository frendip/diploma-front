import React from 'react';
import GeneratorsItem from './GeneratorsItem';

function GeneratorsList() {
    return (
        <div className="flex flex-col gap-y-3 overflow-y-auto overflow-x-hidden">
            {[...new Array(30)].map((_, index) => (
                <GeneratorsItem key={index} />
            ))}
        </div>
    );
}

export default GeneratorsList;
