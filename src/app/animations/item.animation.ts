import { trigger, state, transition, style, animate } from '@angular/animations';

export const itemAnimation = trigger('itemAnimation', [
  state('normal', style({'border-width': '3px', 'background-color': '#f0f0f0'})),
  state('hover', style({'border-width': '8px', 'background-color': '#e3e3e3'})),
  transition('* => *', animate('0.2s ease')),
]);
