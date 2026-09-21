# BALTSAR chair

[简体中文](README.zh-CN.md) · [All examples](../../README.md)

A continuous transparent shell, upholstered seat and black four-leg support.

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="BALTSAR chair" width="640"></picture>

Designed with [parapoly-engine](https://www.npmjs.com/package/parapoly-engine).

## Downloads and source

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/21-baltsar-chair.glb) | 9.31 MiB |
| [STEP](dist/models/21-baltsar-chair.step) | 1.22 MiB |

[main.code3d.js](main.code3d.js) · [Model information](model-info.json)

Use GLB for 3D viewing and STEP for CAD. Open a file and use GitHub’s Download raw file; use Git LFS when cloning.

After installing the npm package, run from the repository root:

```sh
npx --no-install parapoly-engine export examples/21-baltsar-chair/main.code3d.js -f glb,step -o generated/21-baltsar-chair
```

**Opacity API:** This source requires `set_opacity()`. As of 2026-09-21, the published npm 3.0.1 declarations do not include it; use a release with this API to rebuild the model. Prepared GLB/STEP files can be downloaded now. GLB uses alpha blending; STEP does not retain transparency.

## Multiple views

[All views and details](multiview/README.md)

![View overview](multiview/baltsar-chair_00_overview.png)

## Design skills

Ask your AI assistant to read these skills before modifying a similar model. The design lessons are in Chinese.

- [parapoly-curved-shell-modeling](skills/parapoly-curved-shell-modeling/SKILL.md)
- [parapoly-shell-chair-design](skills/parapoly-shell-chair-design/SKILL.md)

## Reference and scope

[Reference](https://www.ikea.cn/cn/zh/p/baltsar-bao-te-sai-yi-zi-hei-se-30532139/) — A photo-based study of IKEA BALTSAR. Curves, thickness and connections are approximations, not manufacturer CAD.
