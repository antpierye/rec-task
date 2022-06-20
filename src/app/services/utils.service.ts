import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private snackBar: MatSnackBar) {

  }

  showSnackBar(name: string, panelClass: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 6000;
    config.horizontalPosition = 'right';
    config.verticalPosition = 'top';
    config.panelClass = panelClass;

    this.snackBar.open(name, 'OK', config);
  }
}