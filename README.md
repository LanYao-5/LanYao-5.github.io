# LanYao-5.github.io

## 项目介绍

这是一个基于GitHub Pages的个人网站项目，采用暗黑基调与霓虹渐变风格设计。

### 设计特点

- **暗黑基调**：#0a0a0a 背景搭配霓虹渐变
  - 主色：#03fc90（青柠绿）60%透明度径向渐变
  - 辅色：#fc03f8（品红）30%透明度线性渐变
- **科技感背景**：15x15像素极细网格线与动态粒子效果
- **动态交互**：Apple式视差滚动、Hover状态特效
- **响应式设计**：适配移动端、平板和桌面设备

### 技术栈

- HTML5/CSS3/ES6+
- 纯静态页面设计
- 响应式断点：768px/1024px
- 外部依赖：霞鹜文楷字体

## 部署指南

### 本地开发

1. 克隆仓库到本地：
   ```
   git clone https://github.com/LanYao-5/LanYao-5.github.io.git
   ```

2. 使用任意HTTP服务器启动项目，例如：
   ```
   npx http-server
   ```

3. 在浏览器中访问 `http://localhost:8080` 预览效果

### GitHub Pages部署

1. 将代码推送到GitHub仓库的main分支
   ```
   git add .
   git commit -m "更新网站内容"
   git push origin main
   ```

2. 在GitHub仓库设置中启用GitHub Pages，选择main分支作为源

3. 访问 `https://LanYao-5.github.io` 查看部署效果

## 浏览器兼容性

- Chromium 90+
- Safari 15+

## 验证标准

- W3C HTML验证通过
- 移动优先的媒体查询策略
- 轻量化实现（总资源<500KB）