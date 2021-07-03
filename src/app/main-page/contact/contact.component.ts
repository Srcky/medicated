import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  contactForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitForm() {
    console.log(this.contactForm.value);
  }
}
