import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
	{ path: '', component: App },
	{ path: 'skills', component: App },
	{ path: 'projects', component: App },
	{ path: 'resume', component: App },
	{ path: 'contact', component: App },
];
