import Map from '../components/Substations/Map';
import Panel from '../components/Substations/Panel';

function SubstationsPage() {
    return (
        <>
            <Panel className="absolute bottom-0 left-0 right-0 z-50 h-substations-panel" />
            <Map className="absolute bottom-0 left-0 right-0 top-0" />
        </>
    );
}

export default SubstationsPage;
