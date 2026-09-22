# 行走组件

[English](README.md) · [全部示例](../../README.zh-CN.md)

由 61 个独立实体构成的弹簧压紧行走组件，包含 36ZY 电机、同步带传动、滚轮与活动支承。

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="preview.png"><img src="preview-light.png" alt="行走组件 CAD" width="220" height="124"></picture><br><strong>22. 行走组件</strong></a><br>CAD<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly.glb">GLB</a> · <a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly.step">STEP</a> · <a href="main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/64/preview.png"><img src="bmax/64/preview-light.png" alt="行走组件 BMAX 64" width="220" height="124"></picture></a><br><strong>BMAX 64</strong><br>最长边 64 格<br>体素边长 ≈ 2.39063<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly-bmax-64.bmax">下载 BMAX 64</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/32/preview.png"><img src="bmax/32/preview-light.png" alt="行走组件 BMAX 32" width="220" height="124"></picture></a><br><strong>BMAX 32</strong><br>最长边 32 格<br>体素边长 ≈ 4.78125<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly-bmax-32.bmax">下载 BMAX 32</a></td>
    <td width="25%" valign="top" align="center"><a href="README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="bmax/16/preview.png"><img src="bmax/16/preview-light.png" alt="行走组件 BMAX 16" width="220" height="124"></picture></a><br><strong>BMAX 16</strong><br>最长边 16 格<br>体素边长 ≈ 9.5625<br><a href="https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly-bmax-16.bmax">下载 BMAX 16</a></td>
  </tr>
</table>

使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。

## 下载与源码

| File / 文件 | Size / 大小 |
| --- | --- |
| [GLB](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly.glb) | 4.56 MiB |
| [STEP](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly.step) | 5.95 MiB |
| [BMAX 64](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly-bmax-64.bmax) | 0.36 MiB |
| [BMAX 32](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly-bmax-32.bmax) | 0.07 MiB |
| [BMAX 16](https://github.com/parapoly-engine/parapoly-engine-showcase/releases/download/models-2026-09-22-walking-drive/22-walking-drive-assembly-bmax-16.bmax) | 0.01 MiB |

[main.code3d.js](main.code3d.js) · [模型资料](model-info.json)

GLB 用于三维查看，STEP 用于 CAD，BMAX 用于 Paracraft 静态彩色体素模型。BMAX 不保留精确曲面或透明材质。模型从固定版本的 Release 附件按需下载，不随仓库克隆下载。

在仓库根目录安装 npm 包后，可运行：

```sh
npx --no-install parapoly-engine export examples/22-walking-drive-assembly/main.code3d.js -f glb,step -o generated/22-walking-drive-assembly
```

## 设计经验

修改同类模型前，可以让 AI 助手阅读以下 skills。经验正文保留中文。

- [parapoly-walking-assembly-design](skills/parapoly-walking-assembly-design/SKILL.md)

## 参考与范围

[参考来源](https://www.jlc-jdgf.com/machine-detail/622695255533043715) — 依据嘉立创 FA 案例的用户提供总装与零件 STEP、BOM 和封面图重建；螺纹、带齿等细节经过简化。本例为结构展示模型，不是可直接制造的设计，也未完成载荷或运动仿真验证。
