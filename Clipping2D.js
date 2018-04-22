//Uses AvoLib.js
let a = new V2D(100,0);
let b = new V2D(600,700);

class Polygon  {
  constructor(Points) {
    this.Points = [];
    this.clipped = [];
    if(!Points) {return}
    for(let P of Points) {
      this.Ponts.push(P);
    }
  }

  show(range) {
    this.Clipp(range);
    for(let P of this.Points) {
      if(Polygon.inRange(P,range)) {
      P.show("black");
    }
    }
    for(let P of this.clipped) {
      P.show();
    }
    a.Rectangle(b,"black","stroke")
    this.clipped = [];
  }

  move(Vector) {
    for(let i in this.Points) {
      this.Points[i] = this.Points[i].add(Vector);
    }
  }

  static inRange(P,range) {
    if(P.x > range[0].x && P.y > range[0].y && P.x < range[1].x && P.y < range[1].y) {
      return true
    } else {
      return false
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
          //this.Points.splice(i+1,1);
          this.clipped.push(Ps);
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
