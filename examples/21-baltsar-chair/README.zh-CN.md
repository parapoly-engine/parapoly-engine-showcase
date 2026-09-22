# BALTSAR 宝特赛四腿椅

[English](README.md) · [全部示例](../../README.zh-CN.md)

连续透明厚壳、软垫、黑色承托与四条外撇椅腿。

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="BALTSAR 宝特赛四腿椅 CAD" width="220" height="124"></picture><br><strong>21. BALTSAR 宝特赛四腿椅</strong></a><br>CAD<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair.glb">GLB</a> · <a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair.step">STEP</a> · <a href="main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="BALTSAR 宝特赛四腿椅 BMAX 64" width="220" height="124"></picture></a><br><strong>BMAX 64</strong><br>最长边 64 格<br>体素边长 ≈ 13.2819<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair-bmax-64.bmax">下载 BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="BALTSAR 宝特赛四腿椅 BMAX 32" width="220" height="124"></picture></a><br><strong>BMAX 32</strong><br>最长边 32 格<br>体素边长 ≈ 26.5638<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair-bmax-32.bmax">下载 BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="BALTSAR 宝特赛四腿椅 BMAX 16" width="220" height="124"></picture></a><br><strong>BMAX 16</strong><br>最长边 16 格<br>体素边长 ≈ 53.1277<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair-bmax-16.bmax">下载 BMAX 16</a></td>
  </tr>
</table>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair.glb) | 9.31 MiB |
| [STEP](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair.step) | 1.22 MiB |
| [BMAX 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair-bmax-64.bmax) | 0.19 MiB |
| [BMAX 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair-bmax-32.bmax) | 0.03 MiB |
| [BMAX 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22/21-baltsar-chair-bmax-16.bmax) | 0.01 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD，BMAX 用于 Paracraft 静态彩色体素模型。BMAX 不保留精确曲面或透明材质。模型从固定版本的 Release 附件按需下载，不随仓库克隆下载。

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
