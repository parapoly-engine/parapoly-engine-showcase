# Cargo ATV

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A four-wheel utility vehicle with curved bodywork, a cargo platform and tubular rails.

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="Cargo ATV" width="640"></picture>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/main.glb) | 27.40 MiB |
| [STEP](dist/models/main.step) | 18.31 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing and STEP for CAD. Open a file and use GitHub’s Download raw file; use Git LFS when cloning.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/20-cargo-atv/main.code3d.js -f glb,step -o generated/20-cargo-atv
```

## Multiple views

[All views and details](multiview/README.md)

![View overview](multiview/cargo-atv_00_overview.png)
