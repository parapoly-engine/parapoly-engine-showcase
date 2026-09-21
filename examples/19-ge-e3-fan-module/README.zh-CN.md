# GE E³ 风扇组件

[English](README.md) · [全部示例](../../README.zh-CN.md)

用代码放样叶型的 32 叶片风扇组件，包含叶根及固定件。

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="GE E³ 风扇组件" width="640"></picture>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 45.39 MiB |
| [STEP](dist/models/main.step) | 72.29 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD。点击文件后用 GitHub 的 Download raw file 获取；完整克隆请使用 Git LFS。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/19-ge-e3-fan-module/main.code3d.js -f glb,step -o generated/19-ge-e3-fan-module --timeout 600000
```

## 参考与范围

[参考来源](https://ntrs.nasa.gov/) — 依据 NASA/GE E³ 参考几何重建；叶根和固定件包含教学推定尺寸，这是风扇组件，并非完整发动机。
