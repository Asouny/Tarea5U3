import { Component } from '@angular/core';
import { Note } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  notes: Note[] = [];
  search: string;

  constructor(private studentService: StudentService, private router: Router,
              private alert: AlertController) {
    this.clearSearch();
  }

  operation(pos: number, ev: {detail: { side }}) {
    const side = ev.detail.side;
    if (side === 'start') {
      //his.studentService.changeStatus(pos);
    } else {
      this.showAlert(pos);
    }
  } 

  async showAlert(pos: number) {
    const al = await this.alert.create({
      header: 'Confirmar',
      message: '¿Seguro que desea eliminar?',
      buttons: [{
        text: 'No',
        handler: () => {}
      }, {
        text: 'Si',
        handler: () => {
          this.studentService.deleteNote(pos);
        }
      }]
    });
    await al.present();
  }

  newNotes(): void {
    this.router.navigate(['/new-student']);
  }

  showNote(): void {
    this.router.navigate(['/show-note']);
  }

  clearSearch(): void {
    this.notes = this.studentService.getNotes();
  }

  filter(): void{
    this.clearSearch();
    if (this.search && this.search.trim()){
      this.notes = this.notes.filter((notes)=> {
        return (notes.title.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1);
      });
    }
  }


}
