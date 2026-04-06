import { Component, OnDestroy } from '@angular/core';
import { interval, Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filho',
  imports: [],
  templateUrl: './filho.html',
  styleUrl: './filho.css',
})
export class Filho implements OnDestroy {
  private values = interval(1000);
  private id = Math.floor(Math.random() * 100);

  // private sub = new Subscription();
  private unsub$ = new Subject();

  constructor() {
    // this.sub = this.values.subscribe(() => {
    //   console.log(`Código: ${this.id} ainda imprimindo.`);
    // });

    // this.values.pipe(takeUntil(this.unsub$)).subscribe(() => {
    //   console.log(`Código: ${this.id} ainda imprimindo.`);
    // });

    // this.values.pipe(takeUntilDestroyed()).subscribe(() => {
    //   console.log(`Código: ${this.id} ainda imprimindo.`);
    // });

    this.values.pipe(take(1)).subscribe(() => {
      console.log(`Código: ${this.id} ainda imprimindo.`);
    })
  }

  ngOnDestroy() {
    console.log('on destroy');
    // this.sub.unsubscribe();

    this.unsub$.next(true);
  }
}
