

class SocketEvent {
    private static instance: SocketEvent;

    // tslint:disable-next-line
    public static getInstance(): SocketEvent {
        if (!SocketEvent.instance) {
            SocketEvent.instance = new SocketEvent();
        }

        return SocketEvent.instance;
    }

    connect = async (data: any) => {
        
    }

    join = async (data: any) => {
        
    }

    send = async (data: any) => {

    }

    disconnect = async (data: any) => {
        
    }
}

const socketEvent = SocketEvent.getInstance();

export const socketConnection =  (socket: any) => {
    
    // Socket when connected
    socket.on("connect", async (data: any) => {
      socket.join("main-channel");
      // socket.join("notification-channel");
    })

    // Socket join some room
    socket.on("join", async (data: any = { channels: [] }) => {
      const channels = data.channels;
      console.log(socket.id, channels)
      for(const i in channels) {
        const channel = channels[i];
        socket.join(channel);
      }
    })

    // Socket send perform some action
    socket.on("send", async (r: any = { evtName: '' }) => {
      if(r && r.evtName && r.evtName === 'chat.message.send') {
        io.to(r.conversationId).emit("receive", { ...r, ...r.data });
      }
    })
  
    // Socket when disconnected
    socket.on("disconnect", socketEvent.disconnect);
}