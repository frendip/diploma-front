import React, {useMemo} from 'react';

interface NavbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    isActive?: boolean;
}

function NavbarButton({IconComponent, isActive = false, ...buttonProps}: NavbarButtonProps) {
    const activeStyle = useMemo(() => (isActive ? 'bg-active shadow-active' : 'hover:bg-hover-active'), [isActive]);

    return (
        <button {...buttonProps} className={`${activeStyle} rounded-lg p-3 shadow`}>
            <IconComponent />
        </button>
    );
}

export default NavbarButton;
