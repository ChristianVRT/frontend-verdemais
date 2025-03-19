import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [
    LoginService,
    ToastrService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  ngOnInit(){
    const signupEmail = sessionStorage.getItem("user-email");
    if (signupEmail) {
      this.loginForm.patchValue({ email: signupEmail });
      sessionStorage.removeItem("user-email");
    }
  }

  submit(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => { 
        this.toastService.success("Login feito com Sucesso!")
        this.navigateDashboard();

      },
      error: () => this.toastService.error("Erro inesperado, tente novamente mais tarde."),
    })
  }

  navigateCadastro(){
    this.router.navigate(["signup"])
  }
  
  navigateDashboard(){
    this.router.navigate(["dashboard"])
  }

}
