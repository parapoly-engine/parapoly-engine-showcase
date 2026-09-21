# 编织竹椅

[English](README.md) · [全部示例](../../README.zh-CN.md)

竹制框架配合立体交织纸绳、弯曲横撑和周边绕绳。

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="编织竹椅" width="640"></picture>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 381.42 MiB |
| [STEP](dist/models/main.step) | 130.34 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD。点击文件后用 GitHub 的 Download raw file 获取；完整克隆请使用 Git LFS。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/10-woven-bamboo-chair/main.code3d.js -f glb,step -o generated/10-woven-bamboo-chair --timeout 600000
```
