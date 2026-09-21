// 将来源工程的零件模块整理为同文件命名函数，保留原装配参数与操作顺序。
function createWokBody(params) {
    let code3d_doc = new PartCode3dDocument()
    let d = params?.diameter || 26    // 锅口直径 cm
    let depth = params?.depth || 4.5  // 锅深 cm
    let r = d / 2
    let wall = 0.3                    // 锅壁厚度

    // 外层包裹：booleanEnabled=false 保留各部件独立颜色
    code3d_doc.push_node("union", "pan_parts", "#2d2d2d", false)

        // 锅体（外壳+内腔 boolean合并为一体 - 深灰色）
        code3d_doc.push_node("union", "", "#2d2d2d", true)
            code3d_doc.ellipsoid("union", r, depth + 1, r, "#2d2d2d")
            // 切掉上半部分，保留下方碗形
            code3d_doc.box("difference", d + 2, depth * 2 + 2, d + 2, "#2d2d2d")
            code3d_doc.translate(0, depth + 1, 0)
            // 挖空内腔（直接用较小椭球做差集）
            code3d_doc.ellipsoid("difference", r - wall, depth + 0.2, r - wall, "#2d2d2d")
            code3d_doc.translate(0, -wall, 0)
        code3d_doc.pop_node()
        code3d_doc.translate(0, depth + 1, 0)

        // 锅沿 - 银色金属边缘
        code3d_doc.push_node("union", "", "#c0c0c0", true)
            code3d_doc.torus("union", r, 0.3, "#c0c0c0")
        code3d_doc.pop_node()
        code3d_doc.translate(0, depth + 1 - 0.1, 0)

    code3d_doc.pop_node()

    return code3d_doc
}

function createWokHandle(params) {
    let code3d_doc = new PartCode3dDocument()
    let len = params?.length || 18    // 手柄长度 cm
    let grip_r = 1.2                  // 手柄截面半径
    let connector_len = 3             // 连接段长度

    // 外层包裹：booleanEnabled=false 保留各部件独立颜色
    code3d_doc.push_node("union", "handle_parts", "#5c3317", false)

        // 连接片 - 不锈钢金属片连接锅体
        code3d_doc.push_node("union", "", "#a8a8a8", true)
            code3d_doc.box("union", connector_len, 0.3, 3.5, "#a8a8a8")
        code3d_doc.pop_node()
        code3d_doc.translate(connector_len / 2, 0, 0)

        // 铆钉1（铜色）
        code3d_doc.push_node("union", "", "#c9a84c", true)
            code3d_doc.cylinder("union", 0.35, 0.5, "#c9a84c")
        code3d_doc.pop_node()
        code3d_doc.translate(1, 0.2, 0.8)

        // 铆钉2（铜色）
        code3d_doc.push_node("union", "", "#c9a84c", true)
            code3d_doc.cylinder("union", 0.35, 0.5, "#c9a84c")
        code3d_doc.pop_node()
        code3d_doc.translate(1, 0.2, -0.8)

        // 手柄主体 + 挂孔（深棕色木质，内部boolean合并）
        code3d_doc.push_node("union", "", "#5c3317", true)
            code3d_doc.cone("union", grip_r * 0.85, grip_r, len - connector_len, "#5c3317")
            code3d_doc.rotate("z", 90)
            code3d_doc.translate(connector_len + (len - connector_len) / 2, 0, 0)
            // 末端挂孔
            code3d_doc.torus("difference", 1, 0.4, "#5c3317")
            code3d_doc.rotate("y", 90)
            code3d_doc.translate(len - 0.5, 0, 0)
        code3d_doc.pop_node()

    code3d_doc.pop_node()

    return code3d_doc
}

var pan_body, handle;

let main = function() {
    let code3d_doc = new PartCode3dDocument()

    // 锅体
    let body = createWokBody({ diameter: 26, depth: 4.5 })
    code3d_doc.add_part(body, "union", "pan_body")

    // 手柄（旋转180°使其向 -X 方向延伸，连接片贴合锅边）
    let handle = createWokHandle({ length: 18 })
    code3d_doc.add_part(handle, "union", "handle")
    code3d_doc.rotate("y", 180)
    code3d_doc.translate(-13, 5.5, 0)

    return code3d_doc
}
