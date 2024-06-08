import React from 'react';
import Item from './Item';

function List() {
    return (
        <div className="flex gap-x-5 overflow-auto px-5 pb-1">
            {[...new Array(3)].map((_, index) => (
                <Item key={index} />
            ))}
        </div>
    );
}

export default List;
