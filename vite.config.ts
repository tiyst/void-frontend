import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				// rewrite: (path) => path.replace(/^\/api/, ''),

				configure: (proxy, options) => {
					proxy.on('error', (err, _req, _res) => {
						console.log('error', err);
					});
					proxy.on('proxyReq', (proxyReq, req, _res) => {
						console.log('Request sent to target:', req.method, req.url);
					});
					proxy.on('proxyRes', (proxyRes, req, _res) => {
						console.log('Response received from target:', proxyRes.statusCode, req.url);
					});
				},
			},
		},
	},
	resolve: {
		alias: {
			'@styles': '/src/styles'
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@styles/colors.scss" as *;`
			}
		}
	}
});
