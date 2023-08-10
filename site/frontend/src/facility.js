import 'ol/ol.css';
import Map               from 'ol/Map';
import OSM               from 'ol/source/OSM';
import TileLayer         from 'ol/layer/Tile';
import View              from 'ol/View';
import {fromLonLat}      from 'ol/proj';
import Feature           from 'ol/Feature';
import Point             from 'ol/geom/Point'
import VectorLayer       from 'ol/layer/Vector';
import VectorSource      from 'ol/source/Vector';
import {Icon, Style}     from 'ol/style';

if (facilityLocation) {
    setTimeout(() => {
        let map      = new Map({
            layers: [
                new TileLayer({
                    source: new OSM(),
                })],
            target: 'facility-location',
            view  : new View({
                center: fromLonLat(facilityLocation.coordinates),
                zoom  : 15.5,
            }),
        });
        const marker = new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point(fromLonLat(facilityLocation.coordinates)),
                    }),
                ],
            }),
            style : new Style({
                image: new Icon({
                    anchor: [0.7, 1],
                    scale : 0.3,
                    src   : '/imgs/marker.png',
                }),
            }),
        });

        map.addLayer(marker);
    }, 1000)
}

