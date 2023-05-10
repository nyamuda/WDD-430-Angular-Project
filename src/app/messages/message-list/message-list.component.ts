import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  messages: Array<Message> = new Array<Message>();
  //display the message form or not
  displayForm: boolean = false;
  //display button that shows the form
  displayButton = true;

  ngOnInit() {
    this.createMessage();
  }

  //create a list of dummy messages
  //creating 3 messages
  dummyData = [
    {
      id: 1,
      subject: 'Greetings',
      message: 'Hello, how are you?',
      sender: 'John Doe',
    },
    {
      id: 2,
      subject: 'Meeting Reminder',
      message: 'Just a reminder that we have a meeting tomorrow at 10 AM.',
      sender: 'Jane Smith',
    },
    {
      id: 3,
      subject: 'Important Announcement',
      message: 'Please be informed that the office will be closed next Monday.',
      sender: 'Alex Johnson',
    },
  ];

  createMessage(): void {
    this.dummyData.forEach((element) => {
      let message = new Message(
        element.id,
        element.subject,
        element.message,
        element.sender
      );
      this.messages.push(message);
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
