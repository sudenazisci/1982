
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  root: '.',

  server: {
    port: 3000,
    open: true
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        departed: resolve(process.cwd(), 'departed.html'),
        membership: resolve(process.cwd(), 'membership.html'),
        bylaws: resolve(process.cwd(), 'bylaws.html')
      }
    }
  }
})
