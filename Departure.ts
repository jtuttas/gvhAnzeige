export class Depatures {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    ryear: number;
    rmonth: number;
    rday: number;
    rhour: number;
    rminute: number;
    line: number;
    destination:string;
    type:string;
    station:string;

    constructor(y: number, m: number, d: number, h: number, mi: number,ry: number, rm: number, rd: number, rh: number, rmi: number,l:number,dest:string,t:string,st:string) {
        this.year = y;
        this.month=m;
        this.day=d;
        this.hour=h;
        this.minute=mi;
        this.ryear = ry;
        this.rmonth=rm;
        this.rday=rd;
        this.rhour=rh;
        this.rminute=rmi;
        this.line=l;
        this.destination=dest;
        this.type=t;
        this.station=st;
    }

    public describe():string {
        if (this.ryear==0) {
            return "-"+this.station+":"+this.type+" "+this.line+" Abfahrt "+this.hour+":"+this.minute+" Richtung:"+this.destination;
        }
        else {
            return "*"+this.station+":"+this.type+" "+this.line+" Abfahrt "+this.rhour+":"+this.rminute+" Richtung:"+this.destination;
        }
    }
}