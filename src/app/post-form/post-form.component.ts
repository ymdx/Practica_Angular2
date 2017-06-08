import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

import { Post } from './../post';
import { User } from './../user';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  loggedUser: User = User.defaultUser();

  private _nowDatetimeLocal: string;
  private _publicationDateScheduled: boolean = false;

  @Input() post: Post;
  @Output() postSubmitted: EventEmitter<Post> = new EventEmitter();

  ngOnInit(): void {
    this._nowDatetimeLocal = this._formatDateToDatetimeLocal(new Date());
  }

  private _formatDateToDatetimeLocal(date: Date) {
    return `
      ${this._fixPad(date.getFullYear(), 4)}-
      ${this._fixPad(date.getMonth() + 1, 2)}-
      ${this._fixPad(date.getDate(), 2)}T
      ${this._fixPad(date.getHours(), 2)}:
      ${this._fixPad(date.getMinutes(), 2)}`.replace(/\n/gi, '').replace(/ /gi, '');
  }

  private _fixPad(datePart: number, length: number): string {
    return `0000${datePart}`.slice(-length);
  }

  private _getPostPublicationDate(formPublicationDate: string): number {
    let publicationDate: Date;
    if (this._publicationDateScheduled) {
      publicationDate = new Date(formPublicationDate);
      if (isNaN(publicationDate.getTime())) {
        publicationDate = new Date();
      }
    }
    else {
      publicationDate = new Date();
    }
    return publicationDate.getTime();
  }

  setScheduling(schedule: boolean): void {
    this._publicationDateScheduled = schedule;
  }

  submitPost(form: FormGroup): void {

    /*-------------------------------------------------------------------------------------------------------------|
     | ~~~ Purple Path ~~~                                                                                         |
     |-------------------------------------------------------------------------------------------------------------|
     | Aquí no tienes que hacer nada más allá de comprobar que los datos del formulario se recogen correctamente y |
     | tienen 'forma' de Post. Si no es así, al hacer 'Post.fromJson()' se instanciará un post que no se parece en |
     | nada a lo indicado en el formulario. Por tanto, pon especial atención a que los nombres indicados en los    |
     | distintos elementos del formulario se correspondan con las propiedades de la clase Post.                    |
     |-------------------------------------------------------------------------------------------------------------*/

    let post: Post = Post.fromJson(form.value);
     post = {
       ...this.post,
       title: post.title,
       intro: post.intro,
       body: post.body,
       media: this.post ? this.post.media : '',
       likes: this.post ? this.post.likes : [],
       categories: this.post ? this.post.categories : [],
       author: this.loggedUser,
       publicationDate: this._getPostPublicationDate(form.value.publicationDate)
     }
     this.postSubmitted.emit(post);
  }

}
