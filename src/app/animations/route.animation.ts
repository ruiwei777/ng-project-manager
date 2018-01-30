import { animate, group, transition, trigger, state, style, query } from '@angular/animations';


export const slideToRight = trigger('routeAnimation', [
    state('void', style({ 'width': '100%', 'height': '100%' })),
    state('*', style({ 'width': '100%', 'height': '100%' })),
    transition(':enter', [
        style({ opacity: 0, position: 'absolute', top: '0', left: '700px'}),
        group([
            animate('.5s 200ms ease-out', style({ left: '0' })),
            animate('.5s 200ms', style({ opacity: 1 })),
        ])
    ]),
    transition(':leave', [
        style({ left: '0', opacity: 1, position: 'absolute' }),
        group([
            animate('.5s ease-in', style({ left: '-700px' })),
            animate('200ms 300ms', style({ opacity: 0 })),
        ])
    ]),
]);