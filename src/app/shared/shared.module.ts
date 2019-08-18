import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule, MatIconModule, MatToolbarModule, MatButtonModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatSlideToggleModule, MatCheckboxModule, MatTooltipModule, MatGridListModule, MatSidenavModule, MatListModule, MatChipsModule, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

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
 * into one module and import that module wherever you need it.
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ]
})
export class SharedModule { }
