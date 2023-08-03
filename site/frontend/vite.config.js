import {defineConfig}        from 'vite'
import vue                   from '@vitejs/plugin-vue'
import path                  from 'path'

export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '~/' : `${path.resolve(__dirname, 'src')}/`,
            'vue': 'vue/dist/vue.esm-bundler.js'
        }
    },
    build  : {
        manifest     : true,
        rollupOptions: {
            input: [
                'src/facility_list.js'
            ]
        },
        outDir       : './../assets/generated'
    }
})
