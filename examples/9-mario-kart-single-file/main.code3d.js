// 无人物卡丁车。毫米，Y 向上，+Z 朝车头。
// 零件在独立文档中构建，通过 main 中的装配函数定位。
function createBadge() {
    const d = new PartCode3dDocument();
    d.push_node('union', 'M-hood-badge', '#ffffff', false);
    d.cylinder('union', 14.3, .55, '#fffdf4');
    const pts = [[-10, -7], [-8.5, 7], [-4.5, 7], [0, 1.5], [4.5, 7], [8.5, 7], [10, -7], [5, -7], [4.2, 0], [0, -4.7], [-4.2, 0], [-5, -7]];
    d.start_sketch('M-badge-profile', 'z');
    for (let i = 0; i < pts.length; i++) {
        const a = pts[i], b = pts[(i + 1) % pts.length];
        d.line_segment(a[0], a[1], 0, b[0], b[1], 0);
    }
    d.end_sketch();
    d.extrude('union', .35, '#d92126', true);
    d.rotate('x', -90);
    d.translate(0, .3, 0);
    d.pop_node();
    return d;
}
function createCameraArm(p) {
    const d = new PartCode3dDocument(), pts = [];
    // Compact forward-curving arch: broad rounded shoulder, short horizontal crown.
    const curves = [[[-74, 58], [-70, 74], [-60, 103], [-51, 113]], [[-51, 113], [-45, 121], [-35, 122], [-27, 122]], [[-27, 122], [-23, 122], [-20, 122], [-18, 121]], [[-18, 121], [-18, 116], [-18, 111], [-18, 106]], [[-18, 106], [-23, 106], [-27, 106], [-31, 106]], [[-31, 106], [-38, 106], [-40, 103], [-44, 97]], [[-44, 97], [-49, 86], [-52, 69], [-56, 58]]];
    for (const b of curves)
        for (let j = 0; j <= 24; j++) {
            const t = j / 24, s = 1 - t, z = s ** 3 * b[0][0] + 3 * s * s * t * b[1][0] + 3 * s * t * t * b[2][0] + t ** 3 * b[3][0], y = s ** 3 * b[0][1] + 3 * s * s * t * b[1][1] + 3 * s * t * t * b[2][1] + t ** 3 * b[3][1];
            pts.push(-z, y, 0);
        }
    d.start_sketch('camera-arm-profile', 'z');
    // Adjacent Bezier segments share an endpoint; omit zero-length edges.
    for (let i = 0; i < pts.length; i += 3) {
        const j = (i + 3) % pts.length;
        if (Math.hypot(pts[j] - pts[i], pts[j + 1] - pts[i + 1]) < 1e-9)
            continue;
        d.line_segment(pts[i], pts[i + 1], 0, pts[j], pts[j + 1], 0);
    }
    d.end_sketch();
    d.extrude('union', 18, p.color, true);
    d.rotate('y', 90);
    d.translate(-9, 0, 0);
    return d;
}
// Curved side elevation, extruded across the vehicle. +Z is the nose.
function createHood(p) {
    const d = new PartCode3dDocument(), c = p.color, start = 26, end = p.red ? 96 : 100, width = p.red ? 72 : 83, t = p.red ? 3.2 : 7;
    function height(z) { return 68 - .4 * (z - 26) - .0018 * (z - 26) ** 2 + (p.red ? 1 : 0); }
    const a = [start, height(start)], b = [(start + end) / 2, height((start + end) / 2)], f = [end, height(end)];
    const D = 2 * (a[0] * (b[1] - f[1]) + b[0] * (f[1] - a[1]) + f[0] * (a[1] - b[1])), aa = a[0] ** 2 + a[1] ** 2, bb = b[0] ** 2 + b[1] ** 2, ff = f[0] ** 2 + f[1] ** 2;
    const cz = (aa * (b[1] - f[1]) + bb * (f[1] - a[1]) + ff * (a[1] - b[1])) / D, cy = (aa * (f[0] - b[0]) + bb * (a[0] - f[0]) + ff * (b[0] - a[0])) / D, R = Math.hypot(a[0] - cz, a[1] - cy);
    d.push_node('union', 'smooth-curved-hood', c, true);
    d.cylinder('union', R, width, c);
    d.rotate('z', 90);
    d.translate(0, cy, cz);
    d.cylinder('difference', R - t, width + 2, c);
    d.rotate('z', 90);
    d.translate(0, cy, cz);
    d.box('intersection', width + 1, 80, end - start, c);
    d.translate(0, 45, (start + end) / 2);
    d.pop_node();
    d.fillet(p.red ? 1.2 : 1.6, 'xyz');
    return d;
}
function createNozzle(p) {
    const d = new PartCode3dDocument(), L = p.length, black = '#292c32', yellow = '#ead31b';
    d.push_node('union', 'trumpet-exhaust-assembly', black, false);
    d.push_node('union', 'dark-tapered-nozzle', black, true);
    d.cone('union', 11.6, 5.1, L, black);
    d.cone('difference', 9.4, 2.5, L + 1, black);
    d.pop_node();
    // Reference toy has a shallow yellow cup at the outlet, not a black open bore.
    d.push_node('union', 'yellow-nozzle-mouth', yellow, true);
    d.cylinder('union', 12.6, 5.8, yellow);
    d.fillet(1.7, 'xyz');
    d.sphere('difference', 11, yellow);
    d.translate(0, 10.7, 0);
    d.pop_node();
    d.translate(0, L / 2, 0);
    d.pop_node();
    return d;
}
// Analytic annular elbow + tangent straight sockets. Local elbow axis is Y.
// Circular section is built by revolution, independent of sweep-frame behavior.
function createRoundExhaustPipe(params) {
    const p = params ?? {}, d = new PartCode3dDocument(), R = p.bendRadius ?? 6.5, ro = 3.5, ri = 2.3, L = p.outletLength ?? 7, entry = 2, c = p.color ?? '#eeefeb';
    const angle = p.angle ?? Math.acos(8 / Math.hypot(8, 11, 32)) * 180 / Math.PI, a = angle * Math.PI / 180, E = [R * Math.cos(a), 0, -R * Math.sin(a)], T = [-Math.sin(a), 0, -Math.cos(a)];
    function bend(op, r, name) { d.start_sketch(name, 'z'); d.circle(R, 0, 0, r); d.end_sketch(); d.revolve(op, angle, 'y', c, true); }
    function inlet(op, r, extra) { d.cylinder(op, r, entry + .2 + extra, c); d.rotate('x', 90); d.translate(R, 0, entry / 2 - .1); }
    function outlet(op, r, extra) { d.cylinder(op, r, L + .2 + extra, c); d.rotate_by_quaternion(T[2] / Math.sqrt(2), 0, -T[0] / Math.sqrt(2), 1 / Math.sqrt(2)); d.translate(...E.map((x, i) => x + T[i] * (L / 2 - .1))); }
    d.push_node('union', 'white-round-hollow-elbow', c, true);
    bend('union', ro, 'outer-circular-section');
    inlet('union', ro, 0);
    outlet('union', ro, 0);
    bend('difference', ri, 'inner-circular-section');
    inlet('difference', ri, .4);
    outlet('difference', ri, .4);
    d.pop_node();
    return d;
}
function createRoundedBox(p) { const d = new PartCode3dDocument(); d.box('union', p.w, p.h, p.depth, p.color); if (p.r)
    d.fillet(p.r, 'xyz'); return d; }
function createSteering() {
    const d = new PartCode3dDocument(), c = '#22262b';
    d.push_node('union', 'three-spoke-steering-wheel', c, true);
    d.cylinder('union', 10.7, 3, c);
    d.fillet(1, 'xyz');
    d.cylinder('difference', 8.2, 5, c);
    for (let k = 0; k < 3; k++) {
        const a = k * 2 * Math.PI / 3;
        d.box('union', 2, 2.5, 9, c);
        d.rotate('y', a * 180 / Math.PI);
        d.translate(4.5 * Math.sin(a), 0, 4.5 * Math.cos(a));
    }
    d.cylinder('union', 3.2, 3.7, '#666b70');
    d.pop_node();
    return d;
}
// Wheel axis local Y. Outboard face is +Y. Reusable at either side of the kart.
function createWheel(p) {
    const d = new PartCode3dDocument(), r = p.radius, w = p.width, rubber = '#25272a', yellow = '#ead31b';
    d.push_node('union', 'wheel-assembly', rubber, false);
    d.push_node('union', 'treaded-rubber-tire', rubber, true);
    d.cylinder('union', r, w, rubber);
    d.fillet(w * .29, 'xyz');
    d.cylinder('difference', 11.5, w + 2, rubber);
    for (let k = 0; k < 26; k++)
        for (const side of [-1, 1]) {
            const a = k * 2 * Math.PI / 26 + (side < 0 ? .05 : 0), b = side * .55, sA = Math.sin(a / 2), cA = Math.cos(a / 2), sB = Math.sin(b / 2), cB = Math.cos(b / 2);
            d.box('difference', .8, w * .51, 3.2, rubber);
            d.rotate_by_quaternion(sA * sB, sA * cB, cA * sB, cA * cB);
            d.translate((r - .65) * Math.sin(a), side * w * .22, (r - .65) * Math.cos(a));
        }
    d.pop_node();
    d.push_node('union', 'yellow-recessed-wheel-rim', yellow, true);
    const profile = [[3, -w / 2 + 1], [10.8, -w / 2 + 1], [12, -w / 2 + 3], [12, w / 2 - 1], [11.3, w / 2 + .2], [9, w / 2 + .2], [7.7, w / 2 - 1.7], [3, w / 2 - 1.7]];
    d.start_sketch('wheel-rim-profile', 'z');
    for (let i = 0; i < profile.length; i++) {
        const a = profile[i], b = profile[(i + 1) % profile.length];
        d.line_segment(a[0], a[1], 0, b[0], b[1], 0);
    }
    d.end_sketch();
    d.revolve('union', 360, 'y', yellow, true);
    d.pop_node();
    d.push_node('union', 'yellow-hub-cap', '#e1bd0c', false);
    d.cylinder('union', 6.4, 1.8, '#e1bd0c');
    d.fillet(.6, 'xyz');
    d.translate(0, w / 2 - .8, 0);
    d.pop_node();
    d.pop_node();
    return d;
}
let main = function (params) {
    const p = params ?? {}, d = new PartCode3dDocument(), red = p.bodyColor ?? '#d51d25', white = '#eeefeb', blue = '#0871c5', dark = '#20252e', yellow = '#ebd21b';
    const scale = p.scale ?? 1;
    if (!Number.isFinite(scale) || scale <= 0)
        throw Error('scale must be positive');
    d.push_node('union', 'Mario-kart-no-driver', red, false);
    function add(doc, name, x = 0, y = 0, z = 0, axis = null, deg = 0) { d.add_part(doc, 'union', name); if (axis)
        d.rotate(axis, deg); d.translate(x, y, z); }
    function box(name, w, h, dep, x, y, z, color, r = 0, axis = null, deg = 0) { add(createRoundedBox({ w, h, depth: dep, color, r }), name, x, y, z, axis, deg); }
    function cyl(name, r, h, x, y, z, color, axis = null, deg = 0) { d.push_node('union', name, color, false); d.cylinder('union', r, h, color); if (axis)
        d.rotate(axis, deg); d.translate(x, y, z); d.pop_node(); }
    function orientBetween(A, B) { const v = B.map((x, i) => x - A[i]), L = Math.hypot(...v), n = v.map(x => x / L), q = Math.sqrt(2 * (1 + n[1])); d.rotate_by_quaternion(n[2] / q, 0, -n[0] / q, q / 2); d.translate(...A.map((x, i) => (x + B[i]) / 2)); }
    function basisQuaternion(X, Y, Z) {
        const m00 = X[0], m01 = Y[0], m02 = Z[0], m10 = X[1], m11 = Y[1], m12 = Z[1], m20 = X[2], m21 = Y[2], m22 = Z[2], tr = m00 + m11 + m22;
        if (tr > 0) {
            const s = 2 * Math.sqrt(tr + 1);
            return [(m21 - m12) / s, (m02 - m20) / s, (m10 - m01) / s, s / 4];
        }
        if (m00 > m11 && m00 > m22) {
            const s = 2 * Math.sqrt(1 + m00 - m11 - m22);
            return [s / 4, (m01 + m10) / s, (m02 + m20) / s, (m21 - m12) / s];
        }
        if (m11 > m22) {
            const s = 2 * Math.sqrt(1 + m11 - m00 - m22);
            return [(m01 + m10) / s, s / 4, (m12 + m21) / s, (m02 - m20) / s];
        }
        const s = 2 * Math.sqrt(1 + m22 - m00 - m11);
        return [(m02 + m20) / s, (m12 + m21) / s, s / 4, (m10 - m01) / s];
    }
    box('01-black-chassis', 105, 10, 159, 0, 20, -2, dark, 3);
    box('02-open-cockpit-floor', 52, 5, 66, 0, 27, -8, '#151b24', 2);
    for (const z of [63, -63])
        cyl('03-transverse-axle-' + z, 3, 129, 0, z > 0 ? 23 : 25, z, '#535b64', 'z', 90);
    const front = createWheel({ radius: 23, width: 18 }), rear = createWheel({ radius: 25, width: 20 });
    for (const side of [-1, 1]) {
        add(front, '04-front-wheel-' + side, side * 64, 23, 63, 'z', -side * 90);
        add(rear, '05-rear-wheel-' + side, side * 64, 25, -63, 'z', -side * 90);
        box('06-red-side-pod-' + side, 28, 27, 63, side * 46, 39, -7, red, 3.2);
        box('07-white-side-panel-' + side, 2.8, 18, 55, side * 60.3, 33, -5, white, 1.1);
        box('08-blue-side-sill-' + side, 1.4, 5.3, 30, side * 62, 25.8, -9, blue, .6);
        box('09-side-pod-top-inset-' + side, 22, 1.2, 45, side * 46, 52.8, -8, '#e22b30', .4);
        box('10-side-service-hatch-' + side, 14, .45, 14, side * 46, 53.6, -22, red, .2);
        // Triangular black structural cheek under the sloping hood.
        const pts = [[-25, 61, 0], [-79, 23, 0], [-27, 23, 0]];
        d.start_sketch('seat-side-profile', 'z');
        for (let i = 0; i < pts.length; i++) {
            const a = pts[i], b = pts[(i + 1) % pts.length];
            d.line_segment(...a, ...b);
        }
        d.end_sketch();
        d.extrude('union', 3, dark, true);
        d.rotate('y', 90);
        d.translate(side * 29 - 1.5, 0, 0);
    }
    add(createHood({ color: white, red: false }), '11-white-curved-nose-frame');
    add(createHood({ color: red, red: true }), '12-red-sloping-nose');
    const badgeZ = 56, badgeY = 68 - .4 * (badgeZ - 26) - .0018 * (badgeZ - 26) ** 2 + 1.6, badgeTilt = Math.atan(.4 + .0036 * (badgeZ - 26)) * 180 / Math.PI;
    add(createBadge({}), '13-white-M-emblem', 0, badgeY, badgeZ, 'x', badgeTilt);
    box('14-white-front-bumper', 133, 15, 16, 0, 28, 102, white, 4);
    box('15-front-bumper-upper-lip', 127, 3.3, 14, 0, 36.1, 102, '#f5f5ef', 1.5);
    box('16-blue-front-lower-stripe', 80, 5.5, 1.7, 0, 23, 110.2, blue, .6);
    box('17-red-rear-engine-cover', 102, 26, 39, 0, 43, -66, red, 4);
    box('18-red-rear-deck', 92, 5, 36, 0, 58, -66, red, 2);
    box('19-white-rear-bumper', 99, 8, 12, 0, 28, -88, white, 2.4);
    box('20-blue-rear-valance', 79, 7, 2.8, 0, 22, -94, blue, 1.1);
    for (let k = -3; k <= 3; k++)
        box('21-rear-valance-groove-' + k, 1.2, 4, 1, k * 10, 21.4, -95.5, '#134f94', .3);
    // Empty navy bucket seat. No human geometry is included.
    box('22-empty-seat-cushion', 38, 7, 35, 0, 34, -23, '#202c42', 3);
    box('23-empty-seat-backrest', 39, 37, 8, 0, 54, -43, '#202c42', 3, 'x', -10);
    box('24-seat-back-inset', 28, 26, 2, 0, 55, -37.5, '#172238', .9, 'x', -10);
    for (const side of [-1, 1])
        box('25-seat-side-bolster-' + side, 5, 20, 28, side * 20.5, 42, -24, '#1d293e', 2);
    const colA = [0, 43, 28], colB = [0, 62, 10];
    d.push_node('union', '26-steering-column', '#737a7e', false);
    d.cylinder('union', 2.5, Math.hypot(...colB.map((x, i) => x - colA[i])), '#737a7e');
    orientBetween(colA, colB);
    d.pop_node();
    // Wheel normal follows the column toward the empty seat: +Y and -Z.
    add(createSteering({}), '27-steering-wheel', 0, 64, 8, 'x', -43);
    for (const x of [-8, 8])
        box('28-footwell-pedal-' + x, 7, 2, 10, x, 29, 16, '#68727c', .8, 'x', -25);
    // White curved camera mast and forward-facing lens housing.
    add(createCameraArm({ color: white }), '29-curved-white-camera-mast');
    d.push_node('union', '30-grey-mast-vent', '#a5aaac', true);
    d.box('union', 7, 14, .8, '#a5aaac');
    for (let j = -4; j <= 4; j++) {
        d.box('difference', 6, .55, 1.4, '#a5aaac');
        d.translate(0, j * 1.35, 0);
    }
    d.pop_node();
    d.rotate('x', 29);
    d.translate(0, 107, -55.4);
    box('31-white-camera-housing', 34, 24, 24, 0, 111, -25, white, 2.5);
    box('32-black-camera-face', 31, 21, 2.4, 0, 111, -12.4, '#191d24', .8);
    cyl('33-camera-lens-barrel', 8.5, 2.7, 0, 111, -10.6, '#484e55', 'x', 90);
    cyl('34-camera-lens-ring', 7.1, 1.2, 0, 111, -8.9, '#757f86', 'x', 90);
    cyl('35-dark-camera-glass', 6.1, 1.1, 0, 111, -8.1, '#152833', 'x', 90);
    cyl('36-inner-lens-optics', 3.7, .7, 0, 111, -7.4, '#0b151e', 'x', 90);
    cyl('37-lens-small-reflection', 1.2, .35, -1.5, 113, -6.9, '#a3c6d7', 'x', 90);
    for (const side of [-1, 1]) {
        cyl('38-red-exhaust-pivot-' + side, 12, 9, side * 37, 68, -68, red, 'z', 90);
        cyl('39-yellow-exhaust-collar-' + side, 10.1, 3.5, side * 43, 68, -68, yellow, 'z', 90);
        cyl('40-yellow-exhaust-centre-' + side, 6.2, 3, side * 45, 68, -68, '#e1bd0c', 'z', 90);
        const A = [side * 50, 72, -79], B = [side * 58, 83, -111], nozzleLength = Math.hypot(...B.map((x, i) => x - A[i])), v = B.map((x, i) => (x - A[i]) / nozzleLength), u = [side, 0, 0], co = 8 / nozzleLength, si = Math.sqrt(1 - co * co), w = v.map((x, i) => (x - u[i] * co) / si), R = 6.5, L = 7;
        const S = A.map((x, i) => x - R * si * u[i] - R * (1 - co) * w[i] - L * v[i]), C = S.map((x, i) => x + R * w[i]);
        const X = w.map(x => -x), Y = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]], Z = u.map(x => -x);
        add(createRoundExhaustPipe({ bendRadius: R, outletLength: L, angle: Math.acos(co) * 180 / Math.PI, color: white }), '40a-white-round-exhaust-pipe-' + side);
        d.rotate_by_quaternion(...basisQuaternion(X, Y, Z));
        d.translate(...C);
        add(createNozzle({ length: nozzleLength }), '41-rear-trumpet-nozzle-' + side);
        orientBetween(A, B);
    }
    d.pop_node();
    d.scale(scale, scale, scale);
    return d;
};
