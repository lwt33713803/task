//主题枚举
const enum themes {
  dark = "dark",
  light = "light",
}

const enum langs {
  cn = "zh-cn",
  en = "en",
}

// 默认系统设置 接口
interface DefaultSettings {
  /**
   * 系统title
   */
  title: string;

  /**
   * 是否显示设置
   */
  showSettings: boolean;
  /**
   * 是否显示多标签导航
   */
  tagsView: boolean;
  /**
   *是否固定头部
   */
  fixedHeader: boolean;
  /**
   * 是否显示侧边栏Logo
   */
  sidebarLogo: boolean;
  /**
   * 导航栏布局
   */
  layout: string;
  /**
   * 主题模式
   */
  theme: themes;
  /**
   * 布局大小
   */
  size: "default" | "large" | "small";

  /**
   * 语言
   */
  language: langs;
}

const defaultSettings: DefaultSettings = {
  title: "FMS ADMIN",
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  sidebarLogo: true,
  layout: "left",
  theme: themes.dark,
  size: "default",
  language: langs.cn,
};

export default defaultSettings;
