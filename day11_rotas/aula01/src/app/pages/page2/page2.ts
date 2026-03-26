import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-page2',
  imports: [RouterLink],
  templateUrl: './page2.html',
  styleUrl: './page2.css',
})
export class Page2 {
  private route = inject(ActivatedRoute);

  constructor() {
    console.log(this.route.snapshot.params['id']);
  }

}
