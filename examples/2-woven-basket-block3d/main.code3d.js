var object1, i, object2, object3, object5, object4;


let main = function(){
  let code3d_doc = new PartCode3dDocument()
  code3d_doc.push_node("union","object1","#ffc658",true)
    for (i = 0; i <= 35; i++) {
      code3d_doc.push_node("union","object2","#ffc658",true)
        code3d_doc.push_node("union","object3","#ffc658",true)
          code3d_doc.push_node("union","object5","#ffc658",true)
            code3d_doc.cylinder("union", 5, 12, "#ffc658")
            code3d_doc.fillet(2, "xyz")
          code3d_doc.pop_node()
          code3d_doc.box("difference", 10, 15, 15, "#ffc658")
          code3d_doc.translate(5, 0, 0)
        code3d_doc.pop_node()
        code3d_doc.push_node("difference","object4","#ffc658",true)
          code3d_doc.cylinder("union", 4.8, 11.6, "#ffc658")
          code3d_doc.fillet(1.8, "xyz")
        code3d_doc.pop_node()
        code3d_doc.cylinder("difference", 2, 20, "#ffc658")
        code3d_doc.box("intersection", 20, 20, 0.5, "#ffc658")
      code3d_doc.pop_node()
      code3d_doc.rotate("y", (i * 10))
    }
  code3d_doc.pop_node()
  return code3d_doc
}
