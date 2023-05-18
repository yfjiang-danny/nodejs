var LoanCalculator;
(function (LoanCalculator) {
    /**
     * 初始化
     * @param {number} total 贷款额度
     * @param {number} yRate 年利率
     * @param {number} year 贷款年限
     * @param {number} type 还款类型，1-等额本息，2-等额本金
     */
    function init(total = 0, yRate = 0.037, year = 30, type = 1) {
        LoanCalculator.total = total;
        LoanCalculator.yRate = yRate;
        LoanCalculator.mRate = yRate / 12;
        LoanCalculator.year = year;
        LoanCalculator.type = type;
        if (type == 1) {
            var mRate = LoanCalculator.mRate;
            LoanCalculator.monthlyPay =
                (total * mRate * Math.pow(1 + mRate, year * 12)) /
                (Math.pow(1 + mRate, year * 12) - 1);
            LoanCalculator.detail = calculateInType1();
        } else if (type == 2) {
            LoanCalculator.detail = calculateInType2();
        }
        return LoanCalculator;
    }

    /**
     * 检查是否已经初始化
     */
    function checkInitial() {
        if (!LoanCalculator.detail) {
            throw new Error(
                "LoanCalculator is not initial yet.Please call LoanCalculator.init to init"
            );
        }
    }

    /**
     * 获取等额本息的利息
     * @param {number} month 第 month 后产生的总利息，默认总利息
     */
    function getInterest(month) {
        checkInitial();
        if (LoanCalculator.detail && LoanCalculator.detail.length > 0) {
            var index =
                typeof month == "number" ? month - 1 : LoanCalculator.detail.length - 1;
            var lastItem = LoanCalculator.detail[index];
            return lastItem ? lastItem[2] : 0;
        }
    }

    /**
     * 计算等额本息月供、剩余贷款、利息
     * @returns {[[monthlyPay, leftLoan, interest]]...}
     */
    function calculateInType1() {
        var amount = LoanCalculator.total,
            year = LoanCalculator.year,
            mRate = LoanCalculator.mRate,
            monthlyPay = LoanCalculator.monthlyPay;
        var result = [],
            totalInterest = 0;
        for (let i = 0; i < year * 12; i++) {
            var interest = amount * mRate;
            totalInterest += interest;
            amount -= monthlyPay - interest;
            result[i] = [monthlyPay, amount, totalInterest];
        }
        return result;
    }

    /**
     * 计算等额本金月供、剩余贷款、利息
     * @returns {[[monthlyPay, leftLoan, interest]]...}
     */
    function calculateInType2() {
        var amount = LoanCalculator.total,
            year = LoanCalculator.year,
            mRate = LoanCalculator.mRate,
            monthlyAvg = amount / (year * 12);
        var result = [],
            totalInterest = 0;
        for (let i = 0; i < year * 12; i++) {
            var interest = amount * mRate;
            totalInterest += interest;
            var monthlyPay = monthlyAvg + interest;
            amount -= monthlyAvg;
            result[i] = [monthlyPay, amount, totalInterest];
        }
        return result;
    }

    function getDetail() {
        checkInitial();
        return LoanCalculator.detail;
    }

    /**
     * 第 m 个月后未还贷款余额
     * @param {number} month
     */
    function afterMonth(month) {
        checkInitial();
        var item = LoanCalculator.detail[month - 1];
        return item ? item[1] : 0;
    }

    function toString() {
        checkInitial();
        var detail = LoanCalculator.detail;
        var str = "";
        for (let i = 0; i < detail.length; i++) {
            const element = detail[i];
            str += "[" + element[0].toFixed(0) + "," + element[1].toFixed(0) + "]";
        }
        return str;
    }

    LoanCalculator.init = init;
    LoanCalculator.afterMonth = afterMonth;
    LoanCalculator.getInterest = getInterest;
    LoanCalculator.getDetail = getDetail;
    LoanCalculator.toString = toString;
})(LoanCalculator || (LoanCalculator = {}));
