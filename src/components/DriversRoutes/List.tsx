import React from 'react';
import Item from './Item';

interface ListProps {
    className?: string;
}

function List({className: externalStyles}: ListProps) {
    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 overflow-auto bg-white/85 px-4 py-9`}>
            {[...new Array(10)].map((_, index) => (
                <Item key={index} />
            ))}
        </div>
    );
}

export default List;
