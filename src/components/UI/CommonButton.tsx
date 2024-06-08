import React from 'react';

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

function CommonButton({text, ...buttonProps}: CommonButtonProps) {
    return (
        <button
            {...buttonProps}
            className="rounded-lg bg-active px-3 py-1 text-sm text-white outline-1 -outline-offset-1 outline-active duration-100 hover:bg-active/85 disabled:bg-white disabled:text-black disabled:outline disabled:hover:bg-white"
        >
            {text}
        </button>
    );
}

export default CommonButton;
