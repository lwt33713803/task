
import Components from 'unplugin-vue-components/vite'
//::TODO 需要优化记着
export const VueComponentResolve = Components({
  dts: true,
  allowOverrides: true,
  deep: true
})
// export const functionResolve = 