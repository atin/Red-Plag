import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { UploadService } from '../services/upload.service';
import { Token } from '../login/login.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public files: Set<File> = new Set();
  constructor(public uploadService: UploadService) {}
  ngOnInit(): void {}

  onFileUpload(event: any){
    this.files.add(event.target.files[0]);
  }

  uploadFile(){
    console.log(Token)
    if(Token == ""){
      console.error("Not authorized!!")
      return;
    }
    this.uploadService.upload(this.files,Token).subscribe(
      (response)=>{
        console.log(response);
      },
      (error)=>{
        console.error(error);
      }
    )
  }
}


/*openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      height: '50%',
    });
  }

  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  ngOnInit(): void {}
}

@Component({
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss'],
})
export class DialogComponent {
  @ViewChild('file', { static: false }) file;

  public files: Set<File> = new Set();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadService: UploadService
  ) {}

  ngOnInit() {}

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files);
    console.log(this.progress);
    for (const key in this.progress) {
      this.progress[key].progress.subscribe((val) => console.log(val));
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe((end) => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }*/
