import $ from "jquery";
import { Depature } from "../data/Departure";
import { WSController } from "./WSController";

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
        s+=" um "+d.getHours()+":"+d.getMinutes();
        $("#datum").text(s);

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
                    let realtime: boolean;
                    let dif: number;
                    if (!element.rdepartue) {
                        realtime = false;
                        dif = new Date(element.departue).getTime() - d.getTime();
                    }
                    else {
                        realtime = true;
                        dif = new Date(element.rdepartue).getTime() - d.getTime();
                    }
                    let min = Math.round(dif / (1000 * 60));
                    if (min > 0) {

                        $("#content").append('<div class="row">');
                        if (element.type == "Bus") {
                            $("#content").append('<div class="col-xs-4 col-sm-4 col-md-4"><img class="img-responsive myrow myimg" src="bus.png">' + element.type + " " + element.line + '</div>');
                        }
                        else {
                            $("#content").append('<div class="col-xs-4 col-sm-4 col-md-4"><img class="img-responsive myrow myimg" src="ubahn.png">' + element.type + " " + element.line + '</div>');
                        }
                        $("#content").append('<div class="col-xs-6 col-sm-6 col-md-6">' + element.destination + '</div>');
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