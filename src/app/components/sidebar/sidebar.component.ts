import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isCollapsed = window.innerWidth < 1200;
  }

  ngOnInit() {
    this.isCollapsed = window.innerWidth < 1200;
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}