
// tailwind.config.js
// 生成衍生颜色css变量名（可以按照你们项目与设计师敲定的方案进行修改）
function genSimilarColorsName(brandName) {
  return {
    lighter: `var(--${brandName}-lighter-color)`,
    light: `var(--${brandName}-light-color)`,
    DEFAULT: `var(--${brandName}-color)`,
    deep: `var(--${brandName}-deep-color)`,
    deeper: `var(--${brandName}-deeper-color)`
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  theme: {
    // ...
    // 修改Tailwind主题色配置，使用我们设计的这一套颜色
    colors: {
      white: '#fff',
      black: '#191919',
      transparent: 'transparent',
      // 直接使用css变量
      primary: genSimilarColorsName('primary'),
      info: genSimilarColorsName('info'),
      success: genSimilarColorsName('success'),
      warning: genSimilarColorsName('warning'),
      danger: genSimilarColorsName('danger')
    }
  },
  // ...
}
