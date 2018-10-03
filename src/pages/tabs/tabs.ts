import { Component } from '@angular/core';

// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { AddItemPage } from '../addItem/addItem';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddItemPage;
  // tab3Root = ContactPage;
  tab3Root = LoginPage;

  constructor() {

  }
}

// {
//   name: value
// }