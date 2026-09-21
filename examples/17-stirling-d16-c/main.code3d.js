// 低温差斯特林展示机：双飞轮与曲柄连杆。毫米，Y 向上，地面 Y=0。
// 独立零件文档与同文件函数装配；保留原生及网页草图能力分支。
// Five swept, kidney-shaped openings; curves sampled at 0.1 mm visual precision.
function createFlywheel(p) {
    // Keep native polygon sketches; Web's unconstrained segments retain XYZ.
    function polygon(points) {
        if (typeof d.sketch === 'function') {
            d.sketch(points, true);
            return;
        }
        d.start_sketch('polygon-profile', 'z');
        for (let i = 0; i < points.length; i += 3) {
            const j = (i + 3) % points.length;
            if (Math.hypot(points[j] - points[i], points[j + 1] - points[i + 1], points[j + 2] - points[i + 2]) < 1e-9)
                continue;
            d.line_segment(points[i], points[i + 1], points[i + 2], points[j], points[j + 1], points[j + 2]);
        }
        d.end_sketch();
    }
    const d = new PartCode3dDocument(), c = p.color, t = 5;
    d.push_node('union', 'five-curved-spoke-wheel', c, true);
    d.cylinder('union', 32.5, t, c);
    d.rotate('x', 90);
    const curves = [[[10, 0], [14, -5], [19, -10], [23, -10]], [[23, -10], [30, -9], [30, 4], [25, 12]], [[25, 12], [21, 14], [15, 10], [15, 6]], [[15, 6], [16, 3], [8, 3], [10, 0]]];
    for (let k = 0; k < 5; k++) {
        const a = k * 2 * Math.PI / 5, cs = Math.cos(a), sn = Math.sin(a), pts = [];
        for (const b of curves)
            for (let j = 0; j < 40; j++) {
                const t = j / 40, s = 1 - t, x = s * s * s * b[0][0] + 3 * s * s * t * b[1][0] + 3 * s * t * t * b[2][0] + t * t * t * b[3][0], y = s * s * s * b[0][1] + 3 * s * s * t * b[1][1] + 3 * s * t * t * b[2][1] + t * t * t * b[3][1];
                pts.push(x * cs - y * sn, x * sn + y * cs, -4);
            }
        polygon(pts);
        d.extrude('difference', 8, c, true);
    }
    d.cylinder('difference', 2, 9, c);
    d.rotate('x', 90);
    d.pop_node();
    return d;
}
function createPlate(p) {
    // Keep native polygon sketches; Web's unconstrained segments retain XYZ.
    function polygon(points) {
        if (typeof d.sketch === 'function') {
            d.sketch(points, true);
            return;
        }
        d.start_sketch('polygon-profile', 'z');
        for (let i = 0; i < points.length; i += 3) {
            const j = (i + 3) % points.length;
            if (Math.hypot(points[j] - points[i], points[j + 1] - points[i + 1], points[j + 2] - points[i + 2]) < 1e-9)
                continue;
            d.line_segment(points[i], points[i + 1], points[i + 2], points[j], points[j + 1], points[j + 2]);
        }
        d.end_sketch();
    }
    const d = new PartCode3dDocument(), w = p.width ?? 105, h = p.thickness ?? 5, r = p.radius ?? 8, c = p.color;
    d.push_node('union', 'machined-plate', c, true);
    const pts = [];
    for (const [x, y, a] of [[w / 2 - r, w / 2 - r, 0], [-w / 2 + r, w / 2 - r, 90], [-w / 2 + r, -w / 2 + r, 180], [w / 2 - r, -w / 2 + r, 270]])
        for (let j = 0; j <= 16; j++) {
            const t = (a + j * 90 / 16) * Math.PI / 180;
            pts.push(x + r * Math.cos(t), y + r * Math.sin(t), 0);
        }
    polygon(pts);
    d.extrude('union', h, c, true);
    d.rotate('x', -90);
    d.translate(0, -h / 2, 0);
    if (p.holes !== false)
        for (const x of [-43, 43])
            for (const z of [-43, 43]) {
                d.cylinder('difference', 2.15, h + 3, c);
                d.translate(x, 0, z);
            }
    if (p.top) {
        for (const [x, z, radius] of [[-6, 17, 8.1], [6, -17, 2]]) {
            d.cylinder('difference', radius, h + 3, c);
            d.translate(x, 0, z);
        }
    }
    if (p.reliefs)
        for (const x of [-43, 43])
            for (const z of [-43, 43]) {
                d.cylinder('difference', 9, h + 3, c);
                d.translate(x, 0, z);
            }
    d.pop_node();
    return d;
}
function createSupport(p) {
    // Keep native polygon sketches; Web's unconstrained segments retain XYZ.
    function polygon(points) {
        if (typeof d.sketch === 'function') {
            d.sketch(points, true);
            return;
        }
        d.start_sketch('polygon-profile', 'z');
        for (let i = 0; i < points.length; i += 3) {
            const j = (i + 3) % points.length;
            if (Math.hypot(points[j] - points[i], points[j + 1] - points[i + 1], points[j + 2] - points[i + 2]) < 1e-9)
                continue;
            d.line_segment(points[i], points[i + 1], points[i + 2], points[j], points[j + 1], points[j + 2]);
        }
        d.end_sketch();
    }
    const d = new PartCode3dDocument(), c = p.color, pts = [];
    const curves = [[[-32, 40], [-36, 61], [-24, 96], [-7, 111]], [[-7, 111], [-3, 117], [7, 115], [8, 108]], [[8, 108], [8, 102], [2, 101], [-1, 98]], [[-1, 98], [-17, 83], [-23, 56], [-13, 43]], [[-13, 43], [-19, 41], [-27, 40], [-32, 40]]];
    for (const b of curves)
        for (let i = 0; i < 30; i++) {
            const t = i / 30, s = 1 - t;
            pts.push(s ** 3 * b[0][0] + 3 * s * s * t * b[1][0] + 3 * s * t * t * b[2][0] + t ** 3 * b[3][0], s ** 3 * b[0][1] + 3 * s * s * t * b[1][1] + 3 * s * t * t * b[2][1] + t ** 3 * b[3][1], -3);
        }
    d.push_node('union', 'arched-bearing-standard', c, true);
    polygon(pts);
    d.extrude('union', 6, c, true);
    for (const [x, y, r] of [[0, 107.5, 4], [-27, 52, 1.8], [-25, 46, 1.8]]) {
        d.cylinder('difference', r, 10, c);
        d.rotate('x', 90);
        d.translate(x, y, 0);
    }
    d.pop_node();
    return d;
}
function createTurned(p) {
    // Keep native polygon sketches; Web's unconstrained segments retain XYZ.
    function polygon(points) {
        if (typeof d.sketch === 'function') {
            d.sketch(points, true);
            return;
        }
        d.start_sketch('polygon-profile', 'z');
        for (let i = 0; i < points.length; i += 3) {
            const j = (i + 3) % points.length;
            if (Math.hypot(points[j] - points[i], points[j + 1] - points[i + 1], points[j + 2] - points[i + 2]) < 1e-9)
                continue;
            d.line_segment(points[i], points[i + 1], points[i + 2], points[j], points[j + 1], points[j + 2]);
        }
        d.end_sketch();
    }
    const d = new PartCode3dDocument(), c = p.color;
    d.push_node('union', p.kind ?? 'turned-component', c, true);
    if (p.kind === 'spacer') {
        const pts = [0, -10.5, 0];
        for (let i = 0; i <= 48; i++) {
            const y = -10.5 + 21 * i / 48, r = 3.1 + 2.6 * Math.pow(y / 10.5, 2);
            pts.push(r, y, 0);
        }
        pts.push(0, 10.5, 0);
        polygon(pts);
        d.revolve('union', 360, 'y', c, true);
    }
    else if (p.kind === 'foot') {
        d.cylinder('union', 7.5, 7.5, c);
        d.fillet(.5, 'xyz');
        for (const y of [-1.7, 1.1]) {
            d.push_node('difference', 'lathe-groove', c, true);
            d.cylinder('union', 8, .65, c);
            d.cylinder('difference', 6.9, 1.2, c);
            d.pop_node();
            d.translate(0, y, 0);
        }
    }
    else if (p.kind === 'power-cylinder') {
        d.cylinder('union', 10, 31, c);
        d.chamfer(.35, 'xyz');
        d.cylinder('difference', 8, 34, c);
        for (const y of [-8, 0, 8]) {
            d.push_node('difference', 'cooling-groove', c, true);
            d.cylinder('union', 11, .7, c);
            d.cylinder('difference', 9.45, 1.1, c);
            d.pop_node();
            d.translate(0, y, 0);
        }
    }
    else {
        d.cylinder('union', p.radius, p.length, c);
        if (p.bore) {
            d.cylinder('difference', p.bore, p.length + 2, c);
        }
    }
    d.pop_node();
    return d;
}
let main = function (params) {
    // Keep native polygon sketches; Web's unconstrained segments retain XYZ.
    function polygon(points) {
        if (typeof d.sketch === 'function') {
            d.sketch(points, true);
            return;
        }
        d.start_sketch('polygon-profile', 'z');
        for (let i = 0; i < points.length; i += 3) {
            const j = (i + 3) % points.length;
            if (Math.hypot(points[j] - points[i], points[j + 1] - points[i + 1], points[j + 2] - points[i + 2]) < 1e-9)
                continue;
            d.line_segment(points[i], points[i + 1], points[i + 2], points[j], points[j + 1], points[j + 2]);
        }
        d.end_sketch();
    }
    const p = params ?? {}, d = new PartCode3dDocument(), angle = p.crankAngle ?? 205;
    if (!Number.isFinite(angle))
        throw Error('crankAngle must be finite');
    const aluminum = '#bfc4cb', polished = '#dfe2e6', steel = '#868c94', dark = '#242830', gold = '#c59b47';
    d.push_node('union', 'D16-C-Stirling-engine', aluminum, false);
    function part(doc, name, x = 0, y = 0, z = 0, axis = null, deg = 0) { d.add_part(doc, 'union', name); if (axis)
        d.rotate(axis, deg); d.translate(x, y, z); }
    function turned(name, kind, x, y, z, extra = {}) { part(createTurned({ kind, color: polished, ...extra }), name, x, y, z); }
    function cyl(name, r, h, x, y, z, color = steel, axis = null) { d.push_node('union', name, color, false); d.cylinder('union', r, h, color); if (axis)
        d.rotate('x', 90); d.translate(x, y, z); d.pop_node(); }
    part(createPlate({ color: aluminum }), '01-bottom-heat-transfer-plate', 0, 10, 0);
    part(createPlate({ color: aluminum, top: true }), '02-upper-cold-plate', 0, 36, 0);
    part(createPlate({ color: aluminum, width: 96, radius: 5, thickness: 2.5, top: true, reliefs: true }), '03-machined-raised-top', 0, 39.75, 0);
    turned('04-displacer-chamber-wall', 'tube', 0, 23, 0, { radius: 48.5, bore: 47.5, length: 21, color: dark });
    for (const y of [13, 33])
        turned('05-chamber-seal-' + y, 'ring', 0, y, 0, { radius: 48.65, bore: 46.8, length: .65, color: '#16181b' });
    for (const x of [-43, 43])
        for (const z of [-43, 43]) {
            turned('06-waisted-corner-spacer-' + x + '-' + z, 'spacer', x, 23, z);
            turned('07-grooved-foot-' + x + '-' + z, 'foot', x, 3.75, z);
            cyl('08-tie-rod-' + x + '-' + z, 1.8, 30, x, 24, z, steel);
            d.push_node('union', '09-brass-countersunk-washer-' + x + '-' + z, gold, true);
            d.cone('union', 4.5, 5.8, 2.2, gold);
            d.cylinder('difference', 2, 4, gold);
            d.pop_node();
            d.translate(x, 39.6, z);
            d.push_node('union', '10-socket-cap-' + x + '-' + z, steel, true);
            d.cylinder('union', 2.9, 1.2, steel);
            const pts = [];
            for (let i = 0; i < 6; i++) {
                const a = i * Math.PI / 3;
                pts.push(1.25 * Math.cos(a), 1.25 * Math.sin(a), 0);
            }
            polygon(pts);
            d.extrude('difference', 2, steel, true);
            d.rotate('x', -90);
            d.pop_node();
            d.translate(x, 40.4, z);
        }
    part(createSupport({ color: aluminum }), '11-curved-bearing-support');
    d.push_node('union', '12-support-mounting-pad', aluminum, false);
    d.box('union', 24, 3, 16, aluminum);
    d.translate(-23, 40.5, 0);
    d.pop_node();
    for (const x of [-30, -17])
        cyl('13-support-mounting-bolt-' + x, 2.4, 1.2, x, 42.3, 0, steel);
    part(createTurned({ radius: 4, bore: 2, length: 8, color: gold }), '14-main-bearing-bush', 0, 107.5, 0, 'x', 90);
    cyl('15-crankshaft', 2, 39, 0, 107.5, 0, steel, 'z');
    for (const side of [-1, 1]) {
        d.push_node('union', '16-flywheel-assembly-' + side, polished, false);
        part(createFlywheel({ color: polished }), 'five-curved-spoke-disc', 0, 0, 0, 'z', angle);
        part(createTurned({ radius: 31.9, bore: 30.3, length: .45, color: '#f0f2f4' }), 'bright-machined-rim', 0, 0, side * 2.6, 'x', 90);
        part(createTurned({ radius: 7, bore: 2, length: 7, color: steel }), 'central-wheel-hub', 0, 0, 0, 'x', 90);
        d.pop_node();
        d.translate(0, 107.5, side * 11.5);
    }
    turned('17-power-cylinder-16mm-bore', 'power-cylinder', -6, 55.5, 17);
    turned('18-cylinder-base-collar', 'ring', -6, 41, 17, { radius: 11.5, bore: 8, length: 3, color: steel });
    turned('19-displacer-rod-guide', 'ring', 6, 43, -17, { radius: 4, bore: 1.15, length: 7, color: steel });
    const states = [];
    for (const side of [1, -1]) {
        const a = (angle + (side < 0 ? 90 : 0)) * Math.PI / 180, r = side > 0 ? 4.8 : 4, xAxis = side > 0 ? -6 : 6, z = side * 17;
        const px = r * Math.cos(a), py = 107.5 + r * Math.sin(a), length = side > 0 ? 42 : 46, sy = py - Math.sqrt(length * length - (px - xAxis) ** 2);
        states.push({ side, px, py, sy });
        cyl('20-eccentric-crank-disc-' + side, 6.2, 1.5, 0, 107.5, side * 15.4, steel, 'z');
        cyl('21-offset-crankpin-' + side, 1.1, 4, px, py, z, polished, 'z');
        const dx = px - xAxis, dy = py - sy, mid = [(px + xAxis) / 2, (py + sy) / 2, z];
        d.push_node('union', '22-flat-connecting-rod-' + side, steel, false);
        d.box('union', 2.2, length, 1.05, steel);
        d.rotate('z', -Math.atan2(dx, dy) * 180 / Math.PI);
        d.translate(...mid);
        d.pop_node();
        for (const [xx, yy] of [[px, py], [xAxis, sy]])
            cyl('23-rod-end-eye-' + side + '-' + yy, 1.75, 1.35, xx, yy, z, polished, 'z');
        cyl('24-brass-cross-pin-' + side, 1, 3, xAxis, sy, z, gold, 'z');
        if (side > 0) {
            turned('25-power-piston', 'piston', xAxis, sy - 3.5, z, { radius: 7.95, length: 7, color: gold });
        }
        else {
            cyl('26-displacer-stem', 1, 40, xAxis, sy - 20, z, polished);
            if (p.showInterior !== false)
                turned('27-internal-displacer', 'disc', 0, sy - 40, 0, { radius: 45, length: 4, color: '#555b64' });
        }
    }
    d.pop_node();
    return d;
};
