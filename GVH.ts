import request from "request-promise";
import { Depatures } from "./Departure";

export class GVH {
    public static async  getData(): Promise<Depatures[]> {
        let date: Date = new Date();
        let hh:string=this.format(date.getHours());
        let mm:string=this.format(date.getMinutes());
        let yyyymmdd:string=date.getFullYear()+this.format(date.getMonth()+1)+this.format(date.getDate());
        let response: any = {};
        await request({
            url: "https://efa107.efa.de/efaws2/default/XML_DM_REQUEST?outputFormat=JSON&sessionID=0&requestID=0&language=de&useRealtime=1&coordOutputFormat=WGS84[DD.ddddd]&locationServerActive=1&mode=direct&dmLineSelectionAll=1&depType=STOPEVENTS&useAllStops=1&command=null&type_dm=stop&name_dm=25001811&itdTime="+hh+mm+"&itdDate="+yyyymmdd+"&outputEncoding=UTF-8&inputEncoding=UTF-8&mId=efa_www",
            method: "GET",
            headers: { 'content-type': 'application/json' },
            body: {},
            json: true
        }, (error, responce, body) => {
        })
            .then((body) => {
                console.log("Erzeuge Daten");
                let da: Depatures[] = [];
                body.departureList.forEach(element => {
                    
                    if('realDateTime' in element){
                        let d: Depatures = new Depatures(
                            element.realDateTime.year,
                            element.realDateTime.month,
                            element.realDateTime.day,
                            element.realDateTime.weekday,
                            element.realDateTime.hour,
                            element.realDateTime.minute,
                            element.servingLine.number,
                            element.servingLine.direction,
                            element.servingLine.name

                            );
                        da.push(d);
                    }
                });
                response = da;
            })
            .catch((err) => { response = err.toString(); });
        return response;
    }

    private static format(i:number):string {
        if (i<=9) {
            return "0"+i;
        }
        else {
            return ""+i;
        }
    }
}