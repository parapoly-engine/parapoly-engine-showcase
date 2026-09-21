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
    code3d_doc.start_sketch(undefined, [0, 0, 0, 0, 1, 0]);
    code3d_doc.line_segment(0, -5.686866711302065e-31, 0, 0, 25, 0);
    code3d_doc.line_segment(0, 25, 0, 15, 25, 0);
    code3d_doc.line_segment(15, 25, 0, 15, 11.5, 0);
    code3d_doc.line_segment(15, 11.5, 0, 40, 11.5, 0);
    code3d_doc.line_segment(40, 11.5, 0, 40, 7.5, 0);
    code3d_doc.line_segment(40, 7.5, 0, 80, 7.5, 0);
    code3d_doc.line_segment(80, 7.5, 0, 80, 5, 0);
    code3d_doc.line_segment(80, 5, 0, 150, 5, 0);
    code3d_doc.line_segment(0, -5.686866711302065e-31, 0, 150, -5.686866711302065e-31, 0);
    code3d_doc.line_segment(150, -5.686866711302065e-31, 0, 150, 5, 0);
    code3d_doc.end_sketch();
    __record_name("EC9ABBB1_7971_48BA_8D01_24EC74B4AE6C");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["EC9ABBB1_7971_48BA_8D01_24EC74B4AE6C"];
        if (!target_name) { console.warn("[part3d.js #2] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #2] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #2] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.revolve_shape(wires_shape, 360, 0, 0, 0, 1, 0, 0, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #2] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "revolve_1D98D941_DE01_45E5_A0D5_56541AF6D8BC", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("1D98D941_DE01_45E5_A0D5_56541AF6D8BC");
    })();
    code3d_doc.start_sketch(undefined, [0, 0, 0, 0, 1, 0]);
    code3d_doc.circle(27.5, 11.5, 0, 3);
    code3d_doc.end_sketch();
    __record_name("E1C2231F_A95E_471C_AA6D_4E96750A97B0");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["E1C2231F_A95E_471C_AA6D_4E96750A97B0"];
        if (!target_name) { console.warn("[part3d.js #4] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #4] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #4] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.revolve_shape(wires_shape, 360, 0, 0, 0, 1, 0, 0, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #4] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "revolve_4B145990_EC1A_4544_B032_968C94496E02", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("4B145990_EC1A_4544_B032_968C94496E02");
    })();
    (function() {
        let target_names = [__id_to_name["1D98D941_DE01_45E5_A0D5_56541AF6D8BC"]].filter(Boolean);
        let tool_names = [__id_to_name["4B145990_EC1A_4544_B032_968C94496E02"]].filter(Boolean);
        let root = code3d_doc.get_root_node();
        let target_nodes = target_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        let tool_nodes = tool_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        if (target_nodes.length === 0 || tool_nodes.length === 0) { console.warn("[part3d.js #5] missing nodes"); return; }
        let target_shapes = target_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        let tool_shapes = tool_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        if (target_shapes.length === 0 || tool_shapes.length === 0) { console.warn("[part3d.js #5] null shapes"); return; }
        let merged_target_shape = target_shapes[0];
        for (let i = 1; i < target_shapes.length; i++) { merged_target_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_target_shape, target_shapes[i]); }
        let merged_tool_shape = tool_shapes[0];
        for (let i = 1; i < tool_shapes.length; i++) { merged_tool_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_tool_shape, tool_shapes[i]); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker["cut"](merged_target_shape, merged_tool_shape);
        if (result_shape && !result_shape.isNull()) {
            let result_node = code3d_doc.push_node("union", "boolean_FDACE7A6_7061_444C_8CCA_058C42A1D661", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("FDACE7A6_7061_444C_8CCA_058C42A1D661");
        } else { console.warn("[part3d.js #5] boolean failed"); }
    })();

    return code3d_doc;
};
