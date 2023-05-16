import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeComponent: string = 'documents';
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  viewDropDown: Boolean = false;

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
    this.activeComponent = selectedEvent;
  }
}
