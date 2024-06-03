import React from 'react';
import ListButton from './UI/ListButton';

function SubstationItem() {
    return (
        <div className="flex items-center rounded-xl bg-slate-600 p-2">
            <div className="mr-3 h-6 w-6 rounded-full bg-[#5DE763]" />

            <div className="flex grow flex-col">
                <div className="text-wrap text-white">Test name substation</div>
                <div className="text-sm font-light text-slate-300/60">Test status substation</div>
            </div>

            <div className="grow text-xs font-thin text-white">БАЗА</div>

            <div className="flex gap-x-1">
                <ListButton iconType="repair" />
                <ListButton iconType="info" />
            </div>
        </div>
    );
}

export default SubstationItem;
