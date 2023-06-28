import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Survey } from 'src/app/interface/survey';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';
import { SurveyService } from 'src/app/services/survey.service';
import { Model } from "survey-core";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateSurveyComponent implements OnInit {
  form!: FormGroup;
  types: Array<{ text: string; value: string }> = [
    {
      text: 'Text',
      value: 'text'
    },
    {
      text: 'Checkboxes',
      value: 'checkbox'
    },
    {
      text: 'RadioGroup',
      value: 'radiogroup'
    }
  ]

  data: any = null;
  values: any = {};
  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private errToastr: ErrorToastrService,
    private router: Router,
    public dialogRef: MatDialogRef<CreateSurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public survey: Survey
  ) { }

  ngOnInit() {
    this.initForm();
    this.form.valueChanges.subscribe(val => {
      console.log(val);

    })
  }

  get pages(): FormArray {
    return this.form.get('pages') as FormArray;
  }

  getElements(pageIndex: number): FormArray {
    return ((this.form.get('pages') as FormArray).controls[pageIndex] as FormGroup).controls.elements as FormArray
  }

  getChoices(pageIndex: number, elementIndex: number) {
    return ((((this.form.get('pages') as FormArray).controls[pageIndex] as FormGroup).controls.elements as FormArray).controls[elementIndex] as FormGroup).controls.choices as FormArray
  }

  preview() {
    this.data = new Model(this.form.value);
    this.data.onComplete.add(this.onSurveyComplete);
  }

  onSurveyComplete(survey: Model) {
    // const questions = survey.getAllQuestions();
  }

  addOption(pageIndex: number, elementIndex: number) {
    this.getChoices(pageIndex, elementIndex).push(new FormControl(''));
  }

  initForm() {
    console.log(this.survey);
    
    this.form = this.fb.group({
      title: [''],
      description: [''],
      pages: this.fb.array([
        this.fb.group({
          name: this.survey.name,
          title: [this.survey.name],
          elements: this.fb.array([])
        }),
      ])
    })
    this.survey.questions.forEach((element: any) => {
      const elementGroup = this.fb.group({
        type: 'radiogroup',
        name: "1",
        title: element.message,
        isRequired: false,
        choices: this.fb.array(element.answers),
      });
      const elements = (this.form.controls.pages as FormArray).at(0).get('elements') as FormArray;
      elements.push(elementGroup);
    });
  }
  addNew() {
    // call api save json
  }
}
