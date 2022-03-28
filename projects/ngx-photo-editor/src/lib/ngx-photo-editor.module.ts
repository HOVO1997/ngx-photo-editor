import {NgModule} from '@angular/core';
import {NgxPhotoEditorComponent} from './ngx-photo-editor.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import { BgChangeComponent } from './bg-change/bg-change.component';
import {FormsModule} from '@angular/forms';
import {NgxPhotoEditorService} from './ngx-photo-editor.service';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [NgxPhotoEditorComponent, BgChangeComponent],
    imports: [NgbModalModule, CommonModule, FormsModule, HttpClientModule],
  exports: [NgxPhotoEditorComponent],
  entryComponents: [BgChangeComponent],
  providers: [NgxPhotoEditorService]
})
export class NgxPhotoEditorModule {
}
