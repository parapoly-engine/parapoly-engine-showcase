# Dipstick

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A small mechanical part built from sketches and feature operations.

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="Dipstick CAD" width="220"></picture><br><strong>12. Dipstick</strong></a><br>CAD<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip.glb">GLB</a> · <a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip.step">STEP</a> · <a href="main.code3d.js">Code</a></td>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="Dipstick BMAX 64" width="220"></picture></a><br><strong>BMAX 64</strong><br>Longest edge 64 voxels<br>Voxel size ≈ 2.34375<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip-bmax-64.bmax">Download BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="Dipstick BMAX 32" width="220"></picture></a><br><strong>BMAX 32</strong><br>Longest edge 32 voxels<br>Voxel size ≈ 4.6875<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip-bmax-32.bmax">Download BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="Dipstick BMAX 16" width="220"></picture></a><br><strong>BMAX 16</strong><br>Longest edge 16 voxels<br>Voxel size ≈ 9.375<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip-bmax-16.bmax">Download BMAX 16</a></td>
  </tr>
</table>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip.glb) | 0.23 MiB |
| [STEP](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip.step) | 0.05 MiB |
| [BMAX 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip-bmax-64.bmax) | 0.05 MiB |
| [BMAX 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip-bmax-32.bmax) | 0.01 MiB |
| [BMAX 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/12-part3d-roundtrip-bmax-16.bmax) | 0.00 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing, STEP for CAD, and BMAX for static colored voxel models in Paracraft. BMAX does not retain exact surfaces or transparency. Download models on demand from versioned Release assets; cloning does not download them.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/12-part3d-roundtrip/main.code3d.js -f glb,step -o generated/12-part3d-roundtrip
```

<!-- voxel-downloads:start -->
## Voxel GLB downloads

Voxel surface meshes retain source base colors without BMAX RGB4 quantization. These GLB files use the same centering and display scale as standard BMAX loading. The existing BMAX thumbnails are not previews of these GLB files.

- [Voxel GLB 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/12-part3d-roundtrip-voxel-64.glb) (0.90 MiB)
- [Voxel GLB 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/12-part3d-roundtrip-voxel-32.glb) (0.22 MiB)
- [Voxel GLB 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/voxel-models-2026-09-26/12-part3d-roundtrip-voxel-16.glb) (0.05 MiB)
<!-- voxel-downloads:end -->
