import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
    activeComponent = "documents";
    @Output() selectedFeatureEvent = new EventEmitter<string>();
    viewDropDown = false;

    onSelected(selectedEvent: string) {
        this.selectedFeatureEvent.emit(selectedEvent);
        this.activeComponent = selectedEvent;
    }
}
