import React, {useMemo} from 'react';
import {ReactComponent as InfoIcon} from '../../assets/info-icon.svg';
import {ReactComponent as RepairIcon} from '../../assets/repair-icon.svg';
import {ReactComponent as RouteIcon} from '../../assets/route-icon.svg';

interface ListButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconType: 'info' | 'repair' | 'route';
}

const iconTypeOption = {
    info: InfoIcon,
    repair: RepairIcon,
    route: RouteIcon
};

function ListButton({iconType, ...buttonProps}: ListButtonProps) {
    const ButtonIcon = useMemo(() => iconTypeOption[iconType], [iconType]);

    return (
        <button
            className="rounded-md border border-black bg-green-300 px-3 py-1 duration-100 hover:bg-green-500"
            {...buttonProps}
        >
            <ButtonIcon />
        </button>
    );
}

export default ListButton;
