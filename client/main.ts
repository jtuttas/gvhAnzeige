import $ from 'jquery';
import { WSController } from "./WSController";

let wsc:WSController;

$(() => {
    console.log("start..");
    wsc = new WSController(self.location.host);    
});