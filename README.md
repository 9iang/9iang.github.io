# 个人电子简历

这个静态网站可以直接部署到 GitHub Pages，无需安装依赖或构建。解压后双击 `index.html` 预览。

## 修改页面内容

1. 双击 `edit.html`。填写页面标题、个人资料和联系方式。在「游戏体验拆解」和「作品集介绍」中更改栏目标题、添加或移除文档，并填入每份文档的标题和链接。
2. 将照片放入 `assets`，在编辑页填入类似 `./assets/photo.jpg` 的相对路径。用你的 PDF 替换 `assets/resume.pdf`，保持这个文件路径，并在编辑页填写访客下载时看到的文件名。
3. 点击「导出配置文件」，用下载的 `resume.config.js` 替换项目里的同名文件。刷新 `index.html` 检查改动。也可以直接用编辑器修改 `resume.config.js`。

初始资料、文档标题和 PDF 都是示例。云文档链接留空时，首页会显示「待添加链接」。分享给招聘方前，可以在无痕窗口确认文档的访问权限。GitHub Pages 上展示的资料和 PDF 可被访客访问。

## 发布到 GitHub Pages

1. 将这个文件夹里的内容上传到 GitHub 仓库根目录，确保根目录有 `index.html`、`resume.config.js` 和 `assets` 文件夹。使用 Git 命令或网页上传时一并保留 `.nojekyll`。
2. 在仓库的 **Settings → Pages** 中，将 **Source** 选为 **Deploy from a branch**，选择上传文件的分支（通常是 `main`）和 **`/(root)`**，然后保存。
3. 发布后，打开 Pages 设置里显示的网址。确认云文档能打开，点击「下载个人简历」能直接下载你的 PDF。更新资料后，把更新的文件提交到同一分支即可。

[GitHub Pages 发布源配置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

<details>
<summary>首页配图的生成提示词</summary>

`assets/hero.webp` 由内置 ImageGen 生成。

> Stylized concept art for the right half of a Chinese game designer portfolio's dark navy hero panel. Square 1:1 crop. An elegant high-end 3D isometric miniature level design blockout: cobalt-blue geometric platforms, ascending stairs and a luminous warm amber checkpoint cube floating above the highest step. The whole object sits on a thin translucent blue square grid plane, with one subtle dotted route and very fine technical lines. Oblique top-down studio angle, restrained volumetric cobalt light, matte surfaces, premium clean art direction, perfectly readable silhouette, visual weight centered. Deep uniform near-black midnight navy background #111a30 at all edges, minimal and quiet negative space at edges for blending. No people, no buildings, no text, no letters, no labels, no interface, no logos, no watermark.

</details>
