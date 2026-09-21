// 圆杆靠背木椅。毫米，Y 向上，+Z 朝前，地面 Y=0。
// 默认座宽 400、座深 360、座高 450、总高 860、顶梁宽 450；连接尺寸为示例近似值。
// A rounded tapered dowel built at the origin, along local +Y.
function createRod(p) {
    const d = new PartCode3dDocument();
    if (Math.abs(p.topRadius - p.bottomRadius) < 1e-8) {
        d.cylinder('union', p.topRadius, p.length, p.color);
    }
    else {
        d.cone('union', p.topRadius, p.bottomRadius, p.length, p.color);
    }
    d.fillet(p.edgeRadius ?? 0.65, 'xyz');
    return d;
}
// Formed plywood seat. Millimetres, Y up, +Z toward the sitter's knees.
function createSeat(p) {
    const d = new PartCode3dDocument();
    const color = p.color;
    const R = 2000, cy = 2442, join = 125, lipR = 100, t = p.thickness;
    const yJoin = cy - Math.sqrt(R * R - join * join);
    const lipX = join + lipR * join / R;
    const lipY = yJoin - lipR * Math.sqrt(1 - (join / R) ** 2);
    const rearA = Math.asin(-180 / R) * 180 / Math.PI - 90;
    const joinA = Math.asin(join / R) * 180 / Math.PI - 90;
    const lipA = Math.acos((180 - lipX) / lipR) * 180 / Math.PI;
    const backY = cy - Math.sqrt(R * R - 180 * 180);
    const frontY = lipY + Math.sqrt(lipR * lipR - (180 - lipX) ** 2);
    d.push_node('union', 'formed-seat-solid', color, true);
    d.start_sketch('seat-side-section', 'z');
    d.arc(0, cy, 0, R, rearA, joinA, true);
    d.arc(lipX, lipY, 0, lipR, lipA, joinA + 180, true);
    d.line_segment(180, frontY, 0, 180, frontY - t, 0);
    d.arc(lipX, lipY - t, 0, lipR, lipA, joinA + 180, true);
    d.arc(0, cy - t, 0, R, rearA, joinA, true);
    d.line_segment(-180, backY - t, 0, -180, backY, 0);
    d.end_sketch();
    d.extrude('union', 400, color, true);
    d.rotate('y', -90);
    d.translate(200, 0, 0);
    // Rounded plan outline clips the genuinely curved, constant-offset section.
    const w = 200, h = 180, r = 65;
    d.start_sketch('rounded-seat-plan', 'z');
    d.line_segment(-w + r, -h, 0, w - r, -h, 0);
    d.arc(w - r, -h + r, 0, r, 270, 360, true);
    d.line_segment(w, -h + r, 0, w, h - r, 0);
    d.arc(w - r, h - r, 0, r, 0, 90, true);
    d.line_segment(w - r, h, 0, -w + r, h, 0);
    d.arc(-w + r, h - r, 0, r, 90, 180, true);
    d.line_segment(-w, h - r, 0, -w, -h + r, 0);
    d.arc(-w + r, -h + r, 0, r, 180, 270, true);
    d.end_sketch();
    d.extrude('intersection', 100, color, true);
    d.rotate('x', 90);
    d.translate(0, 500, 0);
    d.pop_node();
    d.fillet(2, 'xyz');
    return d;
}
// Bent solid-birch crest rail, circular in plan, with softly rounded ends.
function createTopRail(p) {
    const d = new PartCode3dDocument();
    const R = 900, thickness = 22, width = p.width, height = 44;
    d.push_node('union', 'curved-crest-rail', p.color, true);
    d.cylinder('union', R + thickness / 2, height, p.color);
    d.translate(0, 0, R);
    d.cylinder('difference', R - thickness / 2, height + 10, p.color);
    d.translate(0, 0, R);
    const r = height / 2, end = width / 2 - r;
    d.start_sketch('capsule-front-elevation', 'z');
    d.line_segment(-end, -r, 0, end, -r, 0);
    d.arc(end, 0, 0, r, -90, 90, true);
    d.line_segment(end, r, 0, -end, r, 0);
    d.arc(-end, 0, 0, r, 90, 270, true);
    d.end_sketch();
    d.extrude('intersection', 100, p.color, true);
    d.translate(0, 0, -50);
    d.pop_node();
    d.fillet(3, 'xyz');
    return d;
}
let main = function (params) {
    const p = params ?? {};
    const width = p.seatWidth ?? 400, depth = p.seatDepth ?? 360;
    const height = p.height ?? 860, seatHeight = p.seatHeight ?? 450;
    const crestWidth = p.crestWidth ?? 450, thickness = p.seatThickness ?? 18;
    const wood = p.woodColor ?? '#d9b98b', veneer = p.seatColor ?? '#e4c99f';
    if (width < 340 || width > 500 || depth < 300 || depth > 450 || seatHeight < 380 || seatHeight > 520 || height < seatHeight + 300 || height > 1000 || crestWidth < 380 || crestWidth > 520 || thickness < 12 || thickness > 24) {
        throw new Error('Chair parameters outside supported furniture-size ranges.');
    }
    const d = new PartCode3dDocument();
    const sx = width / 400, sz = depth / 360;
    d.add_part(createSeat({ color: veneer, thickness }), 'union', '01-formed-plywood-seat');
    d.scale(sx, 1, sz);
    d.translate(0, seatHeight - 450, 0);
    // Transform a local Y-axis rod to its two attachment points.
    function rod(name, a, b, r0, r1, color, edgeRadius, flatFloor) {
        if (flatFloor)
            d.push_node('union', name + '-floor-trim', color, true);
        const v = b.map((x, i) => x - a[i]), length = Math.hypot(...v);
        d.add_part(createRod({ length, bottomRadius: r0, topRadius: r1, color, edgeRadius }), 'union', name);
        const vx = v[0] / length, vy = v[1] / length, vz = v[2] / length;
        const q = Math.sqrt(2 * (1 + vy));
        d.rotate_by_quaternion(vz / q, 0, -vx / q, q / 2);
        d.translate(...a.map((x, i) => (x + b[i]) / 2));
        if (flatFloor) {
            d.box('difference', 1000, 100, 1000, color);
            d.translate(0, -50, 0);
            d.pop_node();
        }
    }
    function onLeg(a, b, y) { const t = (y - a[1]) / (b[1] - a[1]); return a.map((v, i) => v + (b[i] - v) * t); }
    const legTops = [], legFeet = [];
    for (const side of [-1, 1]) {
        for (const front of [true, false]) {
            const foot = [side * 185 * sx, -6, (front ? 198 : -246) * sz];
            const top = [side * 145 * sx, seatHeight - 20, (front ? 125 : -125) * sz];
            rod((side < 0 ? '02-left-' : '03-right-') + (front ? 'front-leg' : 'rear-leg'), foot, top, 11.5, 18, wood, 1.0, true);
            legTops.push(top);
            legFeet.push(foot);
        }
    }
    // Two fore-aft stretchers and one transverse middle stretcher: the visible H.
    const braceY = seatHeight - 135, mids = [];
    for (let i = 0; i < 4; i += 2) {
        const a = onLeg(legFeet[i], legTops[i], braceY), b = onLeg(legFeet[i + 1], legTops[i + 1], braceY);
        rod('04-side-stretcher-' + i, a, b, 9, 9, wood, 0.6);
        mids.push(a.map((v, j) => (v + b[j]) / 2));
    }
    rod('05-center-cross-stretcher', mids[0], mids[1], 8, 8, wood, 0.6);
    // Low-profile under-seat supports are visible beneath the bent plywood shell.
    for (const side of [-1, 1]) {
        d.push_node('union', '06-seat-bearer-' + side, wood, false);
        d.box('union', 23, 23, 272 * sz, wood);
        d.fillet(5, 'xyz');
        d.translate(side * 143 * sx, seatHeight - 31, -9 * sz);
        d.pop_node();
    }
    // Seven dowels fan subtly outward and follow the curved rail in plan.
    const railZ = -288 * sz, railY = height - 22;
    for (let i = 0; i < 7; i++) {
        const t = (i - 3) / 3, xBottom = t * 158 * sx, xTop = t * (crestWidth / 2 - 38);
        const zBottom = (-160 + 22 * t * t) * sz;
        const zTop = railZ + 900 - Math.sqrt(900 * 900 - xTop * xTop);
        const a = [xBottom, seatHeight - 9, zBottom];
        const b = [xTop, railY - 12, zTop];
        rod('07-back-spindle-' + (i + 1), a, b, 6.6, 5.7, wood, 0.55);
    }
    d.add_part(createTopRail({ width: crestWidth, color: wood }), 'union', '08-curved-top-rail');
    d.translate(0, railY, railZ);
    return d;
};
