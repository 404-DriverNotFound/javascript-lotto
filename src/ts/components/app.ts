import LottoInput from './lottoInput.js';
import { LottoMachineState } from '../types/types.js';
import LottoBoard from './lottoBoard.js';
import { AUTO } from '../constant/constant.js';
import { defaultPurchaseQuantity, makeLotto } from '../utils/utils.js';

// lotto machine
class App {
  private readonly $element: HTMLDivElement;

  private state: LottoMachineState;

  private readonly lottoInput;

  private readonly lottoBoard;

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
  }

  buy(cost: string) {
    this.state.budget = Number(cost);
    if (this.state.mode === AUTO) {
      this.run();
    }
  }

  run(purchaseQuantity = defaultPurchaseQuantity(this.state.budget)) {
    this.requestLotto(purchaseQuantity)
      .makeLotto()
      .lottoBoard.setPurchaseState(this.state.lotteries);
  }

  requestLotto(purchaseQuantity: number) {
    this.state.purchaseQuantity = purchaseQuantity;
    return this;
  }

  makeLotto() {
    const lotteries = makeLotto(this.state.purchaseQuantity);
    this.state.lotteries = lotteries.concat(this.state.lotteries);
    return this;
  }

  estimate(winnings: string[]) {
    this.state.winnings = winnings;
    // this.lottoStatics.run();
  }
}

export default new App(document.querySelector('#app')as HTMLDivElement);
