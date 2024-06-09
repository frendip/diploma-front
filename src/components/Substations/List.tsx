import React from 'react';
import Item from './Item';
import {useGetSubstationsQuery} from '../../api/SubstationsService';
import SkeletonItem from './SkeletonItem';

function List() {
    const {data, isLoading} = useGetSubstationsQuery(null);

    return (
        <div className="flex gap-x-5 overflow-auto px-5 pb-1">
            {isLoading ? (
                <>
                    {[...new Array(5)].map((_, index) => (
                        <SkeletonItem key={index} />
                    ))}
                </>
            ) : (
                <>{data?.data.map((substation, index) => <Item key={index} substation={substation} />)}</>
            )}
        </div>
    );
}

export default List;
