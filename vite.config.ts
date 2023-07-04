import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr({
        exportAsDefault: true,
        svgrOptions: {
            icon: true
        }
    }) ],
    resolve: {
        alias: {
            app: '/src/App',
            entities: '/src/entities',
            features: '/src/features',
            pages: '/src/pages',
            shared: '/src/shared',
            widgets: '/src/widgets'
        }
    },
    build: {
        commonjsOptions: {
            esmExternals: true
        
    }},
    server: {
        host: '0.0.0.0',
        port: 5000
    },
    base: '/office/'
});
