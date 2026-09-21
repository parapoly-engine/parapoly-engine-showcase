# Lunar rover

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A multi-part rover with wheels, a chassis and scientific instruments.

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="Lunar rover" width="640"></picture>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 1.67 MiB |
| [STEP](dist/models/main.step) | 0.93 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing and STEP for CAD. Open a file and use GitHub’s Download raw file; use Git LFS when cloning.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/7-lunar-rover-block3d/main.code3d.js -f glb,step -o generated/7-lunar-rover-block3d
```
