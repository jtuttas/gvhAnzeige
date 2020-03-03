export class Depature {
    departue: Date;
    rdepartue: Date;
    line: number;
    destination:string;
    type:string;
    station:string;

 
    constructor(d: Date, rd:Date,l:number,dest:string,t:string,st:string) {
        this.departue=d;
        this.rdepartue=rd;
        this.line=l;
        this.destination=dest;
        this.type=t;
        this.station=st;
    }

    public toString():string {
        if (this.rdepartue==null) {
            return "-"+this.station+":"+this.type+" "+this.line+" Abfahrt "+this.departue.getHours()+":"+this.departue.getMinutes()+" Richtung:"+this.destination;
        }
        else {
            return "*"+this.station+":"+this.type+" "+this.line+" Abfahrt "+this.rdepartue.getHours()+":"+this.rdepartue.getMinutes()+" Richtung:"+this.destination;
        }
    }
}