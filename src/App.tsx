import MapLayout from './components/MapLayout';

import './styles/style.css';

function App() {
    return (
        <div className="flex gap-x-4">
            <div className="w-50v h-50v">
                <MapLayout></MapLayout>
            </div>

            <div>OOOPS</div>
        </div>
    );
}

export default App;
