import { Component, inject, signal } from '@angular/core';
import { MainTitle } from '../../../shared/components/main-title/main-title';
import { SelectButton } from 'primeng/selectbutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

  interface FileHandle {
    file: File;
    url: SafeUrl;
  }

  interface Swap {
    originalImage: FileHandle | null;
    faceImage: FileHandle | null;
  }

@Component({
  selector: 'app-face-swap',
  imports: [MainTitle, SelectButton, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './face-swap.html',
  styleUrl: './face-swap.css',
})
export class FaceSwap {
  private readonly fb             = inject(FormBuilder);
  private readonly sanitizer      = inject(DomSanitizer);

  swap : Swap = {
    originalImage: null,
    faceImage: null,
  }

  singleFaceForm: FormGroup;
  formSubmitted = false;

  isLoading = signal(false);
    
  errorMessage = signal<string | null>(null);

  stateOptions: any[] = [
    {
      label: 'Single',
      value: 'single'
    },
    {
      label: 'Multiple',
      value: 'multiples',
      constant: true
    }
  ];

  value: string = 'single';

  constructor() {
      this.singleFaceForm = this.fb.group({
          originalImage: [null , [Validators.required]],
          faceImage: [null , [Validators.required]]
      });
  }

  onFileSelected(event: any, controlName: 'originalImage' | 'faceImage') {
    if(event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          globalThis.URL.createObjectURL(file)
        ),
      };
      this.swap[controlName] = fileHandle;

      // this.singleFaceForm.get(controlName)?.setValue(true);
    }
  }

  removeFile(controlName: 'originalImage' | 'faceImage', event?: Event) {
    event?.stopPropagation();
    this.swap[controlName] = null;
    this.singleFaceForm.get(controlName)?.setValue(null);
  }

  onSubmit() {
    if (this.singleFaceForm.invalid) {
        this.singleFaceForm.markAllAsTouched();
        return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const originalFile: File | null = this.swap.originalImage?.file ?? null;
    const faceFile: File | null = this.swap.faceImage?.file ?? null;

    console.log('Original File:', originalFile);
    console.log('Face File:', faceFile);
  }
}
