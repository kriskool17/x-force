import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionLoaderService {

  userDataSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  constructor(private _http: HttpClient) { } 


  getQuestions() {
    var questionsList = this._http.get('../../assets/data/questions.json');
    // console.log(questionsList);
    return questionsList;
  }

}
