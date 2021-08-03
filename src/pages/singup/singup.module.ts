import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CidadeService } from '../../services/domain/Cidade.service';
import { EstadoService } from '../../services/domain/Estado.service';
import { SingupPage } from './singup';

@NgModule({
  declarations: [
    SingupPage,
  ],
  imports: [
    IonicPageModule.forChild(SingupPage),
  ],
  providers:[
    CidadeService,
    EstadoService
  ]
})
export class SingupPageModule {}
