import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  exclude: ['node_modules', '.git', '.github', '.husky', '.vscode', 'build', 'dist', 'mock', 'public', 'types', './stats.html'],
  presets: [presetUno({ dark: 'class' }), presetAttributify()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
		['f-c-s', 'flex justify-center items-start'],
    ['flex-col', 'flex flex-col'],
		['flex-row','flex flex-row'],
		['flex-center', 'justify-center items-center'],
		///登录页面
		['login-container','wh-full grid grid-cols-2 overflow-hidden min-w-1440px'],
		['fms-input','h-[48px] !text-[14px] font-100'],
		['fms-button-login','!h-[48px] w-full b-0 font-700 !text-[14px]']
  ],
  rules: [
    [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    ['card-shadow', { 'box-shadow': '0 0px 15px 0  rgba(140,152,164,0.15)'}],
		['login-button-shadow',{'box-shadow':'0px 4px 20px rgba(55, 125, 255, 0.4)'}]
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      primary_hover: 'var(--primary-color-hover)',
      primary_pressed: 'var(--primary-color-pressed)',
      primary_active: 'var(--primary-color-active)',
      info: 'var(--info-color)',
      info_hover: 'var(--info-color-hover)',
      info_pressed: 'var(--info-color-pressed)',
      info_active: 'var(--info-color-active)',
      success: 'var(--success-color)',
      success_hover: 'var(--success-color-hover)',
      success_pressed: 'var(--success-color-pressed)',
      success_active: 'var(--success-color-active)',
      warning: 'var(--warning-color)',
      warning_hover: 'var(--warning-color-hover)',
      warning_pressed: 'var(--warning-color-pressed)',
      warning_active: 'var(--warning-color-active)',
      error: 'var(--error-color)',
      error_hover: 'var(--error-color-hover)',
      error_pressed: 'var(--error-color-pressed)',
      error_active: 'var(--error-color-active)',
      dark: '#18181c',
    },
  },
})
