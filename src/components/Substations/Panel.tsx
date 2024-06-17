import {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as SearchIcon} from '../../assets/search-icon.svg';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {setActiveSubstation} from '../../store/slices/vinaigretteSlice';
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
    const {activeSubstationId, panelActiveType} = useAppSelector((state) => state.vinaigretteSlice);

    const onClickHandler = useCallback(() => {
        dispatch(setActiveSubstation(0));
    }, [dispatch]);

    return (
        <div className={`${externalStyles} flex flex-col gap-y-4 bg-white/85 pt-2`}>
            <div className="flex items-center gap-x-10 px-14">
                <div className="flex flex-1 gap-x-10">
                    <Type />
                    {panelActiveType === 'substations' && <Status className="flex-1" />}
                </div>

                {activeSubstationId !== 0 && (
                    <CommonButton
                        text={`Сбросить выбранную ${panelActiveType === 'substations' ? 'подстанцию' : 'базу'}`}
                        onClick={onClickHandler}
                    />
                )}
                {panelActiveType === 'substations' && (
                    <Link to={'/add-substation'}>
                        <CommonButton text={'Добавить подстанцию'} />
                    </Link>
                )}
                <div>
                    <label className="relative block">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <SearchIcon className="h-5 w-5" />
                        </span>
                        <input
                            className="block w-full rounded-lg border border-slate-300 bg-white py-1 pl-9 pr-3 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                            placeholder="Поиск..."
                            type="text"
                            name="search"
                        />
                    </label>
                </div>
            </div>
            {panelActiveType === 'substations' ? <List /> : <BasesList />}
        </div>
    );
}

export default Panel;
