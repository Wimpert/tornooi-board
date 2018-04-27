import {Component, OnInit, Input, SimpleChanges} from '@angular/core';

@Component({
  selector: 'sponsor-display',
  templateUrl: './sponsor-display.component.html',
  styleUrls: ['./sponsor-display.component.scss']
})
export class SponsorDisplayComponent implements OnInit {

  sponsers : string[] = ["bavik.jpg","bolle.jpg","college.jpg","deva.PNG","devos.PNG","Jorn.JPG","kam.PNG","koeke.jpg","lathem.jpg","moarte.jpg","tricoo.png ","Wynant.jpg","gara.PNG"];
  imageIndex : number = 0;
   @Input() isShown : boolean;

  private prefix = "../../../assets/img/sponsors/";
  image : string = this.prefix + this.sponsers[this.imageIndex];
  constructor() { }

  ngOnInit() {
      console.log("initing");
  }

  ngOnChanges(changes: SimpleChanges) {
      let chng = changes['isShown'];
      if(chng.currentValue){
          this.updateIndex();
      }
  }

  updateIndex():void{
      console.log("before: " + this.imageIndex);
      this.imageIndex++;
      if(this.imageIndex >= this.sponsers.length){
          this.imageIndex=0;
      }
      console.log("after: " + this.imageIndex);
      this.image = this.prefix + this.sponsers[this.imageIndex];
      console.log("url after: " + this.image);
  }

}
