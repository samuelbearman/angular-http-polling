import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil } from 'rxjs/operators';

export interface CryptoInfo {
  name: string;
  rateUsd: number;
}

@Injectable({
  providedIn: 'root',
})
export class CryptoService implements OnDestroy {
  private allEndpoints$: Array<Observable<any>> = new Array<Observable<any>>();

  private stopPolling = new Subject();

  private endpointUrls: Array<string> = [
    'https://api.coincap.io/v2/rates/bitcoin',
    'https://api.coincap.io/v2/rates/dogecoin',
  ];

  constructor(private http: HttpClient) {
    this.endpointUrls.forEach((x) => {
      this.allEndpoints$.push(
        timer(1, 3000).pipe(
          switchMap(() => {
            return http.get<any>(x);
          }),
          retry(),
          share(),
          takeUntil(this.stopPolling)
        )
      );
    });
  }

  getEndpoints(): Array<Observable<any>> {
    return this.allEndpoints$;
  }

  ngOnDestroy(): void {
    this.stopPolling.next();
  }
}
// export class CryptoService {

//   private allUrls$: Observable<CryptoInfo[]>[] = [];

//   private stopPolling = new Subject();

//   private urls: string[] = ['https://api.coincap.io/v2/rates/bitcoin', 'https://api.coincap.io/v2/rates/dogecoin']

//   // https://api.coincap.io/v2/rates/bitcoin

//   constructor(private http: HttpClient) {
//     this.urls.forEach(url => {
//       this.allUrls$.push(
//         timer(1, 3000).pipe(
//           switchMap(() => http.get<CryptoInfo[]>(url)),
//           retry(),
//           share(),
//           takeUntil(this.stopPolling)
//        ))
//     })

//   }
//   getAllUrls(): Observable<CryptoInfo[]>[] {
//     return this.allUrls$;
//   }

//   ngOnDestroy() {
//      this.stopPolling.next();
//   }
// }
