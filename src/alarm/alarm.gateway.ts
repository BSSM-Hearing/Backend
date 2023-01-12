import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WSAuthUtil } from 'src/auth/WS-auth';
import { User } from 'src/user/entities/user.entity';
import { CheckAlarmRq } from './controller/rq/check-alarm.rq';
import { AlarmService } from './service/alarm.service';

@WebSocketGateway({
    namespace: 'alarm',
    cors: true,
    transports: ['websocket', 'polling']
})
export class AlarmGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly alarmService: AlarmService,
        private wsAuthUtil: WSAuthUtil
    ) { }

    private clients: {
        [index: string]: {
            user: User,
            socket: Socket
        }
    } = {};
    @WebSocketServer() server: Server;
    users: number = 0;

    async handleConnection(client: Socket): Promise<void> {
        const userInfo = await this.wsAuthUtil.authClient(client);
        this.users++;
        // 인증에 실패했다면
        if (!userInfo) {
            client.emit('error', 'Unauthorized');
            client.disconnect();
            console.log('fail')
            return;
        }
        this.clients[client.id] = {
            user: userInfo,
            socket: client
        };
        this.server.emit('users', this.users);
        const parentId = await this.alarmService.getParentId(userInfo);
        console.log(parentId);
        client.join(parentId.toString());
    }

    async handleDisconnect(client: Socket) {
        this.users--;
        const userInfo = this.clients[client.id]?.user;
        if (!userInfo) return;
        this.server.emit('users', this.users);
        delete this.clients[client.id];
    }

    @SubscribeMessage('alarm')
    async chat(client: Socket, data: CheckAlarmRq): Promise<void> {
        const userInfo = this.clients[client.id]?.user;
        if (!userInfo) return;
        const parentId = await this.alarmService.checkAlarm(data);
        this.server.to(parentId.toString()).emit('alarm', 'on');
    }

}