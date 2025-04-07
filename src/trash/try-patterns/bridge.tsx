interface TV {
    volume: number,
    channel: string,
}

class  TvRemote { // abstraction
    protected tv: TV  // implementation

    constructor (tv: TV) {
        this.tv = tv;
    }

    public volumeUp() {
        this.tv.volume++
    }

    public volumeDown() {
        this.tv.volume--
    }

    public changeChannel(channel: string) {
        this.tv.channel = channel;
    }

} 

class LgTv implements TV {  // implementation
   public volume = 0;
   public channel = 'bbc';
}

const myRemote = new TvRemote(new LgTv);

myRemote.volumeUp()