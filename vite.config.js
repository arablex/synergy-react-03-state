import react from '@vitejs/plugin-react'
import { defineConfig, transformWithOxc } from 'vite'

// Конфиг Vite. По заданию файлы компонентов называются App.js, Button.js и т.д.,
// поэтому разрешаем JSX внутри обычных .js-файлов из src (в CRA это работало «из коробки»).
const jsxInJs = () => ({
  name: 'jsx-in-js',
  enforce: 'pre',
  async transform(code, id) {
    if (!/\/src\/.*\.js$/.test(id)) return null
    return transformWithOxc(code, id, { lang: 'jsx', jsx: { runtime: 'automatic' } })
  },
})

export default defineConfig({
  plugins: [jsxInJs(), react()],
  optimizeDeps: {
    rolldownOptions: { moduleTypes: { '.js': 'jsx' } },
  },
})
