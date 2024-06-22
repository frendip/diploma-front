import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {Substation} from '../../types/substations.types';
import CommonButton from '../UI/CommonButton';
import {Car} from '../../types/cars.types';

interface PanelProps {
    className?: string;
    bases: Substation[];
    setActiveBaseId: React.Dispatch<React.SetStateAction<number>>;
}
interface AddCar extends Omit<Car, 'car_id'> {}
function Panel({className: externalStyles, bases, setActiveBaseId}: PanelProps) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<AddCar>({
        defaultValues: {status: 'onBase', coordinates: [228, 228]}
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<AddCar> = (data) => {
        navigate('/');
    };

    return (
        <div className={`${externalStyles} flex flex-col items-center rounded-tr-2xl bg-white/85 pb-11 shadow`}>
            <div className="flex w-full border-b">
                <div
                    onClick={() => navigate('/add-substation')}
                    className="basis-1/2 cursor-pointer py-3 text-center font-medium"
                >
                    Новая подстанция
                </div>
                <div className="basis-1/2 cursor-pointer border-l bg-active py-3 text-center font-medium text-white">
                    Новая машина с ДГУ
                </div>
            </div>
            <div className="w-full px-11 pt-9">
                <form className="flex w-full flex-col items-center gap-y-7" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full rounded-xl border border-black/15 bg-neutral-100 px-5 py-5">
                        <input
                            className={`w-full bg-inherit placeholder:text-sm focus:outline-none ${errors.generator_name && 'placeholder:text-red-400'}`}
                            {...register('generator_name', {required: true})}
                            placeholder="Название генератора"
                        />
                        <div className="my-3 w-full border-t-2 border-dashed border-black/15"></div>

                        <input
                            type="number"
                            className={`w-full bg-inherit placeholder:text-sm focus:outline-none ${errors.generator_power && 'placeholder:text-red-400'}`}
                            {...register('generator_power', {required: true})}
                            placeholder="Мощность генератора (кВт)"
                        />
                        <div className="my-3 w-full border-t-2 border-dashed border-black/15"></div>

                        <input
                            className={`w-full bg-inherit placeholder:text-sm focus:outline-none ${errors.driver_name && 'placeholder:text-red-400'} text-left`}
                            {...register('driver_name', {required: true})}
                            placeholder="ФИО водителя"
                        />
                        <div className="my-3 w-full border-t-2 border-dashed border-black/15"></div>

                        <select
                            className={`w-full bg-inherit placeholder:text-sm focus:outline-none ${errors.driver_name && 'placeholder:text-red-400'} text-left`}
                            id="cars"
                            name="cars"
                            onChange={(ev) => setActiveBaseId(+ev.target.value)}
                        >
                            <option value="0" selected disabled hidden>
                                Определите базу
                            </option>
                            {bases.map((base) => (
                                <option key={base.substation_id} value={base.substation_id}>
                                    {base.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-13">
                        <CommonButton text="Добавить" className="px-9 py-3" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Panel;
