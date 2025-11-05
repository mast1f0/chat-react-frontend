import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
	plugins: [react(), tailwindcss()],
	css: {
    postcss: './postcss.config.js'
  	},
	server: {
		port: 5173,
		proxy: {
			'/api/v1/auth': {
				target: 'http://127.0.0.1:8090',
				changeOrigin: true
			},
			'/api/v1/users': {
				target: 'http://127.0.0.1:8090',
				changeOrigin: true
			},
			'/api/v1': {
				target: 'http://127.0.0.1:8091',
				changeOrigin: true
			},
			'/api': {
				target: 'http://localhost:8080',
				changeOrigin: true
			}
		}
	}
})