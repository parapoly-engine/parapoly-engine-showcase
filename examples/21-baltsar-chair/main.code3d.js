// IKEA BALTSAR 黑色四腿椅。毫米，Y 向上，+Z 朝前。
// 网页尺寸 580×570×850，座高450，座面460×440。
// 曲率及厚度为照片约束下的重建设计，不是厂家制造数据。
// 全部实体由 ParaPoly spline_loft 生成，无外部模型资源。
function baltsarLoft(doc,name,rows,color,opacity){
    doc.push_node('union',name,color,false).set_topo_shape(parapoly_engine.ParaPolyShapeMaker.spline_loft(rows));
    doc.pop_node();if(opacity!==undefined)doc.set_opacity(opacity);
}
function baltsarBezier(a,b,c,d,t){const s=1-t;return a.map((v,k)=>s*s*s*v+3*s*s*t*b[k]+3*s*t*t*c[k]+t*t*t*d[k]);}
function baltsarSmooth(t){t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);}
// One shared centre surface for the clear seat/back and the exterior cradle.
// Preserve the body thickness; round the transverse ends as elliptical domes.
function baltsarSurface(x,t){
    const u=x/290,q=Math.sqrt(1-.9375*u*u),lift=40*Math.pow(u,8);
    const curves=[
        [[433,280.5],[418,218],[408,-112],[429,-159]],
        [[429,-159],[440.6666667,-185.1111111],[505,-215],[569,-224]],
        [[569,-224],[645.8,-234.8],[791,-269],[845.5,-280.5]]
    ];
    let p;if(t<=.45)p=baltsarBezier(...curves[0],t/.45);
    else if(t<=.7)p=baltsarBezier(...curves[1],(t-.45)/.25);
    else p=baltsarBezier(...curves[2],(t-.7)/.3);
    const a=baltsarSmooth((Math.abs(u)-.72)/.28);
    const linear=[433+(845.5-433)*t,280.5-561*t];
    p=p.map((v,i)=>v*(1-a)+linear[i]*a);
    // Broad shallow crown with rounded shoulders; blend only above the cradle.
    const lowerHeight=Math.pow(q,1.4),crownHeight=Math.pow(1-.9375*Math.pow(u,6),.7);
    const upperBlend=baltsarSmooth((t-.76)/.24)*(1-baltsarSmooth((Math.abs(u)-.8)/.16));
    const heightFactor=lowerHeight+(crownHeight-lowerHeight)*upperBlend;
    return [420+(p[0]-420)*heightFactor+lift,p[1]*q];
}
function baltsarFrame(x,t){
    const p=baltsarSurface(x,t),ta=Math.max(0,t-.0001),tb=Math.min(1,t+.0001);
    const a=baltsarSurface(x,ta),b=baltsarSurface(x,tb),dy=b[0]-a[0],dz=b[1]-a[1],len=Math.hypot(dy,dz),n=[-dz/len,dy/len];
    const xa=baltsarSurface(Math.max(-290,x-.01),t),xb=baltsarSurface(Math.min(290,x+.01),t),h=Math.min(290,x+.01)-Math.max(-290,x-.01);
    const gradient=((xb[0]-xa[0])*n[0]+(xb[1]-xa[1])*n[1])/h;
    return {p,n,factor:Math.sqrt(1+gradient*gradient)};
}
// Closed cross-section: outer and inner surfaces plus rounded solid end faces.
// Transverse slope compensation maintains material thickness toward the sides.
function baltsarRibbon(x,points,normals,thickness){
    const row=[],put=(i,k)=>{const p=points[i],n=normals[i],r=thickness[i]/2;row.push(x,p[0]+r*n[0]*k,p[1]+r*n[1]*k);};
    for(let i=0;i<points.length;i++)put(i,1);
    const cap=(i,sign)=>{const p=points[i],n=normals[i],r=thickness[i]/2;for(let j=1;j<8;j++){const a=j*Math.PI/8;row.push(x,p[0]+sign*r*(n[0]*Math.cos(a)+n[1]*Math.sin(a)),p[1]+sign*r*(n[1]*Math.cos(a)-n[0]*Math.sin(a)));}};
    cap(points.length-1,1);
    for(let i=points.length-1;i>=0;i--)put(i,-1);
    cap(0,-1);return row;
}
function baltsarShellRows(cradle){
    const rows=[],halfWidth=cradle?256:290;
    const us=cradle?[-1,-.98,-.94,-.88,-.8,-.7,-.6,-.5,-.4,-.3,-.2,-.1,0,.1,.2,.3,.4,.5,.6,.7,.8,.88,.94,.98,1]:
        [-290,-289.99,-289.9,-289.5,-288.5,-286,-282,-276,-270,-255.2,-232,-203,-174,-145,-116,-87,-58,-29,0,
          29,58,87,116,145,174,203,232,255.2,270,276,282,286,288.5,289.5,289.9,289.99,290].map(x=>x/290);
    for(const u of us){
        const x=u*halfWidth,points=[],normals=[],thickness=[];
        let end=1,start=0;
        if(cradle){
            start=.018;end=.755;
        }
        for(let j=0;j<=36;j++){
            const t=start+(end-start)*j/36,f=baltsarFrame(x,t);
            const offset=cradle?-(4.5+3+6)*f.factor:0;
            points.push([f.p[0]+offset*f.n[0],f.p[1]+offset*f.n[1]]);
            normals.push(f.n);thickness.push((cradle?12:9)*f.factor);
        }
        let row=baltsarRibbon(x,points,normals,thickness);
        // A 20 mm elliptical return joins the front and rear rims at each side.
        // Small finite end sections keep the solid robust without a long flat cap.
        if(!cradle&&Math.abs(x)>270){
            const r=Math.sqrt(1-.9975*Math.pow((Math.abs(x)-270)/20,2)),mid=baltsarSurface(x,.5);
            for(let k=0;k<row.length;k+=3){
                row[k+1]=mid[0]+r*(row[k+1]-mid[0]);
                row[k+2]=mid[1]+r*(row[k+2]-mid[1]);
            }
        }
        rows.push(row);
    }
    return rows;
}
function baltsarCushionRows(){
    return [-1,-.985,-.94,-.84,-.68,-.45,-.2,0,.2,.45,.68,.84,.94,.985,1].map(u=>{
        const q=Math.pow(Math.max(.00004,1-Math.pow(Math.abs(u),2.7)),1/2.7);
        return Array.from({length:64},(_,i)=>{
            const a=i*Math.PI/32,z=220*q*Math.cos(a);
            return [230*u,450-13*q+4*q*Math.cos(a)**2+13*q*Math.sin(a),z+60];
        }).flat();
    });
}
function baltsarLegRows(sx,sz){
    const topY=sz>0?414:419;
    const levels=[0,2,6,12,30,70,120,180,240,300,350,topY];
    return levels.map(y=>{
        const t=y/topY,r=y<6?14+4*Math.sin(y*Math.PI/12):18+6*t;
        const x=sx*(222-37*t),z=sz*((sz>0?235:220)-((sz>0?235:220)-145)*t);
        return Array.from({length:32},(_,i)=>{const a=i*Math.PI/16;return [x+r*Math.cos(a),y,z+r*Math.sin(a)];}).flat();
    });
}
let main=function(params){
    const p=params??{},scale=p.scale??1,opacity=p.shellOpacity??.28;
    const black=p.baseColor??'#191c1d',fabric=p.cushionColor??'#292a29';
    if(!Number.isFinite(scale)||scale<.1||scale>3)throw new Error('scale 必须为 0.1..3 的数值');
    if(!Number.isFinite(opacity)||opacity<0||opacity>1)throw new Error('shellOpacity 必须为 0..1 的数值');
    for(const c of [black,fabric])if(typeof c!=='string'||!/^#[0-9a-fA-F]{6}$/.test(c))throw new Error('颜色必须使用 #rrggbb');
    const code3d_doc=new PartCode3dDocument();code3d_doc.push_node('union','baltsar-four-leg-chair',black,false);
    for(const sx of [-1,1])for(const sz of [-1,1])baltsarLoft(code3d_doc,'leg-'+(sz>0?'front':'rear')+'-'+(sx>0?'right':'left'),baltsarLegRows(sx,sz),black);
    baltsarLoft(code3d_doc,'03-exterior-support-cradle',baltsarShellRows(true),black);
    baltsarLoft(code3d_doc,'04-continuous-polycarbonate-shell',baltsarShellRows(false),'#97a4a8',opacity);
    baltsarLoft(code3d_doc,'05-upholstered-seat-pad',baltsarCushionRows(),fabric);
    code3d_doc.pop_node();code3d_doc.scale(scale,scale,scale);return code3d_doc;
};

