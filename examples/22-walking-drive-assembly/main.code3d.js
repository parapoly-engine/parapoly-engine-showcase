// 嘉立创行走组件。毫米，Y 向上，轮轴沿 X；尺寸由用户 STEP / BOM 测量。
// 独立可编辑实体，无导入 STEP、嵌入网格或外部模型依赖。
// 原总装活动框架约 0.17° 的微倾斜归零，保留名义装配轴线。
const C = {al:'#b8c7d0', steel:'#85959f', black:'#303a43', rubber:'#252b30', blue:'#65b8d9', brass:'#c3a363'};
function box(d,op,w,h,l,x,y,z,c=C.al,r=0){
    d.box(op,w,h,l,c); if(r)d.fillet(r,'xyz'); d.translate(x,y,z);
}
function cyl(d,op,r,l,x,y,z,axis='y',c=C.steel){
    d.cylinder(op,r,l,c); if(axis==='x')d.rotate('z',90); if(axis==='z')d.rotate('x',90); d.translate(x,y,z);
}
function solid(name,color,build){
    const d=new PartCode3dDocument();d.push_node('union',name,color,true);build(d);d.pop_node();return d;
}
function add(d,p,name,xyz=[0,0,0],axis,angle){d.add_part(p,'union',name);if(axis)d.rotate(axis,angle);d.translate(...xyz);}
function tube(name,outer,inner,length,color){return solid(name,color,d=>{cyl(d,'union',outer,length,0,0,0,'y',color);cyl(d,'difference',inner,length+2,0,0,0);});}
function washer(name,r,bore,h,color=C.steel){return tube(name,r,bore,h,color);}
// 圆角矩形平板只修饰竖边，保持支承面平整；圆角用平面轮廓拼合。
function plate(d,op,w,l,h,x,y,z,r=2,c=C.al){
    d.push_node(op,'rounded-plate',c,true);
    box(d,'union',w-2*r,h,l,x,y,z,c);box(d,'union',w,h,l-2*r,x,y,z,c);
    for(const sx of [-1,1])for(const sz of [-1,1])cyl(d,'union',r,h,x+sx*(w/2-r),y,z+sz*(l/2-r),'y',c);
    d.pop_node();
}
// 原点处 Y 轴螺钉，头部底面在 Y=0；六角凹槽为实际切除。
function screw(name,diam,length,headR,headH,color=C.steel){return solid(name,color,d=>{
    cyl(d,'union',diam/2,length,0,-length/2,0,'y',color);
    cyl(d,'union',headR,headH,0,headH/2,0,'y',color);
    d.prism('difference',6,diam*.46,headH*.65,color);d.translate(0,headH*.8,0);
});}
function frontSupport(){return solid('活动支持架',C.al,d=>{
    plate(d,'union',135,14,5,0,2.5,0,3);
    for(const x of [-49.5,49.5]){
        box(d,'union',9,9,14,x,9.5,0);cyl(d,'union',7,9,x,13,0,'x',C.al);
        cyl(d,'difference',4.05,11,x,14,0,'x');cyl(d,'difference',1.65,12,x,17,0);
    }
    for(const x of [-62,62])cyl(d,'difference',2.75,8,x,2.5,0);
    for(const x of [-30,30])cyl(d,'difference',2.5,7,x,2,0);
});}
function rearSupport(){return solid('固定座',C.al,d=>{
    plate(d,'union',135,12,5,0,2.5,-66,3);
    for(const s of [-1,1]){
        plate(d,'union',16.5,18,8,s*44.25,9,-63,3);
        plate(d,'union',29,6,8,s*27,9,-66,2.8);
        cyl(d,'difference',2.5,16,s*46,6.5,-59);
        cyl(d,'difference',2.75,8,s*62,2.5,-66);
    }
});}
function rollerFrame(){return solid('滚轮框架',C.al,d=>{
    // 上框长边和端板，中心窗口容纳直径 44 的滚轮。
    plate(d,'union',125,69,6,0,16,-39.5,3);
    plate(d,'difference',101,51,11,0,16,-34.5,4);
    // 后侧弹簧安装耳，与固定座留出上下运动间隙。
    for(const s of [-1,1]){
        plate(d,'union',19,21,6,s*46,16,-59,3);
        // 纵向长孔，容纳弹簧导向杆。
        plate(d,'difference',8.4,11,11,s*46,16,-59,4.1);
        // 两个向下的轴承耳，外径20，孔径16。
        box(d,'union',12,11,20,s*56.5,8.5,-33);
        cyl(d,'union',10,12,s*56.5,3,-33,'x',C.al);
        cyl(d,'difference',8,15,s*56.5,3,-33,'x');
        for(const z of [-45,-21])cyl(d,'difference',1.65,15,s*56.5,10,z,'x');
    }
    // 前缘是连续圆管，不是遮挡支持轴的矩形横梁。
    cyl(d,'union',7,90,0,14,0,'x',C.al);
    cyl(d,'difference',5,92,0,14,0,'x');
    for(const x of [-7.5,7.5])cyl(d,'difference',1.65,10,x,17.5,-66.5);
    for(const z of [-14,-48])cyl(d,'difference',1.65,10,-57,17.5,z);
    // 用轮体真实包络开避让，不让弹簧耳角伸入转动空间。
    cyl(d,'difference',22.5,100,0,3,-33,'x');
    for(const s of [-1,1])cyl(d,'difference',7.3,9.4,s*49.5,13,0,'x');
});}
function motorSaddle(){return solid('电机支撑座1',C.al,d=>{
    // X 向挤出25宽的开口抱箍，后脚接框架后横梁。
    box(d,'union',25,32.5,43,0,35.25,-31);
    cyl(d,'union',21.5,25,0,55.5,-31,'x',C.al);
    plate(d,'union',25,23,6,0,22,-59.5,2);
    cyl(d,'difference',18.15,28,0,55.5,-31,'x');
    box(d,'difference',28,36,24,0,30,-31);
    cyl(d,'difference',22.5,28,0,3,-33,'x');
    for(const x of [-7.5,7.5])cyl(d,'difference',2.25,10,x,22,-66.5);
});}
function motorPlate(){return solid('电机支撑座2',C.al,d=>{
    box(d,'union',10,36.5,40,-57,37.25,-31);
    cyl(d,'union',20,10,-57,55.5,-31,'x',C.al);
    cyl(d,'union',19.3,1.5,-51.25,55.5,-31,'x',C.al);
    cyl(d,'difference',5,15,-57,55.5,-31,'x');
    cyl(d,'difference',11,3,-50.75,55.5,-31,'x');
    for(const y of [45.5,65.5])for(const z of [-41,-21]){
        cyl(d,'difference',1.7,15,-57,y,z,'x');cyl(d,'difference',3,3,-61,y,z,'x');
    }
    for(const z of [-48,-14])cyl(d,'difference',1.65,14,-57,23,z);
});}
function wheelShaft(){return solid('滚轮轴',C.steel,d=>{
    cyl(d,'union',7,126,-.5,3,-33,'x');
    cyl(d,'union',5,20,-73.5,3,-33,'x');
    box(d,'difference',14,3,3,-73.5,3,-37.5,C.steel,1.4);
    cyl(d,'difference',1.25,8,-81,3,-33,'x');
    for(const x of [-43,43])cyl(d,'difference',1.65,17,x,3,-33);
});}
function roller(){return solid('滚轮',C.rubber,d=>{
    cyl(d,'union',22,99.6,0,3,-33,'x',C.rubber);
    cyl(d,'difference',7,102,0,3,-33,'x');
    // 两端浅凹台保留轮缘，与轴的装配孔同轴。
    for(const s of [-1,1]){
        cyl(d,'difference',17,2,s*49.3,3,-33,'x');
        cyl(d,'difference',2.2,18,s*43,16,-33);
    }
});}
function motor(){return solid('36ZY行星电机',C.black,d=>{
    cyl(d,'union',18,98,-.5,55.5,-31,'x',C.black);
    cyl(d,'union',17.6,2,-50.5,55.5,-31,'x',C.black);
    cyl(d,'union',17.4,2,49.5,55.5,-31,'x',C.black);
    cyl(d,'union',11,2,-52.5,55.5,-31,'x',C.black);
    cyl(d,'union',3,30,-68.5,55.5,-31,'x',C.black);
    cyl(d,'union',4,2,51,55.5,-31,'x',C.black);
    // 电机接线端子在外端盖上。
    for(const z of [-44,-18])box(d,'union',1.5,4,3,50.5,55.5,z,C.black);
});}
function spring(){
    const d=new PartCode3dDocument();d.start_sketch('spring-profile','z');
    const p=[[5.25,-1],[7.25,-1],[7.25,1],[5.25,1]];
    p.forEach((a,i)=>{const b=p[(i+1)%4];d.line_segment(a[0],a[1],0,b[0],b[1],0);});d.end_sketch();
    const sk=d.get_root_node().getChildByName('spring-profile',true);
    // BOM 自由长70；本展示装配压缩至54，端面位于框架19与螺钉头73之间。
    const shape=parapoly_engine.ParaPolyShapeMaker.helix_shape(sk.to_wires_shape(),4,0,3.3,52,0,false,false,true);
    if(!shape||shape.isNull())throw new Error('弹簧螺旋生成失败');
    d.delete_node('spring-profile');d.push_node('union','矩形截面弹簧',C.blue,false).set_topo_shape(shape);d.pop_node();return d;
}
// 5M 15齿的展示齿形；节圆 75/pi，槽宽16，法兰外径28。
function pulley(name,bore,keyway){return solid(name,C.steel,d=>{
    cyl(d,'union',10.3,18,0,0,0,'x');
    for(const x of [-9,9])cyl(d,'union',14,2,x,0,0,'x');
    for(let i=0;i<15;i++){
        const a=i*2*Math.PI/15;
        cyl(d,'union',1.3,16,0,10.45*Math.cos(a),10.45*Math.sin(a),'x');
    }
    cyl(d,'difference',bore,23,0,0,0,'x');
    if(keyway)box(d,'difference',23,3,3,0,0,-bore,C.steel);
});}
function belt(){return solid('5M-180-15同步带',C.rubber,d=>{
    // 180 mm节长、75 mm周长，名义中心距52.5。包络槽与齿形为展示简化。
    const r=12.1,wall=1.8;
    box(d,'union',15,52.5,2*r,-73.5,29.25,-33,C.rubber);
    for(const y of [3,55.5])cyl(d,'union',r,15,-73.5,y,-33,'x',C.rubber);
    box(d,'difference',18,52.5,2*(r-wall),-73.5,29.25,-33);
    for(const y of [3,55.5])cyl(d,'difference',r-wall,18,-73.5,y,-33,'x');
});}
let main=function(params){
    const scale=params?.scale??1;
    if(typeof scale!=='number'||!Number.isFinite(scale)||scale<=0||scale>10)throw new Error('scale 必须为 0 到 10 之间的有限正数');
    const code3d_doc=new PartCode3dDocument();code3d_doc.push_node('union','行走组件',C.al,false);
    add(code3d_doc,rollerFrame(),'01-roller-frame');
    add(code3d_doc,frontSupport(),'02-active-support');
    add(code3d_doc,rearSupport(),'03-fixed-seat');
    add(code3d_doc,motorSaddle(),'04-motor-saddle');
    add(code3d_doc,motorPlate(),'05-motor-mount');
    add(code3d_doc,solid('支持座活动轴',C.steel,d=>{
        cyl(d,'union',4,108,0,14,0,'x');for(const x of [-49.5,49.5])cyl(d,'difference',1.65,10,x,14,0);
    }),'06-pivot-shaft');
    add(code3d_doc,wheelShaft(),'07-roller-shaft');
    add(code3d_doc,roller(),'08-drive-roller');
    add(code3d_doc,washer('轴端挡圈',7,1.6,2),'09-shaft-retainer',[-84.5,3,-33],'z',90);
    add(code3d_doc,motor(),'10-planetary-motor');
    const coil=spring();
    for(const s of [-1,1]){
        add(code3d_doc,coil,'spring-'+s,[s*46,20,-59]);
        add(code3d_doc,tube('直柱衬套14x16x12',8,7,12,C.brass),'roller-bushing-'+s,[s*56.5,3,-33],'z',90);
        const bush=solid('法兰衬套8x10x15',C.black,d=>{
            cyl(d,'union',5,15,0,0,0,'y',C.black);cyl(d,'union',7.25,1,0,s*7,0,'y',C.black);cyl(d,'difference',4,18,0,0,0);
        });
        add(code3d_doc,bush,'pivot-bushing-'+s,[s*37.5,14,0],'z',90);
        const guide=solid('塞打螺丝8x60-M6',C.steel,d=>{
            cyl(d,'union',4,60,0,43,0);cyl(d,'union',3,12,0,7,0);cyl(d,'union',6.5,5.5,0,75.75,0);
            d.prism('difference',6,3.45,3.5,C.steel);d.translate(0,77.25,0);
        });add(code3d_doc,guide,'spring-guide-'+s,[s*46,0,-59]);
    }
    add(code3d_doc,pulley('驱动轮同步带轮',5,true),'19-driven-pulley',[-73.5,3,-33]);
    // 电机输出轴偏向前2 mm；同一条带的中心线按源装配倾斜2 mm。
    add(code3d_doc,pulley('电机同步带轮',3,false),'20-motor-pulley',[-73.5,55.5,-31]);
    const driveBelt=belt();
    // 带绕X倾斜 atan(2/52.5)，下端固定在滚轮轴心。
    driveBelt.translate(0,-3,33);
    add(code3d_doc,driveBelt,'21-timing-belt',[0,3,-33],'x',2.1819);
    for(const x of [-30,30])add(code3d_doc,solid('圆柱销5x8',C.steel,d=>cyl(d,'union',2.5,8,0,0,0)),'dowel-'+x,[x,0,0]);
    add(code3d_doc,solid('平键3x14',C.steel,d=>box(d,'union',14,3,3,0,0,0,C.steel,.2)),'24-key',[-73.5,3,-37.5]);
    for(const y of [45.5,65.5])for(const z of [-41,-21]){
        add(code3d_doc,screw('M3x6',3,6,2.75,3),'motor-bolt-'+y+'-'+z,[-59,y,z],'z',90);
        add(code3d_doc,washer('M3弹垫',2.6,1.6,.6),'motor-washer-'+y+'-'+z,[-58.7,y,z],'z',90);
    }
    for(const [i,x,y,z] of [[0,-7.5,23,-66.5],[1,7.5,23,-66.5],[2,-57,19,-14],[3,-57,19,-48]]){
        add(code3d_doc,screw('M4x10',4,10,3.5,4),'mount-bolt-'+i,[x,y,z]);
        add(code3d_doc,washer('M4弹垫',3.25,2.1,.8),'mount-washer-'+i,[x,y-.4,z]);
    }
    for(const x of [-49.5,49.5]){
        add(code3d_doc,screw('M4x8',4,8,3.5,4),'pivot-bolt-'+x,[x,21.3,0]);
        add(code3d_doc,washer('M4弹垫',3.25,2.1,.8),'pivot-spring-washer-'+x,[x,20.9,0]);
        add(code3d_doc,washer('M4平垫',4,2.1,.5),'pivot-flat-washer-'+x,[x,20.25,0]);
    }
    for(const x of [-62,62])for(const z of [-66,0]){
        add(code3d_doc,screw('M5x12',5,12,4.25,5),'foot-bolt-'+x+'-'+z,[x,7.1,z]);
        add(code3d_doc,washer('M5弹垫',4.05,2.65,1.1),'foot-spring-washer-'+x+'-'+z,[x,6.55,z]);
        add(code3d_doc,washer('M5平垫',4.5,2.65,1),'foot-flat-washer-'+x+'-'+z,[x,5.5,z]);
    }
    add(code3d_doc,screw('M3轴端螺钉',3,6,3.3,1.2),'shaft-end-bolt',[-84.3,3,-33],'z',90);
    for(const x of [-43,43])add(code3d_doc,screw('M4滚轮锁紧螺钉',4,10,4.4,1),'roller-lock-'+x,[x,15,-33]);
    code3d_doc.pop_node();code3d_doc.scale(scale,scale,scale);return code3d_doc;
};
