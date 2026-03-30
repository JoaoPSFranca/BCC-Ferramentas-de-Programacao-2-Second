import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-page2',
  imports: [RouterLink],
  templateUrl: './page2.html',
  styleUrl: './page2.css',
})
export class Page2 {
  // Route Params
  private route = inject(ActivatedRoute);

  // Dynamic data
  private router = inject(Router);

  constructor() {
    // Route Params
    const id = this.route.snapshot.params['id'];
    console.log(id);

    // Dynamic data
    console.log(this.router.currentNavigation()?.extras.state);

    // Query Params
    console.log(this.route.snapshot.queryParamMap.get('nome'));
  }

}
