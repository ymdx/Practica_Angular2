import { Component, Input, Output, EventEmitter} from '@angular/core';

import { Category } from './../category';

@Component({
  selector: 'category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent {

  @Input() categories: Category[];
  @Output() onClickCategory: EventEmitter<Category>;

  constructor() {
    this.onClickCategory = new EventEmitter<Category>();
  }
  

  /*-------------------------------------------------------------------------------------------------------------------|
   | ~~~ Yellow Path ~~~                                                                                               |
   |-------------------------------------------------------------------------------------------------------------------|
   | Expón un atributo de salida con el decorador correspondiente. El tipo de dicho atributo debe permitir la emisión  |
   | de eventos; la idea es enviar al componente padre la categoría sobre el cuál se ha hecho clic. Y puesto que dicho |
   | clic se realiza en el template de este componente, necesitas, además, un manejador para el mismo.                 |
   |-------------------------------------------------------------------------------------------------------------------*/

  notifyCategoryHandler(category: Category): void {
    this.onClickCategory.emit(category);
  }
}
