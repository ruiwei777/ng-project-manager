import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { environment } from '../../environments/environment'


export const loadSvgResources = (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
    // const imgDir = '../../assets/img';
    const imgDir = `${environment.publicPath}/assets/img`;
    const daysDir = `${imgDir}/days`;
    const sidebarDir = `${imgDir}/sidebar`;
    const avatarDir = `${imgDir}/avatar`;
    const iconsDir = `${imgDir}/icons`;

    const days = Array.from(Array(31), (e,i)=>i+1);

    iconRegistry.addSvgIconSetInNamespace('avatars', sanitizer.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
    
    // daysDir
    iconRegistry.addSvgIcon('day', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/day.svg`));
    iconRegistry.addSvgIcon('month', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/month.svg`));
    iconRegistry.addSvgIcon('project', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/project.svg`));
    iconRegistry.addSvgIcon('projects', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/projects.svg`));
    iconRegistry.addSvgIcon('week', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}/week.svg`));

    // iconsDir
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/add.svg`));
    iconRegistry.addSvgIcon('burger-navigation', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/burger-navigation.svg`));
    iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/delete.svg`));
    iconRegistry.addSvgIcon('hand-grab-o', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/hand-grab-o.svg`));
    iconRegistry.addSvgIcon('move', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}/move.svg`));
    
    days.forEach(val => iconRegistry.addSvgIcon(`day${val}`, sanitizer.bypassSecurityTrustResourceUrl(`${daysDir}/day${val}.svg`)));
}