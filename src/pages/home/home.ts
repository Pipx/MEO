import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';


@Component({
  templateUrl: 'home.html'
})
export class HomePage {
  characters =  [ ];

  categories = [
    {
      name: 'Hobbits'
    },
    {
      name: 'Hobbits 2'
    },
    {
      name: 'Hobbits 3'
    }
  ]

  constructor(public modalCtrl: ModalController) {
    this.initializeItems();
  }

  initializeItems() {
    this.characters =  [
      {
        name: 'Gollum', 
        category: 0
      },
      {
        name: 'Frodo',
        category: 0
      },
      {
        name: 'Samwise Gamgee',
        category: 1
      },
      {
        name: 'Samwise Gamgee asdasdasdsasd',
        category: 1
      }
    ];
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.characters = this.characters.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}

@Component({
  templateUrl: 'details.html'
})
export class ModalContentPage {
  character;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}