//Uses AvoLib.js
let a = new V2D(100,0);
let b = new V2D(600,700);

class Polygon  {
  constructor(Points) {
    this.Points = [];
    this.temp = [];
    if(!Points) {return}
    for(let P of Points) {
      this.Ponts.push(P);
    }
  }

  show(range) {
    this.Clipp(range);
    this.inRange(range);
    for(let P of this.temp) {
      P.draw(10,"red");
    }
    if(this.temp.length>0) {
    this.Interpolate();
    }
    this.temp = [];
    a.Rectangle(b,"black","stroke")
  }

  Interpolate() {
    Canvas.StartDraw("black");
    Canvas.ctx.moveTo(this.temp[0].x,this.temp[0].y);
    for(let i=this.temp.length-1;i>=0;i--) {
      Canvas.ctx.lineTo(this.temp[i].x,this.temp[i].y);
    }
    Canvas.EndDraw("fill");
  }

  move(Vector) {
    for(let i in this.Points) {
      this.Points[i] = this.Points[i].add(Vector);
    }
  }

  inRange(range) {
    for(let P of this.Points) {
      if(P.x > range[0].x && P.y > range[0].y && P.x < range[1].x && P.y < range[1].y) {
        this.temp.push(P);
      }
    }
  }

  Clipp(range) {
    for(let i=this.Points.length-2;i>=0;i--) {
      let S = [];
      let a = range[0];
      let b = range[1];
        S.push(this.Points[i].SCHNITT(this.Points[i+1],a,new V2D(a.x,b.y)));
        S.push(this.Points[i].SCHNITT(this.Points[i+1],a,new V2D(b.x,a.y)));
        S.push(this.Points[i].SCHNITT(this.Points[i+1],new V2D(a.x,b.y),b));
        S.push(this.Points[i].SCHNITT(this.Points[i+1],new V2D(b.x,a.y),b));
      for(let Ps of S) {
        if(Ps) {
          this.temp.push(Ps);
        }
      }
    }
  }

  SymPolygon(x_,y_,corners,length) {
    this.Points = [];
    let angleAdd = Math.PI*2/corners;
    let angle = 0;
    let num = (corners%2==0) ? 2 : 4;
    let x,y;
    for(let i=0;i<corners+1;i++) {
      x = length * Math.cos(angle-angleAdd/num) + x_;
      y = length * Math.sin(angle-angleAdd/num) + y_;
      angle+=angleAdd;
      this.Points.push(new V2D(x,y));
  }
}

}
