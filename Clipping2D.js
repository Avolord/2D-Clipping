//Uses AvoLib.js
let a = new V2D(0,0);
let b = new V2D(400,400);

class Polygon  {
  constructor(Points) {
    this.Points = [];
    this.temp = [];
    this.rangeType = "box";
    if(!Points) {return}
    for(let P of Points) {
      this.Ponts.push(P);
    }
    this.center = this.calcCenter();
  }

  show(range) {
    //this.temp = AM.copyArray(this.Points);
    //this.Clipp(range);
    this.inRange(range);
    if(this.temp.length>0) {
    this.Interpolate();
    }
    for(let P of this.temp) {
      P.show("red");
    }
    this.temp = [];
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
    //this.temp = AM.copyArray(this.Points);
    for(let i in this.Points) {
        if(this.Points[i].x > range[0].x && this.Points[i].y > range[0].y && this.Points[i].x < range[1].x && this.Points[i].y < range[1].y) {
          this.temp.push(this.Points[i]);
        }
        else {
          let index1 = (i<this.Points.length-1) ? parseInt(i)+1 : 0;
          let index2 = (i>0) ? i-1 : this.Points.length-1;
          let check1 = Polygon.clip(this.Points[i],this.Points[index1],range);
          let check2 = Polygon.clip(this.Points[i],this.Points[index2],range);
          if(check2) {
            this.temp.push(check2);
          }
          if(check1) {
            this.temp.push(check1);
          }
        }
      }
      range[0].Rectangle(range[1],"black","stroke");
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

  static clip(start,stop,range) {
    let S = [];
    let a = range[0];
    let b = range[1];
      S.push(start.SCHNITT(stop,a,new V2D(a.x,b.y)));
      S.push(start.SCHNITT(stop,a,new V2D(b.x,a.y)));
      S.push(start.SCHNITT(stop,new V2D(a.x,b.y),b));
      S.push(start.SCHNITT(stop,new V2D(b.x,a.y),b));
    for(let Ps of S) {
      if(Ps) {
        return Ps
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
  this.center = new V2D(x_,y_)
}

calcCenter() {
  let sum = new V2D();
  for(let P of this.Points) {
    sum  = sum.add(P);
  }
  return sum.div(this.Points.length)
}

}
