import {useLocation} from 'react-router-dom';

function DriverPage() {
    const {pathname} = useLocation();
    return <div>DriverPage {pathname}</div>;
}

export default DriverPage;
