import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GlassCardComponent } from '@/shared/components/glass-card/glass-card.component';

@Component({
    selector: 'app-skills',
    imports: [GlassCardComponent],
    templateUrl: './skills.component.html',
    styles: ``,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent {

}
