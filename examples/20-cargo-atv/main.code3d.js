// 运输四轮 ATV。单文件、毫米展示比例，Y 向上，+Z 朝车头。
// 用户前后提供七张参考图，没有标注尺寸；这些尺寸是外观重建，不是实车工程图。
function atvBox(w, h, depth, radius, color) {
    const d = new PartCode3dDocument();
    d.box('union', w, h, depth, color);
    if (radius > 0) d.fillet(radius, 'xyz');
    return d;
}
function atvAdd(d, part, name, xyz, axis, angle) {
    d.add_part(part, 'union', name);
    if (axis) d.rotate(axis, angle);
    d.translate(...xyz);
}
function atvRod(a, b, radius, color, bore = 0) {
    const d = new PartCode3dDocument(), v = b.map((n, i) => n - a[i]);
    const length = Math.hypot(...v), n = v.map(x => x / length);
    if (bore > 0) d.push_node('union', 'hollow-tube', color, true);
    d.cylinder('union', radius, length, color);
    if (bore > 0) { d.cylinder('difference', bore, length + 2, color); d.pop_node(); }
    if (n[1] < -0.999999) d.rotate('x', 180);
    else {
        const q = Math.sqrt(2 * (1 + n[1]));
        d.rotate_by_quaternion(n[2] / q, 0, -n[0] / q, q / 2);
    }
    d.translate(...a.map((x, i) => (x + b[i]) / 2));
    return d;
}
// 四分之一圆管弯头；中心线位于 XZ 平面，从 +X 弯向 -Z。
function atvElbow(bendRadius, tubeRadius, color) {
    const d = new PartCode3dDocument();
    d.start_sketch('round-tube-section', 'z');
    d.circle(bendRadius, 0, 0, tubeRadius);
    d.end_sketch();
    d.revolve('union', 90, 'y', color, true);
    return d;
}
function atvFrame(width, depth, bend, tube, color) {
    const d = new PartCode3dDocument(), x = width / 2, z = depth / 2;
    d.push_node('union', 'rounded-tube-frame', color, false);
    for (const side of [-1, 1]) {
        atvAdd(d, atvRod([-x + bend, 0, side * z], [x - bend, 0, side * z], tube, color), 'frame-long-' + side, [0, 0, 0]);
        atvAdd(d, atvRod([side * x, 0, -z + bend], [side * x, 0, z - bend], tube, color), 'frame-end-' + side, [0, 0, 0]);
    }
    const elbow = atvElbow(bend, tube, color);
    for (const [sx, sz, angle] of [[1, -1, 0], [-1, -1, 90], [-1, 1, 180], [1, 1, 270]])
        atvAdd(d, elbow, 'frame-bend-' + sx + '-' + sz, [sx * (x - bend), 0, sz * (z - bend)], 'y', angle);
    d.pop_node();
    return d;
}
// 椭圆截面沿 Z 放样，轮廓与局部坐标均由本文件构造。
function atvLoft(name, sections, color) {
    const loops = sections.map(([z, halfWidth, centerY, halfHeight]) => {
        const row = [];
        for (let i = 0; i < 24; i++) {
            const a = i * 2 * Math.PI / 24;
            row.push(halfWidth * Math.cos(a), centerY + halfHeight * Math.sin(a), z);
        }
        return row;
    });
    const d = new PartCode3dDocument();
    d.push_node('union', name, color, false).set_topo_shape(parapoly_engine.ParaPolyShapeMaker.spline_loft(loops));
    d.pop_node();
    return d;
}
// 车轮局部轴为 Y，+Y 是外侧。胎块融合到胎体，胎肩与轮毂分别着色。
function atvWheel(angle) {
    const d = new PartCode3dDocument(), rubber = '#4b4540', rim = '#168ca0';
    d.push_node('union', 'complete-offroad-wheel', rubber, false);
    d.push_node('union', 'knobby-tire', rubber, true);
    d.cylinder('union', 29, 26, rubber);
    d.fillet(6, 'xyz');
    d.cylinder('difference', 14.8, 30, rubber);
    for (let k = 0; k < 14; k++) for (const side of [-1, 1]) {
        const a = (k + (side < 0 ? .32 : 0)) * 2 * Math.PI / 14;
        d.box('union', 8.4, 12, 5.8, rubber);
        d.fillet(1.1, 'xyz');
        d.rotate('y', a * 180 / Math.PI);
        d.translate(28.4 * Math.sin(a), side * 6.4, 28.4 * Math.cos(a));
    }
    d.pop_node();
    // 薄外圈、内凹轮盘、中心盖和四枚螺栓。
    d.push_node('union', 'teal-rim-lip', rim, true);
    d.cylinder('union', 15.1, 23, rim);
    d.cylinder('difference', 12.7, 26, rim);
    d.pop_node();
    d.push_node('union', 'recessed-rim-disc', '#106d81', true);
    d.cylinder('union', 13.5, 3, '#106d81');
    d.translate(0, 8, 0);
    // 轮盘与轮毂套为同一实体；中孔供固定轴穿过，车轮不能融合到轴上。
    d.cylinder('union', 7, 20, '#106d81'); d.translate(0, -1, 0);
    d.cylinder('difference', 4.7, 28, '#106d81');
    for (let k = 0; k < 4; k++) {
        const a = (k + .5) * Math.PI / 2;
        d.cylinder('difference', 2.7, 5, '#106d81');
        d.translate(9.6 * Math.sin(a), 8, 9.6 * Math.cos(a));
    }
    d.pop_node();
    for (const y of [-6, 6]) {
        d.push_node('union', 'wheel-bushing-' + y, '#b1a070', true);
        d.cylinder('union', 4.7, 3, '#b1a070');
        d.cylinder('difference', 3.8, 5, '#b1a070');
        d.pop_node(); d.translate(0, y, 0);
    }
    // 杯形轮毂盖内留空间给不随轮旋转的轴端限位件，杯口接轮毂外壁。
    d.push_node('union', 'wheel-hub-cap', '#219aad', true);
    d.cylinder('union', 8, 5.1, '#219aad'); d.translate(0, 10.55, 0);
    d.cylinder('difference', 6.6, 4.3, '#219aad'); d.translate(0, 9.6, 0);
    d.pop_node();
    for (let k = 0; k < 4; k++) {
        const a = k * Math.PI / 2;
        d.push_node('union', 'wheel-lug-' + k, '#becf99', true);
        d.cylinder('union', 1.7, 2.2, '#becf99');
        d.translate(10.5 * Math.sin(a), 10.5, 10.5 * Math.cos(a));
        d.pop_node();
    }
    d.pop_node();
    d.rotate('y', angle);
    return d;
}
function atvCargoPanel(color) {
    const d = new PartCode3dDocument();
    d.push_node('union', 'tall-open-grid', color, false);
    atvAdd(d, atvFrame(84, 68, 6, 2.2, color), 'rounded-panel-perimeter', [0, 0, 0]);
    for (const z of [-11.3, 11.3])
        atvAdd(d, atvRod([-42, 0, z], [42, 0, z], 1.65, color), 'long-grid-' + z, [0, 0, 0]);
    for (const x of [-21, 0, 21])
        atvAdd(d, atvRod([x, 0, -34], [x, 0, 34], 1.65, color), 'cross-grid-' + x, [0, 0, 0]);
    d.pop_node();
    return d;
}
function atvExhaust() {
    const d = new PartCode3dDocument();
    d.push_node('union', 'hollow-tailpipe', '#79a6b5', true);
    d.cylinder('union', 5.8, 16, '#79a6b5');
    d.fillet(.8, 'xyz');
    d.cylinder('difference', 3.7, 18, '#79a6b5');
    d.pop_node();
    d.rotate('x', 90);
    return d;
}
function atvSilencer() {
    const d = new PartCode3dDocument(), c = '#49646a';
    d.push_node('union', 'hollow-silencer', c, true);
    d.box('union', 34, 16, 24, c); d.fillet(4, 'xyz');
    d.box('difference', 30, 12, 20, c); d.fillet(2, 'xyz');
    for (const x of [-10, 10]) {
        d.cylinder('difference', 3.7, 10, c); d.rotate('x', 90); d.translate(x, 0, -12);
    }
    d.cylinder('difference', 2.5, 10, c); d.rotate('x', 90); d.translate(0, 0, 12);
    d.pop_node();
    return d;
}
let main = function (params) {
    const p = params ?? {}, scale = p.scale ?? 1, body = p.bodyColor ?? '#cf9137', rack = p.rackColor ?? '#167c89';
    const wheelAngle = p.wheelAngle ?? 0;
    if (!Number.isFinite(scale) || scale < .1 || scale > 10) throw Error('scale 必须是 0.1 到 10 的有限数值');
    if (!Number.isFinite(wheelAngle) || Math.abs(wheelAngle) > 3600) throw Error('wheelAngle 必须是 -3600 到 3600 的有限角度');
    for (const [name, c] of [['bodyColor', body], ['rackColor', rack]])
        if (typeof c !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(c)) throw Error(name + ' 必须是 #RRGGBB');
    const d = new PartCode3dDocument(), black = '#102a39', metal = '#507c87';
    d.push_node('union', 'cargo-atv', body, false);
    const add = (doc, name, x = 0, y = 0, z = 0, axis, angle) => atvAdd(d, doc, name, [x, y, z], axis, angle);
    const box = (name, w, h, dep, r, c, x, y, z, axis, angle) => add(atvBox(w, h, dep, r, c), name, x, y, z, axis, angle);
    const rod = (name, a, b, r, c) => add(atvRod(a, b, r, c), name);
    box('undercarriage', 69, 13, 145, 4, black, 0, 34, 0);
    box('central-engine', 47, 30, 59, 6, '#354b47', 0, 49, -5);
    for (const z of [-63, 63]) {
        rod('axle-beam-' + z, [-37, 32, z], [37, 32, z], 5, metal);
        for (const s of [-1, 1]) {
            box('axle-chassis-mount-' + s + '-' + z, 10, 22, 19, 2, black, s * 26, 42, z);
            rod('carrier-' + s + '-' + z, [s * 35, 32, z], [s * 41, 32, z], 8, metal);
            rod('spindle-' + s + '-' + z, [s * 36, 32, z], [s * 68.5, 32, z], 3.5, '#abc0c2');
            rod('spindle-retainer-' + s + '-' + z, [s * 67.8, 32, z], [s * 68.6, 32, z], 5.2, '#a2acb0');
            for (const offset of [-8, 8])
                rod('axle-brace-' + s + '-' + z + '-' + offset, [s * 26, 49, z + offset], [s * 38, 32, z], 3.2, '#3b6370');
        }
    }
    for (const s of [-1, 1]) {
        const wheel = atvWheel(-s * wheelAngle);
        for (const z of [-63, 63])
            add(wheel, (z > 0 ? 'front' : 'rear') + '-wheel-' + s, s * 58, 32, z, 'z', -s * 90);
    }
    // 副车架纵梁承接底盘，立柱与斜撑都位于轮胎内侧。
    for (const s of [-1, 1]) {
        box('subframe-rail-' + s, 7, 7, 91, 1.5, metal, s * 26, 40, -66);
        for (const z of [-94, -43]) {
            rod('rack-post-' + s + '-' + z, [s * 26, 38, z], [s * 32, 85, z], 3.4, metal);
            box('rack-mount-' + s + '-' + z, 12, 3, 14, 1, metal, s * 32, 84, z);
            for (const offset of [-4, 4])
                rod('rack-mount-bolt-' + s + '-' + z + '-' + offset, [s * 32, 84.8, z + offset], [s * 32, 86.8, z + offset], 1.6, '#a2acb0');
        }
        rod('subframe-diagonal-' + s, [s * 26, 41, -62], [s * 32, 78, -94], 3, metal);
    }
    box('exhaust-crossmember', 64, 6, 10, 1.5, metal, 0, 40, -84);
    // 前罩高而圆，车鼻收窄；侧挡泥板与轮胎留有明显净空。
    add(atvLoft('sculpted-front-cowl', [[22, 21, 77, 15], [39, 37, 76, 20], [65, 47, 71, 19], [84, 44, 65, 15], [94, 34, 60, 9]], body), 'front-cowl');
    add(atvLoft('rear-body', [[-99, 32, 70, 9], [-88, 43, 75, 11], [-64, 43, 77, 11], [-42, 30, 73, 12], [-29, 20, 67, 10]], body), 'rear-body');
    add(atvLoft('saddle-body', [[-49, 24, 61, 13], [-20, 22, 66, 19], [7, 21, 73, 19], [31, 25, 76, 18]], body), 'central-body');
    for (const s of [-1, 1]) {
        for (const z of [-63, 63])
            add(atvLoft('wheel-arch', [[-32, 6, 0, 2.5], [-23, 16, 6, 3.2], [0, 17, 11, 4], [23, 15, 6, 3.2], [32, 6, 0, 2.5]], body), 'fender-' + s + '-' + z, s * 45, 68, z);
        box('body-footboard-' + s, 25, 6, 60, 2.5, body, s * 37, 28, 0);
        box('rubber-footwell-' + s, 19, 2.2, 44, .8, black, s * 38, 32, 0);
        for (let j = -2; j <= 2; j++) box('foot-grip-' + s + '-' + j, 16, 1.4, 2, .45, '#2e4850', s * 38, 33.6, j * 7);
        // 上端穿入安装座与车罩，下端穿入脚踏板；整段留在轮胎内侧。
        rod('footboard-front-support-' + s, [s * 33, 27, 27], [s * 32, 71, 40], 3.5, body);
        box('front-stay-socket-' + s, 10, 8, 12, 1.5, body, s * 32, 69, 40);
        rod('front-stay-bolt-' + s, [s * 35.5, 69, 40], [s * 38.5, 69, 40], 1.6, '#a2acb0');
    }
    // 细长跨骑座垫；前端上翘靠近车把，后端与货台相接。
    add(atvLoft('black-saddle', [[-48, 16, 89, 3], [-40, 21, 89, 5], [-19, 18, 85, 5], [2, 13, 87, 6], [17, 13, 96, 8], [24, 11, 100, 6]], '#17191b'), 'seat');
    rod('steering-boot', [0, 89, 42], [0, 99, 38], 7, black);
    rod('steering-stem', [0, 94, 40], [0, 118, 29], 3.7, '#f2f1ea');
    rod('handlebar-center', [-25, 118, 29], [25, 118, 29], 3.2, '#f2f1ea');
    for (const s of [-1, 1]) {
        rod('handlebar-rise-' + s, [s * 24, 118, 29], [s * 32, 122, 32], 3.2, '#f2f1ea');
        rod('black-handle-grip-' + s, [s * 30, 122, 32], [s * 48, 122, 32], 5.4, '#17191b');
        box('control-pod-' + s, 6, 9, 8, 2, '#292d31', s * 27, 120, 30);
    }
    box('center-handle-clamp', 11, 9, 9, 3, '#252b31', 0, 119, 29);
    // 车鼻的双浅色矩形灯、三条格栅以及中央下护板。
    for (const s of [-1, 1]) {
        box('headlight-bezel-' + s, 24, 14, 6, 2.3, '#47697a', s * 31, 61, 96, 'y', s * 13);
        box('headlight-lens-' + s, 18.5, 9.2, 2, .7, '#fff0dc', s * 31, 61.5, 99.4, 'y', s * 13);
    }
    box('front-grille-dark', 37, 16, 6, 2, '#173c50', 0, 58, 96);
    for (const y of [54, 59, 64]) box('front-grille-slat-' + y, 32, 1.8, 2.5, .7, '#70a6b3', 0, y, 99.5);
    box('front-skid-plate', 22, 22, 8, 3, '#386d88', 0, 40, 96, 'x', -15);
    box('skid-dark-inset', 12, 12, 1.5, .5, '#153e58', 0, 40, 101, 'x', -15);
    rod('front-bumper', [-43, 46, 94], [43, 46, 94], 3.4, '#458599');
    // 后方完整货台 + 左右窄侧框，中央向前敞开，为座垫留出 U 形缺口。
    // 后横杆最前缘 Z=-54.5，座垫后缘 Z=-48；侧框内缘 |X|=26。
    add(atvFrame(106, 56, 9, 2.5, rack), 'rear-cargo-deck-perimeter', 0, 94, -85);
    for (const x of [-26, 0, 26]) rod('deck-longitudinal-' + x, [x, 94, -113], [x, 94, -57], 2, rack);
    for (const z of [-94, -75]) rod('deck-crossmember-' + z, [-53, 94, z], [53, 94, z], 2, rack);
    for (const s of [-1, 1]) {
        add(atvFrame(25, 29, 5, 2, rack), 'seat-side-deck-' + s, s * 40.5, 94, -42.5);
        for (const z of [-94, -43]) rod('rack-stay-' + s + '-' + z, [s * 32, 83, z], [s * 53.5, 94.5, z], 2.8, rack);
        // 先绕 Z 旋转 90°，再绕 X 后倾 9°，一次设置组合四元数。
        d.add_part(atvCargoPanel(rack), 'union', 'upright-side-grid-' + s);
        const a = -9 * Math.PI / 360, b = Math.PI / 4;
        d.rotate_by_quaternion(Math.sin(a) * Math.cos(b), -Math.sin(a) * Math.sin(b), Math.cos(a) * Math.sin(b), Math.cos(a) * Math.cos(b));
        // 高栏由 112 降为 84，中心随短边缩短量移动，保持下端安装线原位。
        const panelTilt = 9 * Math.PI / 180;
        d.translate(s * 47, 153 - 14 * Math.cos(panelTilt), -73 + 14 * Math.sin(panelTilt));
        rod('low-side-rail-' + s, [s * 53, 107, -100], [s * 53, 107, -36], 2.2, rack);
        for (const z of [-100, -36]) rod('low-rail-post-' + s + '-' + z, [s * 53, 94, z], [s * 53, 107, z], 2.2, rack);
        for (const t of [-22, 22]) {
            const tilt = 9 * Math.PI / 180, y = 153 - 56 * Math.cos(tilt) + t * Math.sin(tilt), z = -73 + 56 * Math.sin(tilt) + t * Math.cos(tilt);
            rod('panel-foot-' + s + '-' + t, [s * 53.5, 94, z], [s * 46.5, y, z], 2.5, rack);
            box('panel-socket-' + s + '-' + t, 6, 5, 7, 1, '#337481', s * 47, y, z);
            rod('panel-fixing-bolt-' + s + '-' + t, [s * 49.5, y, z], [s * 51.5, y, z], 1.5, '#a2acb0');
        }
        box('rear-reflector-' + s, 11, 5, 2, .6, '#bf6553', s * 32, 73, -100);
    }
    add(atvSilencer(), 'silencer', 0, 49, -88);
    add(atvRod([0, 49, -30], [0, 49, -78], 3.5, '#637e82', 2.5), 'exhaust-feed');
    for (const s of [-1, 1]) {
        d.push_node('union', 'exhaust-hanger-' + s, metal, true);
        d.box('union', 3, 12, 5, metal); d.translate(s * 17, 45, -84);
        d.box('union', 8, 3, 5, metal); d.translate(s * 14, 40, -84);
        d.pop_node();
        rod('exhaust-mount-bolt-' + s, [s * 14, 40, -84], [s * 14, 43, -84], 1.5, '#a2acb0');
    }
    for (const x of [-10, 10]) add(atvExhaust(), 'open-exhaust-' + x, x, 49, -102);
    d.pop_node();
    d.scale(scale, scale, scale);
    return d;
};
