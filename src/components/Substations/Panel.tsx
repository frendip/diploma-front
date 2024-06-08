import React from 'react';
import Type from './Type';
import Status from './Status';

interface PanelProps {
    className?: string;
}

function Panel({className: externalStyles}: PanelProps) {
    return (
        <div className={`${externalStyles} bg-white/85 pb-4 pt-2`}>
            <div className="flex items-center gap-x-10 px-20">
                <Type />
                <Status />
            </div>
        </div>
    );
}

export default Panel;
