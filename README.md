# 个人简历网站

## 添加 PDF

- 「若有所思」放在 `documents/analysis/`。
- 「个人作品」放在 `documents/portfolio/`。

列表用文件名去掉 `.pdf` 作为标题，按路径和文件名顺序排列。可以用 `01-`、`02-` 这样的前缀调整顺序。访客点击条目后直接打开 PDF，可以用浏览器的返回按钮回到首页。

## 本地预览

增删或重命名 PDF 后，在项目目录执行 `node scripts/build-pdf-index.cjs`，再打开或刷新 `index.html`。该命令使用 Node.js 自带的模块。

## GitHub Pages

将 Pages 的发布来源设为 **Deploy from a branch**，选择 `main` 和 `/(root)`。GitHub Pages 的 Jekyll 构建会自动从两个目录生成 `pdf-index.json`。将 PDF 与代码提交并推送后，网站会在下一次构建时更新列表。
