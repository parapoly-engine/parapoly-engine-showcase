// 将来源工程的零件模块整理为同文件命名函数，保留原装配参数与操作顺序。
// 阶梯法兰盘主体 — 参照 Part3D 机械模型合集中的法兰盘设计
// 结构：底部宽盘 + 上部窄颈，整体带中心通孔，盘面均布螺栓孔
function createFlange(params) {
    let code3d_doc = new PartCode3dDocument()

    // 尺寸参数（参考 .part3d 原始设计）
    let bore_d = params?.bore_d || 20          // 中心通孔直径
    let neck_od = params?.neck_od || 40        // 颈部外径
    let neck_h = params?.neck_h || 20          // 颈部高度
    let disc_od = params?.disc_od || 100       // 盘体外径
    let disc_h = params?.disc_h || 10          // 盘体厚度
    let bolt_n = params?.bolt_n || 6           // 螺栓孔数量
    let bolt_d = params?.bolt_d || 10          // 螺栓孔直径
    let bolt_pcd = params?.bolt_pcd || 70      // 螺栓孔分布圆直径

    let bore_r = bore_d / 2
    let neck_r = neck_od / 2
    let disc_r = disc_od / 2
    let bolt_r = bolt_d / 2
    let pcd_r = bolt_pcd / 2
    let total_h = disc_h + neck_h

    code3d_doc.push_node("union", "flange_body", "#a0a0a0", false)

        // 阶梯实体（盘 + 颈 - 中心孔 - 螺栓孔）
        code3d_doc.push_node("union", "", "#b0b0b0", true)

            // 底部圆盘
            code3d_doc.cylinder("union", disc_r, disc_h, "#b0b0b0")
            code3d_doc.translate(0, disc_h / 2, 0)

            // 上部颈（与盘重叠 1mm 避免缝隙）
            code3d_doc.cylinder("union", neck_r, neck_h + 1, "#b0b0b0")
            code3d_doc.translate(0, disc_h + (neck_h - 1) / 2, 0)

            // 中心通孔（贯穿整体）
            code3d_doc.cylinder("difference", bore_r, total_h + 1, "#b0b0b0")
            code3d_doc.translate(0, total_h / 2, 0)

            // 均布螺栓孔（贯穿盘体）
            for (let i = 0; i < bolt_n; i++) {
                let angle = (360 / bolt_n) * i
                let rad = angle * Math.PI / 180
                let x = Math.cos(rad) * pcd_r
                let z = Math.sin(rad) * pcd_r
                code3d_doc.cylinder("difference", bolt_r, disc_h + 1, "#b0b0b0")
                code3d_doc.translate(x, disc_h / 2, z)
            }

        code3d_doc.pop_node()

    code3d_doc.pop_node()

    return code3d_doc
}

// 阶梯法兰盘 — 参照 Part3D 机械模型合集/02 法兰盘.part3d 设计
// 底部宽盘(∅100×10) + 上部窄颈(∅40×20)，6个∅10通孔(PCD=70)
let main = function() {
    let code3d_doc = new PartCode3dDocument()

    let flange = createFlange({
        bore_d: 20,
        neck_od: 40,
        neck_h: 20,
        disc_od: 100,
        disc_h: 10,
        bolt_n: 6,
        bolt_d: 10,
        bolt_pcd: 70
    })
    code3d_doc.add_part(flange, "union", "flange")

    return code3d_doc
}
