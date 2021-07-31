import { Component, OnInit } from '@angular/core';
import { CryptoService } from '@core/services/crypto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  endpoints$: Array<Observable<any>>;

  constructor(public cryptoService: CryptoService) {
    this.endpoints$ = cryptoService.getEndpoints();
  }

}
