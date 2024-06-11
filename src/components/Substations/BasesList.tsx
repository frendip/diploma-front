import {useEffect, useRef} from 'react';
import {useGetBasesQuery} from '../../api/SubstationsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';
import BasesItem from './BasesItem';
import SkeletonItem from './SkeletonItem';

function BasesList() {
    const dispatch = useAppDispatch();

    const {status, activeSubstationId} = useAppSelector((state) => state.vinaigretteSlice);

    const {data, isLoading} = useGetBasesQuery(null);

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
                    {data?.data.map((base, index) => (
                        <BasesItem
                            ref={(el: HTMLDivElement) => (itemsRef.current[index] = el)}
                            key={index}
                            base={base}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default BasesList;
