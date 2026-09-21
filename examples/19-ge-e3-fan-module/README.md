# GE E³ fan module

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A 32-blade fan assembly with code-lofted airfoils and detailed root attachments.

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="GE E³ fan module" width="640"></picture>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 45.39 MiB |
| [STEP](dist/models/main.step) | 72.29 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing and STEP for CAD. Open a file and use GitHub’s Download raw file; use Git LFS when cloning.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/19-ge-e3-fan-module/main.code3d.js -f glb,step -o generated/19-ge-e3-fan-module --timeout 600000
```

## Reference and scope

[Reference](https://ntrs.nasa.gov/) — Based on NASA/GE E³ reference geometry. Blade roots and attachments include illustrative dimensions; this is a fan module, not a complete engine.
