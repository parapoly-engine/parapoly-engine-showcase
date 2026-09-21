var object1, object2;


let main = function(){
  let code3d_doc = new PartCode3dDocument()
  code3d_doc.push_node("union","object1","#71a7b9",true)
    code3d_doc.sphere("union", 3, "#ffc658")
    code3d_doc.sphere("difference", 2.7, "#ffc658")
    code3d_doc.box("difference", 15, 5, 15, "#ffc658")
    code3d_doc.translate(0, 3.5, 0)
    code3d_doc.box("difference", 15, 5, 15, "#ffc658")
    code3d_doc.translate(0, (-5), 0)
    code3d_doc.cylinder("union", 1.5, 0.2, "#ffc658")
    code3d_doc.translate(0, (-2.4), 0)
    code3d_doc.push_node("union","object2","#ffc658",true)
      code3d_doc.push_node("union", '', "#ffc658", true)
        code3d_doc.torus("union", 1, 0.2, "#ffc658")
        code3d_doc.rotate("x", 90)
      code3d_doc.pop_node()
      code3d_doc.translate(3.5, (-0.5), 0)
      code3d_doc.sphere("difference", 2.7, "#ffc658")
    code3d_doc.pop_node()
  code3d_doc.pop_node()
  return code3d_doc
}
