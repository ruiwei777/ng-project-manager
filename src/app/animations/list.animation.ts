import { animate, group, query, transition, trigger, stagger, state, style } from '@angular/animations';


export const listAnimation = trigger('listAnimation', [
    transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger(100, [
            animate('.3s', style({ opacity: 1 }))
        ]), { optional: true }),
        query(':leave', style({ opacity: 1 }), { optional: true }),
        query(':leave', stagger(100, [
            animate('.3s', style({ opacity: 0 }))
        ]), { optional: true }),
    ]),
]);