// 横置石英管斯特林展示机：皮带与空间扫掠。毫米，Y 向上，地面 Y=0。
// 独立零件文档与同文件函数装配；保留原生及网页草图能力分支。
function createBase(p) {
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
    const d = new PartCode3dDocument(), w = p.width ?? 200, dep = p.depth ?? 100, h = p.thickness ?? 10, r = 7, c = p.color, pts = [];
    for (const [x, y, a] of [[w / 2 - r, dep / 2 - r, 0], [-w / 2 + r, dep / 2 - r, 90], [-w / 2 + r, -dep / 2 + r, 180], [w / 2 - r, -dep / 2 + r, 270]])
        for (let i = 0; i <= 20; i++) {
            const t = (a + 90 * i / 20) * Math.PI / 180;
            pts.push(x + r * Math.cos(t), y + r * Math.sin(t), 0);
        }
    d.push_node('union', 'rounded-bamboo-base', c, true);
    polygon(pts);
    d.extrude('union', h, c, true);
    d.rotate('x', -90);
    d.translate(0, -h / 2, 0);
    for (const x of [-89, 89])
        for (const z of [-39, 39]) {
            d.cylinder('difference', 2.2, h + 2, c);
            d.translate(x, 0, z);
        }
    if (p.lampPocket) {
        d.cylinder('difference', 13.5, 5, c);
        d.translate(-77, h / 2, 15);
    }
    d.pop_node();
    return d;
}
// External common tangents join two circular contact arcs; round cord belt.
function createBelt(p) {
    // Native curves preserve the spatial path. Web needs an origin-relative path
    // and a unit section normal; restore the origin on the completed solid.
    function sweepPipe(points, radius, color, name) {
        const v = points[1].map((x, i) => x - points[0][i]);
        let route, section, origin = null;
        if (typeof d.sketch === 'function' && typeof d.sketchCurve === 'function') {
            d.sketch(points.flat(), false);
            route = d.selected_node.get_name();
            d.sketchCurve([{ type: 'circle', params: [...points[0], radius, ...v] }]);
            section = d.selected_node.get_name();
        }
        else {
            origin = points[0];
            const local = points.map(p => p.map((x, i) => x - origin[i]));
            route = name + '-path';
            section = name + '-section';
            d.start_sketch(route, 'z');
            for (let i = 1; i < local.length; i++) {
                if (Math.hypot(...local[i].map((x, j) => x - local[i - 1][j])) < 1e-9)
                    continue;
                d.line_segment(...local[i - 1], ...local[i]);
            }
            d.end_sketch();
            const length = Math.hypot(...v), normal = v.map(x => x / length);
            d.start_sketch(section, [0, 0, 0, ...normal]);
            d.circle(0, 0, 0, radius);
            d.end_sketch();
        }
        d.sweep('union', section, route, color, true);
        if (origin)
            d.translate(...origin);
    }
    const d = new PartCode3dDocument(), A = [58, 78], B = [19, 39], ra = 10.8, rb = 14.8, z = -30;
    const theta = Math.atan2(B[1] - A[1], B[0] - A[0]), alpha = Math.acos((ra - rb) / Math.hypot(B[0] - A[0], B[1] - A[1]));
    let n1 = theta + alpha, n2 = theta - alpha;
    while (n2 < n1)
        n2 += 2 * Math.PI;
    const pts = [];
    for (let i = 0; i <= 90; i++) {
        const a = n1 + (n2 - n1) * i / 90;
        pts.push([A[0] + ra * Math.cos(a), A[1] + ra * Math.sin(a), z]);
    }
    for (let i = 0; i <= 90; i++) {
        const a = n2 + (n1 + 2 * Math.PI - n2) * i / 90;
        pts.push([B[0] + rb * Math.cos(a), B[1] + rb * Math.sin(a), z]);
    }
    pts.push(pts[0]);
    sweepPipe(pts, .65, p.color, 'belt');
    return d;
}
function createFlywheel(p) {
    const d = new PartCode3dDocument(), c = p.color;
    d.push_node('union', 'four-round-hole-flywheel', c, true);
    d.cylinder('union', 27, 5, c);
    d.rotate('x', 90);
    for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2;
        d.cylinder('difference', 5.2, 8, c);
        d.rotate('x', 90);
        d.translate(17 * Math.cos(a), 17 * Math.sin(a), 0);
    }
    d.cylinder('difference', 2, 9, c);
    d.rotate('x', 90);
    d.pop_node();
    return d;
}
function createQuartz(p) {
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
    // Closed rounded end at local Y=-28.5; mouth at +28.5, nominal OD=19.
    pts.push(0, -28.5, 0);
    for (let i = 1; i <= 40; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 80;
        pts.push(9.5 * Math.cos(a), -19 + 9.5 * Math.sin(a), 0);
    }
    pts.push(9.5, 28.5, 0, 8.3, 28.5, 0, 8.3, -19, 0);
    for (let i = 1; i <= 40; i++) {
        const a = -i * Math.PI / 80;
        pts.push(8.3 * Math.cos(a), -19 + 8.3 * Math.sin(a), 0);
    }
    polygon(pts);
    d.revolve('union', 360, 'y', c, true);
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
    // Lower crescent: two concentric semicircles with a pedestal below the belly.
    for (let i = 0; i <= 100; i++) {
        const a = Math.PI + i * Math.PI / 100;
        pts.push(15 + 49 * Math.cos(a), 77 + 49 * Math.sin(a), -3.5);
    }
    for (let i = 100; i >= 0; i--) {
        const a = Math.PI + i * Math.PI / 100;
        pts.push(15 + 39 * Math.cos(a), 77 + 39 * Math.sin(a), -3.5);
    }
    d.push_node('union', 'crescent-pedestal', c, true);
    polygon(pts);
    d.extrude('union', 7, c, true);
    const left = [];
    for (const b of [[[-3.5, 18], [-3.5, 22], [3, 22], [0, 26]], [[0, 26], [-3, 29], [-3, 31], [0, 33]]])
        for (let j = 0; j <= 18; j++) {
            const t = j / 18, s = 1 - t;
            left.push([s ** 3 * b[0][0] + 3 * s * s * t * b[1][0] + 3 * s * t * t * b[2][0] + t ** 3 * b[3][0], s ** 3 * b[0][1] + 3 * s * s * t * b[1][1] + 3 * s * t * t * b[2][1] + t ** 3 * b[3][1]]);
        }
    const outline = [...left, ...left.slice().reverse().map(([x, y]) => [30 - x, y])];
    polygon(outline.flatMap(([x, y]) => [x, y, -6.5]));
    d.extrude('union', 13, c, true);
    d.cylinder('union', 8.5, 9, c);
    d.rotate('x', 90);
    d.translate(58, 78, 0);
    d.box('union', 15, 9, 43, c);
    d.translate(-29, 72, 0);
    for (const a of [207, 222, 238, 306, 322, 338]) {
        const t = a * Math.PI / 180;
        d.cylinder('difference', 2.05, 12, c);
        d.rotate('x', 90);
        d.translate(15 + 44 * Math.cos(t), 77 + 44 * Math.sin(t), 0);
    }
    d.cylinder('difference', 3.6, 14, c);
    d.rotate('x', 90);
    d.translate(58, 78, 0);
    d.pop_node();
    return d;
}
// Revolved profiles use local Y as their axis. Caller orients complete parts.
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
    d.push_node('union', p.kind ?? 'turned-part', c, true);
    if (p.profile) {
        polygon(p.profile.flatMap(([r, y]) => [r, y, 0]));
        d.revolve('union', 360, 'y', c, true);
    }
    else {
        d.cylinder('union', p.radius, p.length, c);
        if (p.round)
            d.fillet(p.round, 'xyz');
    }
    if (p.bore) {
        d.cylinder('difference', p.bore, (p.length ?? 80) + 2, c);
    }
    if (p.ports)
        for (const axis of ['x', 'z']) {
            d.cylinder('difference', 2.3, 30, c);
            d.rotate(axis, 90);
        }
    if (p.grooves)
        for (const y of p.grooves) {
            d.push_node('difference', 'turned-ring-groove', c, true);
            d.cylinder('union', p.radius + 1, p.grooveWidth ?? .65, c);
            d.cylinder('difference', p.radius - (p.grooveDepth ?? .65), 2, c);
            d.pop_node();
            d.translate(0, y, 0);
        }
    d.pop_node();
    return d;
}
function createWick(p) {
    // Native curves preserve the spatial path. Web needs an origin-relative path
    // and a unit section normal; restore the origin on the completed solid.
    function sweepPipe(points, radius, color, name) {
        const v = points[1].map((x, i) => x - points[0][i]);
        let route, section, origin = null;
        if (typeof d.sketch === 'function' && typeof d.sketchCurve === 'function') {
            d.sketch(points.flat(), false);
            route = d.selected_node.get_name();
            d.sketchCurve([{ type: 'circle', params: [...points[0], radius, ...v] }]);
            section = d.selected_node.get_name();
        }
        else {
            origin = points[0];
            const local = points.map(p => p.map((x, i) => x - origin[i]));
            route = name + '-path';
            section = name + '-section';
            d.start_sketch(route, 'z');
            for (let i = 1; i < local.length; i++) {
                if (Math.hypot(...local[i].map((x, j) => x - local[i - 1][j])) < 1e-9)
                    continue;
                d.line_segment(...local[i - 1], ...local[i]);
            }
            d.end_sketch();
            const length = Math.hypot(...v), normal = v.map(x => x / length);
            d.start_sketch(section, [0, 0, 0, ...normal]);
            d.circle(0, 0, 0, radius);
            d.end_sketch();
        }
        d.sweep('union', section, route, color, true);
        if (origin)
            d.translate(...origin);
    }
    const d = new PartCode3dDocument(), c = '#ede3c8';
    d.push_node('union', 'cotton-wick-braid', c, false);
    d.cylinder('union', 2.35, 22, c);
    for (let k = 0; k < 4; k++) {
        const pts = [];
        for (let i = 0; i <= 180; i++) {
            const t = i / 180, a = t * 12 * Math.PI + k * Math.PI / 2;
            pts.push([2.35 * Math.cos(a), -11 + 22 * t, 2.35 * Math.sin(a)]);
        }
        sweepPipe(pts, .22, c, 'wick-' + k);
    }
    d.pop_node();
    return d;
}
let main = function (params) {
    const p = params ?? {}, d = new PartCode3dDocument(), angle = p.crankAngle ?? 8;
    if (!Number.isFinite(angle))
        throw Error('crankAngle must be finite');
    const silver = '#c8cdd3', bright = '#e2e5e9', steel = '#828891', gold = '#bb913e', red = '#a73518', wood = '#d6ab65';
    const hotTheta = angle * Math.PI / 180, hotPinX = 58 + 6 * Math.cos(hotTheta), hotPinY = 78 + 6 * Math.sin(hotTheta);
    const hotSliderX = hotPinX - Math.sqrt(47 ** 2 - (hotPinY - 78) ** 2 - 13.5 ** 2);
    d.push_node('union', 'horizontal-quartz-Stirling', silver, false);
    function add(doc, name, x = 0, y = 0, z = 0, axis = null, deg = 0) { d.add_part(doc, 'union', name); if (axis)
        d.rotate(axis, deg); d.translate(x, y, z); }
    function lathe(name, x, y, z, extra, orient = 'y') { add(createTurned({ color: bright, ...extra }), name, x, y, z, orient === 'x' ? 'z' : orient === 'z' ? 'x' : null, orient === 'x' ? -90 : 90); }
    function cyl(name, r, h, x, y, z, c = steel, orient = 'y') { lathe(name, x, y, z, { radius: r, length: h, color: c }, orient); }
    add(createBase({ color: wood, lampPocket: true }), '01-bamboo-base', 0, 13, 0);
    for (const y of [9.2, 16.8])
        add(createBase({ color: '#ead2a0', thickness: .45 }), '02-bamboo-lamination-' + y, 0, y, 0);
    for (const x of [-89, 89])
        for (const z of [-39, 39]) {
            lathe('03-grooved-silver-foot-' + x + '-' + z, x, 4, z, { radius: 7.5, length: 8, round: .4, grooves: [-1.8, 1.1] });
            lathe('04-brass-base-washer-' + x + '-' + z, x, 19.1, z, { profile: [[2, -1.1], [5.9, -1.1], [4.5, 1.1], [2, 1.1]], bore: 2, length: 3, color: gold });
            cyl('05-dark-screw-head-' + x + '-' + z, 2.6, 1.3, x, 20, z, '#373b43');
            cyl('06-screw-drive-' + x + '-' + z, 1, 1.4, x, 20.2, z, '#17191d');
        }
    add(createSupport({ color: silver }), '07-curved-perforated-support');
    for (const x of [3, 27])
        cyl('08-pedestal-fastener-' + x, 2, 1.2, x, 30.3, 0, steel);
    lathe('09-main-bronze-bearing', 58, 78, 0, { radius: 3.6, bore: 2, length: 11, color: gold }, 'z');
    cyl('10-main-shaft', 2, 66, 58, 78, 0, steel, 'z');
    add(createFlywheel({ color: silver }), '11-54mm-four-hole-flywheel', 58, 78, 24, 'z', angle);
    lathe('12-flywheel-bright-perimeter', 58, 78, 26.6, { radius: 26.5, bore: 25.5, length: .4 }, 'z');
    lathe('13-flywheel-hub', 58, 78, 21, { radius: 7, bore: 2, length: 10, color: steel }, 'z');
    cyl('14-front-crank-disc', 10, 1.5, 58, 78, 28.2, silver, 'z');
    // Front hot cylinder: glass tube, visible displacer, seal lands, cooling fins and nose.
    add(createQuartz({ color: '#c9e0e7' }), '15-clear-quartz-19mm-tube', -62.5, 78, 16, 'z', -90);
    lathe('16-hot-displacer-visible', hotSliderX - 65, 78, 16, { profile: [[0, -16], [2, -16], [7.5, -11], [7.5, 14], [0, 14]] }, 'x');
    lathe('17-hot-tube-clamping-sleeve', -46, 78, 16, { radius: 10.1, bore: 9.55, length: 20, color: steel }, 'x');
    for (const x of [-35, -31, -27])
        lathe('18-red-heat-resistant-seal-' + x, x, 78, 16, { radius: 10.25, bore: 8.5, length: 1.4, color: red }, 'x');
    lathe('19-hot-cooling-body', -21, 78, 16, { radius: 11.7, bore: 1.2, length: 18 }, 'x');
    for (const [x, r] of [[-25, 14], [-21, 15.5], [-17, 15.5], [-13, 14]])
        lathe('20-hot-cooling-fin-' + x, x, 78, 16, { radius: r, bore: 1.2, length: 1.7 }, 'x');
    lathe('21-tapered-displacer-head', -5, 78, 16, { profile: [[1.2, -8], [12, -8], [11.9, -6], [10.5, -3], [7, 1], [4.2, 4], [3.5, 7], [1.2, 7]], length: 16, bore: 1.2 }, 'x');
    // Rear power cylinder, open end to the crankshaft, machined rings and capped cold head.
    lathe('22-16mm-power-cylinder', 5, 78, -17, { radius: 10, length: 38, bore: 8, grooves: [-12, -3, 6, 15], color: steel }, 'x');
    lathe('23-cold-end-collar', -19, 78, -17, { radius: 12, length: 11, bore: 8, ports: true }, 'x');
    for (const [x, r] of [[-26, 12.5], [-29, 10.7], [-32, 8.7]])
        lathe('24-cold-cap-fin-' + x, x, 78, -17, { radius: r, length: 1.8 }, 'x');
    lathe('25-rounded-cold-nose', -36, 78, -17, { profile: [[0, -6], [1, -6], [3, -5], [5, -3], [6.5, 0], [6.5, 4], [0, 4]] }, 'x');
    // Static crank-slider poses; 16 mm power stroke uses an 8 mm crank throw.
    for (const side of [1, -1]) {
        const a = (angle + (side < 0 ? 90 : 0)) * Math.PI / 180, r = side > 0 ? 6 : 8, rodLength = side > 0 ? 47 : 43, axisZ = side > 0 ? 16 : -17, crankZ = side > 0 ? 29.5 : -22;
        const px = 58 + r * Math.cos(a), py = 78 + r * Math.sin(a), sx = px - Math.sqrt(rodLength ** 2 - (py - 78) ** 2 - (crankZ - axisZ) ** 2);
        cyl('26-crank-pin-' + side, 1.15, 4, px, py, crankZ, gold, 'z');
        const A = [sx, 78, axisZ], B = [px, py, crankZ], v = B.map((b, i) => b - A[i]), L = Math.hypot(...v), n = v.map(x => x / L), q = Math.sqrt(2 * (1 + n[1]));
        d.push_node('union', '27-connecting-rod-' + side, steel, false);
        d.box('union', 1.25, L, 2.4, steel);
        d.rotate_by_quaternion(n[2] / q, 0, -n[0] / q, q / 2);
        d.translate(...A.map((x, i) => (x + B[i]) / 2));
        d.pop_node();
        cyl('28-crosshead-pin-' + side, 1.4, 3, sx, 78, axisZ, gold, 'z');
        if (side > 0)
            cyl('29-displacer-pushrod', 1.1, 65, sx - 32.5, 78, 16, bright, 'x');
        else {
            lathe('30-brass-power-piston', sx - 4, 78, -17, { radius: 7.95, length: 8, color: gold }, 'x');
        }
    }
    cyl('31-rear-eccentric-disc', 10, 2, 58, 78, -21, silver, 'z');
    lathe('32-24mm-drive-pulley', 58, 78, -30, { profile: [[2, -4], [12, -4], [12, -2.4], [10.1, -1], [10.1, 1], [12, 2.4], [12, 4], [2, 4]], bore: 2, length: 8 }, 'z');
    cyl('33-driven-shaft', 2, 35, 19, 39, -17, steel, 'z');
    lathe('34-driven-shaft-bearing', 19, 39, -8, { radius: 5, bore: 2, length: 9, color: steel }, 'z');
    lathe('35-driven-pulley', 19, 39, -30, { profile: [[2, -3], [5, -3], [8, -5], [12, -7], [13, -8], [17, -8], [17, -6], [15, -4], [17, -2.7], [17, -1.7], [14.1, -.5], [14.1, .5], [17, 1.7], [17, 5], [13, 5], [13, 8], [2, 8]], bore: 2, length: 16 }, 'z');
    cyl('35a-driven-shaft-end-screw', 2.7, 1.2, 19, 39, -33.6, steel, 'z');
    cyl('35b-drive-shaft-end-screw', 2.7, 1.2, 58, 78, -34.6, steel, 'z');
    add(createBelt({ color: red }), '36-red-round-drive-belt');
    // Unlit spirit lamp; hollow glass reservoir and cotton wick, for visual reference.
    lathe('37-clear-spirit-lamp', -77, 18, 16, { color: '#d9e2dd', profile: [[0, 0], [10, 0], [12, 2], [12.7, 5], [12.7, 10], [11.3, 15], [7, 18], [6, 19], [6, 24], [4.8, 24], [4.8, 20], [6, 18], [10, 15], [11.4, 10], [11.4, 4], [9.5, 1.5], [0, 1.5]] });
    lathe('38-brass-lamp-neck', -77, 43, 16, { radius: 6.8, bore: 3, length: 3, color: gold });
    lathe('39-brass-wick-guide', -77, 45, 16, { radius: 4, bore: 2.5, length: 2, color: gold });
    add(createWick({}), '40-cotton-wick', -77, 46, 16);
    d.pop_node();
    return d;
};
