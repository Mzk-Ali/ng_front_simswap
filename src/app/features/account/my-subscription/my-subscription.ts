import { Component, inject, OnInit, signal } from '@angular/core';
import { MainTitle } from '../../../shared/components/main-title/main-title';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Button } from "primeng/button";
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-my-subscription',
  imports: [MainTitle, RadioButtonModule, Button, ReactiveFormsModule, MessageModule],
  templateUrl: './my-subscription.html',
  styleUrl: './my-subscription.css',
})
export class MySubscription implements OnInit {
  private readonly fb             = inject(FormBuilder);
  private readonly messageService = inject(MessageService);

  subscriptionForm: FormGroup;
  formSubmitted: boolean = false;

  readonly hasSubscription = signal(false);
  subscription: string = 'Annuel';

  constructor() {
      this.subscriptionForm = this.fb.group({
          selectedSubscription: [this.subscription, Validators.required]
      });
  }

  ngOnInit(): void {
    if (this.hasSubscription()) {
      this.subscriptionForm.disable();
    } else {
      this.subscriptionForm.enable();
    }
    
  }


  isInvalid(controlName: string) {
      const control = this.subscriptionForm.get(controlName);
      return control?.invalid &&  this.formSubmitted;
  }

  onSubmit() {
    console.log("soumettre")
    this.formSubmitted = true;

    if (this.subscriptionForm.valid) {
        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Form is submitted',
            life: 3000
        });

        this.subscriptionForm.reset();

        this.formSubmitted = false;
    }
  }
}
