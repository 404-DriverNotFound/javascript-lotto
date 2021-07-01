import {
  TICKET_COST,
  LOTTO_NUMBER_START,
  LOTTO_NUMBER_END, LOTTO_LENGTH,
} from '../constant/constant.js';
import { Lotto } from '../types/types.js';

const isValidRange = (cost: number, start: number, end: number)
  : boolean => (cost >= start && cost <= end);
const defaultPurchaseQuantity = (budget: number) => Math.floor(budget / TICKET_COST);

const getRandomInt = (start: number, end: number): number => Math.floor(
  Math.random() * (end - start) + start,
);

const isDuplicated = (container: Set<number>, value: number):boolean => container.has(value);

const ascending = (a: number, b: number): number => a - b;

const getRandomLottery = (): Lotto => {
  const cache = new Set<number>();
  const numbers = [...new Array(LOTTO_LENGTH)]
    .map(() => {
      let candidate = getRandomInt(LOTTO_NUMBER_START, LOTTO_NUMBER_END);
      while (isDuplicated(cache, candidate)) {
        candidate = getRandomInt(LOTTO_NUMBER_START, LOTTO_NUMBER_END);
      }
      cache.add(candidate);
      return candidate;
    })
    .sort(ascending);
  return numbers as Lotto;
};

const makeLotto = (purchaseQuantity: number): [Lotto] => [...new Array(purchaseQuantity)]
  .map(() => getRandomLottery())as [Lotto];

export {
  isValidRange, defaultPurchaseQuantity, isDuplicated, ascending, makeLotto,
};
