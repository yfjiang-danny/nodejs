"use strict";
/**
 * @description 贷款计算器
 * @author yfjiang.danny@outlook.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 贷款计算器
 */
var LoanCalculator = /** @class */ (function () {
    function LoanCalculator() {
        this.total = 0;
        this.yRate = 0;
        this.year = 0;
        this.mRate = 0;
        this.type = 1;
        this.monthlyPay = 0;
        this.detail = [];
        this.detailMap = new Map();
    }
    /**
     * 初始化
     * @param {number} total 贷款额度
     * @param {number} yRate 年利率
     * @param {number} year 贷款年限
     * @param {LoanType} type 还款类型，1-等额本息，2-等额本金
     */
    LoanCalculator.prototype.init = function (total, yRate, year, type) {
        if (total === void 0) { total = 0; }
        if (yRate === void 0) { yRate = 0.037; }
        if (year === void 0) { year = 30; }
        if (type === void 0) { type = 1; }
        this.total = total;
        this.yRate = yRate;
        this.mRate = yRate / 12;
        this.year = year;
        this.type = type;
        this.calculate();
    };
    /**
     * 计算贷款详细信息
     */
    LoanCalculator.prototype.calculate = function () {
        var total = this.total, type = this.type, year = this.year;
        var mRate = this.mRate;
        this.monthlyPay =
            (total * mRate * Math.pow(1 + mRate, year * 12)) /
                (Math.pow(1 + mRate, year * 12) - 1);
        var detail1 = this.calculateInType1();
        var detail2 = this.calculateInType2();
        this.detailMap.set(1, detail1);
        this.detailMap.set(2, detail2);
        if (type == 1) {
            this.detail = detail1;
        }
        else if (type == 2) {
            this.detail = detail2;
        }
    };
    /**
     * 设置还款类型
     * @param type 还款类型，1-等额本息，2-等额本金
     */
    LoanCalculator.prototype.setType = function (type) {
        this.type = type;
        this.calculate();
    };
    /**
     * 设置贷款总额
     * @param total 贷款总额
     */
    LoanCalculator.prototype.setTotal = function (total) {
        this.total = total;
        this.calculate();
    };
    /**
     * 设置年利率
     * @param yRate 年利率
     */
    LoanCalculator.prototype.setYRate = function (yRate) {
        this.yRate = yRate;
        this.mRate = yRate / 12;
        this.calculate();
    };
    /**
     * 设置贷款年限
     * @param year 贷款年限
     */
    LoanCalculator.prototype.setYear = function (year) {
        this.year = year;
        this.calculate();
    };
    /**
     * 检查是否已经初始化
     */
    LoanCalculator.prototype.checkInitial = function () {
        if (!this.detail) {
            throw new Error("LoanCalculator is not initial yet.Please call LoanCalculator.init to init");
        }
    };
    /**
     * 获取等额本息的利息
     * @param {number} month n 月后产生的总利息，默认总利息
     */
    LoanCalculator.prototype.getInterest = function (month) {
        this.checkInitial();
        if (this.detail && this.detail.length > 0) {
            var index = typeof month == "number" ? month - 1 : this.detail.length - 1;
            var lastItem = this.detail[index];
            return lastItem ? lastItem[2] : 0;
        }
    };
    /**
     * 计算等额本息月供、剩余贷款、利息
     * @returns {DetailList}
     */
    LoanCalculator.prototype.calculateInType1 = function () {
        var amount = this.total, year = this.year, mRate = this.mRate, monthlyPay = this.monthlyPay;
        var result = [], totalInterest = 0;
        for (var i = 0; i < year * 12; i++) {
            var interest = amount * mRate;
            totalInterest += interest;
            amount -= monthlyPay - interest;
            result[i] = [monthlyPay, amount, totalInterest];
        }
        return result;
    };
    /**
     * 计算等额本金月供、剩余贷款、利息
     * @returns {DetailList}
     */
    LoanCalculator.prototype.calculateInType2 = function () {
        var amount = this.total, year = this.year, mRate = this.mRate, monthlyAvg = amount / (year * 12);
        var result = [], totalInterest = 0;
        for (var i = 0; i < year * 12; i++) {
            var interest = amount * mRate;
            totalInterest += interest;
            var monthlyPay = monthlyAvg + interest;
            amount -= monthlyAvg;
            result[i] = [monthlyPay, amount, totalInterest];
        }
        return result;
    };
    /**
     * @description 获取还款信息
     * @returns 还款列表
     */
    LoanCalculator.prototype.getDetail = function () {
        this.checkInitial();
        return this.detail;
    };
    /**
     * 第 n 个月后剩余贷款
     * @param {number} month
     */
    LoanCalculator.prototype.getLoan = function (month) {
        this.checkInitial();
        var item = this.detail[month - 1];
        return item ? item[1] : 0;
    };
    LoanCalculator.prototype.toString = function () {
        this.checkInitial();
        var detail = this.detail;
        var str = "";
        for (var i = 0; i < detail.length; i++) {
            var element = detail[i];
            str += "[" + element[0].toFixed(0) + "," + element[1].toFixed(0) + "]";
        }
        return str;
    };
    return LoanCalculator;
}());
exports.default = LoanCalculator;
