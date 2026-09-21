let main = function() {
    let code3d_doc = new PartCode3dDocument();

    // Helpers for operation nodes that target older features.
    let __id_to_name = {};
    let __saved_shapes = {};
    let __record_name = function(feature_id) {
        if (!feature_id) return;
        try { let n = code3d_doc?.selected_node?.getName?.(); if (n) __id_to_name[feature_id] = n; } catch (e) {}
    };
    let __select_feature = function(feature_id) {
        let name = __id_to_name[feature_id];
        if (!name) return false;
        let node = code3d_doc.get_root_node()?.getChildByName?.(name, true);
        if (!node) return false;
        code3d_doc.selected_node = node;
        return true;
    };

    // Executable export
    code3d_doc.cylinder("union", 57.5, 61.5, "#b0b0b0");
    __record_name("1516FA2C_C345_4146_AB99_DC9C0AFD705F");
    (function() {
        let target_name = __id_to_name["1516FA2C_C345_4146_AB99_DC9C0AFD705F"];
        if (!target_name) { console.warn("[part3d.js #2] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #2] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #2] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.shell_shape(topo_shape, 1.5, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #2] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("68554D5F_5BB0_43F7_A12B_BB385A4C08E2"); }
        let result_node = code3d_doc.push_node("union", "shell_68554D5F_5BB0_43F7_A12B_BB385A4C08E2", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("68554D5F_5BB0_43F7_A12B_BB385A4C08E2");
    })();
    (function() {
        let target_name = __id_to_name["68554D5F_5BB0_43F7_A12B_BB385A4C08E2"];
        if (!target_name) { console.warn("[part3d.js #3] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #3] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #3] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(7);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.chamfer(topo_shape, 7.5, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #3] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("156D969A_3CFE_45A7_BF97_2BA2FB5D6BFB"); }
        let result_node = code3d_doc.push_node("union", "chamfer_156D969A_3CFE_45A7_BF97_2BA2FB5D6BFB", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("156D969A_3CFE_45A7_BF97_2BA2FB5D6BFB");
    })();
    (function() {
        let target_name = __id_to_name["156D969A_3CFE_45A7_BF97_2BA2FB5D6BFB"];
        if (!target_name) { console.warn("[part3d.js #4] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #4] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #4] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(13);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.chamfer(topo_shape, 7.5, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #4] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("95DA1795_DC6C_4E02_A606_6484A6E606D5"); }
        let result_node = code3d_doc.push_node("union", "chamfer_95DA1795_DC6C_4E02_A606_6484A6E606D5", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("95DA1795_DC6C_4E02_A606_6484A6E606D5");
    })();
    code3d_doc.cylinder("union", 40, 50, "#b0b0b0");
    __record_name("236277F0_660A_45F6_A064_CF3648959964");
    if (__select_feature("236277F0_660A_45F6_A064_CF3648959964")) {
        let __nd = code3d_doc.selected_node;
        let __sh = __nd.get_topo_shape().clone();
        __sh.scale(1, 1, 1);
        __sh.rotate(0, 0, 0, 1);
        __sh.translate(0, -55.75, 0);
        __nd.set_topo_shape(__sh);
        __record_name("FEB994C0_59FF_486B_A922_FE9E8E7635B2");
    } else { console.warn("[part3d.js #6] transform target NOT FOUND"); }
    code3d_doc.start_sketch(undefined, [0, 0, 0, 0, 1, 0]);
    code3d_doc.circle(0, 30, 0, 7.5);
    code3d_doc.circle(30, 0, 0, 7.5);
    code3d_doc.circle(0, -30, 0, 7.5);
    code3d_doc.circle(-30, 0, 0, 7.5);
    code3d_doc.end_sketch();
    __record_name("B49E0169_861F_45C5_BA6C_1F9158262678");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["B49E0169_861F_45C5_BA6C_1F9158262678"];
        if (!target_name) { console.warn("[part3d.js #8] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #8] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #8] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.extrude_shape(wires_shape, -10, 0, 0, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #8] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "extrude_F96ECE1B_5FE6_4BC2_B66B_EC02974B120B", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("F96ECE1B_5FE6_4BC2_B66B_EC02974B120B");
    })();
    if (__select_feature("F96ECE1B_5FE6_4BC2_B66B_EC02974B120B")) {
        let __nd = code3d_doc.selected_node;
        let __sh = __nd.get_topo_shape().clone();
        __sh.scale(1, 1, 1);
        __sh.rotate(0, 0, 0, 1);
        __sh.translate(0, -80.75, 0);
        __nd.set_topo_shape(__sh);
        __record_name("B9C7FC68_82FA_48C2_A462_EBB8C8A33D9E");
    } else { console.warn("[part3d.js #9] transform target NOT FOUND"); }
    (function() {
        let target_name = __id_to_name["FEB994C0_59FF_486B_A922_FE9E8E7635B2"];
        if (!target_name) { console.warn("[part3d.js #10] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #10] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #10] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(2);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.chamfer(topo_shape, 1, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #10] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("E79CDFA1_76EB_497C_B223_950405C6817B"); }
        let result_node = code3d_doc.push_node("union", "chamfer_E79CDFA1_76EB_497C_B223_950405C6817B", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("E79CDFA1_76EB_497C_B223_950405C6817B");
    })();
    (function() {
        let target_names = [__id_to_name["95DA1795_DC6C_4E02_A606_6484A6E606D5"]].filter(Boolean);
        let tool_names = [__id_to_name["E79CDFA1_76EB_497C_B223_950405C6817B"]].filter(Boolean);
        let root = code3d_doc.get_root_node();
        let target_nodes = target_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        let tool_nodes = tool_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        if (target_nodes.length === 0 || tool_nodes.length === 0) { console.warn("[part3d.js #11] missing nodes"); return; }
        let target_shapes = target_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        let tool_shapes = tool_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        if (target_shapes.length === 0 || tool_shapes.length === 0) { console.warn("[part3d.js #11] null shapes"); return; }
        let merged_target_shape = target_shapes[0];
        for (let i = 1; i < target_shapes.length; i++) { merged_target_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_target_shape, target_shapes[i]); }
        let merged_tool_shape = tool_shapes[0];
        for (let i = 1; i < tool_shapes.length; i++) { merged_tool_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_tool_shape, tool_shapes[i]); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker["fuse"](merged_target_shape, merged_tool_shape);
        if (result_shape && !result_shape.isNull()) {
            let result_node = code3d_doc.push_node("union", "boolean_16369CDB_BE3C_434C_8ADB_E872BDD80C60", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("16369CDB_BE3C_434C_8ADB_E872BDD80C60");
        } else { console.warn("[part3d.js #11] boolean failed"); }
    })();
    (function() {
        let target_names = [__id_to_name["16369CDB_BE3C_434C_8ADB_E872BDD80C60"]].filter(Boolean);
        let tool_names = [__id_to_name["B9C7FC68_82FA_48C2_A462_EBB8C8A33D9E"], __id_to_name["B9C7FC68_82FA_48C2_A462_EBB8C8A33D9E"], __id_to_name["B9C7FC68_82FA_48C2_A462_EBB8C8A33D9E"], __id_to_name["B9C7FC68_82FA_48C2_A462_EBB8C8A33D9E"]].filter(Boolean);
        let root = code3d_doc.get_root_node();
        let target_nodes = target_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        let tool_nodes = tool_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        if (target_nodes.length === 0 || tool_nodes.length === 0) { console.warn("[part3d.js #12] missing nodes"); return; }
        let target_shapes = target_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        let tool_shapes = tool_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        if (target_shapes.length === 0 || tool_shapes.length === 0) { console.warn("[part3d.js #12] null shapes"); return; }
        let merged_target_shape = target_shapes[0];
        for (let i = 1; i < target_shapes.length; i++) { merged_target_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_target_shape, target_shapes[i]); }
        let merged_tool_shape = tool_shapes[0];
        for (let i = 1; i < tool_shapes.length; i++) { merged_tool_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_tool_shape, tool_shapes[i]); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker["fuse"](merged_target_shape, merged_tool_shape);
        if (result_shape && !result_shape.isNull()) {
            let result_node = code3d_doc.push_node("union", "boolean_F1C65698_76FE_4B84_AA23_83A97AE97490", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("F1C65698_76FE_4B84_AA23_83A97AE97490");
        } else { console.warn("[part3d.js #12] boolean failed"); }
    })();
    if (__select_feature("F1C65698_76FE_4B84_AA23_83A97AE97490")) {
        let __nd = code3d_doc.selected_node;
        let __sh = __nd.get_topo_shape().clone();
        __sh.scale(1, 1, 1);
        __sh.rotate(0, 0, 0, 1);
        __sh.translate(0, 90.75, 0);
        __nd.set_topo_shape(__sh);
        __record_name("DB18F199_1365_46AB_A2D7_CD83020A8029");
    } else { console.warn("[part3d.js #13] transform target NOT FOUND"); }

    return code3d_doc;
};
