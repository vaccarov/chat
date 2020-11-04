import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messagesDiv', {static: false}) private messagesDiv: ElementRef;
  private socket: any; // SocketIOClient.Socket;
  messages: Message[] = [];
  message: string = '';

  constructor(
    private messagesService: MessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {    
    this.socket = io(environment.socket.url);
    this.messagesService.initMessages().subscribe((messages: Message[]) => {
      this.messages = messages;
      this.scrollToBottom();

      this.socket.on('messages', (m: Message[]) => {
        this.messages = m;
        this.scrollToBottom();
      })
    })
  }

  sendMessage() {
    this.messagesService.sendOneMessage(this.message).subscribe(() => {
      this.message = '';
      this.scrollToBottom();
    })
  }

  private scrollToBottom() {
    setTimeout(() => 
      this.messagesDiv.nativeElement.scroll({
        top: this.messagesDiv.nativeElement.scrollHeight,
        behavior: 'smooth'
      }), 0);
  }

  logout() {
    this.authService.logout().subscribe((disconnected: boolean) => this.router.navigateByUrl('login'));
  }

  ngOnDestroy() {
    this.socket.close();
  }
}
