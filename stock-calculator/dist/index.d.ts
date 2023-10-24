export declare namespace StockCalculator {
    function PEG(capital: number, interest: number, rate: number): number;
    function nextPE(capital: number, interest: number, rate: number): number;
    /**
     * 振幅
     * @param capital
     * @param interest
     * @param rate
     * @returns
     */
    function amplitude(capital: number, interest: number, rate: number): number;
    function priceAmplitude(capital: number, interest: number, rate: number, price: number): number;
}
