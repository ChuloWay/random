"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
var reports_entity_1 = require("../reports/reports.entity");
var typeorm_1 = require("typeorm");
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    UserEntity.prototype.logInsert = function () {
        console.log('Inserted User with Id', this.id);
    };
    UserEntity.prototype.logUpdate = function () {
        console.log('Updated User with id', this.id);
    };
    UserEntity.prototype.logRemove = function () {
        console.log('Removed User with Id', this.id);
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], UserEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], UserEntity.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], UserEntity.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({ "default": true })
    ], UserEntity.prototype, "isAdmin");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return reports_entity_1.ReportEntity; }, function (report) { return report.user; })
    ], UserEntity.prototype, "reports");
    __decorate([
        (0, typeorm_1.AfterInsert)()
    ], UserEntity.prototype, "logInsert");
    __decorate([
        (0, typeorm_1.AfterUpdate)()
    ], UserEntity.prototype, "logUpdate");
    __decorate([
        (0, typeorm_1.AfterRemove)()
    ], UserEntity.prototype, "logRemove");
    UserEntity = __decorate([
        (0, typeorm_1.Entity)()
    ], UserEntity);
    return UserEntity;
}());
exports.UserEntity = UserEntity;
