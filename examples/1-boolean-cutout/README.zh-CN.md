# 方体与球体差集

[English](README.md) · [全部示例](../../README.zh-CN.md)

用球体切开方体，从最简单的布尔运算开始。

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="方体与球体差集 CAD" width="220"></picture><br><strong>1. 方体与球体差集</strong></a><br>CAD<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout.glb">GLB</a> · <a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout.step">STEP</a> · <a href="main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="方体与球体差集 BMAX 64" width="220"></picture></a><br><strong>BMAX 64</strong><br>最长边 64 格<br>体素边长 ≈ 0.015625<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout-bmax-64.bmax">下载 BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="方体与球体差集 BMAX 32" width="220"></picture></a><br><strong>BMAX 32</strong><br>最长边 32 格<br>体素边长 ≈ 0.03125<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout-bmax-32.bmax">下载 BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="方体与球体差集 BMAX 16" width="220"></picture></a><br><strong>BMAX 16</strong><br>最长边 16 格<br>体素边长 ≈ 0.0625<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout-bmax-16.bmax">下载 BMAX 16</a></td>
  </tr>
</table>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout.glb) | 0.08 MiB |
| [STEP](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout.step) | 0.05 MiB |
| [BMAX 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout-bmax-64.bmax) | 0.52 MiB |
| [BMAX 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout-bmax-32.bmax) | 0.12 MiB |
| [BMAX 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/1-boolean-cutout-bmax-16.bmax) | 0.02 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD，BMAX 用于 Paracraft 静态彩色体素模型。BMAX 不保留精确曲面或透明材质。模型从固定版本的 Release 附件按需下载，不随仓库克隆下载。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/1-boolean-cutout/main.code3d.js -f glb,step -o generated/1-boolean-cutout
```

<!-- voxel-downloads:start -->
## Voxel GLB 下载

体素表面网格保留源基本颜色，不经过 BMAX RGB4 量化；居中与显示尺度遵循标准 BMAX 加载规则。原有 BMAX 缩略图不是这些 GLB 文件的预览。

- [Voxel GLB 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/1-boolean-cutout-voxel-64.glb) (9.61 MiB)
- [Voxel GLB 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/1-boolean-cutout-voxel-32.glb) (2.06 MiB)
- [Voxel GLB 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/1-boolean-cutout-voxel-16.glb) (0.40 MiB)
<!-- voxel-downloads:end -->
