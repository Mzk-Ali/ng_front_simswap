import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, Menu, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isAuthenticated = false;
  mobileItems: MenuItem[] | undefined;
  desktopItems: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.buildMobileMenus();
    this.buildDesktopMenus();
  }

  private buildMobileMenus() {
    if (this.isAuthenticated) {
      this.mobileItems = [
        { label: 'Dashboard', icon: 'pi pi-home', command: () => this.go('/dashboard') },
        { label: 'Profil', icon: 'pi pi-user', command: () => this.go('/profile') },
        { label: 'Déconnexion', icon: 'pi pi-sign-out', command: () => this.logout() }
      ];
    } else {
      this.mobileItems = [
        { label: 'Prix', icon: 'pi pi-tag', command: () => this.go('/pricing') },
        { label: 'Connexion', icon: 'pi pi-sign-in', command: () => this.go('/login') },
        { label: 'Inscription', icon: 'pi pi-user-plus', command: () => this.go('/register') }
      ];
    }
  }

  private buildDesktopMenus() {
    if (this.isAuthenticated) {
      this.desktopItems = [
        { label: 'Mon abonnement', root: true },
      ];
    } else {
      this.desktopItems = [
        { label: 'Prix', id: 'pricing' },
        { label: 'FAQ', id: 'faq' },
      ];
    }
  }

  private go(path: string) {
    console.log('Navigating to', path);
    
  }

  private logout() {
    console.log('Logout');
  }
}
