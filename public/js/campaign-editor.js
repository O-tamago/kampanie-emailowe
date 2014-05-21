$(document).ready(function () {
    var canvas = new fabric.Canvas('c');

    var leftB = document.getElementById('leftB');
    var upB = document.getElementById('upB');
    var icon = document.getElementById('e-mail');
    var list = document.getElementById('ext');
    var week = document.getElementById('week');
    var leftBInstance = new fabric.Image(leftB, {
        left: 0,
        top: 0,
        selectable:false
    });
  
    var upBInstance = new fabric.Image(upB, {
        left: 250,
        top: 0,
        selectable:false
    });
    
    var weekInstance = new fabric.Image(week, {
        left: 250,
        top: 150,
        selectable:false
    });
  
    var iconInstance = new fabric.Image(icon, {
      hasControls : false,     
    });
  
    var extInstance = new fabric.Image(list, {
      fontFamily: 'arial black',     
    });
  
      var textl = new fabric.IText('warunek', {
        fontSize: 20,
        top: 40,
        left :10,
        editable : true,
        hasControls : false
    });
    
    var text1 = new fabric.Text('e-mail', {
        fontSize: 20,
        left :10,
          hasControls : false
    });
    
    var group1 = new fabric.Group([ iconInstance, text1], {
        left: 75,
        top: 100,
        hasControls : false
    });
    
      var group2 = new fabric.Group([ iconInstance, text1], {
        left: 75,
        top: 170,
        hasControls : false
    });
    
     var group3 = new fabric.Group([ iconInstance, text1], {
        left: 75,
        top: 240,
        hasControls : false
    });
    
       var group4 = new fabric.Group([ iconInstance, text1], {
        left: 75,
        top: 310,
        hasControls : false
    });
    
       var group5 = new fabric.Group([ extInstance, textl], {
        left: 450,
        top: 30,
        hasControls : false
    });
    
    fabric.Canvas.prototype.getAbsoluteCoords = function(object) {
    return {
      left: object.left + this._offset.left,
      top: object.top + this._offset.top
    };
  }

  var btn = document.getElementById('inline-btn'),
      btnWidth = 85,
      btnHeight = 18;

  function positionBtn(obj) {
    var absCoords = canvas.getAbsoluteCoords(obj);

    btn.style.left = (absCoords.left - btnWidth / 2) + 70 + 'px' ;
    btn.style.top = (absCoords.top - btnHeight / 2) + 40 +'px';
  }

  fabric.Image.fromURL('../images/list.png', function(img) {

    canvas.add(img.set({ left: 300, top: 40, hasControls : false }));

    img.on('moving', function() { positionBtn(img) });
    positionBtn(img);
  });
    
   

   canvas.add(new fabric.IText('Tap and Type', { 
  fontFamily: 'arial black',
  left: 100, 
  top: 100 ,
}));
    
    
   canvas.add(weekInstance);
    canvas.add(leftBInstance);
    canvas.add(upBInstance);
  
    canvas.add(group1);
    canvas.add(group2);
    canvas.add(group3);
    canvas.add(group4);
    canvas.add(group5);
    
});