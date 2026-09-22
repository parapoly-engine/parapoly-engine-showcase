# GE E³ 风扇组件

[English](README.md) · [全部示例](../../README.zh-CN.md)

用代码放样叶型的 32 叶片风扇组件，包含叶根及固定件。

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="GE E³ 风扇组件 CAD" width="220" height="124"></picture><br><strong>19. GE E³ 风扇组件</strong></a><br>CAD<br><a href="dist/models/main.glb">GLB</a> · <a href="dist/models/main.step">STEP</a> · <a href="main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="GE E³ 风扇组件 BMAX 64" width="220" height="124"></picture></a><br><strong>BMAX 64</strong><br>最长边 64 格<br>体素边长 ≈ 3.46775<br><a href="dist/models/bmax/64/main.bmax">下载 BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="GE E³ 风扇组件 BMAX 32" width="220" height="124"></picture></a><br><strong>BMAX 32</strong><br>最长边 32 格<br>体素边长 ≈ 6.93551<br><a href="dist/models/bmax/32/main.bmax">下载 BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="GE E³ 风扇组件 BMAX 16" width="220" height="124"></picture></a><br><strong>BMAX 16</strong><br>最长边 16 格<br>体素边长 ≈ 13.871<br><a href="dist/models/bmax/16/main.bmax">下载 BMAX 16</a></td>
  </tr>
</table>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 45.39 MiB |
| [STEP](dist/models/main.step) | 72.29 MiB |
| [BMAX 64](dist/models/bmax/64/main.bmax) | 0.28 MiB |
| [BMAX 32](dist/models/bmax/32/main.bmax) | 0.06 MiB |
| [BMAX 16](dist/models/bmax/16/main.bmax) | 0.01 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD，BMAX 用于 Paracraft 静态彩色体素模型。BMAX 不保留精确曲面或透明材质。点击文件后用 GitHub 的 Download raw file 获取；完整克隆请使用 Git LFS。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/19-ge-e3-fan-module/main.code3d.js -f glb,step -o generated/19-ge-e3-fan-module --timeout 600000
```

## 参考与范围

[参考来源](https://ntrs.nasa.gov/) — 依据 NASA/GE E³ 参考几何重建；叶根和固定件包含教学推定尺寸，这是风扇组件，并非完整发动机。
