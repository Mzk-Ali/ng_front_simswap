import { Component, signal } from '@angular/core';
import { MainTitle } from '../../../../shared/components/main-title/main-title';
import { Account } from './account/account';
import { Password } from './password/password';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-setting',
  imports: [MainTitle, Account, Password, CommonModule, TabsModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  // activeTab = signal<'password' | 'account'>('password');

  // setActiveTab(tab: 'password' | 'account') {
  //     this.activeTab.set(tab);
  // }
}
