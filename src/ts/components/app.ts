import LottoInput from './lottoInput.js';
import { LottoMachineState } from '../types/types.js';
import LottoBoard from './lottoBoard.js';
import { AUTO, TICKET_COST } from '../constant/constant.js';
import { defaultPurchaseQuantity, makeLotto } from '../utils/utils.js';
import LottoStatistic from './lottoStatistic.js';

// lotto machine
class App {
  private readonly $element: HTMLDivElement;

  private state: LottoMachineState;

  private readonly lottoInput;

  private readonly lottoBoard;

  private readonly lottoStatistics;

  constructor($element: HTMLDivElement) {
    this.$element = $element;
    this.state = {
      budget: 0,
      mode: AUTO,
      lotteries: [],
      purchaseQuantity: 0,
      winnings: [],
    };
    this.lottoInput = new LottoInput({
      $element: this.$element.querySelector('.lotto-input')!,
      buy: this.buy.bind(this),
    });
    this.lottoBoard = new LottoBoard({
      $element: this.$element.querySelector('.lotto-board')!,
      estimate: this.estimate.bind(this),
    });
    this.lottoStatistics = new LottoStatistic(this.$element.querySelector('.modal')!);
  }

  buy(cost: string) {
    this.state.budget = Number(cost);
    if (this.state.mode === AUTO) {
      this.run();
    }
  }

  run(purchaseQuantity = defaultPurchaseQuantity(this.state.budget)) {
    this.requestLotto(purchaseQuantity);
    this.pay();
    this.makeLotto();
  }

  requestLotto(purchaseQuantity: number) {
    this.state.purchaseQuantity = purchaseQuantity;
  }

  pay() {
    this.state.budget -= TICKET_COST * this.state.purchaseQuantity;
  }

  makeLotto() {
    const lotteries = makeLotto(this.state.purchaseQuantity);
    this.state.lotteries = lotteries.concat(this.state.lotteries);
    this.lottoBoard.setPurchaseState(this.state.lotteries);
  }

  estimate(winnings: number[]) {
    this.state.winnings = winnings;
    this.lottoStatistics.run();
  }
}

export default new App(document.querySelector('#app')as HTMLDivElement);
