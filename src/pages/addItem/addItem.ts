import { ServerService } from './../../app/server.service';
import { Component, Renderer, HostListener } from '@angular/core';
import { NavController, ModalController, ViewController, LoadingController } from 'ionic-angular';
import firebase from "firebase";
import 'rxjs/Rx';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { KeyEventsPlugin } from '@angular/platform-browser/src/dom/events/key_events';


@Component({
  selector: 'page-addItem',
  templateUrl: 'addItem.html'
})
export class AddItemPage {
  arrayDemo: Array<number> = [];
  public categoriesGlobal = [];
  addItemForm: FormGroup;
  message: string = '';


  validation_messages = {
    'itemField': [
      { type: 'required', message: 'required' },
      { type: 'minlength', message: 'mais de 3' },
      { type: 'maxlength', message: 'menos de 20' }
    ]
  }

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private serverService: ServerService,
    formBuilder: FormBuilder) {



    this.addItemForm = formBuilder.group({
      itemField: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])]
    });



  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.arrayDemo.push(i);
    }
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.serverService.getCategories().subscribe((categories) => {
      // console.log('1', categories)
      new Promise((resolve) => {
        Object.keys(categories).forEach((key) => {
          this.categoriesGlobal.push((categories[key]))
        });
        loading.dismiss();
        resolve();
      })
    },
      (error) => console.log(error)
    );
  }

  openModal(categoriesGlobal) {
    let modal = this.modalCtrl.create(addNewCategoryModal, { categoriesGlobal }, { showBackdrop: false, enableBackdropDismiss: true });
    modal.present();
  }

  keyUp(event: KeyboardEvent) {

    // console.log(event.target);
    
    // let val = (document.getElementById('itemName') as HTMLInputElement);
    let val = event.target as HTMLInputElement

    if (val.value.length === 0) {
      this.message = 'Required';
    } else if (val.value.length < 3) {
      this.message = 'maior que 3';
    } else {
      this.message = '';
    }
    // console.log("val:",val);
    // console.log("val1:",val1);

  }
}


@Component({
  templateUrl: 'addNewCategoryModal.html'
})
export class addNewCategoryModal {

  fb: firebase.database.Reference = firebase.database().ref(`/product/categories`);
  public int: number;
  public catIDArray = [];
  form: FormGroup;

  validation_messages = {
    'myField': [
      { type: 'required', message: 'required' },
      { type: 'minlength', message: 'mais de 3' },
      { type: 'maxlength', message: 'menos de 20' }
    ]
  }

  servers = {
    id: "1",
    name: "name 1"
  };

  constructor(
    public renderer: Renderer,
    public viewCtrl: ViewController,
    private serverService: ServerService,
    formBuilder: FormBuilder) {

    // this.form = formBuilder.group({
    //   myField: ['', Validators.pattern('[A-Za-z]{10}')]
    // });

    this.form = formBuilder.group({
      myField: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ])]
    });

    // Initial value for the field.
    // this.form.get('myField').setValue('11223344/55');

  }

  // save() {
  //   if (this.form.valid) {
  //     console.log(this.form.get('myField').value);
  //   }
  // }

  addNewCategory() {
    if (this.form.valid) {
      this.serverService.getCategories().subscribe((categories) => {
        new Promise((resolve) => {
          Object.keys(categories).forEach((key) => {
            this.catIDArray.push((categories[key]))
          });
          resolve();
        });

        for (let index = 0; index < this.catIDArray.length; index++) {
          if (index === this.catIDArray.length - 1) {
            this.int = parseInt(this.catIDArray[index].id) + 1;
          }

        }

        let newCategory = {
          id: this.int,
          name: this.form.get('myField').value
        };

        this.serverService.storeCategories(newCategory)
          .subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );

      },
        (error) => console.log(error)
      );

      // this.serverService.storeCategories(this.servers)
      //   .subscribe(
      //     (response) => console.log(response),
      //     (error) => console.log(error)
      //   );



      // this.catIDArray = [];
      // this.database().then((res) => {
      //   console.log(res);
      // })
      // var input = (document.getElementById("input-1") as HTMLInputElement).value;

      // this.fb.push({
      //   id: this.int,
      //   name: input
      // })

    }

  }
  // private database() {
  //   let int: number;
  //   let promise = new Promise((resolve) => {
  //     this.fb.on('value', catID => {
  //       catID.forEach((cat) => {
  //         this.catIDArray.push(cat.val().id)
  //       })
  //       for (let i = 0; i < this.catIDArray.length; i++) {
  //         if (i === this.catIDArray.length - 1) {
  //           int = i;
  //           resolve();
  //         }
  //       }
  //     });
  //   })
  //   return promise
  // }
  public closeModal() {
    this.viewCtrl.dismiss();
  }
}