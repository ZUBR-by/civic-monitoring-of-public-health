import {createApp, ref, watch} from 'vue'
import 'ol/ol.css';
import Map                from "ol/Map";
import TileLayer          from "ol/layer/Tile";
import OSM                from "ol/source/OSM";
import View               from "ol/View";
import {fromLonLat}       from "ol/proj";
import VectorLayer        from "ol/layer/Vector";
import VectorSource       from "ol/source/Vector";
import Feature            from "ol/Feature";
import Point                       from "ol/geom/Point";
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style,
    Text,
} from 'ol/style';
import {Cluster}                   from "ol/source"
const region = ref(null);
const district = ref(null);
const mapEnabled = ref(false)
const view  = ref('list')


createApp({
    setup() {
        watch(mapEnabled, (value) => {
            if (!value) {
                return;
            }
            setTimeout(() => {
                const source = new VectorSource({
                    features: features.map(i => new Feature({
                        geometry: new Point(fromLonLat(i.geometry.coordinates)),
                    })),
                });

                const clusterSource = new Cluster({
                    source: source,
                });
                let styleCache = {};
                const clusters = new VectorLayer({
                    source: clusterSource,
                    style: function (feature) {
                        const size = feature.get('features').length;
                        let style = styleCache[size];
                        if (!style) {
                            style = new Style({
                                image: new CircleStyle({
                                    radius: 10,
                                    stroke: new Stroke({
                                        color: '#fff',
                                    }),
                                    fill: new Fill({
                                        color: '#3399CC',
                                    }),
                                }),
                                text: new Text({
                                    text: size.toString(),
                                    fill: new Fill({
                                        color: '#fff',
                                    }),
                                }),
                            });
                            styleCache[size] = style;
                        }
                        return style;
                    },
                });
                new Map({
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                        clusters
                    ],
                    target: 'facility-location',
                    view  : new View({
                        center: fromLonLat([27.7834, 53.7098]),
                        zoom  : 7.5,
                    }),
                });

            }, 100)
        })
        return {
            enableMap(){
                mapEnabled.value = true;
                view.value = 'map'
            },
            region,
            view,
            district
        }
    }
}).mount('#app')

