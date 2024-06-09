import {ReactComponent as AddressIcon} from '../../assets/address-icon.svg';
import {ReactComponent as EnergyIcon} from '../../assets/energy-icon.svg';
import {ReactComponent as SubstationBlue} from '../../assets/substation-marker-blue.svg';
import {ReactComponent as TransformerIcon} from '../../assets/transformer-icon.svg';

import {Base} from '../../types/substations.types';

export interface BaseItemProps {
    base: Base;
}

function BasesItem({base}: BaseItemProps) {
    return (
        <div className={`flex h-72 cursor-pointer rounded-lg bg-white p-3 shadow`}>
            <div className="flex w-56 min-w-56 flex-col">
                <div className="mb-4 flex gap-x-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                        <SubstationBlue />
                    </div>
                    <div>
                        <div className="font-medium">{base.name}</div>
                        {/* <div className={`${statusColorOption[substation.status]}`}>
                            {translateOption[substation.status]}
                        </div> */}
                    </div>
                </div>
                <div className="ml-3 flex flex-1 flex-col gap-y-4">
                    <div className="flex gap-x-3">
                        <AddressIcon />
                        <div>
                            <div className="line-clamp-2 h-12">{base.address}</div>
                            <div className="text-sm text-gray-500/85">{base.coordinates.join(', ')}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <EnergyIcon />
                        <div>{base.power} кВт</div>
                    </div>
                    <div className="flex items-center gap-x-3">
                        <TransformerIcon />
                        <div>2 шт.</div>
                    </div>
                </div>
                {/* {substation.status === 'disabled' ? (
                <div className="self-center">
                    <CommonButton
                        onClick={() => onClickHandler(substation.substation_id)}
                        text="Вызвать генераторы"
                    />
                </div>
            ) : (
                ''
            )} */}
            </div>
            {/* {activeId === substation.substation_id &&
                (substation.status === 'disabled' ? (
                    <>
                        <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>
                        <GeneratorsList />
                    </>
                ) : (
                    <>
                        <div className="mx-3 h-full border-l-2 border-dashed border-gray-400/50"></div>{' '}
                        <CarsOnRoadList />
                    </>
                ))} */}
        </div>
    );
}

export default BasesItem;
