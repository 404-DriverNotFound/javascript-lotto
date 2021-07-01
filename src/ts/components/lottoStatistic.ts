import { Lotto } from '../types/types.js';

class LottoStatistic {
  private readonly $element: HTMLDivElement;

  private state: number[];

  constructor($element: HTMLDivElement) {
    this.$element = $element;
    this.state = [0, 0, 0];
    this.addEvent();
  }

  addEvent() {
    this.$element.addEventListener('click', () => {
      this.$element.classList.remove('open');
    });
  }

  run(lotteries: Lotto[], winnings: Lotto) {
    this.$element.classList.add('open');
    this.calculate(lotteries, winnings);
  }

  calculate(lotteries: Lotto[], winnings: Lotto) {
    this.state = getWinnings();
  }
}
export default LottoStatistic;
