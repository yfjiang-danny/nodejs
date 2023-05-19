import LoanCalculator from "./index";

test("init", () => {
  const instance = new LoanCalculator();
  instance.init(100000, 0.037, 10);
  expect(instance.getMonthlyPay(1)).toBe(998);

  instance.setType(2);
  expect(instance.getMonthlyPay(1)).toBe(1141);
});
