import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Auth } from '../../Services/auth';
import { FormsModule } from "@angular/forms";
import { Store } from '@ngrx/store';
import { updateFiltertext } from '../../app/Store/filterText/filterText.action';

@Component({
  selector: 'app-content',
  imports: [RouterLink, FormsModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  store=inject(Store)

  authServices=inject(Auth)
  filterText!:string
  changetext(){
  this.store.dispatch(updateFiltertext({text:this.filterText}))
  }

}
