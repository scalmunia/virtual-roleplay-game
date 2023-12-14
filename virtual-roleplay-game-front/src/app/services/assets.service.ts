import { Injectable } from '@angular/core';
import { fetcher } from '../config/fetch.config';

@Injectable({
  providedIn: 'root'
})

export class AssetsService {

  private URL = 'api/assets/uploads';

  async uploadFiles(img: File) {
    const body = new FormData();
    body.set('file', img);

    const response = await fetcher(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': null as any
      },
      body
    });

    const result = await response.json();

    return result;
  }
}
