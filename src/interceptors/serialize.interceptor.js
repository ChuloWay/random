"use strict";
exports.__esModule = true;
exports.SerializeInterceptor = exports.Serialize = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var class_transformer_1 = require("class-transformer");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new SerializeInterceptor(dto));
}
exports.Serialize = Serialize;
var SerializeInterceptor = /** @class */ (function () {
    function SerializeInterceptor(dto) {
        this.dto = dto;
    }
    //runs before request is handled
    SerializeInterceptor.prototype.intercept = function (context, next) {
        var _this = this;
        return next.handle().pipe((0, operators_1.map)(function (data) {
            // runs something before response is sent
            return (0, class_transformer_1.plainToInstance)(_this.dto, data, {
                excludeExtraneousValues: true
            });
        }));
    };
    return SerializeInterceptor;
}());
exports.SerializeInterceptor = SerializeInterceptor;
