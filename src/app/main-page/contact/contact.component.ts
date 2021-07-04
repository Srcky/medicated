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
  subscription = new Subscription();
  emailSent = false;
  sending = false;

  ngOnInit(): void {
    this.contactForm$ = this.contentfulService.getSingleEntry(
      this.contactFormId
    );
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
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
