import { Component } from '@angular/core';
import { EditableResumeComponent } from './components/editable-resume/editable-resume.component';
import { DownloadComponent } from './components/download/download.component';
import { ResumeComponent } from './components/resume/resume.component';

@Component({
  selector: 'app-root',
  imports: [EditableResumeComponent, DownloadComponent, ResumeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
