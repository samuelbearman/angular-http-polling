import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { interval, Observable, Subject, throwError, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil, catchError } from 'rxjs/operators';

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
    'https://httpstat.us/500',
  ];

  private failureCounts: Map<string, number> = new Map<string, number>();

  constructor(private http: HttpClient) {
    this.endpointUrls.forEach((x) => {
      this.failureCounts.set(x, 0);
    });
    this.endpointUrls.forEach((x) => {
      this.allEndpoints$.push(
        interval(1000).pipe(
          switchMap(() => {
            let response = http.get<any>(x);
            return response.pipe(
              catchError((err) => {
                // console.log(err)
                let currentCount = this.failureCounts.get(x);

                if (currentCount !== undefined) {
                  this.failureCounts.set(x, currentCount + 1);
                  currentCount += 1;
                  if (currentCount > 5) {
                    // past threshold
                    console.log('Past threshold, pausing querying');
                  }
                }

                return throwError(err);
              })
            );
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
