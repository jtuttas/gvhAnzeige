export class Depatures {
    year: number;
    month: number;
    day: number;
    weekday: number;
    hour: number;
    minute: number;
    line: number;
    destination:string;
    type:string;
    station:string;

    constructor(y: number, m: number, d: number, wd: number, h: number, mi: number,l:number,dest:string,t:string,st:string) {
        this.year = y;
        this.month=m;
        this.day=d;
        this.weekday=wd;
        this.hour=h;
        this.minute=mi;
        this.line=l;
        this.destination=dest;
        this.type=t;
        this.station=st;
    }

    public describe():string {
        return ""+this.station+":"+this.type+" "+this.line+" Abfahrt "+this.hour+":"+this.minute+" Richtung:"+this.destination;
    }
}