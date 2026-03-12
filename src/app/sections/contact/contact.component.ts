import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';

@Component({
  selector: 'app-contact',
  imports: [ZardIconComponent],
  templateUrl: './contact.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  protected readonly githubIcon = 'github';
  protected readonly linkedInIcon = 'linkedin';
  protected readonly emailIcon = 'mail';
}
