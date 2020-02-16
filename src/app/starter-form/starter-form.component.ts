import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserResponsesService } from '../user-responses/user-responses.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-starter-form',
  templateUrl: './starter-form.component.html',
  styleUrls: ['./starter-form.component.scss']
})
export class StarterFormComponent {
  userDetailsForm = this.fb.group({
    firstName: [this._userResponsesService.questionAnswers["firstName"], Validators.required],
    lastName: [this._userResponsesService.questionAnswers["lastName"], Validators.required],
    email: [this._userResponsesService.questionAnswers["email"], Validators.compose([Validators.required, Validators.email])]
  });


  constructor(private fb: FormBuilder, private _userResponsesService: UserResponsesService) {}

  ngOnInit(): void {
    this.userDetailsForm.statusChanges.pipe(filter(() => this.userDetailsForm.valid)).subscribe(() => this.saveUserInformation());
  }

  saveUserInformation() {
    this._userResponsesService.setUserInformation(this.userDetailsForm.value);
    // setTimeout(() => {  document.querySelector('mat-card.questions-form').scrollIntoView(true); }, 5000);
  }
}
