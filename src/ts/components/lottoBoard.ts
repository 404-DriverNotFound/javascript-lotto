import { Lotto, LottoBoardState, LottoComponent } from '../types/types.js';
import boardView from '../views/lottoboard.js';

class LottoBoard implements LottoComponent {
  private readonly $element: HTMLTableSectionElement;

  private readonly state: LottoBoardState;

  private readonly $toggleButton: HTMLSpanElement;

  constructor($element: HTMLTableSectionElement) {
    this.$element = $element;
    this.state = {
      total: this.$element.querySelector('.total')!,
      tickets: this.$element.querySelector('.tickets')!,
      balls: this.$element.querySelector('.balls')!,
      lotteries: [],
    };
    this.$toggleButton = this.$element.querySelector('.toggle-button')!;
    this.addEvent();
    this.setState(this.state.lotteries);
  }

  addEvent() {
    const toggleDisplay = (element: HTMLElement) => {
      const elem = element;
      const current = element.style.display;
      elem.style.display = current === 'none' ? 'block' : 'none';
    };

    this.$toggleButton.addEventListener('click',
      ({ target } : { target: EventTarget | null }) => {
        if (target && target instanceof HTMLSpanElement) {
          const { tickets } = this.state;
          const { balls } = this.state;
          toggleDisplay(tickets);
          toggleDisplay(balls);
        }
      });
  }

  setState(lotteries: [Lotto] | []) {
    this.state.lotteries = lotteries;
    this.render();
  }

  render() {
    this.totalUpdate()
      .ticketsUpdate()
      .ballsUpdate();
  }

  totalUpdate() {
    const { total } = this.state;
    total.textContent = boardView.total(this.state.lotteries.length);
    return this;
  }

  ticketsUpdate() {
    const { tickets } = this.state;
    tickets.innerHTML = this.state.lotteries.map(() => boardView.tickets)
      .join('');
    return this;
  }

  ballsUpdate() {
    const { balls } = this.state;
    balls.innerHTML = this.state.lotteries.map((lottery) => boardView.balls(lottery))
      .join('');
    return this;
  }
}

export default LottoBoard;
