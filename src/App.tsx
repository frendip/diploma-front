import {YMap, YMapDefaultSchemeLayer} from './lib/ymaps';

function App() {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <YMap location={{center: [37, 55], zoom: 9}}>
                <YMapDefaultSchemeLayer />
            </YMap>
        </div>
    );
}

export default App;
