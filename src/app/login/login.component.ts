import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor( private formbuilder : FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password).subscribe(
        res => console.log(res),
        error => console.log(error)
      )
    }
  }

}
