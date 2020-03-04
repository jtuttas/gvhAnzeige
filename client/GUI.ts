import $ from "jquery";
import { Depature } from "../data/Departure";
import { WSController } from "./WSController";
import { format } from "path";

export class GUI {
    private running: boolean = false;
    private ws: WSController;

    constructor(ws: WSController) {
        this.start();
        this.ws = ws;
    }
    public start(): void {
        this.running = true;
        this.timeout();
    }

    public stop(): void {
        this.running = false;
    }
    private timeout() {
        var that = this;
        setTimeout(function () {
            console.log('tick');
            if (that.ws.isConnected()) {
                that.refresh(that.ws.getData());
            }
            else {
                that.disconnected();
                that.ws.connect();
                that.ws.ws;
            }
            if (that.running) {
                that.timeout();
            }
        }, 10000);
    } 

    private updateTimer() {
        let days:string[]=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
        let months:string[]=["Januar","Februar","März","April","Mai","Juni","July","August","September","Oktober","November","Dezember"];
        let s:string;
        let d:Date=new Date();
        s=days[d.getDay()]+" der "+d.getDate()+". "+months[d.getMonth()]+" "+d.getFullYear();
        s+=" um "+d.getHours()+":"+this.format(d.getMinutes());
        $("#datum").text(s);
    }

    private format(i:number):string {
        if (i<10) {
            return "0"+i;
        }
        return ""+i;

    }

    public refresh(dataObj: import("../data/Departure").Depature[]): void {
        if (dataObj) {
            let d: Date = new Date();
            let i: number = 1;
            $("#content").empty();
            $("#station").text(dataObj[0].station);
            this.updateTimer();
            dataObj.forEach((element: Depature) => {
                if (i <= 4) {
                    console.log("Bearbeite element="+JSON.stringify(element));
                    let realtime: boolean=false;
                    let dep:Date=new Date(element.departue);
                    let rdep:Date=null;
                    let dif: number = dep.getTime()-d.getTime();
                    let delay:number =0;
                    if (element.rdepartue!=null) {
                        realtime = true;
                        rdep = new Date(element.rdepartue);
                        dif = rdep.getTime()-d.getTime();
                        delay=rdep.getTime()-dep.getTime();
                        delay=Math.round(delay/(1000*60));
                    }
                    let min = Math.round(dif / (1000 * 60));
                    //console.log("dep="+dep.getHours()+":"+dep.getMinutes()+" UTC"+dep.toUTCString()+" TimeZoneOffset"+dep.getTimezoneOffset()+" ISO"+dep.toISOString());

                    if (realtime) {
                        console.log("*rt) min="+min+" aktual:"+d.toLocaleTimeString()+" rdep="+rdep.toLocaleTimeString()+" dif="+dif);
                    }
                    else {
                        console.log(" min="+min+" aktual:"+d.toLocaleTimeString()+" dep="+dep.toLocaleTimeString()+" dif="+dif);
                    }

                    if (min > 0) {

                        $("#content").append('<div class="row">');
                        if (element.type == "Bus") {
                            $("#content").append('<div class="col-xs-4 col-sm-4 col-md-4"><img class="img-responsive myrow myimg" src="bus.png">' + element.type + " " + element.line + '</div>');
                        }
                        else {
                            $("#content").append('<div class="col-xs-4 col-sm-4 col-md-4"><img class="img-responsive myrow myimg" src="ubahn.png">' + element.type + " " + element.line + '</div>');
                        }
                        if (realtime && delay!=0) {
                            $("#content").append('<div class="col-xs-6 col-sm-6 col-md-6">' + element.destination +"  (+"+delay+' min) </div>');
                        }
                        else {
                            $("#content").append('<div class="col-xs-6 col-sm-6 col-md-6">' + element.destination + '</div>');
                        }
                        if (realtime) {
                            $("#content").append('<div class="col-xs-2 col-sm-2 col-md-2 minute">' + min + ' min</div>');
                        }
                        else {
                            $("#content").append('<div class="col-xs-2 col-sm-2 col-md-2 minute"><i>' + min + ' min</i></div>');

                        }
                        $("#content").append('</div>');

                        i++;
                    }
                }
            });
        }
    }

    public disconnected(): void {
        $("#station").text("");
        $("#content").empty();
        $("#content").append('<div class="row">');
        $("#content").append('<div class="col-xs-12 col-sm-12 col-md-12 err"> <p>Verbindung zum Server verloren!!</p></div>');
        $("#content").append('</div>');
    }
}