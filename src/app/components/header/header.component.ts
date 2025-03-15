import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userName: string = 'Usuário';

  ngOnInit(): void {
    const storedUserName = sessionStorage.getItem('user-name');
    if (storedUserName) {
      this.userName = storedUserName;
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


