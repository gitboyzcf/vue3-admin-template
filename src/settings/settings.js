let globalSettings = {
  // 应用
  app: {
    /**
     * 主题
     * default 默认
     * vue-cli Vue CLI 风格
     * gitee 码云风格
     * freshness 清新
     * elegant 素雅
     * pure-white 纯白
     */
    theme: "default",
    // elementUI 组件默认尺寸，支持：large、default、small
    componentSize: "default",
    // TODO 默认语言，留空则跟随系统（未实现，有空再说）
    defaultLang: "",
    /**
     * 是否开启权限功能，权限功能提供以下鉴权支持：
     * 1、路由鉴权
     * 2、鉴权组件：<Auth></Auth>、<AuthAll></AuthAll>
     * 3、鉴权指令：v-auth、v-auth-all
     * 4、鉴权函数：this.$auth()、this.$authAll()
     */
    enablePermission: true,
    // 是否开启后端返回路由数据
    enableBackendReturnRoute: false,
    // 是否开启载入进度条
    enableProgress: true,
    // 是否开启动态标题
    enableDynamicTitle: true,
    // localStorage sessionStorage 前缀
    storagePrefix: "standard_admin",
    // 是否开启页面水印
    enableWatermark: false,
    // 是否在非开发环境开启错误日志功能，具体业务代码在 ./util/error.log.js
    enableErrorLog: false,
  },
  // 布局
  layout: {
    /**
     * 页宽模式，当设置为非 adaption 时，请去 ./src/assets/styles/resources/layout.scss 里设置 $g-app-width
     * adaption 自适应
     * adaption-min-width 自适应（有最小宽度）
     * center 定宽居中
     * center-max-width 定宽居中（有最大宽度）
     */
    widthMode: "adaption",
    // 是否开启移动端适配，开启后当页面宽度小于 992px 时自动切换为移动端展示
    enableMobileAdaptation: true,
  },
  // 导航栏
  menu: {
    /**
     * 导航栏模式
     * side 侧边栏模式（含主导航）
     * head 顶部模式
     * single 侧边栏模式（无主导航）
     * only-side 侧边栏精简模式
     * only-head 顶部精简模式
     */
    menuMode: "side",
    /**
     * 导航栏风格
     * card 卡片
     * radius 圆角
     * arrow 箭头
     */
    menuStyle: "card",
    // 切换主导航同时跳转页面
    switchMainMenuAndPageJump: true,
    // 次导航只保持一个子项的展开
    subMenuUniqueOpened: true,
    // 次导航只有一个导航时自动隐藏
    subMenuOnylOneHide: true,
    // 次导航是否收起
    subMenuCollapse: false,
  },
  // 工具栏
  toolbar: {
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: true,
    // 是否开启面包屑导航
    enableBreadcrumb: true,
    // 是否开启导航搜索
    enableNavSearch: true,
    // 是否开启通知中心
    enableNotification: true,
    // 是否开启全屏
    enableFullscreen: true,
    // 是否开启页面刷新
    enablePageReload: true,
    // 是否开启应用配置（建议在生产环境关闭）
    enableAppSetting: true,
  },
  // 底部版权
  copyright: {
    // 是否开启，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
    enable: false,
    // 版权信息配置，格式为：Copyright © [dates] <company>, All Rights Reserved
    dates: "2020-2022",
    company: "后台管理",
    website: "",
  },
};

export default globalSettings;
