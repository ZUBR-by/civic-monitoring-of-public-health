import {createApp, ref} from 'vue'
import FacilityMap from './facility-map.vue'


const region     = ref(null);
const district   = ref(null);
const mapEnabled = ref(false)
const view       = ref('list')

createApp({
    components: {
        facilities: FacilityMap
    },
    setup() {
        return {
            mapEnabled,
            enableMap() {
                mapEnabled.value = true;
                view.value       = 'map'
            },
            region,
            view,
            district
        }
    }
}).mount('#app')

