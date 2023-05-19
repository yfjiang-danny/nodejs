# 贷款计算机

## Install

```
yarn add loan-calculator
```

## Usage

```typescript
const instance = new LoanCalculator();
instance.init(100000, 0.037, 10);
```

## Functions

| 方法名        | 说明                             |
| ------------- | -------------------------------- |
| init          | 初始化                           |
| setTotal      | 设置贷款总额，单位为元           |
| setType       | 还款类型，1-等额本息，2-等额本金 |
| setYRate      | 设置年利率                       |
| setYear       | 设置贷款年限                     |
| getInterest   | 获取利息                         |
| getMonthlyPay | 获取第 n 个月的月供              |
| getLoan       | 第 n 个月后剩余贷款              |
| getDetail     | 获取还款信息                     |
| toString      | 输出字符串                       |
