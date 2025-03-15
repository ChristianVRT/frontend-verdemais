import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;

  constructor() {
    this.isCollapsed = window.innerWidth < 1200;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isCollapsed = window.innerWidth < 1200;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isAdmin(): boolean {
    return sessionStorage.getItem("user-role") != "ADMIN";
  }
}