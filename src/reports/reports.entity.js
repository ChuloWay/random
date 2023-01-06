"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportEntity = void 0;
var users_entity_1 = require("../users/users.entity");
var typeorm_1 = require("typeorm");
var ReportEntity = /** @class */ (function () {
    function ReportEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ReportEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], ReportEntity.prototype, "approved");
    __decorate([
        (0, typeorm_1.Column)()
    ], ReportEntity.prototype, "price");
    __decorate([
        (0, typeorm_1.Column)()
    ], ReportEntity.prototype, "make");
    __decorate([
        (0, typeorm_1.Column)()
    ], ReportEntity.prototype, "model");
    __decorate([
        (0, typeorm_1.Column)()
    ], ReportEntity.prototype, "year");
    __decorate([
        (0, typeorm_1.Column)()
    ], ReportEntity.prototype, "lng");
    __decorate([
        (0, typeorm_1.Column)()
    ], ReportEntity.prototype, "lat");
    __decorate([
        (0, typeorm_1.Column)()
    ], ReportEntity.prototype, "mileage");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return users_entity_1.UserEntity; }, function (user) { return user.reports; })
    ], ReportEntity.prototype, "user");
    ReportEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], ReportEntity);
    return ReportEntity;
}());
exports.ReportEntity = ReportEntity;
