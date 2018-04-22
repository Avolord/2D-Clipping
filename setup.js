Animation(true);
let rad = 3;
let P1 = new Polygon();
		P1.SymPolygon(200,200,10,rad);
let r = [a,b];
function setup() {
	P1.show(r);
	recordMousePos(Canvas.Element);
}

function draw() {
	P1.show(r);
	P1.SymPolygon(mouseX,mouseY,rad,100);
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
    function loopz(){
        now=Date.now();
        fps=Math.round(1000/(now-before));
        before=now;
        requestAnimationFrame(loopz);
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
