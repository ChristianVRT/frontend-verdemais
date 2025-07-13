import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
imports: [RouterLink, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = window.innerWidth < 1200;

  get isSmallScreen(): boolean {
    return window.innerWidth < 1200;
  }

  constructor() {
    this.isCollapsed = this.isSmallScreen;
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isSmallScreen) {
      this.isCollapsed = true;
    } else {
      this.isCollapsed = false;
    }
  }

  toggleSidebar() {
    if (!this.isSmallScreen) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  isAdmin(): boolean {
    return sessionStorage.getItem("user-role") === "ADMIN";
  }
}