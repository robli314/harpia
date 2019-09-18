import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatSidenavModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

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
  MatTabsModule,
  MatMenuModule
]

/**
 * Th SharedModule is the place where we can put commonly used directives, pipes, and components
 * into one module and import that module wherever we need it.
 *
 * @export
 * @class SharedModule
 */
@NgModule({
  declarations: [FooterComponent, ToolbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FlexLayoutModule,
    ...MATERIAL_MODULES,
    FooterComponent, ToolbarComponent, SidebarComponent
  ]
})
export class SharedModule { }
