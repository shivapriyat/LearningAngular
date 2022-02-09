import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @ViewChild('fform') commentsFormDirective;
  commentsForm: FormGroup;
  comments: Comment;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  errMess: string;

  constructor(private dishservice: DishService,
    private activatedRoute: ActivatedRoute,
    private location: Location, private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
    this.createForm();
  }
  createForm() {
    this.commentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['5',],
      comment: ['', Validators.required]
    });
    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
    }
  };
  onValueChanged(data?: any) {
    if (!this.commentsForm) { return; }
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    /*const id = this.activatedRoute.snapshot.params['id'];
    this.dishservice.getDish(id).subscribe(dish => this.dish = dish);*/
    this.activatedRoute.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }, errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
  onSubmit() {
    console.log("submit data");
    const today = new Date();
    let todayStr = today.toISOString();
    if (this.commentsForm.valid) {
      let commentInput = {
        author: this.commentsForm.value.author,
        comment: this.commentsForm.value.comment,
        rating: this.commentsForm.value.rating,
        date: todayStr
      }
      this.dish.comments.push(commentInput);

    }
    
    this.commentsForm.reset();
    this.commentsForm.reset({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5],
      comment: ['', Validators.required]
    });
    this.commentsFormDirective.resetForm();
    this.commentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: ['5',],
      comment: ['', Validators.required]
    });
    this.commentsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

}
