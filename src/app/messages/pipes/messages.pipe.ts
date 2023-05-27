import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../message.model';

@Pipe({
  name: 'messages',
})
export class MessagesPipe implements PipeTransform {
  transform(messages: Array<Message>): Array<Message> {
    return messages;
  }
}
