import {useGetBasesQuery} from '../../api/SubstationsService';
import BasesItem from './BasesItem';

function BasesList() {
    const {data, isLoading} = useGetBasesQuery(null);
    console.log(data?.data);

    return (
        <div className="mx-5 flex gap-x-5 overflow-auto pb-1 pt-px">
            {!isLoading && data?.data.map((base) => <BasesItem base={base} />)}
        </div>
    );
}

export default BasesList;
