import React, {useMemo} from 'react';

interface SelectorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    position: keyof typeof positionOption;
    text: string;
    textColor?: keyof typeof textColorOption;
    isActive?: boolean;
}

const positionOption = {
    left: 'rounded-l-lg',
    center: 'rounded-none',
    right: 'rounded-r-lg'
} as const;

const textColorOption = {
    green: 'text-green-500',
    red: 'text-red-500',
    orange: 'text-orange-300',
    indigo: 'text-indigo-600',
    black: 'text-black'
} as const;

function SelectorButton({position, text, textColor = 'black', isActive = false, ...buttonProps}: SelectorButtonProps) {
    const activeStyle = useMemo(
        () =>
            isActive
                ? 'bg-active shadow-active text-white'
                : 'bg-white hover:bg-hover-active outline outline-1 -outline-offset-1 outline-gray-300',
        [isActive]
    );

    return (
        <button
            className={`${activeStyle} ${positionOption[position]} ${!isActive && textColorOption[textColor]} min-w-24 px-4 py-1 text-sm duration-100`}
            {...buttonProps}
        >
            {text}
        </button>
    );
}

export default SelectorButton;
