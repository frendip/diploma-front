import React from 'react';
import Type from './Type';
import Status from './Status';
import List from './List';

interface PanelProps {
    className?: string;
}

function Panel({className: externalStyles}: PanelProps) {
    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 bg-white/85 pt-2`}>
            <div className="flex items-center gap-x-10 px-20">
                <Type />
                <Status />
            </div>
            <List />
        </div>
    );
}

export default Panel;
