"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_1 = __importDefault(require("request-promise"));
var Departure_1 = require("./Departure");
var GVH = /** @class */ (function () {
    function GVH() {
    }
    GVH.getData = function (station) {
        return __awaiter(this, void 0, void 0, function () {
            var date, hh, mm, yyyymmdd, response, url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        hh = this.format(date.getHours());
                        mm = this.format(date.getMinutes());
                        yyyymmdd = date.getFullYear() + this.format(date.getMonth() + 1) + this.format(date.getDate());
                        response = {};
                        url = "https://efa107.efa.de/efaws2/default/XML_DM_REQUEST?outputFormat=JSON&sessionID=0&requestID=0&language=de&useRealtime=1&coordOutputFormat=WGS84[DD.ddddd]&locationServerActive=1&mode=direct&dmLineSelectionAll=1&depType=STOPEVENTS&useAllStops=1&command=null&type_dm=stop&name_dm=" + station + "&itdTime=" + hh + mm + "&itdDate=" + yyyymmdd + "&outputEncoding=UTF-8&inputEncoding=UTF-8&mId=efa_www";
                        console.log("URL:" + url);
                        return [4 /*yield*/, request_promise_1.default({
                                url: url,
                                method: "GET",
                                headers: { 'content-type': 'application/json' },
                                body: {},
                                json: true
                            }, function (error, responce, body) {
                            })
                                .then(function (body) {
                                console.log("Erzeuge Objekte");
                                GVH.station = body.dm.input.input;
                                var da = [];
                                body.departureList.forEach(function (element) {
                                    if ('dateTime' in element && 'realDateTime' in element) {
                                        var d = new Departure_1.Depatures(element.dateTime.year, element.dateTime.month, element.dateTime.day, element.dateTime.hour, element.dateTime.minute, element.realDateTime.year, element.realDateTime.month, element.realDateTime.day, element.realDateTime.hour, element.realDateTime.minute, element.servingLine.number, element.servingLine.direction, element.servingLine.name, GVH.station);
                                        da.push(d);
                                    }
                                    else if ('dateTime' in element) {
                                        var d = new Departure_1.Depatures(element.dateTime.year, element.dateTime.month, element.dateTime.day, element.dateTime.hour, element.dateTime.minute, 0, 0, 0, 0, 0, element.servingLine.number, element.servingLine.direction, element.servingLine.name, GVH.station);
                                        da.push(d);
                                    }
                                });
                                response = da;
                            })
                                .catch(function (err) { response = err.toString(); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    GVH.format = function (i) {
        if (i <= 9) {
            return "0" + i;
        }
        else {
            return "" + i;
        }
    };
    GVH.station = "";
    return GVH;
}());
exports.GVH = GVH;
//# sourceMappingURL=GVH.js.map