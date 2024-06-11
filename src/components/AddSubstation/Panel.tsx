import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {useLazyGetAddressFromCoordinatesQuery, useSetSubstationMutation} from '../../api/SubstationsService';
import {LngLat} from '../../lib/ymaps';
import {Substation} from '../../types/substations.types';
import CommonButton from '../UI/CommonButton';

interface PanelProps {
    className?: string;
    coordinates: LngLat;
}
interface AddSubstation extends Omit<Substation, 'substation_id'> {}
function Panel({className: externalStyles, coordinates}: PanelProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
        setValue
    } = useForm<AddSubstation>({
        defaultValues: {status: 'active'}
    });

    const navigate = useNavigate();
    const [setSubstation] = useSetSubstationMutation(undefined);
    const [getAddress] = useLazyGetAddressFromCoordinatesQuery();

    const onSubmit: SubmitHandler<AddSubstation> = (data) => {
        setSubstation(data);
        navigate('/');
    };

    useEffect(() => {
        const fetchAddress = async () => {
            console.log(coordinates);
            const data = await getAddress({coordinates});
            setValue('address', data?.data.data);
            setValue('coordinates', coordinates);
        };
        fetchAddress();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coordinates[0], coordinates[1], getAddress]);
    return (
        <div
            className={`${externalStyles} flex flex-col items-center rounded-tr-2xl bg-white/85 px-11 pb-11 pt-6 shadow`}
        >
            <div className="text-base font-semibold">Добавление новой подстанции</div>
            <div className="w-full pt-9">
                <form className="flex w-full flex-col items-center gap-y-7" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full rounded-xl border border-black/15 bg-neutral-100 px-5 py-5">
                        <input
                            className={`w-full bg-inherit placeholder:text-sm focus:outline-none ${errors.name && 'placeholder:text-red-400'}`}
                            {...register('name', {required: true})}
                            placeholder="Название"
                        />
                        <div className="my-3 w-full border-t-2 border-dashed border-black/15"></div>

                        <input
                            className={`w-full bg-inherit placeholder:text-sm focus:outline-none ${errors.address && 'placeholder:text-red-400'} text-left`}
                            {...register('address', {required: true})}
                            placeholder="Адрес"
                            disabled
                            style={{direction: 'rtl'}}
                        />
                        <div className="my-3 w-full border-t-2 border-dashed border-black/15"></div>

                        <input
                            className={`w-full bg-inherit placeholder:text-sm focus:outline-none ${errors.power && 'placeholder:text-red-400'}`}
                            {...register('power', {required: true})}
                            placeholder="Мощность потребителей"
                        />
                    </div>

                    <div className="pt-13">
                        <CommonButton text="Создать" className="px-9 py-3" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Panel;
