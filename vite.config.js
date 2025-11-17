import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'fgdagama'; 


// https://vite.dev/config/
export default defineConfig({
  //base: `/${repoName}/`, 
  base: '/fgdagama/',
  plugins: [react()],
})
