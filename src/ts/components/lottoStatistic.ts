class LottoStatistic {
  private readonly $element: HTMLDivElement;

  constructor($element: HTMLDivElement) {
    this.$element = $element;
  }

  run() {
    this.$element.classList.add('open');
  }
}
export default LottoStatistic;
