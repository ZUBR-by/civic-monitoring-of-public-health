import { createApp, ref } from 'vue'

const region = ref(null);
const district = ref(null);

createApp({
    setup() {
        return {
            region,
            district
        }
    }
}).mount('#app')

