import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Language } from 'src/app/models/language.model';

@Component({
  selector: 'hp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {

  @Input()
  selectedLanguage: Language;

  @Input()
  languages: Observable<Language[]>;

  @Output()
  changeLanguage: EventEmitter<Language> = new EventEmitter<Language>();

  @Output()
  clickLogout: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  getLanguageIcon(flag: string): string {
    return 'assets/images/icons/' + flag + '.png';
  }

  setLanguage(language: Language) {
    this.changeLanguage.emit(language);
  }

  logout() {
    this.clickLogout.emit();
  }
}
