import { createApp, ref } from 'vue'

const region = ref(null);

createApp({
    setup() {
        return {
            region
        }
    }
}).mount('#app')

