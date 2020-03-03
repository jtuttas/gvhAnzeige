import { GUI } from "./GUI";
import { Depature } from "../data/Departure";

export class WSController {
    public ws:WebSocket;
    gui:GUI;
    disconnected:boolean=true;
    dataObject:Depature[]=[];
    server:string;
    constructor (server:string) {
        this.server=server;
        this.gui = new GUI(this);       
        this.connect();
    }
    
    public connect():void {
        this.ws = new WebSocket('ws://'+this.server);
        this.ws.onopen = (p) => {
            console.log("Websocket Verbindung hergestellt!");
            this.disconnected = false;    
        };

        this.ws.onclose = (e) => {
            console.log('Disconnected!');
            this.disconnected = true;    
            this.gui.disconnected();
        };

        this.ws.onmessage = (event:any) => {
            let st:string = event.data;
            console.log('Server: ' + st);
            this.dataObject = JSON.parse(st);
            this.gui.refresh(this.dataObject);
        }    

    }

    public isConnected():boolean {
        return !this.disconnected;
    }

    public getData():Depature[] {
        return this.dataObject;
    }       
}