import {io, Socket} from 'socket.io-client';

class SocketService {
    private static socket: Socket;

    public static initialize(url: string): void {
        this.socket = io(url);

        this.socket.on('connect', () => {
            console.log('Connected to server');
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }

    public static onMessageReceived(callback: (message: string) => void): void {
        if (!this.socket) {
            throw new Error('Socket is not initialized');
        }
        this.socket.on('message', callback);
    }

    public static disconnect(): void {
        if (!this.socket) {
            throw new Error('Socket is not initialized');
        }
        this.socket.disconnect();
    }
}

export default SocketService;
