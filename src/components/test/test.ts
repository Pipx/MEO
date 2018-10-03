import { Component, Input } from '@angular/core';

/**
 * Generated class for the TestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'joao-test',
  templateUrl: 'test.html'
})
export class TestComponent {
  _badge: any;
  text: string;


  @Input()
	get badge(): any {
		return this._badge;
	}

	set badge(value: any) {
		this._badge = value;
	}


  constructor() {
    console.log('Hello TestComponent Component');
    this.text = 'Hello World';
  }

}
