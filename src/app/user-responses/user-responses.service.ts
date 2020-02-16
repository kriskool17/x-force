import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserResponsesService {

  public questionAnswers = {};
  public userDetailsAvailable = false;

  constructor() { }

  setUserInformation(userInfo) {
    for (let attr in userInfo) {
      this.questionAnswers[attr] = userInfo[attr];
    }
    // console.log(this.questionAnswers);
    this.userDetailsAvailable=true;
  }


  setAnswers(questionsArray) {
    for (let answerGroup of questionsArray) {
      Object.assign(this.questionAnswers, answerGroup);
    }
    this.submitAnswers();
  }

  submitAnswers() {
    //post the data to google forms
    console.log(this.questionAnswers);
  }

  // updateSheet(fData) {

  //   // console.log(fData, 'fData');
  //   const url = ' https://docs.google.com/forms/d/e/1FAIpQLSfOXBFVWDW3CzAxXB8TWFTWn46BvkwA1Q-gXfZK8CjSE-2sHA/formResponse';
  //   var data = {
  //     "entry.2116730782": this.fname,
  //     "entry.1201200118": this.lname,
  //     "entry.1197396230": this.email,
  //     "entry.1663709729": this.age,
  //     "entry.1574251999": this.title,
  //     "entry.918269598": fData[0],
  //     "entry.1109884812": fData[1],
  //     "entry.828304372": fData[2],
  //     "entry.1902511577": fData[3],
  //     "entry.1699657920": fData[4],
  //     "entry.1361368604": fData[5],
  //     "entry.1188003601": fData[6],
  //     "entry.774255369": fData[7],
  //     "entry.1181862471": fData[8],
  //     "entry.245953745": fData[9]
  //   };
  //   // console.log(data, 'FinalData');

  //   // return this._http.post(url, null, {headers: {'Access-Control-Allow-Origin': '*'}, params: data});

  // }

}
