import {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useSetSubstationMutation} from '../../api/SubstationsService';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActiveSubstation} from '../../store/slices/substationsFilterSlice';
import CommonButton from '../UI/CommonButton';
import BasesList from './BasesList';
import List from './List';
import Status from './Status';
import Type from './Type';

interface PanelProps {
    className?: string;
}

function Panel({className: externalStyles}: PanelProps) {
    const dispatch = useAppDispatch();
    const {activeId, panelActiveType} = useAppSelector((state) => state.substationsFilterSlice);
    const [setSubstation] = useSetSubstationMutation(undefined);

    const onClickHandler = useCallback(() => {
        dispatch(setActiveSubstation(0));
    }, [dispatch]);

    const onClickSetSubstation = useCallback(() => {
        setSubstation({
            coordinates: [37.6, 55.772222],
            address: 'Павлурия',
            status: 'waiting',
            name: 'Чмоня',
            power: 123
        });
    }, [setSubstation]);

    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 bg-white/85 pt-2`}>
            <div className="flex items-center justify-between gap-x-10 px-14">
                <Type />
                {panelActiveType === 'substations' && <Status className="flex-1" />}

                {activeId !== 0 && (
                    <CommonButton
                        text={`Сбросить выбранную ${panelActiveType === 'substations' ? 'подстанцию' : 'базу'}`}
                        onClick={onClickHandler}
                    />
                )}

                <Link to={'/add-substation'}>
                    <CommonButton text={'Добавить подстанцию'} />
                </Link>
            </div>
            {panelActiveType === 'substations' ? <List /> : <BasesList />}
        </div>
    );
}

export default Panel;
