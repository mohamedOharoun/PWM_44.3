import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceFactory } from '../../services/service-factory.service';
import { AuthenticationService } from '../../../architecture/io/services/AuthenticationService';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  protected email: string = '';
  protected password: string = '';
  protected invalidCredentials: boolean = false;

  constructor(
    private serviceFactory: ServiceFactory,
    private router: Router
  ) {}

  protected signIn(form: NgForm) {
    this.invalidCredentials = false;

    if (form.invalid) {
      return;
    }

    (this.serviceFactory.get('auth') as AuthenticationService)
      .signIn(this.email, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/homePage']).then();
        },
        error: () => {
          this.invalidCredentials = true;
        },
      });
  }
}
