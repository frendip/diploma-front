import React, {useMemo} from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    size?: keyof typeof sizeOption;
    variant?: keyof typeof variantOption;
    isActive?: boolean;
}

const variantOption = {
    primary: 'hover:bg-hover-active shadow',
    secondary: 'bg-[#F7F5FF] hover:bg-[#eee9ff]'
};

const sizeOption = {
    small: 'p-1',
    large: 'p-3'
};

function IconButton({
    IconComponent,
    size = 'small',
    variant = 'primary',
    isActive = false,
    ...buttonProps
}: IconButtonProps) {
    const activeStyle = useMemo(() => {
        if (isActive) {
            if (variant === 'primary') {
                return 'bg-active shadow-active hover:!bg-active';
            }
        }
    }, [variant, isActive]);

    return (
        <button
            {...buttonProps}
            className={`${activeStyle} ${variantOption[variant]} ${sizeOption[size]} rounded-lg duration-100`}
        >
            <IconComponent />
        </button>
    );
}

export default IconButton;
