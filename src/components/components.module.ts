import { NgModule } from '@angular/core';
import { TestComponent } from './test/test';

import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [TestComponent],
	imports: [CommonModule],
	exports: [TestComponent]
})
export class ComponentsModule {}
