"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Depatures = /** @class */ (function () {
    function Depatures(y, m, d, wd, h, mi, l, dest, t) {
        this.year = y;
        this.month = m;
        this.day = d;
        this.weekday = wd;
        this.hour = h;
        this.minute = mi;
        this.line = l;
        this.destination = dest;
        this.type = t;
    }
    Depatures.prototype.describe = function () {
        return "" + this.type + " " + this.line + " Abfahrt " + this.hour + ":" + this.minute + " Richtung:" + this.destination;
    };
    return Depatures;
}());
exports.Depatures = Depatures;
//# sourceMappingURL=Departure.js.map