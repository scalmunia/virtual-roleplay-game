import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'vrg-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})

export class AvatarComponent {
  @Input() isEditable: boolean = false;
  @Input() src?: string | null;
  @Output() avatar: EventEmitter<string> = new EventEmitter()
  loadingImage = false;
  error: Error | null = null;

  constructor(private assetsService: AssetsService) { }

  async updateImageUrl(event: any) {
    if (!this.isEditable) return;

    this.loadingImage = true;
    try {
      const rawFile: File = event.target.files[0];
      const blob = rawFile.slice(0, rawFile.size, rawFile.type);
      const timestamp = new Date().getTime();
      const file = new File([blob], `${rawFile.name}-${timestamp}`, { type: rawFile.type });

      const response = await this.assetsService.uploadFiles(file);
      const url = response.result;

      if (!url) return;
      this.avatar.emit(url);
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.loadingImage = false;
    }
  }

  handleError() {
    this.src = '';
  }
}
