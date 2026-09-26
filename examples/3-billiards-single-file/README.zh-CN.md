# 完整台球桌

[English](README.md) · [全部示例](../../README.zh-CN.md)

包含六个球袋、台呢、木框和四条桌腿的完整台球桌。

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="完整台球桌 CAD" width="220"></picture><br><strong>3. 完整台球桌</strong></a><br>CAD<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file.glb">GLB</a> · <a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file.step">STEP</a> · <a href="main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="完整台球桌 BMAX 64" width="220"></picture></a><br><strong>BMAX 64</strong><br>最长边 64 格<br>体素边长 ≈ 44.4375<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file-bmax-64.bmax">下载 BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="完整台球桌 BMAX 32" width="220"></picture></a><br><strong>BMAX 32</strong><br>最长边 32 格<br>体素边长 ≈ 88.875<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file-bmax-32.bmax">下载 BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="完整台球桌 BMAX 16" width="220"></picture></a><br><strong>BMAX 16</strong><br>最长边 16 格<br>体素边长 ≈ 177.75<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file-bmax-16.bmax">下载 BMAX 16</a></td>
  </tr>
</table>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file.glb) | 1.07 MiB |
| [STEP](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file.step) | 2.42 MiB |
| [BMAX 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file-bmax-64.bmax) | 0.17 MiB |
| [BMAX 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file-bmax-32.bmax) | 0.03 MiB |
| [BMAX 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/3-billiards-single-file-bmax-16.bmax) | 0.01 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD，BMAX 用于 Paracraft 静态彩色体素模型。BMAX 不保留精确曲面或透明材质。模型从固定版本的 Release 附件按需下载，不随仓库克隆下载。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/3-billiards-single-file/main.code3d.js -f glb,step -o generated/3-billiards-single-file
```

<!-- voxel-downloads:start -->
## Voxel GLB 下载

体素表面网格保留源基本颜色，不经过 BMAX RGB4 量化；居中与显示尺度遵循标准 BMAX 加载规则。原有 BMAX 缩略图不是这些 GLB 文件的预览。

- [Voxel GLB 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/3-billiards-single-file-voxel-64.glb) (1.86 MiB)
- [Voxel GLB 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/3-billiards-single-file-voxel-32.glb) (0.42 MiB)
- [Voxel GLB 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/3-billiards-single-file-voxel-16.glb) (0.10 MiB)
<!-- voxel-downloads:end -->
