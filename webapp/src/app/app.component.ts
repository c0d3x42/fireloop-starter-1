import { Component } from '@angular/core';
import { PantherEvent, FireLoopRef } from './shared/sdk/models';
import { RealTime } from './shared/sdk/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private title = 'app works!';
  private pantherevent : PantherEvent = new PantherEvent();
  private pantherevents : PantherEvent[] = new Array<PantherEvent>();
  private panthereventRef : FireLoopRef<PantherEvent>;

  constructor(private rt: RealTime){
    this.rt.onReady().subscribe(() => {
      this.panthereventRef = this.rt.FireLoop.ref<PantherEvent>(PantherEvent);
      this.panthereventRef.on('change').subscribe( (pantherevents: PantherEvent[]) => this.pantherevents = pantherevents);
      this.panthereventRef.stats().subscribe((stats: any) => console.log( "status: " + stats));
    });
  }

  create(): void{
    this.panthereventRef.create(this.pantherevent).subscribe(() => this.pantherevent = new PantherEvent());
  }

  update( pantherevent: PantherEvent) : void {
    this.panthereventRef.upsert(pantherevent).subscribe();
  }

  remove( pantherevent: PantherEvent) : void {
    this.panthereventRef.remove(pantherevent).subscribe();
  }

}
