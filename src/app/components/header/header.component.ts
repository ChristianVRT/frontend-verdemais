import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userName: string = 'Usuário';
  pageTitle: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setPageTitle();
      }
    });
  }

  ngOnInit(): void {
    const storedUserName = sessionStorage.getItem('user-name');
    if (storedUserName) {
      this.userName = storedUserName;
    }
    this.setPageTitle();
  }

  setPageTitle() {
    const url = this.router.url;
    if (url.includes('gerenciar-mercadoria')) {
      this.pageTitle = 'gerenciar mercadoria';
    } else if (url.includes('dashboard')) {
      this.pageTitle = 'dashboard';
    } else if (url.includes('login')) {
      this.pageTitle = 'login';
    } else if (url.includes('signup')) {
      this.pageTitle = 'cadastro';
    } else {
      this.pageTitle = '';
    }
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Bom dia';
    } else if (hour < 18) {
      return 'Boa tarde';
    } else {
      return 'Boa noite';
    }
  }
}


