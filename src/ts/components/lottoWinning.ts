import { LottoWinningState } from '../types/types.js';
import { isValidRange } from '../utils/utils.js';
import {
  ERROR_MISSING_NUMBER, ERROR_NUMBER_RANGE,
  LOTTO_NUMBER_END,
  LOTTO_NUMBER_START,
} from '../constant/constant.js';

class LottoWinning {
  private readonly $element: HTMLFormElement;

  private state: LottoWinningState;

  constructor({ $element, estimate } :
    { $element: HTMLFormElement, estimate: (winnings: string[]) => void }) {
    this.$element = $element;
    this.state = {
      winningNumbers: [],
      bonusNumber: 0,
      openModalButton: this.$element.querySelector('.open-result-modal-button')!,
    };
    this.addEvent(estimate);
  }

  addEvent(estimate: (winnings: string[]) => void) {
    this.state.openModalButton.addEventListener('click', () => {
      const bonusNode = this.$element.querySelector('.bonus-number')as HTMLInputElement;
      if (!bonusNode.value) {
        alert(ERROR_MISSING_NUMBER);
        return;
      }
      if (!isValidRange(bonusNode.value, LOTTO_NUMBER_START, LOTTO_NUMBER_END)) {
        alert(ERROR_NUMBER_RANGE);
        return;
      }
      const bonusNumber = [bonusNode.value];
      const winnings = Array.from(this.$element.querySelectorAll('.winning-number'))
        .map((winning) => {
          if (winning instanceof HTMLInputElement) {
            if (isValidRange(winning.value, LOTTO_NUMBER_START, LOTTO_NUMBER_END)) {
              return winning.value;
            }
            alert(ERROR_NUMBER_RANGE);
            return '';
          }
          alert(ERROR_MISSING_NUMBER);
          return '';
        })
        .concat(bonusNumber);
      estimate(winnings);
    });
  }
}

export default LottoWinning;
