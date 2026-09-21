// 台球桌单文件版：全部零件和草图均在本文件内，无外部模块依赖。
// 单位 mm，Y 向上；main 负责装配，下方 create / sketch 函数负责局部建模。
// 多色零件通过 add_part 独立装配，所有形体由 Parapoly API 创建。
let main = function(params) {
    let doc = new PartCode3dDocument();
    const surfaceY = params?.surfaceHeight ?? 780;
    const showBalls = params?.showBalls ?? false;
    // x,z,朝向,孔心到鼻尖连线距离,袋口半宽,圆孔半径,袋颚斜率。
    // 袋口与石板圆孔分开定义；角袋保留约 28.3 mm 承球台阶，中袋保留 6 mm。
    const cornerReach=20*Math.SQRT2+58, cornerSlope=Math.tan(7*Math.PI/180);
    const sideSlope=Math.tan(14*Math.PI/180);
    const pockets = [[-1235,-625,-135,cornerReach,58,58,cornerSlope],[1235,-625,135,cornerReach,58,58,cornerSlope],
        [-1235,625,-45,cornerReach,58,58,cornerSlope],[1235,625,45,cornerReach,58,58,cornerSlope],
        [0,-675,180,70,64.5,64,sideSlope],[0,675,0,70,64.5,64,sideSlope]];

    doc.add_part(createFrame({pockets:pockets}),"union","承重桌架");
    doc.translate(0,surfaceY-35,0);
    doc.add_part(createBed({pockets:pockets}),"union","石板与台呢");
    doc.translate(0,surfaceY,0);
    doc.add_part(createRailSurround({pockets:pockets}),"union","胡桃木库框与瞄准点");
    doc.translate(0,surfaceY,0);

    const cushionParts=[];
    function addCushion(name,x,z,angle,length,ends) {
        let a=angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
        let localPockets=ends.map(function(i) {
            let p=pockets[i],dx=p[0]-x,dz=p[1]-z;
            return [c*dx-s*dz,s*dx+c*dz,p[2]-angle,p[3],p[4],p[5],p[6]];
        });
        doc.add_part(createCushion({length:length,pockets:localPockets,instance:name}),"union",name,"#145d48");
        doc.rotate("y",angle); doc.translate(x,surfaceY,z);
        cushionParts.push({name:name,x:x,z:z,angle:angle,length:length,pockets:localPockets,ends:ends});
    }
    addCushion("长库_前左",-640,-635,90,1280,[0,4]);
    addCushion("长库_前右",640,-635,90,1280,[1,4]);
    addCushion("长库_后左",-640,635,-90,1280,[2,5]);
    addCushion("长库_后右",640,635,-90,1280,[3,5]);
    addCushion("短库_左",-1245,0,180,1270,[0,2]);
    addCushion("短库_右",1245,0,0,1270,[1,3]);

    [-1000,1000].forEach(function(x) {
        [-490,490].forEach(function(z) {
            // 每次调用创建独立零件文档，避免重复装配共享同一节点。
            doc.add_part(createLeg({height:surfaceY-70,instance:x+"_"+z}),"union","可调桌腿_"+x+"_"+z);
            doc.translate(x,0,z);
        });
    });
    pockets.forEach(function(p,i) {
        let a=p[2]*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
        let neighbours=cushionParts.filter(function(q){return q.ends.includes(i);}).map(function(q){
            let dx=q.x-p[0],dz=q.z-p[1];
            return {x:c*dx-s*dz,z:s*dx+c*dz,angle:q.angle-p[2],length:q.length,pockets:q.pockets,name:q.name};
        });
        doc.add_part(createPocket({instance:i,radius:p[5],reach:p[3],half:p[4],slope:p[6],cushions:neighbours}),"union","落袋_"+(i+1));
        doc.rotate("y",p[2]);
        doc.translate(p[0],surfaceY,p[1]);
    });
    if (showBalls) {
        // 九颗独立目标球，按击球后的自然散落布局；第九颗为黄条纹球。
        const balls=[[-840,-305,"#edbb25"],[-420,185,"#245fb0"],[-105,-340,"#c73930"],
            [340,265,"#79529c"],[785,-220,"#e58429"],[-720,365,"#20734e"],
            [110,45,"#883c39"],[870,340,"#202123"],[490,-85,"#edbb25"]];
        balls.forEach(function(b,i) {
            let ballPart=createBall({color:b[2],striped:i===8,instance:i+1});
            if(i===8) doc.add_part(ballPart,"union","彩球_"+(i+1));
            else doc.add_part(ballPart,"union","彩球_"+(i+1),b[2]);
            doc.rotate("z",[15,-32,48,-18,25,-40,12,35,58][i]);
            doc.translate(b[0],surfaceY+28.575,b[1]);
        });
    }
    return doc;
};


function createFrame(params) {
    var frame, aprons, beams, moulding, panels;
    let doc = new PartCode3dDocument();
    let pockets=params?.pockets ?? [[-1235,-625,0,0,0,58],[1235,-625,0,0,0,58],[-1235,625,0,0,0,58],[1235,625,0,0,0,58],[0,-675,0,0,0,64],[0,675,0,0,0,64]];
    function pocketClearance(label) {
        pockets.forEach(function(p,i) {
            doc.cylinder("difference",p[5]+7,240,"#4b2b20");
            doc.translate(p[0],-40,p[1]);
        });
    }
    doc.push_node("union","frame","#4b2b20",false);
    // 木制承重围框和内部横梁，台面支承面局部 y=0。
    doc.push_node("union","aprons","#4b2b20",true);
    [-1,1].forEach(function(s) {
        doc.box("union",2610,175,68,"#4b2b20"); doc.translate(0,-87.5,s*687);
        doc.box("union",68,175,1440,"#4b2b20"); doc.translate(s*1270,-87.5,0);
    });
    pocketClearance("aprons");
    doc.pop_node();
    doc.push_node("union","beams","#755335",true);
    [-1000,-500,0,500,1000].forEach(function(x) {
        doc.box("union",100,110,1350,"#755335"); doc.translate(x,-55,0);
    });
    pocketClearance("beams");
    doc.pop_node();
    doc.push_node("union","moulding","#967144",true);
    [-1,1].forEach(function(s) {
        doc.box("union",2605,8,8,"#967144"); doc.translate(0,-148,s*724);
        doc.box("union",8,8,1430,"#967144"); doc.translate(s*1308,-148,0);
    });
    doc.pop_node();
    doc.push_node("union","panels","#62412d",true);
    [-1,1].forEach(function(s) {
        [-825,0,825].forEach(function(x) {
            doc.box("union",715,92,8,"#62412d"); doc.fillet(8,"z"); doc.translate(x,-78,s*723);
        });
        doc.box("union",1070,92,8,"#62412d"); doc.fillet(8,"z"); doc.rotate("y",90); doc.translate(s*1306,-78,0);
    });
    doc.pop_node();
    doc.pop_node();
    return doc;
}

function createBed(params) {
    var bed, slate, cloth;
    // 台面局部 y=0 是台呢上表面；石板让出袋体壁厚，台呢保留实际落球孔径。
    let doc = new PartCode3dDocument();
    let length = params?.length ?? 2720, width = params?.width ?? 1500;
    let pockets = params?.pockets ?? [[-1235,-625,0,0,0,58],[1235,-625,0,0,0,58],[-1235,625,0,0,0,58],[1235,625,0,0,0,58],[0,-675,0,0,0,64],[0,675,0,0,0,64]];
    doc.push_node("union","bed","#186e53",false);
    function layer(name,color,thickness,top,w,d) {
        doc.push_node("union",name,color,true);
        doc.add_sketch(sketchPanel({width:w,depth:d}),name+"_outline");
        doc.extrude("union",thickness,color,true);
        doc.rotate("x",-90);
        doc.translate(0,top-thickness,0);
        pockets.forEach(function(p,i) {
            // 袋体外半径为孔径半径 +5；石板避让，消除内壁共面闪烁。
            doc.cylinder("difference",p[5]+(name==="slate"?5:0),100,color);
            doc.translate(p[0],-20,p[1]);
        });
        doc.pop_node();
    }
    layer("slate","#43494a",32,-3,length,width);
    layer("cloth","#217b5a",3,0,length-16,width-16);
    doc.pop_node();
    return doc;
}

function createRailSurround(params) {
    var rail_surround, walnut, lower_trim, sights;
    let doc = new PartCode3dDocument();
    let length = params?.length ?? 2840, width = params?.width ?? 1570;
    let cr=20*Math.SQRT2+58,cs=Math.tan(7*Math.PI/180),ss=Math.tan(14*Math.PI/180);
    let pockets = params?.pockets ?? [[-1235,-625,-135,cr,58,58,cs],[1235,-625,135,cr,58,58,cs],[-1235,625,-45,cr,58,58,cs],[1235,625,45,cr,58,58,cs],[0,-675,180,70,64.5,64,ss],[0,675,0,70,64.5,64,ss]];
    doc.push_node("union","rail_surround","#543121",false);
    function ring(name,color,w,d,h,y) {
        doc.push_node("union",name,color,true);
        doc.box("union",w,h,d,color);
        doc.fillet(12,"y");
        doc.translate(0,y,0);
        doc.box("difference",2520,100,1300,color);
        doc.translate(0,20,0);
        pockets.forEach(function(p,i) {
            doc.add_sketch(sketchPocketThroat({
                radius:p[5]+8,reach:p[3],half:p[4]+8,slope:p[6],angle:p[2],instance:name+"_seat_"+i
            }),name+"_seat_"+i);
            doc.extrude("difference",120,color,true);
            doc.rotate("x",90); doc.translate(p[0],60,p[1]);
        });
        doc.pop_node();
    }
    ring("walnut","#633e29",length,width,44,20);
    ring("lower_trim","#b3935b",length+4,width+4,5,-3);
    // 菱形瞄准点：每条长边六个，短边三个，均避开袋口。
    doc.push_node("union","sights","#eadbb8",true);
    [-1,1].forEach(function(side) {
        [-915,-610,-305,305,610,915].forEach(function(x) {
            doc.box("union",12,2,12,"#eadbb8");
            doc.rotate("y",45); doc.translate(x,42,side*726);
        });
        [-305,0,305].forEach(function(z) {
            doc.box("union",12,2,12,"#eadbb8");
            doc.rotate("y",45); doc.translate(side*1361,42,z);
        });
    });
    doc.pop_node();
    doc.pop_node();
    return doc;
}

function createCushion(params) {
    var cushion, rubber;
    // 本地 +X 为库边外侧，长边沿 Z；入口负责旋转和定位。
    let doc = new PartCode3dDocument();
    let length = params?.length ?? 1100;
    doc.push_node("union", "cushion", "#145d48", false);
    doc.push_node("union", "rubber", "#145d48", true);
    doc.add_sketch(sketchCushionSection({instance:params?.instance}), "rubber_profile");
    doc.extrude("union", length, "#145d48", true);
    doc.translate(0, 0, -length/2);
    // 库边仅按袋颚切削，台呢的圆孔保持独立，保留承球台阶。
    (params?.pockets ?? []).forEach(function(p,i) {
        doc.add_sketch(sketchPocketThroat({
            radius:p[5],reach:p[3],half:p[4],slope:p[6],angle:p[2],instance:"cushion_"+params?.instance+"_"+i
        }),"jaw_cut_"+i);
        doc.extrude("difference",100,"#145d48",true);
        doc.rotate("x",90); doc.translate(p[0],60,p[1]);
    });
    doc.pop_node();
    doc.pop_node();
    return doc;
}

function createLeg(params) {
    var leg, timber, collar, foot, adjuster;
    // 四次复用；脚底局部 y=0，安装面 y=710。
    let doc = new PartCode3dDocument();
    let height = params?.height ?? 710;
    doc.push_node("union","leg","#4a2e22",false);
    doc.push_node("union","timber","#4a2e22",true);
    doc.add_sketch(sketchLegProfile({height:height-45,top:190,bottom:125,instance:params?.instance}),"leg_profile");
    doc.extrude("union",160,"#4a2e22",true);
    doc.translate(0,45,-80);
    doc.pop_node();
    doc.push_node("union","collar","#8b693f",true);
    doc.box("union",144,30,176,"#8b693f");
    doc.translate(0,78,0);
    doc.pop_node();
    doc.push_node("union","foot","#202426",true);
    doc.cylinder("union",82,24,"#202426");
    doc.translate(0,12,0);
    doc.pop_node();
    doc.push_node("union","adjuster","#afb2b0",true);
    doc.cylinder("union",30,32,"#afb2b0");
    doc.translate(0,36,0);
    doc.pop_node();
    doc.pop_node();
    return doc;
}

function createPocket(params) {
    var pocket, leather_rim, basket, rim_fit;
    // 圆形落袋：球从独立的橡胶袋颚进入，经石板台阶落入圆孔。
    // 局部 -Z 朝台面，护边沿实际袋颚开口裁切，两端与相邻库边实体贴合。
    let doc = new PartCode3dDocument();
    let radius=params?.radius ?? 58;
    function profile(op,label,r,depth,top,color) {
        doc.add_sketch(sketchPocketThroat({
            radius:r,roundOnly:true,instance:"pocket_"+params?.instance+"_"+label
        }),label);
        doc.extrude(op,depth,color,true);
        doc.rotate("x",90); doc.translate(0,top,0);
    }
    doc.push_node("union","pocket","#70472f",false);
    doc.push_node("union","leather_rim","#865338",true);
    // 护边与木框顶面齐平，取消凸起缝线，保持连续的光滑边缘。
    profile("union","leather_outer",radius+8,45,42,"#865338");
    doc.add_sketch(sketchPocketThroat({
        radius:radius,reach:params?.reach,half:params?.half,slope:params?.slope,
        instance:"rim_jaw_"+params?.instance
    }),"rim_jaw_opening");
    doc.extrude("difference",70,"#865338",true);
    doc.rotate("x",90); doc.translate(0,50,0);
    // 以相邻库边实际实体作差集，填补原半圆端部缺口，同时不侵入橡胶。
    (params?.cushions ?? []).forEach(function(q,i){
        // 与库边共用同一截面草图。袋颚开口已在上方扣除，无需重复扣除。
        doc.push_node("difference","rim_fit","#865338",true);
        doc.add_sketch(sketchCushionSection({
            instance:"rim_fit_"+params?.instance+"_"+i
        }),"rim_fit_section_"+i);
        doc.extrude("union",q.length,"#865338",true);
        doc.translate(0,0,-q.length/2);
        doc.pop_node();
        doc.rotate("y",q.angle); doc.translate(q.x,0,q.z);
    });
    doc.pop_node();
    doc.push_node("union","basket","#4b3025",true);
    profile("union","basket_outer",radius+5,135,-3,"#4b3025");
    profile("difference","basket_inner",radius,140,8,"#4b3025");
    doc.pop_node();
    doc.pop_node();
    return doc;
}

function createBall(params) {
    var ball, body, ivory_caps;
    let doc = new PartCode3dDocument();
    let color=params?.color ?? "#f5eee0", radius=params?.radius ?? 28.575;
    let striped=params?.striped ?? false;
    doc.push_node("union","ball",color,false);
    doc.push_node("union","body",color,true);
    doc.sphere("union",radius,color);
    if(striped) doc.box("intersection",radius*3,26,radius*3,color);
    doc.pop_node();
    if(striped) {
        // 从同一球面划分色带和象牙白球冠，避免外贴色带增大球径。
        doc.push_node("union","ivory_caps","#f4edda",true);
        doc.sphere("union",radius,"#f4edda");
        doc.box("difference",radius*3,26,radius*3,"#f4edda");
        doc.pop_node();
    }
    doc.pop_node();
    return doc;
}

function sketchPanel(params) {
    // 单一 XY 草图：带水平、垂直、闭合及尺寸约束的矩形板。
    let doc = new PartCode3dDocument();
    let w = params?.width ?? 2720, h = params?.depth ?? 1500;
    doc.start_sketch("panel_outline", [0,0,0,0,0,1]);
    let pts = [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]];
    let edges = pts.map(function(p,i) {
        let q = pts[(i+1)%4];
        return doc.line_segment(p[0],p[1],0,q[0],q[1],0);
    });
    edges.forEach(function(e,i) { doc.constraint_coincident(e,2,edges[(i+1)%4],1); });
    doc.constraint_horizontal(edges[0]); doc.constraint_horizontal(edges[2]);
    doc.constraint_vertical(edges[1]); doc.constraint_vertical(edges[3]);
    doc.constraint_distance(edges[0],w); doc.constraint_distance(edges[1],h);
    doc.end_sketch();
    return doc;
}

function sketchCushionSection(params) {
    // 单一 XY 草图：库边橡胶截面，鼻尖距台呢 28 mm。
    let doc = new PartCode3dDocument();
    doc.start_sketch("cushion_section", [0, 0, 0, 0, 0, 1]);
    let pts = [[-30,28],[-14,0],[30,0],[30,40],[-15,40]];
    let edges = pts.map(function(p, i) {
        let q = pts[(i + 1) % pts.length];
        return doc.line_segment(p[0],p[1],0,q[0],q[1],0);
    });
    edges.forEach(function(e,i) { doc.constraint_coincident(e,2,edges[(i+1)%edges.length],1); });
    doc.constraint_horizontal(edges[1]);
    doc.constraint_vertical(edges[2]);
    doc.constraint_horizontal(edges[3]);
    doc.end_sketch();
    return doc;
}

function sketchLegProfile(params) {
    // 单一 XY 草图：收脚的梯形桌腿，底端为局部 y=0。
    let doc = new PartCode3dDocument();
    let height = params?.height ?? 665;
    let top = params?.top ?? 190, bottom = params?.bottom ?? 125;
    doc.start_sketch("tapered_leg_profile", [0,0,0,0,0,1]);
    let pts = [[-bottom/2,0],[bottom/2,0],[top/2,height],[-top/2,height]];
    let edges = pts.map(function(p,i) {
        let q = pts[(i+1)%4];
        return doc.line_segment(p[0],p[1],0,q[0],q[1],0);
    });
    edges.forEach(function(e,i) { doc.constraint_coincident(e,2,edges[(i+1)%4],1); });
    doc.constraint_horizontal(edges[0]); doc.constraint_horizontal(edges[2]);
    doc.constraint_distance(edges[0],bottom); doc.constraint_distance(edges[2],top);
    doc.end_sketch();
    return doc;
}

function sketchPocketThroat(params) {
    // 单一闭合草图：圆孔，或用于库边切削的圆弧与独立斜袋颚。
    // 草图坐标 (x,y) 对应零件的 (x,z)；angle 是绕世界 Y 的朝向。
    let doc = new PartCode3dDocument();
    let r=params?.radius ?? 58, reach=params?.reach ?? 86.284, half=params?.half ?? 58;
    let slope=params?.slope ?? Math.tan(7*Math.PI/180);
    let angle=params?.angle ?? 0, a=angle*Math.PI/180, c=Math.cos(a), s=Math.sin(a);
    function xy(x,y) { return [c*x+s*y,-s*x+c*y]; }
    function line(p,q) { let u=xy(p[0],p[1]),v=xy(q[0],q[1]); return doc.line_segment(u[0],u[1],0,v[0],v[1],0); }
    doc.start_sketch("pocket_throat",[0,0,0,0,0,1]);
    if(params?.roundOnly) {
        doc.circle(0,0,0,r);
    } else {
        // 斜袋颚在鼻尖连线处恰为 2*half 宽；后端与圆弧相交。
        let intercept=half-slope*reach;
        let join=(intercept*slope-Math.sqrt((1+slope*slope)*r*r-intercept*intercept))/(1+slope*slope);
        let joinX=intercept-slope*join;
        let theta=Math.atan2(join,joinX)*180/Math.PI;
        let front=reach+140, frontHalf=intercept+slope*front;
        doc.arc(0,0,0,r,theta-angle,180-theta-angle);
        line([-joinX,join],[-frontHalf,-front]);
        line([-frontHalf,-front],[frontHalf,-front]);
        line([frontHalf,-front],[joinX,join]);
    }
    doc.end_sketch();
    return doc;
}
