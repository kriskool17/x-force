import { Component, OnInit } from '@angular/core';
import { QuestionLoaderService } from '../question-loader/question-loader.service';
import { UserResponsesService } from '../user-responses/user-responses.service';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {

  questionsList: any = null;
  questionsFormGroup : FormGroup;
  questionsFormArray: FormArray;
  questionsLoaded = false;

  constructor(private _questionLoader: QuestionLoaderService, private _formBuilder: FormBuilder, public _userResponsesService: UserResponsesService) { }

  ngOnInit(): void {
    this.questionsFormGroup = this._formBuilder.group({
      'questionsFormArray': this._formBuilder.array([])
    });
    this.questionsList = this._questionLoader.getQuestions().subscribe(data => {
      this.questionsList = data;
      
      // console.log(this.questionsList);
      for (let questionGroup of this.questionsList) {
        this.questionsFormArray = this.questionsFormGroup.get('questionsFormArray') as FormArray;
        this.questionsFormArray.push(this.addQuestionsToFormArray(questionGroup));
      }      
      this.questionsLoaded = true;
      // console.log("Finished building the form group");
    });
  }


  addQuestionsToFormArray(questionGroup) {
    let questionFormGroup = {};
    questionGroup.questions.forEach((question,index) => {
      questionFormGroup[question.que] = new FormControl('',[Validators.required]);
      this._userResponsesService.questionAnswers[question.que]=null;
    }); 
    let questionFormGroupObj = this._formBuilder.group(questionFormGroup);
    questionFormGroupObj.statusChanges.pipe(filter(() => questionFormGroupObj.valid)).subscribe(() => { 
      //execute validation rules.
      if (questionGroup.medicalAdviceRule) {
        questionGroup["needsMedicalAdvice"] = this[questionGroup.medicalAdviceRule](this.questionsList.indexOf(questionGroup),questionGroup);  
      }
    });
    return questionFormGroupObj;
  }

  sentyFivePercentRule(questionGroupIndex, questionGroup) : boolean {
    let formGroup = this.questionsFormArray.controls[questionGroupIndex] as FormGroup;
    // console.log(formGroup.value);
    let answeredVal = 0 , totalVal = 0;
    for (let question in formGroup.value) {
      totalVal++;
      let tmpVal = (formGroup.value)[question];
      let questionObj = null;
      for (let qObj of questionGroup.questions) {
        if (qObj.que === question) {
          questionObj=qObj;
          break;
        }
      }
      if ((questionObj.fail && tmpVal.includes(questionObj.fail)) || (questionObj.pass && !tmpVal.includes(questionObj.pass))) {
        answeredVal++;
      }
    }
    // console.log(answeredVal,totalVal);
    questionGroup.failed = answeredVal;
    questionGroup.total = totalVal;
    questionGroup.failPercent = Math.ceil(answeredVal/totalVal*100)
    return (questionGroup.failPercent >= 75);
  }

  updateAnswerArray(formArrayIndex,formControlName,value,isChecked):void  {
    // console.log(formArrayIndex,formControlName,value,isChecked);
    this.questionsFormArray = this.questionsFormGroup.get('questionsFormArray') as FormArray;
    let selectedCheckBox = this.questionsFormArray.controls[formArrayIndex].get(formControlName) as FormControl;
    let tmpValue = JSON.parse(selectedCheckBox.value||'[]');
    if (isChecked && !tmpValue.includes(value)) {
      tmpValue.push(value);
    } else if(!isChecked && tmpValue.includes(value)) {
      //remove it from the array;
      tmpValue.splice(tmpValue.indexOf(value),1);
    }
    selectedCheckBox.setValue(JSON.stringify(tmpValue));
}

  
  saveAnswers() {
    this._userResponsesService.setAnswers(this.questionsFormGroup.value.questionsFormArray);
  }

}
