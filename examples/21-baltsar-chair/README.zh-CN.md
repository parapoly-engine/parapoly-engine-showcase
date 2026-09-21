# BALTSAR 宝特赛四腿椅

[English](README.md) · [全部示例](../../README.zh-CN.md)

连续透明厚壳、软垫、黑色承托与四条外撇椅腿。

<picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="BALTSAR 宝特赛四腿椅" width="640"></picture>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](dist/models/21-baltsar-chair.glb) | 9.31 MiB |
| [STEP](dist/models/21-baltsar-chair.step) | 1.22 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD。点击文件后用 GitHub 的 Download raw file 获取；完整克隆请使用 Git LFS。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/21-baltsar-chair/main.code3d.js -f glb,step -o generated/21-baltsar-chair
```

**透明度 API：** 本例需要 `set_opacity()`。截至 2026-09-21，公开 npm 3.0.1 声明尚无该方法；请使用包含该能力的后续版本再重新导出。GLB/STEP 成品可直接下载；GLB 是透明混合效果，STEP 不保留透明材质。

## 多视图

[全部视图与局部图](multiview/README.md)

![多视图总览](multiview/baltsar-chair_00_overview.png)

## 设计经验

修改同类模型前，可以让 AI 助手阅读以下 skills。经验正文保留中文。

- [parapoly-curved-shell-modeling](skills/parapoly-curved-shell-modeling/SKILL.md)
- [parapoly-shell-chair-design](skills/parapoly-shell-chair-design/SKILL.md)

## 参考与范围

[参考来源](https://www.ikea.cn/cn/zh/p/baltsar-bao-te-sai-yi-zi-hei-se-30532139/) — 依据 IKEA BALTSAR 照片重建；曲率、厚度和连接为展示近似值，并非厂家 CAD。
