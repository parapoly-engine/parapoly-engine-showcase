# High-speed shaft

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A stepped shaft modeled with solid features and cuts.

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="High-speed shaft CAD" width="220" height="124"></picture><br><strong>15. High-speed shaft</strong></a><br>CAD<br><a href="dist/models/main.glb">GLB</a> · <a href="dist/models/main.step">STEP</a> · <a href="main.code3d.js">Code</a></td>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="High-speed shaft BMAX 64" width="220" height="124"></picture></a><br><strong>BMAX 64</strong><br>Longest edge 64 voxels<br>Voxel size ≈ 1.25<br><a href="dist/models/bmax/64/main.bmax">Download BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="High-speed shaft BMAX 32" width="220" height="124"></picture></a><br><strong>BMAX 32</strong><br>Longest edge 32 voxels<br>Voxel size ≈ 2.5<br><a href="dist/models/bmax/32/main.bmax">Download BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="High-speed shaft BMAX 16" width="220" height="124"></picture></a><br><strong>BMAX 16</strong><br>Longest edge 16 voxels<br>Voxel size ≈ 5<br><a href="dist/models/bmax/16/main.bmax">Download BMAX 16</a></td>
  </tr>
</table>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 0.08 MiB |
| [STEP](dist/models/main.step) | 0.14 MiB |
| [BMAX 64](dist/models/bmax/64/main.bmax) | 0.05 MiB |
| [BMAX 32](dist/models/bmax/32/main.bmax) | 0.01 MiB |
| [BMAX 16](dist/models/bmax/16/main.bmax) | 0.00 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing, STEP for CAD, and BMAX for static colored voxel models in Paracraft. BMAX does not retain exact surfaces or transparency. Open a file and use GitHub’s Download raw file; use Git LFS when cloning.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/15-high-speed-shaft-part3d/main.code3d.js -f glb,step -o generated/15-high-speed-shaft-part3d
```
