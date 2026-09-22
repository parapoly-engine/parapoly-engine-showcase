# 咖啡杯

[English](README.md) · [全部示例](../../README.zh-CN.md)

中空杯体与环形把手组成的咖啡杯。

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="咖啡杯 CAD" width="220" height="124"></picture><br><strong>4. 咖啡杯</strong></a><br>CAD<br><a href="dist/models/main.glb">GLB</a> · <a href="dist/models/main.step">STEP</a> · <a href="main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="咖啡杯 BMAX 64" width="220" height="124"></picture></a><br><strong>BMAX 64</strong><br>最长边 64 格<br>体素边长 ≈ 0.120226<br><a href="dist/models/bmax/64/main.bmax">下载 BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="咖啡杯 BMAX 32" width="220" height="124"></picture></a><br><strong>BMAX 32</strong><br>最长边 32 格<br>体素边长 ≈ 0.240453<br><a href="dist/models/bmax/32/main.bmax">下载 BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="咖啡杯 BMAX 16" width="220" height="124"></picture></a><br><strong>BMAX 16</strong><br>最长边 16 格<br>体素边长 ≈ 0.480906<br><a href="dist/models/bmax/16/main.bmax">下载 BMAX 16</a></td>
  </tr>
</table>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 0.45 MiB |
| [STEP](dist/models/main.step) | 0.16 MiB |
| [BMAX 64](dist/models/bmax/64/main.bmax) | 0.27 MiB |
| [BMAX 32](dist/models/bmax/32/main.bmax) | 0.06 MiB |
| [BMAX 16](dist/models/bmax/16/main.bmax) | 0.01 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD，BMAX 用于 Paracraft 静态彩色体素模型。BMAX 不保留精确曲面或透明材质。点击文件后用 GitHub 的 Download raw file 获取；完整克隆请使用 Git LFS。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/4-coffee-cup-block3d/main.code3d.js -f glb,step -o generated/4-coffee-cup-block3d
```
