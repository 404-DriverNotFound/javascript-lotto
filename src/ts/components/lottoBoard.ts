import { Lotto, LottoComponent } from '../types/types.js';
import LottoPurchase from './lottoPurchase.js';
import LottoWinning from './lottoWinning.js';

class LottoBoard implements LottoComponent {
  private readonly $element: HTMLTableSectionElement;

  private readonly lottoPurchase;

  private readonly lottoWinning;

  constructor({ $element, estimate }:
    { $element: HTMLTableSectionElement, estimate: (winnings: Lotto) => void}) {
    this.$element = $element;
    this.lottoPurchase = new LottoPurchase(this.$element.querySelector('.lotto-purchase')!);
    this.lottoWinning = new LottoWinning({
      $element: this.$element.querySelector('.lotto-winning')!,
      estimate,
    });
  }

  setPurchaseState(lotteries: Lotto[]) {
    this.lottoPurchase.setState(lotteries);
  }
}

export default LottoBoard;
