import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  @SubscribeMessage('send')
  async handleSendMessage(@MessageBody() body: any) {
    console.log(body);
  }

  @SubscribeMessage('upload')
  async handleUpload(@MessageBody() body: any) {
    console.log(body);
  }

  emitMsg(text: string) {
    this.server.emit('writing', text);
  }

  emitMsgById(socketId: string, text: string) {
    this.server.to(socketId).emit('writing', text);
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}
