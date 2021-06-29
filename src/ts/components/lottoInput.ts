import { LottoComponent, LottoInputProps } from '../types/types.js';
import { isValidCost } from '../utils/utils.js';

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
        if (!isValidCost(inputNode.value)) {
          alert('1000원 ~ 100000원 이내로 구매가 가능합니다.');
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
        if (!isValidCost(inputNode.value)) {
          alert('1000원 ~ 100000원 이내로 구매가 가능합니다.');
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
