import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-resume',
    imports: [NgOptimizedImage],
    templateUrl: './resume.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent {

}
