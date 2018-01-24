import { trigger, state, transition, style, animate } from '@angular/animations';

export const itemAnimation = trigger('itemAnimation', [
  state('normal', style({'border-width': '3px'})),
  state('hover', style({'border-width': '8px'})),
  transition('* => *', animate('0.2s ease')),
]);
