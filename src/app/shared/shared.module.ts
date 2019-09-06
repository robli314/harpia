import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule,
  MatInputModule,
  MatCheckboxModule,
  MatGridListModule,
  MatFormFieldModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatChipsModule,
  MatTabsModule
]

/**
 * Th SharedModule is the place where we can put commonly used directives, pipes, and components
 * into one module and import that module wherever we need it.
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  declarations: [ModalAlertComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...MATERIAL_MODULES
  ]
})
export class SharedModule { }
