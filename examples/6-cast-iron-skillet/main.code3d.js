// 将来源工程的零件模块整理为同文件命名函数，保留原装配参数与操作顺序。
function createSkilletBody(params) {
    let code3d_doc = new PartCode3dDocument()
    let d = params?.diameter || 22    // 锅口直径 cm
    let depth = params?.depth || 5.5  // 锅深 cm
    let r = d / 2                     // 顶部半径 11
    let r_bottom = r - 3              // 底部半径 8（平底更小）
    let wall = 0.5                    // 铸铁壁厚
    let bottom_wall = 0.6             // 底部更厚

    // 外层：多色保留
    code3d_doc.push_node("union", "pan_parts", "#1a1a1a", false)

        // 锅体（截锥体 - 平底铸铁）
        code3d_doc.push_node("union", "", "#1a1a1a", true)
            // 外壳：上宽下窄的截锥
            code3d_doc.cone("union", r, r_bottom, depth, "#1a1a1a")
            // 内腔：略小的截锥做差集，上移留出底部厚度
            code3d_doc.cone("difference", r - wall, r_bottom - wall, depth - bottom_wall, "#1a1a1a")
            code3d_doc.translate(0, bottom_wall / 2, 0)
        code3d_doc.pop_node()
        code3d_doc.translate(0, depth / 2, 0)

        // 浇注口1（左侧凸起）
        code3d_doc.push_node("union", "", "#1a1a1a", true)
            code3d_doc.cylinder("union", 1.5, 1.2, "#1a1a1a")
        code3d_doc.pop_node()
        code3d_doc.translate(0, depth + 0.2, r - 0.3)

        // 浇注口2（右侧）
        code3d_doc.push_node("union", "", "#1a1a1a", true)
            code3d_doc.cylinder("union", 1.5, 1.2, "#1a1a1a")
        code3d_doc.pop_node()
        code3d_doc.translate(0, depth + 0.2, -(r - 0.3))

    code3d_doc.pop_node()

    return code3d_doc
}

function createSkilletHandle(params) {
    let code3d_doc = new PartCode3dDocument()
    let len = params?.length || 16

    // 铸铁手柄：全部放在同一个 booleanEnabled=true 组里，确保 difference 生效
    code3d_doc.push_node("union", "handle_parts", "#1a1a1a", false)

        code3d_doc.push_node("union", "", "#1a1a1a", true)
            // 手柄主体 - 扁平铸铁柄
            code3d_doc.box("union", len, 1.2, 2.8, "#1a1a1a")
            code3d_doc.translate(len / 2, 0, 0)
            // 末端圆盘（挂孔外圈）
            code3d_doc.cylinder("union", 2.2, 1.2, "#1a1a1a")
            code3d_doc.translate(len - 0.5, 0, 0)
            // 挂孔（差集打穿）
            code3d_doc.cylinder("difference", 1.0, 1.4, "#1a1a1a")
            code3d_doc.translate(len - 0.5, 0, 0)
        code3d_doc.pop_node()

    code3d_doc.pop_node()

    return code3d_doc
}

var pan_body, main_handle;

let main = function() {
    let code3d_doc = new PartCode3dDocument()

    // 锅体（带浇注口）
    let body = createSkilletBody({ diameter: 22, depth: 5.5 })
    code3d_doc.add_part(body, "union", "pan_body")

    // 主手柄（长柄，向 -X 延伸，带末端挂孔）
    let handle = createSkilletHandle({ length: 16 })
    code3d_doc.add_part(handle, "union", "main_handle")
    code3d_doc.rotate("y", 180)
    code3d_doc.translate(-10, 5, 0)

    return code3d_doc
}
