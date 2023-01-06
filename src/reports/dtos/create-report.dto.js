"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateReportDto = void 0;
var class_validator_1 = require("class-validator");
var CreateReportDto = /** @class */ (function () {
    function CreateReportDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateReportDto.prototype, "make");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateReportDto.prototype, "model");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(1930),
        (0, class_validator_1.Max)(2022)
    ], CreateReportDto.prototype, "year");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(100000)
    ], CreateReportDto.prototype, "mileage");
    __decorate([
        (0, class_validator_1.IsLongitude)()
    ], CreateReportDto.prototype, "lng");
    __decorate([
        (0, class_validator_1.IsLatitude)()
    ], CreateReportDto.prototype, "lat");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(100000)
    ], CreateReportDto.prototype, "price");
    return CreateReportDto;
}());
exports.CreateReportDto = CreateReportDto;
