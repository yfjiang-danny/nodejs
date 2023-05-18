import LoanCalculator from "./index";

test("init", () => {
  const instance = new LoanCalculator();
  instance.init(100000, 0.037, 10);
  expect(instance.getInterest()).toBe(230000);
});
