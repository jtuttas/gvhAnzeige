"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Depatures = /** @class */ (function () {
    function Depatures(y, m, d, h, mi, ry, rm, rd, rh, rmi, l, dest, t, st) {
        this.year = y;
        this.month = m;
        this.day = d;
        this.hour = h;
        this.minute = mi;
        this.ryear = ry;
        this.rmonth = rm;
        this.rday = rd;
        this.rhour = rh;
        this.rminute = rmi;
        this.line = l;
        this.destination = dest;
        this.type = t;
        this.station = st;
    }
    Depatures.prototype.describe = function () {
        if (this.ryear == 0) {
            return "-" + this.station + ":" + this.type + " " + this.line + " Abfahrt " + this.hour + ":" + this.minute + " Richtung:" + this.destination;
        }
        else {
            return "*" + this.station + ":" + this.type + " " + this.line + " Abfahrt " + this.rhour + ":" + this.rminute + " Richtung:" + this.destination;
        }
    };
    return Depatures;
}());
exports.Depatures = Depatures;
//# sourceMappingURL=Departure.js.map