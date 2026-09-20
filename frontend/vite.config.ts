import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// --mode singlefile 时把 JS/CSS/数据全部内联，产出仓库根目录下的「价值观模拟器.html」，可直接双击打开
export default defineConfig(({ mode }) => {
  const single = mode === 'singlefile'
  return {
    plugins: [react(), ...(single ? [viteSingleFile()] : [])],
    base: './',
    build: single
      ? {
          outDir: '..',
          // outDir 是仓库根目录，绝不能清空
          emptyOutDir: false,
        }
      : {},
  }
})
