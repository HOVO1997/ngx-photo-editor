import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxPhotoEditorService} from '../ngx-photo-editor.service';

@Component({
  selector: 'lib-bg-change',
  templateUrl: './bg-change.component.html',
  styleUrls: ['./bg-change.component.css']
})
export class BgChangeComponent implements OnInit {

  @Input() public image;
  @Input() public api;
  @Input() public picsartUrl;
  public type: string;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  private data: FormData;
  public called = false;
  constructor(
    public activeModal: NgbActiveModal,
    private ngxPhotoEditorService: NgxPhotoEditorService,
) { }

  ngOnInit() {
    this.data = new FormData();
    this.data.append('bg_blur', '0');
    this.data.append('scale', 'fit');
    this.data.append('bg_color', '');
    this.data.append('bg_image_url', '');
    this.data.append('format', '');
    this.data.append('output_type', '');
    this.data.append('bg_image_id', '');
    this.data.append('bg_size', '');
    this.data.append('image_id', '');

  }

  passBack() {
    this.called = true;
    const file = this.DataURIToBlob(this.image);
    this.data.append('image', file, 'image.jpg');
    if (this.type === 'background') {
      this.data.delete('bg_color');
      this.data.append('bg_color', '#000000');
    } else {
    this.data.delete('bg_image');
    this.data.append('bg_image', '');
    }
    this.ngxPhotoEditorService.picsartBackgroundChange(this.data, this.api, this.picsartUrl).subscribe(res => {
      this.called = false;
      this.passEntry.emit(res.data.url);
      this.activeModal.close(res.data.url);
    });
  }

  onBackgroundUpload(event): void {
    this.data.append('bg_image', event.target.files[0], event.target.files[0].name);
  }
  onColorUpload(event): void {
    this.data.append('bg_color', event.target.value);
  }

  private DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  public choose(event, type): void {
    console.log(type)
    this.type = type;
  }
}
