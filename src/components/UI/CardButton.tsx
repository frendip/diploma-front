import React from 'react';

interface CardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function CardButton({IconComponent, ...buttonProps}: CardButtonProps) {
    return (
        <button {...buttonProps} className="rounded-lg bg-[#F7F5FF] p-1 duration-100 hover:bg-[#eee9ff]">
            <IconComponent />
        </button>
    );
}

export default CardButton;
