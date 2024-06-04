import React from 'react';

interface NavbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function NavbarButton({IconComponent, ...buttonProps}: NavbarButtonProps) {
    return (
        <button {...buttonProps}>
            <IconComponent />
        </button>
    );
}

export default NavbarButton;
