// 编织竹椅。毫米，Y 向上，+Z 朝前，地面 Y=0。
// 默认座宽 450、座深 430、座高 460、总高 850；尺寸与曲率是示例近似值。
// One bamboo side frame. Local X is the material thickness; Z is fore/aft.
function createSideFrame(p) {
    const d = new PartCode3dDocument();
    const color = p.color, thickness = 30;
    function section(name, points, round) {
        d.push_node('union', name, color, false);
        d.start_sketch(name + '-profile', 'z');
        for (let i = 0; i < points.length; i++) {
            const a = points[i], b = points[(i + 1) % points.length];
            d.line_segment(...a, 0, ...b, 0);
        }
        d.end_sketch();
        d.extrude('union', thickness, color, true);
        if (round)
            d.fillet(round, 'xyz');
        d.rotate('y', -90);
        d.translate(thickness / 2, 0, 0);
        d.pop_node();
    }
    section('01-tapered-front-leg', [[209, 0], [239, 0], [205, 447], [171, 447]], 2);
    // Rear leg continues through a softened bend into the backrest support.
    const center = [];
    function bezier(a, b, c, e, n) { for (let i = 0; i < n; i++) {
        const t = i / n, u = 1 - t;
        center.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * e[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * e[1]]);
    } }
    bezier([-266, 0], [-237, 143], [-207, 286], [-178, 420], 5);
    bezier([-178, 420], [-171, 453], [-167, 465], [-176, 495], 8);
    bezier([-176, 495], [-204, 594], [-240, 713], [-272, 823], 8);
    center.push([-272, 823]);
    const outer = center.map(v => [v[0] - 14, v[1]]), inner = center.map(v => [v[0] + 14, v[1]]).reverse();
    section('02-continuous-rear-leg-back-stile', outer.concat(inner), 0);
    // Two thin bent laminations, NOT a solid web between the legs.
    // Each strip is offset normally from its centre curve to keep 8.5 mm thickness.
    // The 0.3 mm seam along the middle shows the upper-U/lower-arch construction.
    function bentStrip(name, curves) {
        const path = [];
        function sample(a, b, c, e, n, includeStart) {
            for (let i = includeStart ? 0 : 1; i <= n; i++) {
                const t = i / n, u = 1 - t;
                const z = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * e[0];
                const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * e[1];
                const dz = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (e[0] - c[0]);
                const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (e[1] - c[1]);
                const len = Math.hypot(dz, dy);
                path.push({ z, y, nz: -dy / len, ny: dz / len });
            }
        }
        curves.forEach((c, i) => sample(...c, i === 1 ? 1 : 28, i === 0));
        const h = 4.25;
        const outer = path.map(v => [v.z + h * v.nz, v.y + h * v.ny]);
        const inner = path.map(v => [v.z - h * v.nz, v.y - h * v.ny]).reverse();
        section(name, outer.concat(inner), 0.8);
    }
    bentStrip('03-upper-U-bent-lamination', [
        [[-165, 425], [-174, 374], [-190, 286], [-126, 286]],
        [[-126, 286], [-42, 286], [42, 286], [126, 286]],
        [[126, 286], [187, 286], [177, 369], [180, 425]]
    ]);
    bentStrip('04-lower-arch-bent-lamination', [
        [[-211, 189], [-201, 237], [-190, 277.2], [-133, 277.2]],
        [[-133, 277.2], [-44.333, 277.2], [44.333, 277.2], [133, 277.2]],
        [[133, 277.2], [190, 277.2], [194, 234], [202, 186]]
    ]);
    return d;
}
// A rounded steel-core panel with paired, alternating over/under paper cords.
// Local XY is the panel, +Z is its sitting/front face. Units: mm.
function createWovenPanel(p) {
    const d = new PartCode3dDocument();
    const wrapR = 8.7, wrapTube = 1.2, a = p.width / 2 - wrapR - wrapTube;
    const b = p.height / 2 - wrapR - wrapTube, corner = p.corner ?? 50;
    const pitch = p.pitch ?? 15, cordR = 1.3, pair = 1.55, amplitude = 1.6;
    const cord = p.color, alternate = p.alternateColor;
    function surface(x, y) {
        if (p.kind === 'back')
            return -19 * (1 - (x / a) ** 2);
        return -10 * (1 - (x / a) ** 2) * (1 - (y / b) ** 2) - 7 * Math.max(0, (-y / b - 0.65) / 0.35) ** 2;
    }
    function extent(v, halfAlong, halfAcross) {
        const q = Math.max(0, Math.abs(v) - (halfAcross - corner));
        return halfAlong - corner + Math.sqrt(Math.max(0, corner * corner - q * q));
    }
    function pipe(name, pts, r, color) {
        d.push_node('union', name, color, false);
        const v = pts[1].map((x, j) => x - pts[0][j]);
        let pathName, profileName, webOrigin = null;
        if (typeof d.sketch === 'function' && typeof d.sketchCurve === 'function') {
            // Native polygon/curve sketches preserve 3D points without the 2D solver.
            d.sketch(pts.flat(), false);
            pathName = d.selected_node.get_name();
            d.sketchCurve([{ type: 'circle', params: [...pts[0], r, ...v] }]);
            profileName = d.selected_node.get_name();
        }
        else {
            // The current Web Runtime retains line_segment's XYZ coordinates.
            // Its sketch-plane transform needs a unit normal for the circular section.
            pathName = name + '-path';
            profileName = name + '-profile';
            // Web sweep rotates the sketch plane but does not apply its center.
            // Build at the path origin, then translate the completed pipe instead.
            webOrigin = pts[0];
            const local = pts.map(point => point.map((x, j) => x - webOrigin[j]));
            d.start_sketch(pathName, 'z');
            for (let i = 1; i < local.length; i++)
                d.line_segment(...local[i - 1], ...local[i]);
            d.end_sketch();
            const length = Math.hypot(...v), normal = v.map(x => x / length);
            d.start_sketch(profileName, [0, 0, 0, ...normal]);
            d.circle(0, 0, 0, r);
            d.end_sketch();
        }
        d.sweep('union', profileName, pathName, color, true);
        if (webOrigin)
            d.translate(...webOrigin);
        d.pop_node();
    }
    // Rounded rectangular perimeter, sampled by true arc length.
    const lengths = [2 * (a - corner), Math.PI * corner / 2, 2 * (b - corner), Math.PI * corner / 2,
        2 * (a - corner), Math.PI * corner / 2, 2 * (b - corner), Math.PI * corner / 2];
    const perimeter = lengths.reduce((s, x) => s + x, 0);
    function boundary(s) {
        let k = 0;
        while (k < 7 && s > lengths[k]) {
            s -= lengths[k];
            k++;
        }
        const f = s / lengths[k], angle = (k === 1 ? -90 : k === 3 ? 0 : k === 5 ? 90 : 180) + f * 90;
        const theta = angle * Math.PI / 180;
        let x, y;
        if (k === 0) {
            x = -a + corner + f * lengths[k];
            y = -b;
        }
        if (k === 2) {
            x = a;
            y = -b + corner + f * lengths[k];
        }
        if (k === 4) {
            x = a - corner - f * lengths[k];
            y = b;
        }
        if (k === 6) {
            x = -a;
            y = b - corner - f * lengths[k];
        }
        if (k % 2) {
            x = (k === 1 || k === 3 ? a - corner : -a + corner) + corner * Math.cos(theta);
            y = (k === 1 || k === 7 ? -b + corner : b - corner) + corner * Math.sin(theta);
        }
        return [x, y, surface(x, y)];
    }
    const rim = [];
    const rimSteps = Math.ceil(perimeter / 9);
    for (let i = 0; i <= rimSteps; i++)
        rim.push(boundary(i * perimeter / rimSteps));
    // Closed wire uses an explicit last segment back to the start.
    rim[rim.length - 1] = rim[0];
    pipe('01-cord-covered-perimeter-core', rim, 7.9, cord);
    for (const axis of [0, 1]) {
        const halfAcross = axis === 0 ? b : a, halfAlong = axis === 0 ? a : b;
        const count = Math.floor((halfAcross - 9) / pitch);
        for (let i = -count; i <= count; i++)
            for (const side of [-1, 1]) {
                const across = i * pitch + side * pair, limit = extent(across, halfAlong, halfAcross);
                const steps = Math.ceil(2 * limit / (pitch / 3)), points = [];
                for (let j = 0; j <= steps; j++) {
                    const along = -limit + 2 * limit * j / steps;
                    const x = axis === 0 ? along : across, y = axis === 0 ? across : along;
                    const wave = amplitude * Math.cos(Math.PI * along / pitch) * (i % 2 === 0 ? 1 : -1) * (axis === 0 ? -1 : 1);
                    points.push([x, y, surface(x, y) + wave]);
                }
                pipe((axis === 0 ? '02-weft-' : '03-warp-') + i + '-' + side, points, cordR, side === 1 ? cord : alternate);
            }
    }
    // Individual closely spaced winding loops around the panel perimeter.
    const loopDoc = new PartCode3dDocument();
    loopDoc.torus('union', wrapR, wrapTube, cord);
    const loops = Math.ceil(perimeter / (p.wrapPitch ?? 3.5));
    for (let i = 0; i < loops; i++) {
        const s = (i + 0.35) * perimeter / loops, point = boundary(s);
        const p0 = boundary(Math.max(0, s - 0.15)), p1 = boundary(Math.min(perimeter, s + 0.15));
        const v = p1.map((x, j) => x - p0[j]), len = Math.hypot(...v);
        const [vx, vy, vz] = v.map(x => x / len);
        d.add_part(loopDoc, 'union', '04-edge-wrap-' + i);
        if (vy < -0.999999)
            d.rotate('x', 180);
        else {
            const q = Math.sqrt(2 * (1 + vy));
            d.rotate_by_quaternion(vz / q, 0, -vx / q, q / 2);
        }
        d.translate(...point);
    }
    return d;
}
let main = function (params) {
    const p = params ?? {}, d = new PartCode3dDocument();
    const width = p.seatWidth ?? 450, depth = p.seatDepth ?? 430;
    const seatHeight = p.seatHeight ?? 460, height = p.height ?? 850;
    const bamboo = p.bambooColor ?? '#b99564', cord = p.cordColor ?? '#d7bb92';
    const alternate = p.cordAlternateColor ?? '#c9a97d';
    const pitch = p.weavePitch ?? 15, wrapPitch = p.wrapPitch ?? 3.5;
    if (![width, depth, seatHeight, height, pitch, wrapPitch].every(Number.isFinite) || width < 380 || width > 520 || depth < 360 || depth > 500 || seatHeight < 400 || seatHeight > 520 || height - seatHeight < 330 || height > 1000 || pitch < 12 || pitch > 24 || wrapPitch < 3 || wrapPitch > 7)
        throw Error('Parameters outside supported ranges');
    const sx = width / 450, sy = seatHeight / 460, sz = depth / 430;
    for (const side of [-1, 1]) {
        d.add_part(createSideFrame({ color: bamboo }), 'union', side < 0 ? '01-left-bamboo-frame' : '02-right-bamboo-frame');
        d.scale(sx, sy, sz);
        d.rotate('z', side * 2.5);
        d.translate(side * 200 * sx, 15 * sx * Math.sin(2.5 * Math.PI / 180), 0);
    }
    for (const front of [true, false]) {
        d.push_node('union', front ? '03-front-seat-apron' : '04-rear-seat-apron', bamboo, false);
        d.box('union', 396 * sx, 42, 25, bamboo);
        d.fillet(2, 'xyz');
        d.translate(0, seatHeight - 45, (front ? 178 : -174) * sz);
        d.pop_node();
    }
    d.add_part(createWovenPanel({
        width, height: depth, corner: 58, kind: 'seat', pitch, wrapPitch, color: cord, alternateColor: alternate
    }), 'union', '05-handwoven-seat');
    d.rotate('x', -90);
    d.translate(0, seatHeight - 9.9, 0);
    d.add_part(createWovenPanel({
        width: 440 * sx, height: 286, corner: 48, kind: 'back', pitch, wrapPitch, color: cord, alternateColor: alternate
    }), 'union', '06-handwoven-curved-backrest');
    d.rotate('x', -15);
    d.translate(0, height - 136.48, -213 * sz);
    // Back panel sits in front of the bamboo stiles, on small mounting spacers.
    for (const side of [-1, 1])
        for (const y of [610, 805]) {
            const x = side * (200 - y * Math.tan(2.5 * Math.PI / 180)) * sx;
            const curve = -19 * (1 - (x / (220 * sx - 9.9)) ** 2);
            const localY = (y - (height - 136.48) - curve * Math.sin(Math.PI / 12)) / Math.cos(Math.PI / 12);
            const panelZ = -213 * sz - localY * Math.sin(Math.PI / 12) + curve * Math.cos(Math.PI / 12);
            const frontZ = (-176 - (y - 495) * 96 / 328 + 14) * sz;
            const length = Math.max(2, panelZ - frontZ + 2);
            d.push_node('union', '07-back-mount-' + side + '-' + y, bamboo, false);
            d.cylinder('union', 5, length, bamboo);
            d.rotate('x', 90);
            d.translate(x, y, (panelZ + frontZ) / 2);
            d.pop_node();
        }
    // Small brass-toned visible fixings on the outer side frames.
    for (const side of [-1, 1])
        for (const yz of [[405, 188], [398, -181]]) {
            d.push_node('union', '07-side-fastener-' + side + '-' + yz[1], '#8d7952', false);
            d.cylinder('union', 3.3, 1.1, '#8d7952');
            d.rotate('z', 90);
            d.translate(side * (215.2 * sx - yz[0] * sy * Math.tan(2.5 * Math.PI / 180)), yz[0] * sy, yz[1] * sz);
            d.pop_node();
        }
    return d;
};
