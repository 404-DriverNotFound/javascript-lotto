import { Lotto, LottoWinningState } from '../types/types.js';
import { ascending, isValidRange } from '../utils/utils.js';
import {
  ERROR_DUPLICATED_NUMBER,
  ERROR_MISSING_NUMBER, ERROR_NUMBER_RANGE, LOTTO_BONUS, LOTTO_LENGTH,
  LOTTO_NUMBER_END,
  LOTTO_NUMBER_START,
} from '../constant/constant.js';

class LottoWinning {
  private readonly $element: HTMLFormElement;

  private state: LottoWinningState;

  constructor({ $element, estimate } :
    { $element: HTMLFormElement, estimate: (winnings: Lotto) => void }) {
    this.$element = $element;
    this.state = {
      winningNumbers: [],
      bonusNumber: 0,
      openModalButton: this.$element.querySelector('.open-result-modal-button')!,
    };
    this.addEvent(estimate);
  }

  addEvent(estimate: (winnings: Lotto) => void) {
    this.state.openModalButton.addEventListener('click', () => {
      const bonusNode = this.$element.querySelector('.bonus-number')as HTMLInputElement;
      const { value } = bonusNode;
      if (!value) {
        return alert(ERROR_MISSING_NUMBER);
      }
      if (!isValidRange(Number(value), LOTTO_NUMBER_START, LOTTO_NUMBER_END)) {
        return alert(ERROR_NUMBER_RANGE);
      }
      const bonusNumber: number[] = [Number(value)];
      const winnings: number[] = Array.from(
        this.$element.querySelectorAll<HTMLInputElement>('.winning-number'),
      ).map((element) => Number(element.value));
      if (winnings.length < LOTTO_LENGTH) {
        return alert(ERROR_MISSING_NUMBER);
      }
      if (winnings.some((winning) => !isValidRange(winning,
        LOTTO_NUMBER_START, LOTTO_NUMBER_END))) {
        return alert(ERROR_NUMBER_RANGE);
      }
      if (winnings.length + LOTTO_BONUS !== new Set<number>(winnings.concat(bonusNumber)).size) {
        return alert(ERROR_DUPLICATED_NUMBER);
      }
      estimate(winnings.sort(ascending).concat(bonusNumber)as Lotto);
    });
  }
}

export default LottoWinning;
