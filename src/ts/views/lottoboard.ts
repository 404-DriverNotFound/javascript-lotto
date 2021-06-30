import { Lotto } from '../types/types.js';

export default {
  total: (quantity: number): string => `총 ${quantity} 개를 구매하였습니다.`,
  tickets: '<span class="mx-1 text-4xl">🎟️ </span>',
  balls: ({
    first, second, third, fourth, fifth, sixth,
  }: Lotto): string => `<li>
      <span>${first}</span>
      <span>${second}</span>
      <span>${third}</span>
      <span>${fourth}</span>
      <span>${fifth}</span>
      <span>${sixth}</span>
    </li>`,
};
