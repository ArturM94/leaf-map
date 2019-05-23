import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
  ]
})

export class MaterialModule { }
