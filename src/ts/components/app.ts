class App {
  private readonly $element: HTMLDivElement;

  constructor($element: HTMLDivElement) {
    this.$element = $element;
    console.log(this.$element);
  }
}

export default new App(document.querySelector('#app')as HTMLDivElement);
