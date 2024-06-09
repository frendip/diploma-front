import React from 'react';
import ContentLoader, {IContentLoaderProps} from 'react-content-loader';

function SkeletonItem(props: JSX.IntrinsicAttributes & IContentLoaderProps) {
    return (
        <ContentLoader
            className="rounded-lg bg-white shadow"
            speed={0.5}
            width={248}
            height={288}
            viewBox="0 0 248 288"
            backgroundColor="#ffffff"
            foregroundColor="#5932ea"
            {...props}
        >
            <circle cx="36" cy="39" r="24" />
            <rect x="85" y="18" rx="0" ry="0" width="109" height="18" />
            <rect x="86" y="44" rx="0" ry="0" width="84" height="18" />
            <rect x="30" y="100" rx="0" ry="0" width="180" height="40" />
            <rect x="30" y="160" rx="0" ry="0" width="180" height="40" />
            <rect x="30" y="220" rx="0" ry="0" width="180" height="40" />
        </ContentLoader>
    );
}

export default SkeletonItem;
