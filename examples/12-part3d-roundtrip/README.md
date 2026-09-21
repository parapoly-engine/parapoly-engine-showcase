# Dipstick

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A small mechanical part built from sketches and feature operations.

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="Dipstick" width="640"></picture>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 0.23 MiB |
| [STEP](dist/models/main.step) | 0.05 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing and STEP for CAD. Open a file and use GitHub’s Download raw file; use Git LFS when cloning.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/12-part3d-roundtrip/main.code3d.js -f glb,step -o generated/12-part3d-roundtrip
```
