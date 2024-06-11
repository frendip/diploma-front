import React, {useEffect, useRef} from 'react';
import Item from './Item';
import {useGetSubstationsQuery} from '../../api/SubstationsService';
import SkeletonItem from './SkeletonItem';
import {useAppSelector} from '../../hooks/useAppSelector';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';

function List() {
    const dispatch = useAppDispatch();

    const {status, activeSubstationId} = useAppSelector((state) => state.vinaigretteSlice);
    const {data, isLoading} = useGetSubstationsQuery({status});

    const itemsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (activeSubstationId && data) {
            const activeIndex = data.data.findIndex((substation) => substation.substation_id === activeSubstationId);
            itemsRef?.current[activeIndex]?.scrollIntoView({
                behavior: 'smooth',
                inline: 'start'
            });
        }
    }, [activeSubstationId, data]);

    useEffect(() => {
        dispatch(setActiveSubstation(0));

        return () => {
            dispatch(setActiveSubstation(0));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <div className="mx-5 flex gap-x-5 overflow-auto pb-1 pt-px">
            {isLoading ? (
                <>
                    {[...new Array(5)].map((_, index) => (
                        <SkeletonItem key={index} />
                    ))}
                </>
            ) : (
                <>
                    {data?.data.map((substation, index) => (
                        <Item
                            ref={(el: HTMLDivElement) => (itemsRef.current[index] = el)}
                            key={index}
                            substation={substation}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default List;
