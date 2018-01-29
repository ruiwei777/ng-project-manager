import { animate, group, transition, trigger, state, style, query } from '@angular/animations';


export const slideToRight = trigger('routeAnimation', [
    state('void', style({ 'width': '100%', 'height': '100%' })),
    state('*', style({ 'width': '100%', 'height': '100%' })),
    transition(':enter', [
        style({ opacity: 0, position: 'absolute', top: '0', left: '500px'}),
        group([
            animate('.5s ease-in-out', style({ left: '0' })),
            animate('.3s ease-in', style({ opacity: 1 })),
        ])
    ]),
    transition(':leave', [
        style({ left: '0', opacity: 1, position: 'absolute' }),
        group([
            animate('.5s ease-in-out', style({ left: '-800px' })),
            animate('.3s 200ms ease-in', style({ opacity: 0 })),
        ])
    ]),
]);