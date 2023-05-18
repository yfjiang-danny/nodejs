/**
 * @description 贷款计算器
 * @author yfjiang.danny@outlook.com
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
declare class LoanCalculator {
    protected total: number;
    protected yRate: number;
    protected year: number;
    protected mRate: number;
    protected type: LoanType;
    protected monthlyPay: number;
    protected detail: DetailList;
    private detailMap;
    constructor();
    /**
     * 初始化
     * @param {number} total 贷款额度
     * @param {number} yRate 年利率
     * @param {number} year 贷款年限
     * @param {LoanType} type 还款类型，1-等额本息，2-等额本金
     */
    init(total?: number, yRate?: number, year?: number, type?: LoanType): void;
    /**
     * 计算贷款详细信息
     */
    private calculate;
    /**
     * 设置还款类型
     * @param type 还款类型，1-等额本息，2-等额本金
     */
    setType(type: LoanType): void;
    /**
     * 设置贷款总额
     * @param total 贷款总额
     */
    setTotal(total: number): void;
    /**
     * 设置年利率
     * @param yRate 年利率
     */
    setYRate(yRate: number): void;
    /**
     * 设置贷款年限
     * @param year 贷款年限
     */
    setYear(year: number): void;
    /**
     * 检查是否已经初始化
     */
    private checkInitial;
    /**
     * 获取等额本息的利息
     * @param {number} month n 月后产生的总利息，默认总利息
     */
    getInterest(month?: number): number | undefined;
    /**
     * 计算等额本息月供、剩余贷款、利息
     * @returns {DetailList}
     */
    protected calculateInType1(): DetailList;
    /**
     * 计算等额本金月供、剩余贷款、利息
     * @returns {DetailList}
     */
    protected calculateInType2(): DetailList;
    /**
     * @description 获取还款信息
     * @returns 还款列表
     */
    getDetail(): DetailList;
    /**
     * 第 n 个月后剩余贷款
     * @param {number} month
     */
    getLoan(month: number): number;
    toString(): string;
}
export default LoanCalculator;
