/**
 * @description 贷款计算器
 * @author yfjiang.danny
 */

/**
 * [monthlyPay, leftLoan, interest]
 */
type DetailModel = [number, number, number];
type DetailList = Array<DetailModel>;

/**
 * 还款类型，1-等额本息，2-等额本金
 */
type LoanType = 1 | 2;

/**
 * 贷款计算器
 */
class LoanCalculator {
  protected total: number = 0;
  protected yRate: number = 0;
  protected year: number = 0;
  protected mRate: number = 0;
  protected type: LoanType = 1;
  protected monthlyPay: number = 0;
  protected detail: DetailList = [];
  private detailMap: Map<LoanType, DetailList> = new Map();

  constructor() {}

  /**
   * 初始化
   * @param {number} total 贷款额度
   * @param {number} yRate 年利率
   * @param {number} year 贷款年限
   * @param {LoanType} type 还款类型，1-等额本息，2-等额本金
   */
  init(total = 0, yRate = 0.037, year = 30, type: LoanType = 1) {
    this.total = total;
    this.yRate = yRate;
    this.mRate = yRate / 12;
    this.year = year;
    this.type = type;
    this.calculate();
  }

  /**
   * 计算贷款详细信息
   */
  private calculate() {
    const total = this.total,
      type = this.type,
      year = this.year;

    var mRate = this.mRate;
    this.monthlyPay =
      (total * mRate * Math.pow(1 + mRate, year * 12)) /
      (Math.pow(1 + mRate, year * 12) - 1);
    const detail1 = this.calculateInType1();
    const detail2 = this.calculateInType2();

    this.detailMap.set(1, detail1);
    this.detailMap.set(2, detail2);

    if (type == 1) {
      this.detail = detail1;
    } else if (type == 2) {
      this.detail = detail2;
    }
  }

  /**
   * 设置还款类型
   * @param type 还款类型，1-等额本息，2-等额本金
   */
  setType(type: LoanType) {
    this.type = type;
    this.calculate();
  }

  /**
   * 设置贷款总额
   * @param total 贷款总额
   */
  setTotal(total: number) {
    this.total = total;
    this.calculate();
  }

  /**
   * 设置年利率
   * @param yRate 年利率
   */
  setYRate(yRate: number) {
    this.yRate = yRate;
    this.mRate = yRate / 12;
    this.calculate();
  }

  /**
   * 设置贷款年限
   * @param year 贷款年限
   */
  setYear(year: number) {
    this.year = year;
    this.calculate();
  }

  /**
   * 检查是否已经初始化
   */
  private checkInitial() {
    if (!this.detail) {
      throw new Error(
        "LoanCalculator is not initial yet.Please call LoanCalculator.init to init"
      );
    }
  }

  /**
   * 获取等额本息的利息
   * @param {number} month n 月后产生的总利息，默认总利息
   */
  getInterest(month?: number) {
    this.checkInitial();
    if (this.detail && this.detail.length > 0) {
      var index = typeof month == "number" ? month - 1 : this.detail.length - 1;
      var lastItem = this.detail[index];
      return lastItem ? lastItem[2] : 0;
    }
  }

  /**
   * 计算等额本息月供、剩余贷款、利息
   * @returns {DetailList}
   */
  protected calculateInType1(): DetailList {
    var amount = this.total,
      year = this.year,
      mRate = this.mRate,
      monthlyPay = this.monthlyPay;
    var result: DetailList = [],
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
   * @returns {DetailList}
   */
  protected calculateInType2(): DetailList {
    var amount = this.total,
      year = this.year,
      mRate = this.mRate,
      monthlyAvg = amount / (year * 12);
    var result: DetailList = [],
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

  /**
   * @description 获取还款信息
   * @returns 还款列表
   */
  getDetail(): DetailList {
    this.checkInitial();
    return this.detail;
  }

  /**
   * 第 n 个月后剩余贷款
   * @param {number} month
   */
  getLoan(month: number): number {
    this.checkInitial();
    var item = this.detail[month - 1];
    return item ? item[1] : 0;
  }

  toString() {
    this.checkInitial();
    var detail = this.detail;
    var str = "";
    for (let i = 0; i < detail.length; i++) {
      const element = detail[i];
      str += "[" + element[0].toFixed(0) + "," + element[1].toFixed(0) + "]";
    }
    return str;
  }
}

export default LoanCalculator;
