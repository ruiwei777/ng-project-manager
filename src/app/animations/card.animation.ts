import { animate, transition, trigger, state, style } from '@angular/animations';


export const cardAnimation = trigger('cardAnimation', [
    state('out', style({ transform: 'translateY(0)', 'box-shadow': 'none' })),
    state('hover', style({ transform: 'translateY(-2px)', 'box-shadow': '0 5px 30px 0px #bbb' })),
    transition('* => *', animate('.5s 0s ease'))
]);