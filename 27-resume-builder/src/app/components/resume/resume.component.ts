import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { ResumeDataService } from '../../services/resume-data.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-resume',
  imports: [CommonModule, FormsModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent implements AfterViewInit {
  @ViewChild('resume') resumeRef!: ElementRef;
  photoUrl: string | ArrayBuffer | null = null;
  private photoUrlSubscription!: Subscription;

  constructor(
    public pdfService: PdfGeneratorService,
    public resumeData: ResumeDataService,
    public photoService: PhotoService
  ) {}

  ngAfterViewInit() {
    this.pdfService.setResumeElement(this.resumeRef);
    this.photoUrlSubscription = this.photoService.photoUrl$.subscribe((url) => {
      this.photoUrl = url;
    });
  }

  ngOnDestroy() {
    if (this.photoUrlSubscription) {
      this.photoUrlSubscription.unsubscribe();
    }
  }

  isNotEmpty(str: string | null | undefined): boolean {
    return str != null && str.trim() !== '';
  }

  hasNonEmptyItems(array: string[]): boolean {
    return (
      Array.isArray(array) && array.some((item) => item.trim().length >= 2)
    );
  }

  hasNonEmptyProjects(
    projects: { name: string; description: string }[]
  ): boolean {
    return (
      Array.isArray(projects) &&
      projects.some(
        (project) =>
          this.isNotEmpty(project.name) || this.isNotEmpty(project.description)
      )
    );
  }
}
