import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const stage = 'production'
const baseUrl = stage == 'production' ? "/FE-project-prada-produk-rohani/" : '/'

// https://vitejs.dev/config/
export default defineConfig({
  base: baseUrl,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
