# ParaPoly Engine 模型展示

[English](README.md) · [npm 包](https://www.npmjs.com/package/parapoly-engine)

**这里的 3D / CAD 模型均使用 [parapoly-engine](https://www.npmjs.com/package/parapoly-engine) 设计。**

用自然语言描述想法，让 AI 编程助手用 Code3D 构建模型，再通过 JavaScript 修改尺寸、形状和装配。这里收录日用品、家具、机械零件和复杂装配；每例提供单文件模型源码、预览，以及可下载的 **GLB** 和 **STEP**。

## 浏览模型

目前共 21 个示例。点击缩略图查看模型下载、源码与设计说明；已有多视图和设计 skills 的示例也提供相应入口。

<table>
  <tr>
    <td width="25%" valign="top" align="center"><a href="examples/1-boolean-cutout/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/1-boolean-cutout/preview.png"><img src="examples/1-boolean-cutout/preview-light.png" alt="方体与球体差集" width="220"></picture><br><strong>1. 方体与球体差集</strong></a><br><a href="examples/1-boolean-cutout/dist/models/main.glb">GLB</a> · <a href="examples/1-boolean-cutout/dist/models/main.step">STEP</a> · <a href="examples/1-boolean-cutout/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/2-woven-basket-block3d/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/2-woven-basket-block3d/preview.png"><img src="examples/2-woven-basket-block3d/preview-light.png" alt="竹编容器" width="220"></picture><br><strong>2. 竹编容器</strong></a><br><a href="examples/2-woven-basket-block3d/dist/models/main.glb">GLB</a> · <a href="examples/2-woven-basket-block3d/dist/models/main.step">STEP</a> · <a href="examples/2-woven-basket-block3d/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/3-billiards-single-file/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/3-billiards-single-file/preview.png"><img src="examples/3-billiards-single-file/preview-light.png" alt="完整台球桌" width="220"></picture><br><strong>3. 完整台球桌</strong></a><br><a href="examples/3-billiards-single-file/dist/models/main.glb">GLB</a> · <a href="examples/3-billiards-single-file/dist/models/main.step">STEP</a> · <a href="examples/3-billiards-single-file/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/4-coffee-cup-block3d/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/4-coffee-cup-block3d/preview.png"><img src="examples/4-coffee-cup-block3d/preview-light.png" alt="咖啡杯" width="220"></picture><br><strong>4. 咖啡杯</strong></a><br><a href="examples/4-coffee-cup-block3d/dist/models/main.glb">GLB</a> · <a href="examples/4-coffee-cup-block3d/dist/models/main.step">STEP</a> · <a href="examples/4-coffee-cup-block3d/main.code3d.js">源码</a></td>
  </tr>
  <tr>
    <td width="25%" valign="top" align="center"><a href="examples/5-round-bottom-wok/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/5-round-bottom-wok/preview.png"><img src="examples/5-round-bottom-wok/preview-light.png" alt="木柄圆底锅" width="220"></picture><br><strong>5. 木柄圆底锅</strong></a><br><a href="examples/5-round-bottom-wok/dist/models/main.glb">GLB</a> · <a href="examples/5-round-bottom-wok/dist/models/main.step">STEP</a> · <a href="examples/5-round-bottom-wok/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/6-cast-iron-skillet/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/6-cast-iron-skillet/preview.png"><img src="examples/6-cast-iron-skillet/preview-light.png" alt="铸铁煎锅" width="220"></picture><br><strong>6. 铸铁煎锅</strong></a><br><a href="examples/6-cast-iron-skillet/dist/models/main.glb">GLB</a> · <a href="examples/6-cast-iron-skillet/dist/models/main.step">STEP</a> · <a href="examples/6-cast-iron-skillet/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/7-lunar-rover-block3d/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/7-lunar-rover-block3d/preview.png"><img src="examples/7-lunar-rover-block3d/preview-light.png" alt="月球车" width="220"></picture><br><strong>7. 月球车</strong></a><br><a href="examples/7-lunar-rover-block3d/dist/models/main.glb">GLB</a> · <a href="examples/7-lunar-rover-block3d/dist/models/main.step">STEP</a> · <a href="examples/7-lunar-rover-block3d/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/8-microscope-block3d/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/8-microscope-block3d/preview.png"><img src="examples/8-microscope-block3d/preview-light.png" alt="显微镜" width="220"></picture><br><strong>8. 显微镜</strong></a><br><a href="examples/8-microscope-block3d/dist/models/main.glb">GLB</a> · <a href="examples/8-microscope-block3d/dist/models/main.step">STEP</a> · <a href="examples/8-microscope-block3d/main.code3d.js">源码</a></td>
  </tr>
  <tr>
    <td width="25%" valign="top" align="center"><a href="examples/9-mario-kart-single-file/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/9-mario-kart-single-file/preview.png"><img src="examples/9-mario-kart-single-file/preview-light.png" alt="无人物卡丁车" width="220"></picture><br><strong>9. 无人物卡丁车</strong></a><br><a href="examples/9-mario-kart-single-file/dist/models/main.glb">GLB</a> · <a href="examples/9-mario-kart-single-file/dist/models/main.step">STEP</a> · <a href="examples/9-mario-kart-single-file/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/10-woven-bamboo-chair/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/10-woven-bamboo-chair/preview.png"><img src="examples/10-woven-bamboo-chair/preview-light.png" alt="编织竹椅" width="220"></picture><br><strong>10. 编织竹椅</strong></a><br><a href="examples/10-woven-bamboo-chair/dist/models/main.glb">GLB</a> · <a href="examples/10-woven-bamboo-chair/dist/models/main.step">STEP</a> · <a href="examples/10-woven-bamboo-chair/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/11-spindle-back-chair/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/11-spindle-back-chair/preview.png"><img src="examples/11-spindle-back-chair/preview-light.png" alt="圆杆靠背木椅" width="220"></picture><br><strong>11. 圆杆靠背木椅</strong></a><br><a href="examples/11-spindle-back-chair/dist/models/main.glb">GLB</a> · <a href="examples/11-spindle-back-chair/dist/models/main.step">STEP</a> · <a href="examples/11-spindle-back-chair/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/12-part3d-roundtrip/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/12-part3d-roundtrip/preview.png"><img src="examples/12-part3d-roundtrip/preview-light.png" alt="油标尺" width="220"></picture><br><strong>12. 油标尺</strong></a><br><a href="examples/12-part3d-roundtrip/dist/models/main.glb">GLB</a> · <a href="examples/12-part3d-roundtrip/dist/models/main.step">STEP</a> · <a href="examples/12-part3d-roundtrip/main.code3d.js">源码</a></td>
  </tr>
  <tr>
    <td width="25%" valign="top" align="center"><a href="examples/13-stepped-flange/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/13-stepped-flange/preview.png"><img src="examples/13-stepped-flange/preview-light.png" alt="阶梯法兰盘" width="220"></picture><br><strong>13. 阶梯法兰盘</strong></a><br><a href="examples/13-stepped-flange/dist/models/main.glb">GLB</a> · <a href="examples/13-stepped-flange/dist/models/main.step">STEP</a> · <a href="examples/13-stepped-flange/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/14-bearing-housing-part3d/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/14-bearing-housing-part3d/preview.png"><img src="examples/14-bearing-housing-part3d/preview-light.png" alt="轴承座" width="220"></picture><br><strong>14. 轴承座</strong></a><br><a href="examples/14-bearing-housing-part3d/dist/models/main.glb">GLB</a> · <a href="examples/14-bearing-housing-part3d/dist/models/main.step">STEP</a> · <a href="examples/14-bearing-housing-part3d/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/15-high-speed-shaft-part3d/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/15-high-speed-shaft-part3d/preview.png"><img src="examples/15-high-speed-shaft-part3d/preview-light.png" alt="高速轴" width="220"></picture><br><strong>15. 高速轴</strong></a><br><a href="examples/15-high-speed-shaft-part3d/dist/models/main.glb">GLB</a> · <a href="examples/15-high-speed-shaft-part3d/dist/models/main.step">STEP</a> · <a href="examples/15-high-speed-shaft-part3d/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/16-housing-part3d/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/16-housing-part3d/preview.png"><img src="examples/16-housing-part3d/preview-light.png" alt="机械壳体" width="220"></picture><br><strong>16. 机械壳体</strong></a><br><a href="examples/16-housing-part3d/dist/models/main.glb">GLB</a> · <a href="examples/16-housing-part3d/dist/models/main.step">STEP</a> · <a href="examples/16-housing-part3d/main.code3d.js">源码</a></td>
  </tr>
  <tr>
    <td width="25%" valign="top" align="center"><a href="examples/17-stirling-d16-c/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/17-stirling-d16-c/preview.png"><img src="examples/17-stirling-d16-c/preview-light.png" alt="低温差斯特林展示机" width="220"></picture><br><strong>17. 低温差斯特林展示机</strong></a><br><a href="examples/17-stirling-d16-c/dist/models/main.glb">GLB</a> · <a href="examples/17-stirling-d16-c/dist/models/main.step">STEP</a> · <a href="examples/17-stirling-d16-c/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/18-stirling-horizontal-quartz/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/18-stirling-horizontal-quartz/preview.png"><img src="examples/18-stirling-horizontal-quartz/preview-light.png" alt="横置石英管斯特林展示机" width="220"></picture><br><strong>18. 横置石英管斯特林展示机</strong></a><br><a href="examples/18-stirling-horizontal-quartz/dist/models/main.glb">GLB</a> · <a href="examples/18-stirling-horizontal-quartz/dist/models/main.step">STEP</a> · <a href="examples/18-stirling-horizontal-quartz/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/19-ge-e3-fan-module/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/19-ge-e3-fan-module/preview.png"><img src="examples/19-ge-e3-fan-module/preview-light.png" alt="GE E³ 风扇组件" width="220"></picture><br><strong>19. GE E³ 风扇组件</strong></a><br><a href="examples/19-ge-e3-fan-module/dist/models/main.glb">GLB</a> · <a href="examples/19-ge-e3-fan-module/dist/models/main.step">STEP</a> · <a href="examples/19-ge-e3-fan-module/main.code3d.js">源码</a></td>
    <td width="25%" valign="top" align="center"><a href="examples/20-cargo-atv/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/20-cargo-atv/preview.png"><img src="examples/20-cargo-atv/preview-light.png" alt="运输四轮 ATV" width="220"></picture><br><strong>20. 运输四轮 ATV</strong></a><br><a href="examples/20-cargo-atv/dist/models/main.glb">GLB</a> · <a href="examples/20-cargo-atv/dist/models/main.step">STEP</a> · <a href="examples/20-cargo-atv/main.code3d.js">源码</a></td>
  </tr>
  <tr>
    <td width="25%" valign="top" align="center"><a href="examples/21-baltsar-chair/README.zh-CN.md"><picture><source media="(prefers-color-scheme: dark)" srcset="examples/21-baltsar-chair/preview.png"><img src="examples/21-baltsar-chair/preview-light.png" alt="BALTSAR 宝特赛四腿椅" width="220"></picture><br><strong>21. BALTSAR 宝特赛四腿椅</strong></a><br><a href="examples/21-baltsar-chair/dist/models/21-baltsar-chair.glb">GLB</a> · <a href="examples/21-baltsar-chair/dist/models/21-baltsar-chair.step">STEP</a> · <a href="examples/21-baltsar-chair/main.code3d.js">源码</a></td>
  </tr>
</table>

## 让 AI 开始设计

安装 [Node.js](https://nodejs.org/) 18 或更新版本。原生 npm 包支持 Windows x64 和 Linux x64（glibc 2.35+）。在新项目文件夹中运行：

```sh
npx -y parapoly-engine init
```

命令会准备项目与 AI 助手指引。然后可以对 AI 说：

> 使用 parapoly-engine code3d 设计一把曲面靠背、四条锥形腿的椅子。建模代码放在单个 main.code3d.js 中，导出 GLB 和 STEP。

也可以从现有示例出发，让 AI 调整尺寸、造型、配色或装配参数。示例有 `skills/` 时，让 AI 先阅读其中的设计经验，有助于避开已经遇到的问题。

## 使用示例

下载 **GLB** 查看带颜色的 3D 模型，下载 **STEP** 在兼容的 CAD 软件中打开实体几何。使用这些成品文件不需要安装引擎。在 GitHub 中打开模型文件后，点击 **Download raw file**；各例页面列有文件大小。

如需获取完整示例集，安装 [Git LFS](https://git-lfs.com/) 后克隆：

```sh
git lfs install
git clone https://github.com/parapoly-engine/parapoly-engine-showcase.git
cd parapoly-engine-showcase
git lfs pull
```

模型通过 Git LFS 保存。若下载文件只有几行文字，得到的是指针，请通过 Git LFS 或文件的 GitHub 页面获取实际模型。编织竹椅包含较多细节，其 GLB 约 381 MiB、STEP 约 130 MiB。

在仓库根目录安装引擎，并重新导出一个小示例：

```sh
npm install parapoly-engine
npx --no-install parapoly-engine setup-ai
npx --no-install parapoly-engine export examples/1-boolean-cutout/main.code3d.js -f glb,step -o generated/1-boolean-cutout
```

将源码路径换成其他示例即可。新导出文件保存到 `generated/`；复杂装配可能需要更长时间，参数和用法见各例源码及 npm 包说明。

部分源码可能使用比当前已发布 npm 包更新的 API。例如透明 BALTSAR 椅的重新导出需要 `set_opacity()` 支持；已经提供的成品模型可直接使用，具体条件见该示例页面。

## 每个示例包含什么？

- `main.code3d.js`：可编辑模型源码。
- `preview.png` 与 `preview-light.png`：深浅两种背景预览。
- `dist/models/`：GLB 和 STEP 模型下载。
- `multiview/`：已有的正交视图、细节图和修改对比图。
- `skills/`：已有的可复用设计经验，供 AI 助手和建模者参考。

这些模型用于设计展示和学习。参考产品的模型属于外观研究，并非厂家图纸；机械展示模型也不代表已经验证可运行。尺寸、单位和推定范围以各例为准，不统一假设所有示例采用相同的比例。

[MIT 许可](LICENSE)。产品及机构名称用于说明参考对象，不表示相关方背书。
