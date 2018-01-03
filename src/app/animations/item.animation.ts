import { trigger, state, transition, style, animate } from '@angular/animations';

export const itemAnimation = trigger('itemAnimation', [
  state('in', style({'border-left-width': '3px'})),
  state('out', style({'border-left-width': '5px'})),
  transition('out => hover', animate('500ms ease-in')),
  transition('hover => out', animate('500ms ease-out'))
]);
