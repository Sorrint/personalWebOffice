import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [
            react(), 
            svgr({
                exportAsDefault: true,
                svgrOptions: {
                    icon: true
                }
            }),
            visualizer({
                template: 'treemap', 
                open: true,
                gzipSize: true,
                brotliSize: true,
                filename: path.resolve(__dirname, './reports/bundle', 'analyse.html'), 
            })
        ],
        resolve: {
            alias: {
                '@app': path.resolve(__dirname, './src/app'),
                '@entities': path.resolve(__dirname, './src/entities'),
                '@features': path.resolve(__dirname, './src/features'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@shared': path.resolve(__dirname, './src/shared'),
                '@widgets': path.resolve(__dirname, './src/widgets')
            }
        },
        build: {
            commonjsOptions: {
                esmExternals: true,
            },
        },
        server: {
            host: '0.0.0.0',
            port: 5000
        },
        optimizeDeps: {
            exclude: ['fs', 'path', 'url']
        },
        define: {
            __SERVER_URI__: JSON.stringify(env.VITE_SERVER_URI)
        },
        css: {
            modules: {
                generateScopedName: (name, filename) => {
                    const module = filename.split('/').at(-1).split('.')[0]
                    return `${module}__${name}`
                }
            }
        },
        base: '/office'};
});
