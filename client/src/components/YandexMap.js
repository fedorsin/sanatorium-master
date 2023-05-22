import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';


let latitude = 55.751574;
let longitude = 37.573856;
const YandexMap = () => (
    <YMaps>
        <div>
            My awesome application with maps!
            <Map defaultState={{ center: [latitude, longitude], zoom: 9 }}>
                <Placemark geometry={[latitude, longitude]} />
            </Map>
        </div>
    </YMaps>

);

export default YandexMap;