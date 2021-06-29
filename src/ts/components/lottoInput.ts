import { LottoComponent, LottoInputProps } from '../types/types.js';
import { isValidRange } from '../utils/utils.js';
import { ERROR_COST_RANGE, MAX_TICKET_COST, TICKET_COST } from '../constant/constant.js';

class LottoInput implements LottoComponent {
  private readonly $element: HTMLInputElement;

  constructor({ $element, buy }: LottoInputProps) {
    this.$element = $element;
    this.addEvent(buy);
  }

  addEvent(buy: (cost: string) => void) {
    const inputNode: HTMLInputElement = this.$element.querySelector('input')!;
    this.$element.addEventListener('click', ({ target } : { target: EventTarget | null}) => {
      if (target && target instanceof HTMLButtonElement) {
        if (!isValidRange(inputNode.value, TICKET_COST, MAX_TICKET_COST)) {
          alert(ERROR_COST_RANGE);
          return;
        }
        const cost: string = inputNode.value;
        inputNode.value = '';
        buy(cost);
      }
    });
    this.$element.addEventListener('keydown', (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Enter') {
        if (!isValidRange(inputNode.value, TICKET_COST, MAX_TICKET_COST)) {
          alert(ERROR_COST_RANGE);
          return;
        }
        event.preventDefault();
        const cost: string = inputNode.value;
        inputNode.value = '';
        buy(cost);
      }
    });
  }
}

export default LottoInput;
