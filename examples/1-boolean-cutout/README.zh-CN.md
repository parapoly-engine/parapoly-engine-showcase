# 方体与球体差集

[English](README.md) · [全部示例](../../README.zh-CN.md)

用球体切开方体，从最简单的布尔运算开始。

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="方体与球体差集" width="640"></picture>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 0.08 MiB |
| [STEP](dist/models/main.step) | 0.05 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD。点击文件后用 GitHub 的 Download raw file 获取；完整克隆请使用 Git LFS。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/1-boolean-cutout/main.code3d.js -f glb,step -o generated/1-boolean-cutout
```
