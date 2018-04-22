Animation(true);
let P1 = new Polygon();
		P1.SymPolygon(300,300,10,100);
let r = [a,b];
function setup() {
	P1.show(r);
	recordMousePos(Canvas.Element);
}

function draw() {
	P1.show(r);
	P1.SymPolygon(mouseX,mouseY,10,100);
	P1.move(new V2D(0.8,0));
}

function NoLoop() {
	Animation(false);
}
function Loop() {
	Animation(true);
}
function reload() {
	location.reload();
}


//Framerate
var before,now,fps;
before=Date.now();
fps=0;
requestAnimationFrame(
    function loop(){
        now=Date.now();
        fps=Math.round(1000/(now-before));
        before=now;
        requestAnimationFrame(loop);
				if(fps < 58) {
        document.getElementById("Count").innerHTML = fps;
			} else {
				document.getElementById("Count").innerHTML = 60;
			}
    }
 );

 let mouseX, mouseY, getMousePosition;
 mouseX = mouseY = 0;
 getMousePosition = false;

 function recordMousePos(Obj) {
   getMousePosition = (getMousePosition) ? false : true;
   Obj.onmousemove = function(e) {
     if(!getMousePosition) {return}
     mouseX = e.pageX - this.offsetLeft;
     mouseY = e.pageY - this.offsetTop;
   }
 }
