import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResumeDataService } from '../../services/resume-data.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-editable-resume',
  imports: [FormsModule, CommonModule],
  templateUrl: './editable-resume.component.html',
  styleUrl: './editable-resume.component.scss',
})
export class EditableResumeComponent {
  photoUrl: string | ArrayBuffer | null = null;

  constructor(
    public resume: ResumeDataService,
    private photoService: PhotoService
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.photoUrl = reader.result;
      this.photoService.photoUrl = this.photoUrl;
    };
    reader.readAsDataURL(file);
  }
}
