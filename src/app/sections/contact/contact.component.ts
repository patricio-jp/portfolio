import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent {
  githubIcon = faGithub;
  linkedInIcon = faLinkedin;
  emailIcon = faEnvelope;
}
