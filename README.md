# 重庆城投项目管理系统（演示版）

一个可直接双击 `index.html` 运行的零依赖静态演示框架，包含：

- PC 管理端：左侧导航 + 顶部导航 + 内容区
- APP 端：移动端顶部栏 + 内容区 + 底部导航
- 本地 Mock 数据：全部内置在 `assets/js/mock-data.js`
- 图表引擎：本地 `assets/vendor/echarts.min.js`（演示适配版，提供 ECharts 风格 API）

## 运行方式

直接双击以下文件即可：

- `C:\Users\44733\Documents\项目-v10\index.html`

## 目录结构

```text
index.html
assets/
  css/styles.css
  js/mock-data.js
  js/app.js
  vendor/echarts.min.js
```

## 当前内置能力

- PC 端完整菜单骨架
- APP 端首页 / 消息 / 审批 / 我的
- Hash 路由跳转
- 统一卡片、表格、状态标签、时间线、图表容器
- 多模块通用页面骨架，可继续逐页深化

## 后续扩展建议

1. 按模块将通用页面替换为专项高保真业务页
2. 为每个模块补充筛选条件、详情抽屉、审批弹窗
3. 将演示图表适配器替换为正式版 ECharts dist 文件
