import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from 'contentful';
import { Observable, Subscription } from 'rxjs';
import { ContactService } from '../../contact.service';
import { ContentfulService } from '../../contentful.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    protected contentfulService: ContentfulService,
    private contactService: ContactService
  ) {}

  @Input() contactFormId: string;

  contactForm$: Observable<Entry<any>>;

  contactForm: FormGroup;

  namePattern = /^[a-zA-Z\s-]*$/;
  numberPattern = /^\+([0-9]*){9,}$/;
  mailPattern = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
  emailSent = false;
  sending = false;

  subscription = new Subscription();

  ngOnInit(): void {
    this.contactForm$ = this.contentfulService.getSingleEntry(
      this.contactFormId
    );
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(this.namePattern),
        ],
      ],
      phone: [
        '',
        [
          Validators.minLength(7),
          Validators.maxLength(20),
          Validators.pattern(this.numberPattern),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.mailPattern)]],
      message: [
        '',
        [
          Validators.minLength(10),
          Validators.maxLength(500),
          Validators.required,
        ],
      ],
    });
  }

  submitForm(): void {
    // if user manipulates disabled button via DOM the form won't be submitted
    // untill sending is true
    this.sending = true;
    if (this.contactForm.valid && this.sending) {
      this.subscription.add(
        this.contactService
          .sendMail('http://localhost:3000/contact', this.contactForm.value)
          .subscribe(
            () => {
              this.emailSent = true;
              setTimeout(() => {
                this.sending = false;
                this.emailSent = false;
                this.contactForm.get('message').reset();
              }, 8000);
            },
            error => {
              console.log('Greska jbt: ' + error.message);
              this.sending = false;
            }
          )
      );
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
