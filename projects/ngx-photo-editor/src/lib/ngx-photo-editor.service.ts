import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NgxPhotoEditorService {

  constructor(private httpClient: HttpClient) {
  }

  public picsartBackgroundChange(data, api, url): Observable<any> {
    const headers = { apikey: api};
    return this.httpClient.post(url, data, { headers });
  }
}
