# Billiards table

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A complete table with six pockets, cushions, a wooden frame and four legs.

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="Billiards table" width="640"></picture>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 1.07 MiB |
| [STEP](dist/models/main.step) | 2.42 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing and STEP for CAD. Open a file and use GitHub’s Download raw file; use Git LFS when cloning.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/3-billiards-single-file/main.code3d.js -f glb,step -o generated/3-billiards-single-file
```
