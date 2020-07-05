import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  email: any;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.auth.getUser().subscribe((user: firebase.User) => {
      this.email = user?.email;
    });
  }

  ngOnInit(): void {
  }

  async handleSignOut() {
    try {
      const response = await this.auth.signOut();
      this.toastr.info('Login again to continue');
      this.email = null;
      this.router.navigateByUrl('/');
    } catch (error) {
      this.toastr.error('Something is wrong');
    }
  }
}