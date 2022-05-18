import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasteService } from 'src/app/services/paste.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public pasteId: any;
  public author: any;
  public isToggled: boolean = true
  
  public code = '';

  constructor(
    public activatedRoute: ActivatedRoute,
    public pasteService: PasteService
  ) { }

  ngOnInit() {
    this.pasteId = this.activatedRoute.snapshot.params.pasteId;
    this.getPasteData(this.pasteId);
  }

  getPasteData(pasteId) {
    this.pasteService.getPaste(pasteId).subscribe(
      (success) => {
        this.code = success.paste.content;
      }
    );
  }

  toggleHighlight(){
    this.isToggled = !this.isToggled;
  }

  booba(){
    console.log(this.pasteService.pasteDetailsStorage);
  }

}
