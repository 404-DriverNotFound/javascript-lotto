/* eslint-disable no-undef */
import { Lotto, PrizeResult } from '../types/types.js';
import { getPrizeResult, getProfitRate } from '../utils/utils.js';

class LottoStatistic {
  private readonly $element: HTMLDivElement;

  private lotteries: Lotto[];

  private winnings: Lotto;

  private prizeResult: PrizeResult;

  private budget: number;

  constructor($element: HTMLDivElement) {
    this.$element = $element;
    this.lotteries = [];
    this.winnings = [];
    this.prizeResult = {} as PrizeResult;
    this.budget = 0;
    this.addEvent();
  }

  addEvent() {
    this.$element.addEventListener('click', () => {
      this.$element.classList.remove('open');
    });
  }

  setBudget(budget: number) {
    this.budget += budget;
  }

  run(lotteries: Lotto[], winnings: Lotto) {
    this.$element.classList.add('open');
    this.calculate(lotteries, winnings);
  }

  calculate(lotteries: Lotto[], winnings: Lotto) {
    this.lotteries = lotteries;
    this.winnings = winnings;
    this.prizeResult = getPrizeResult(this.lotteries, this.winnings);
    this.injectPrizeToModal();
    this.injectProfitRateToModal();
  }

  injectPrizeToModal() {
    const firstPrize = this.$element.querySelector<HTMLTableDataCellElement>('.first-prize > .winning-number')!;
    const bonusPrize = this.$element.querySelector<HTMLTableDataCellElement>('.bonus-prize > .winning-number')!;
    const secondPrize = this.$element.querySelector<HTMLTableDataCellElement>('.second-prize > .winning-number')!;
    const thirdPrize = this.$element.querySelector<HTMLTableDataCellElement>('.third-prize > .winning-number')!;
    const fourthPrize = this.$element.querySelector<HTMLTableDataCellElement>('.fourth-prize > .winning-number')!;
    firstPrize.textContent = String(this.prizeResult.firstPrize);
    bonusPrize.textContent = String(this.prizeResult.bonusPrize);
    secondPrize.textContent = String(this.prizeResult.secondPrize);
    thirdPrize.textContent = String(this.prizeResult.thirdPrize);
    fourthPrize.textContent = String(this.prizeResult.fourthPrize);
  }

  injectProfitRateToModal() {
    const profitRate = this.$element.querySelector<HTMLParagraphElement>('.profit-rate')!;
    profitRate.textContent = `당신의 총 수익률은 ${getProfitRate(this.prizeResult, this.budget)}% 입니다.`;
  }
}
export default LottoStatistic;
