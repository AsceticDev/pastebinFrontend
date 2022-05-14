import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasteService } from 'src/app/services/paste.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public pageUrlEndpoint = '/api/v1/pastes'

  constructor(
    public pasteService: PasteService,
    public router: Router
  ) { }

  ngOnInit() {
    this.getPasteList();
  }

  getPasteList(){
    this.pasteService.getAllPastes(this.pageUrlEndpoint).subscribe(
      (success: any) => {
        if(success === false) {
          console.log('failed getting paste list.');
        } else {
          console.log('getting paste list success', success);
        }
      }, (error: any) => {
        console.log('failed getting paste list', error);
      }
    )
  }

  goToPaste(pasteId) {
    this.router.navigate(['/paste/' + pasteId]);
  }

}
