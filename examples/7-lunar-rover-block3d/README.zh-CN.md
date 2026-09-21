# 月球车

[English](README.md) · [全部示例](../../README.zh-CN.md)

由车身、轮组和科学仪器构成的月球车装配。

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="月球车" width="640"></picture>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 1.67 MiB |
| [STEP](dist/models/main.step) | 0.93 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD。点击文件后用 GitHub 的 Download raw file 获取；完整克隆请使用 Git LFS。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/7-lunar-rover-block3d/main.code3d.js -f glb,step -o generated/7-lunar-rover-block3d
```
