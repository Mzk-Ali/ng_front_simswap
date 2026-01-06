import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, Menu, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly authService  = inject(AuthService);
  private readonly router       = inject(Router);
  isAuthenticated = this.authService.isAuthenticated;
  mobileItems: MenuItem[] | undefined;
  desktopItems: MegaMenuItem[] | undefined;

  constructor() {
    effect(() => {
      this.buildMobileMenus();
      this.buildDesktopMenus();
    })
  }

  private buildMobileMenus() {
    if (this.isAuthenticated()) {
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
    if (this.isAuthenticated()) {
      this.desktopItems = [
        {
          label: 'Mon abonnement',
          route: '/mon-abonnement',
        },
      ];
    } else {
      this.desktopItems = [
        {
          label: 'Prix',
          route: '/',
          fragment: 'pricing'
        },
        {
          label: 'Faq',
          route: '/',
          fragment: 'faq'
        },
      ];
    }
  }

  private go(path: string) {
    if (path.includes('#')) {
      const [route, fragment] = path.split('#');
      this.router.navigate([route], { fragment });
    } else {
      this.router.navigate([path]);
    }
  }

  public navigate(item: any) {
    if (item.route) {
      this.router.navigate([item.route], {
        fragment: item.fragment,
      });
    }
  }

  logout() {
    console.log('Logout');
    this.authService.logout();
  }
}
