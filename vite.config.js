// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  // ADD or UPDATE this line:
  base: '/',
  //
  plugins: [react()],
})