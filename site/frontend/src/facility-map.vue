<template>
    <div id="facility-location" style="width: 100%;height: 100%;">
        <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content" v-if="featureList.length > 0">
                <ul>
                    <li v-for="f of featureList">
                        <a :href="'/facility/' + f.id">{{f.name}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 290px;
    z-index: 4;
}

.ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}

.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}

.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}

.ol-popup-closer:after {
    content: "✖";
}

@media (max-width: 820px) {
    .ol-zoom.ol-unselectable.ol-control {
        display: none;
    }
}

.ol-zoom.ol-unselectable.ol-control {
    margin-top: 10px;
}
</style>
<script setup>
import 'ol/ol.css';
import Map                     from "ol/Map";
import TileLayer               from "ol/layer/Tile";
import OSM                     from "ol/source/OSM";
import View                    from "ol/View";
import {fromLonLat}            from "ol/proj";
import VectorLayer             from "ol/layer/Vector";
import VectorSource            from "ol/source/Vector";
import Feature                 from "ol/Feature";
import Point                   from "ol/geom/Point";
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style,
    Text,
}                              from 'ol/style';
import {Cluster}               from "ol/source"
import {Overlay}         from "ol";
import {onMounted, ref,} from "vue";

const featureList    = ref([]);

const source     = new VectorSource({
    features: features.map(i => new Feature({
        id: i.id,
        name: i.name,
        geometry: new Point(fromLonLat(i.geometry.coordinates)),
    })),
});

const clusterSource = new Cluster({
    source: source,
});
let styleCache      = {};
const clusters      = new VectorLayer({
    source: clusterSource,
    style : function (feature) {
        const size = feature.get('features').length;
        let style  = styleCache[size];
        if (!style) {
            style            = new Style({
                image: new CircleStyle({
                    radius: 15,
                    stroke: new Stroke({
                        color: '#fff',
                    }),
                    fill  : new Fill({
                        color: '#3399CC',
                    }),
                }),
                text : new Text({
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

onMounted(() => {
    let container    = document.getElementById('popup');
    let closer       = document.getElementById('popup-closer');
    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    const overlay  = new Overlay({
        element         : container,
        autoPan         : true,
        autoPanAnimation: {
            duration: 250,
        },
    });
    setTimeout(() => {
        let map = new Map({
            layers  : [
                new TileLayer({
                    source: new OSM(),
                }),
                clusters
            ],
            overlays: [overlay],
            target  : 'facility-location',
            view    : new View({
                center: fromLonLat([27.7834, 53.7098]),
                zoom  : 7.5,
            }),
        });
        map.on('singleclick', (evt) => {
            let coordinate = evt.coordinate;
            map.forEachFeatureAtPixel(evt.pixel, baseFeature => {
                let f = baseFeature.getProperties();
                if (f.features) {
                    if (f.features.length === 0) {
                        return;
                    }
                    featureList.value = f.features.map(t => ({
                        id: t.getProperties().id,
                        name: t.getProperties().name,
                    }));
                } else {
                    let props = baseFeature.getProperties();
                    featureList.value = [{
                        id        : props.id,
                        properties: props.name
                    }];
                }
                overlay.setPosition(coordinate);
            })
        });
    }, 10)

})

</script>
