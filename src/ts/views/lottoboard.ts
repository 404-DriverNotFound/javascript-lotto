import { Lotto } from '../types/types.js';

export default {
  total: (quantity: number): string => `총 ${quantity} 개를 구매하였습니다.`,
  tickets: '<span class="mx-1 text-4xl">🎟️ </span>',
  balls: (lottery: Lotto): string => `
    <li>
      <span>${lottery[0]}</span>
      <span>${lottery[1]}</span>
      <span>${lottery[2]}</span>
      <span>${lottery[3]}</span>
      <span>${lottery[4]}</span>
      <span>${lottery[5]}</span>
    </li>`,
};
