export namespace StockCalculator {
  export function PEG(capital: number, interest: number, rate: number) {
    return capital / interest / (rate * 100);
    // capital / price = shares,
    // eps = interest / shares,
    // pe = price/eps = (price * shares) / interest = capital / interest
  }

  export function nextPE(capital: number, interest: number, rate: number) {
    return capital / (interest + interest * rate);
  }

  /**
   * 振幅
   * @param capital
   * @param interest
   * @param rate
   * @returns
   */
  export function amplitude(capital: number, interest: number, rate: number) {
    return (rate * 100 * interest - capital) / capital;
  }

  export function priceAmplitude(
    capital: number,
    interest: number,
    rate: number,
    price: number
  ) {
    return price * amplitude(capital, interest, rate);
  }
}
