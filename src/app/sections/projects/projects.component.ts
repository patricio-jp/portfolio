import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faCloudArrowUp,
  faScrewdriverWrench,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

interface TechnologyBadge {
  title: string;
  bgColor: string;
  textColor: string;
}

interface ProjectLink {
  title: string;
  url: string;
  target: '_blank' | '_self';
  label?: string;
}

interface Project {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description: string;
  deployDescription?: string;
  technologies: TechnologyBadge[];
  status: string;
  links?: ProjectLink[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './projects.component.html',
  styles: ``,
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'JyC Amoblamientos System - Backend',
      description:
        'Credit and payment management system for JyC Amoblamientos customers. Backend developed using NestJS and TypeORM in TypeScript, with MySQL as the database. Provides a secure and efficient REST API to manage customers, transactions, and reports.',
      deployDescription: 'Hosted on an Oracle Cloud VM instance using Docker.',
      imageUrl: '/portfolio/jyc-diagram.png',
      technologies: [
        {
          title: 'NestJS',
          bgColor: 'bg-red-900',
          textColor: 'text-red-300',
        },
        {
          title: 'TypeORM',
          bgColor: 'bg-blue-900',
          textColor: 'text-blue-300',
        },
        {
          title: 'MySQL',
          bgColor: 'bg-green-900',
          textColor: 'text-green-300',
        },
        {
          title: 'Docker',
          bgColor: 'bg-blue-900',
          textColor: 'text-blue-300',
        },
      ],
      status: 'In Use - Under Development',
      links: [
        {
          title: 'Code Repository',
          url: 'https://github.com/patricio-jp/jyc-api',
          target: '_blank',
        },
      ],
    },
    {
      title: 'JyC Amoblamientos - Frontend',
      description:
        'Web and mobile application for managing JyC Amoblamientos customers and payments. Built with Angular + Ionic for cross-platform compatibility, styled with TailwindCSS for a modern and responsive UI.',
      deployDescription: 'Hosted on an Oracle Cloud VM instance using Docker.',
      imageUrl: '/portfolio/jyc-frontend.png',
      technologies: [
        {
          title: 'Angular',
          bgColor: 'bg-red-900',
          textColor: 'text-red-300',
        },
        {
          title: 'Ionic',
          bgColor: 'bg-blue-900',
          textColor: 'text-blue-300',
        },
        {
          title: 'TailwindCSS',
          bgColor: 'bg-indigo-900',
          textColor: 'text-indigo-300',
        },
        {
          title: 'Docker',
          bgColor: 'bg-blue-900',
          textColor: 'text-blue-300',
        },
      ],
      status: 'In Use - Under Development',
      links: [
        /* {
          title: 'Demo',
          url: '#',
          target: '_blank',
          label: 'Coming soon',
        }, */
        {
          title: 'Code Repository',
          url: 'https://github.com/patricio-jp/JycApp',
          target: '_blank',
        },
      ],
    },
    {
      title: 'ISM Wordpress Theme',
      description:
        'Custom WordPress theme designed for an educational institution. Developed using PHP and HTML as the core structure, with TailwindCSS for a modern and adaptive design.',
      imageUrl: '/portfolio/ism-theme.png',
      technologies: [
        {
          title: 'PHP',
          bgColor: 'bg-blue-900',
          textColor: 'text-blue-300',
        },
        {
          title: 'TailwindCSS',
          bgColor: 'bg-indigo-900',
          textColor: 'text-indigo-300',
        },
      ],
      status: 'On hold, with the possibility of future continuation',
      links: [
        {
          title: 'Code Repository',
          url: 'https://github.com/patricio-jp/ism-theme',
          target: '_blank',
        },
      ],
    },
  ];

  newTabIcon = faUpRightFromSquare;
  statusIcon = faScrewdriverWrench;
  deployIcon = faCloudArrowUp;
}
