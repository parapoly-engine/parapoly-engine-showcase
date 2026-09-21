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
    code3d_doc.line_segment(-50.00000000000001, -25, 0, 50, -25, 0);
    code3d_doc.line_segment(50, -25, 0, 50, 25, 0);
    code3d_doc.line_segment(50, 25, 0, -50.00000000000001, 25, 0);
    code3d_doc.line_segment(-50.00000000000001, 25, 0, -50.00000000000001, -25, 0);
    code3d_doc.end_sketch();
    __record_name("4218747C_3391_4E6B_B90C_384B23A86F31");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["4218747C_3391_4E6B_B90C_384B23A86F31"];
        if (!target_name) { console.warn("[part3d.js #2] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #2] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #2] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.extrude_shape(wires_shape, 10, 0, 0, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #2] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "extrude_B752B325_C105_4178_A2F7_97EC846E9ED6", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("B752B325_C105_4178_A2F7_97EC846E9ED6");
    })();
    code3d_doc.start_sketch(undefined, [0, 0, 0, 0, 0, 1]);
    code3d_doc.line_segment(25, 0, 0, -25, 0, 0);
    code3d_doc.line_segment(-25, 0, 0, -25, 70, 0);
    code3d_doc.line_segment(-25, 70, 0, 25, 70, 0);
    code3d_doc.line_segment(25, 70, 0, 25, 0, 0);
    code3d_doc.end_sketch();
    __record_name("15FC8820_91B4_44B5_870D_573675EEBAB9");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["15FC8820_91B4_44B5_870D_573675EEBAB9"];
        if (!target_name) { console.warn("[part3d.js #4] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #4] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #4] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.extrude_shape(wires_shape, 18, 0, 0, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #4] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "extrude_80547464_B8BE_4830_9A9E_B879E963BBBC", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("80547464_B8BE_4830_9A9E_B879E963BBBC");
    })();
    if (__select_feature("80547464_B8BE_4830_9A9E_B879E963BBBC")) {
        let __nd = code3d_doc.selected_node;
        let __sh = __nd.get_topo_shape().clone();
        __sh.scale(1, 1, 1);
        __sh.rotate(0, 0, 0, 1);
        __sh.translate(0, 0, -25);
        __nd.set_topo_shape(__sh);
        __record_name("3DEF287E_4317_46FD_B297_723AD72FD32C");
    } else { console.warn("[part3d.js #5] transform target NOT FOUND"); }
    (function() {
        let target_name = __id_to_name["3DEF287E_4317_46FD_B297_723AD72FD32C"];
        if (!target_name) { console.warn("[part3d.js #6] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #6] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #6] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(9);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.fillet(topo_shape, 25, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #6] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("36C73D8A_320B_4DA9_954D_AFC84B0131C7"); }
        let result_node = code3d_doc.push_node("union", "fillet_36C73D8A_320B_4DA9_954D_AFC84B0131C7", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("36C73D8A_320B_4DA9_954D_AFC84B0131C7");
    })();
    (function() {
        let target_name = __id_to_name["36C73D8A_320B_4DA9_954D_AFC84B0131C7"];
        if (!target_name) { console.warn("[part3d.js #7] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #7] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #7] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(2);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.fillet(topo_shape, 24.99, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #7] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("4B691813_86AA_44BE_AF63_8A5AA26B5A35"); }
        let result_node = code3d_doc.push_node("union", "fillet_4B691813_86AA_44BE_AF63_8A5AA26B5A35", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("4B691813_86AA_44BE_AF63_8A5AA26B5A35");
    })();
    (function() {
        let target_name = __id_to_name["B752B325_C105_4178_A2F7_97EC846E9ED6"];
        if (!target_name) { console.warn("[part3d.js #8] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #8] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #8] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(1);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.fillet(topo_shape, 10, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #8] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("1FB02C76_9E22_402C_AF4F_61C205EB996C"); }
        let result_node = code3d_doc.push_node("union", "fillet_1FB02C76_9E22_402C_AF4F_61C205EB996C", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("1FB02C76_9E22_402C_AF4F_61C205EB996C");
    })();
    (function() {
        let target_name = __id_to_name["1FB02C76_9E22_402C_AF4F_61C205EB996C"];
        if (!target_name) { console.warn("[part3d.js #9] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #9] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #9] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(24);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.fillet(topo_shape, 10, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #9] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("EAF44A3A_ABF9_48D3_803B_AA290427AC78"); }
        let result_node = code3d_doc.push_node("union", "fillet_EAF44A3A_ABF9_48D3_803B_AA290427AC78", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("EAF44A3A_ABF9_48D3_803B_AA290427AC78");
    })();
    (function() {
        let target_name = __id_to_name["EAF44A3A_ABF9_48D3_803B_AA290427AC78"];
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
        edge_arr.pushValue(24);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.fillet(topo_shape, 10, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #10] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("7E9E51B8_20C4_4977_8812_65AB9983E911"); }
        let result_node = code3d_doc.push_node("union", "fillet_7E9E51B8_20C4_4977_8812_65AB9983E911", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("7E9E51B8_20C4_4977_8812_65AB9983E911");
    })();
    (function() {
        let target_name = __id_to_name["7E9E51B8_20C4_4977_8812_65AB9983E911"];
        if (!target_name) { console.warn("[part3d.js #11] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #11] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #11] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(21);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.fillet(topo_shape, 10, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #11] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("98BAA8C1_AEE5_4AB5_B68D_88AF6E0FAFAD"); }
        let result_node = code3d_doc.push_node("union", "fillet_98BAA8C1_AEE5_4AB5_B68D_88AF6E0FAFAD", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("98BAA8C1_AEE5_4AB5_B68D_88AF6E0FAFAD");
    })();
    (function() {
        let target_names = [__id_to_name["4B691813_86AA_44BE_AF63_8A5AA26B5A35"]].filter(Boolean);
        let tool_names = [__id_to_name["98BAA8C1_AEE5_4AB5_B68D_88AF6E0FAFAD"]].filter(Boolean);
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
            let result_node = code3d_doc.push_node("union", "boolean_BC6259D8_E8A0_420D_B7D1_8429B2658BFD", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("BC6259D8_E8A0_420D_B7D1_8429B2658BFD");
        } else { console.warn("[part3d.js #12] boolean failed"); }
    })();
    code3d_doc.start_sketch(undefined, [0, 0, 0, 0, 1, 0]);
    code3d_doc.circle(-39, 15, 0, 4.5);
    code3d_doc.circle(-39, -15, 0, 4.5);
    code3d_doc.circle(39, 15, 0, 4.5);
    code3d_doc.circle(39, -15, 0, 4.5);
    code3d_doc.end_sketch();
    __record_name("FEFF78DE_7FEF_476A_AEA0_49C3371D1035");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["FEFF78DE_7FEF_476A_AEA0_49C3371D1035"];
        if (!target_name) { console.warn("[part3d.js #14] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #14] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #14] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.extrude_shape(wires_shape, 12, 0, 0, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #14] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "extrude_432DB5B1_28B7_4C9C_85D6_2B4FA40CD881", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("432DB5B1_28B7_4C9C_85D6_2B4FA40CD881");
    })();
    (function() {
        let target_names = [__id_to_name["BC6259D8_E8A0_420D_B7D1_8429B2658BFD"]].filter(Boolean);
        let tool_names = [__id_to_name["432DB5B1_28B7_4C9C_85D6_2B4FA40CD881"]].filter(Boolean);
        let root = code3d_doc.get_root_node();
        let target_nodes = target_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        let tool_nodes = tool_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        if (target_nodes.length === 0 || tool_nodes.length === 0) { console.warn("[part3d.js #15] missing nodes"); return; }
        let target_shapes = target_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        let tool_shapes = tool_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        if (target_shapes.length === 0 || tool_shapes.length === 0) { console.warn("[part3d.js #15] null shapes"); return; }
        let merged_target_shape = target_shapes[0];
        for (let i = 1; i < target_shapes.length; i++) { merged_target_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_target_shape, target_shapes[i]); }
        let merged_tool_shape = tool_shapes[0];
        for (let i = 1; i < tool_shapes.length; i++) { merged_tool_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_tool_shape, tool_shapes[i]); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker["cut"](merged_target_shape, merged_tool_shape);
        if (result_shape && !result_shape.isNull()) {
            let result_node = code3d_doc.push_node("union", "boolean_78A1E059_B4E0_4FB2_B75B_E130AB4424D4", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("78A1E059_B4E0_4FB2_B75B_E130AB4424D4");
        } else { console.warn("[part3d.js #15] boolean failed"); }
    })();
    code3d_doc.start_sketch(undefined, [0, 0, 0, 0, 0, 1]);
    code3d_doc.circle(0, 45, 0, 15);
    code3d_doc.end_sketch();
    __record_name("24EA6BE7_0F5C_48A8_BA08_8B7210D38652");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["24EA6BE7_0F5C_48A8_BA08_8B7210D38652"];
        if (!target_name) { console.warn("[part3d.js #17] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #17] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #17] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.extrude_shape(wires_shape, -50, 0, 0, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #17] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "extrude_5D3256B3_78FE_4491_AF1E_FB35C14B4744", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("5D3256B3_78FE_4491_AF1E_FB35C14B4744");
    })();
    (function() {
        let target_names = [__id_to_name["78A1E059_B4E0_4FB2_B75B_E130AB4424D4"]].filter(Boolean);
        let tool_names = [__id_to_name["5D3256B3_78FE_4491_AF1E_FB35C14B4744"]].filter(Boolean);
        let root = code3d_doc.get_root_node();
        let target_nodes = target_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        let tool_nodes = tool_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        if (target_nodes.length === 0 || tool_nodes.length === 0) { console.warn("[part3d.js #18] missing nodes"); return; }
        let target_shapes = target_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        let tool_shapes = tool_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        if (target_shapes.length === 0 || tool_shapes.length === 0) { console.warn("[part3d.js #18] null shapes"); return; }
        let merged_target_shape = target_shapes[0];
        for (let i = 1; i < target_shapes.length; i++) { merged_target_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_target_shape, target_shapes[i]); }
        let merged_tool_shape = tool_shapes[0];
        for (let i = 1; i < tool_shapes.length; i++) { merged_tool_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_tool_shape, tool_shapes[i]); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker["cut"](merged_target_shape, merged_tool_shape);
        if (result_shape && !result_shape.isNull()) {
            let result_node = code3d_doc.push_node("union", "boolean_0B9B3545_1EDF_486A_8538_870DE5CA7115", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("0B9B3545_1EDF_486A_8538_870DE5CA7115");
        } else { console.warn("[part3d.js #18] boolean failed"); }
    })();
    code3d_doc.start_sketch(undefined, [0, 0, 0, 0, 0, 1]);
    code3d_doc.circle(0, 45, 0, 18.5);
    code3d_doc.end_sketch();
    __record_name("3287334B_21D5_4D9F_9550_99DF797527FD");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["3287334B_21D5_4D9F_9550_99DF797527FD"];
        if (!target_name) { console.warn("[part3d.js #20] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #20] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #20] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.extrude_shape(wires_shape, -12, 0, 0, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #20] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "extrude_5E38F4E5_45E8_4E66_8068_27A38F12788D", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("5E38F4E5_45E8_4E66_8068_27A38F12788D");
    })();
    (function() {
        let target_names = [__id_to_name["0B9B3545_1EDF_486A_8538_870DE5CA7115"]].filter(Boolean);
        let tool_names = [__id_to_name["5E38F4E5_45E8_4E66_8068_27A38F12788D"]].filter(Boolean);
        let root = code3d_doc.get_root_node();
        let target_nodes = target_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        let tool_nodes = tool_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        if (target_nodes.length === 0 || tool_nodes.length === 0) { console.warn("[part3d.js #21] missing nodes"); return; }
        let target_shapes = target_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        let tool_shapes = tool_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        if (target_shapes.length === 0 || tool_shapes.length === 0) { console.warn("[part3d.js #21] null shapes"); return; }
        let merged_target_shape = target_shapes[0];
        for (let i = 1; i < target_shapes.length; i++) { merged_target_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_target_shape, target_shapes[i]); }
        let merged_tool_shape = tool_shapes[0];
        for (let i = 1; i < tool_shapes.length; i++) { merged_tool_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_tool_shape, tool_shapes[i]); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker["cut"](merged_target_shape, merged_tool_shape);
        if (result_shape && !result_shape.isNull()) {
            let result_node = code3d_doc.push_node("union", "boolean_C67E863C_5674_4358_8555_89E7155DC434", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("C67E863C_5674_4358_8555_89E7155DC434");
        } else { console.warn("[part3d.js #21] boolean failed"); }
    })();
    code3d_doc.start_sketch(undefined, [0, 0, 0, 1, 0, 0]);
    code3d_doc.line_segment(7, 45, 0, 7, 10, 0);
    code3d_doc.line_segment(7, 10, 0, -25, 10, 0);
    code3d_doc.line_segment(-25, 10, 0, 7, 45, 0);
    code3d_doc.end_sketch();
    __record_name("035DF91F_94E1_42F9_A092_A1D6346FB7B5");
    code3d_doc.selected_node.set_visible(false);
    (function() {
        let target_name = __id_to_name["035DF91F_94E1_42F9_A092_A1D6346FB7B5"];
        if (!target_name) { console.warn("[part3d.js #23] source sketch not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        if (!node || !node.to_wires_shape) { console.warn("[part3d.js #23] no to_wires_shape"); return; }
        node.set_archived(false);
        node.set_op_feature_node_id(null);
        let wires_shape = node.to_wires_shape();
        if (!wires_shape || wires_shape.isNull()) { console.warn("[part3d.js #23] to_wires_shape failed"); return; }
        let result_shape = parapoly_engine.ParaPolyShapeMaker.extrude_shape(wires_shape, 3, 0, 0, 1, true);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #23] op failed"); return; }
        if (node.constructor && node.constructor.transform_native_shape) {
            result_shape = node.constructor.transform_native_shape(result_shape, node);
        }
        let result_node = code3d_doc.push_node("union", "extrude_A1B95F1E_38C9_4AB4_858E_8DE85CDD73F2", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("A1B95F1E_38C9_4AB4_858E_8DE85CDD73F2");
    })();
    if (__select_feature("A1B95F1E_38C9_4AB4_858E_8DE85CDD73F2")) {
        let __nd = code3d_doc.selected_node;
        let __sh = __nd.get_topo_shape().clone();
        __sh.scale(1, 1, 1);
        __sh.rotate(0, 0, 0, 1);
        __sh.translate(22, 0, 0);
        __nd.set_topo_shape(__sh);
        __record_name("4C7E30C0_B2CE_4D17_8BD2_A991CD770861");
    } else { console.warn("[part3d.js #24] transform target NOT FOUND"); }
    (function() {
        let target_name = __id_to_name["4C7E30C0_B2CE_4D17_8BD2_A991CD770861"];
        if (!target_name) { console.warn("[part3d.js #25] no target_name"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #25] node not found and no saved shape"); return; }
        if (!topo_shape || topo_shape.isNull()) return;
        let mirror_shape = parapoly_engine.ParaPolyShapeMaker.mirror_shape(topo_shape, 0, 0, 0, 1, 0, 0);
        if (!mirror_shape || mirror_shape.isNull()) return;
        let result = code3d_doc.push_node("union", "mirror_AE5C4D9D_225D_495A_A73F_9414C4A323AC", "#b0b0b0", false);
        result.set_topo_shape(mirror_shape);
        code3d_doc.pop_node();
        __record_name("AE5C4D9D_225D_495A_A73F_9414C4A323AC");
    })();
    (function() {
        let target_names = [__id_to_name["C67E863C_5674_4358_8555_89E7155DC434"]].filter(Boolean);
        let tool_names = [__id_to_name["4C7E30C0_B2CE_4D17_8BD2_A991CD770861"], __id_to_name["AE5C4D9D_225D_495A_A73F_9414C4A323AC"]].filter(Boolean);
        let root = code3d_doc.get_root_node();
        let target_nodes = target_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        let tool_nodes = tool_names.map(function(name) { return root.getChildByName(name, true); }).filter(Boolean);
        if (target_nodes.length === 0 || tool_nodes.length === 0) { console.warn("[part3d.js #26] missing nodes"); return; }
        let target_shapes = target_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        let tool_shapes = tool_nodes.map(function(nd) { let s = nd.get_topo_shape(); return s ? s.clone() : null; }).filter(Boolean);
        if (target_shapes.length === 0 || tool_shapes.length === 0) { console.warn("[part3d.js #26] null shapes"); return; }
        let merged_target_shape = target_shapes[0];
        for (let i = 1; i < target_shapes.length; i++) { merged_target_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_target_shape, target_shapes[i]); }
        let merged_tool_shape = tool_shapes[0];
        for (let i = 1; i < tool_shapes.length; i++) { merged_tool_shape = parapoly_engine.ParaPolyShapeMaker.fuse(merged_tool_shape, tool_shapes[i]); }
        let result_shape = parapoly_engine.ParaPolyShapeMaker["fuse"](merged_target_shape, merged_tool_shape);
        if (result_shape && !result_shape.isNull()) {
            let result_node = code3d_doc.push_node("union", "boolean_BC8B4B1D_2DB9_45FA_97A7_616B5718A8BA", "#b0b0b0", false);
            result_node.set_topo_shape(result_shape);
            code3d_doc.pop_node();
            target_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            tool_names.forEach(function(name) { let nd = root.getChildByName(name, true); if (nd && nd.get_topo_shape) __saved_shapes[name] = { shape: nd.get_topo_shape(), tc: null }; });
            target_names.forEach(function(name) { code3d_doc.delete_node(name); });
            tool_names.forEach(function(name) { code3d_doc.delete_node(name); });
            __record_name("BC8B4B1D_2DB9_45FA_97A7_616B5718A8BA");
        } else { console.warn("[part3d.js #26] boolean failed"); }
    })();
    (function() {
        let target_name = __id_to_name["BC8B4B1D_2DB9_45FA_97A7_616B5718A8BA"];
        if (!target_name) { console.warn("[part3d.js #27] target_name not found"); return; }
        let root = code3d_doc.get_root_node();
        let node = root.getChildByName(target_name, true);
        let topo_shape;
        if (node && node.get_topo_shape) { topo_shape = node.get_topo_shape(); }
        else if (__saved_shapes[target_name]) { topo_shape = __saved_shapes[target_name].shape; }
        else { console.warn("[part3d.js #27] target not found"); return; }
        if (!topo_shape || topo_shape.isNull()) { console.warn("[part3d.js #27] target shape is null"); return; }
        if (node) { node.set_archived(false); node.set_op_feature_node_id(null); }
        let edge_arr = new parapoly_engine.ParaPolyIntArray();
        edge_arr.pushValue(51);
        edge_arr.pushValue(56);
        edge_arr.pushValue(69);
        edge_arr.pushValue(86);
        let result_shape = parapoly_engine.ParaPolyShapeMaker.fillet(topo_shape, 5, edge_arr);
        if (!result_shape || result_shape.isNull()) { console.warn("[part3d.js #27] op failed"); return; }
        if (node) { node.set_archived(true); node.set_op_feature_node_id("544A4B04_B478_4420_A43A_6056B314672F"); }
        let result_node = code3d_doc.push_node("union", "fillet_544A4B04_B478_4420_A43A_6056B314672F", "#b0b0b0", false);
        result_node.set_topo_shape(result_shape);
        code3d_doc.pop_node();
        __record_name("544A4B04_B478_4420_A43A_6056B314672F");
    })();

    return code3d_doc;
};
