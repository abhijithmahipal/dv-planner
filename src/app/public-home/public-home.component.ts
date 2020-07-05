import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  onSubmitSignin(signin: NgForm) {
    const { email, password } = signin.form.value;
    this.auth
      .singIn(email, password)
      .then((res) => {
        this.router.navigateByUrl('home');
        this.toastr.success('Sign in Success');
      })
      .catch((err) => {
        console.log(err.message);
        this.toastr.error('Sign in failed');
      });
  }
  onSubmitSignout(signout: NgForm) {
    const { email, password } = signout.form.value;
    this.auth.signUp(email, password).then((res) => {
      this.router.navigateByUrl('home');
      this.toastr.success('Signup success');
    }).catch((err) => {
      console.log(err.message);
      this.toastr.error('Signup failed');
    });
  }
}
