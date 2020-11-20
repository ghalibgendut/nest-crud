import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotifGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  private logger: Logger = new Logger(`NotifGateway`)
  
  afterInit(server: Server) {
    this.logger.log(`Initialized`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected ${client.id}`)
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected ${client.id}`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return {event: 'msgToClient', data: text};
  }
}
