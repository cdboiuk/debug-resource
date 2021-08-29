import EKeyMapper from "../enums/EKeyMapper";
import KeyBinder from "./KeyBinder";

class Debug {
    private keyBinder: typeof KeyBinder;
    private open: Boolean;

    constructor() {
        this.keyBinder = KeyBinder;
        this.open = false;
    }

    public run() : void  {
        this.addKeybinds();
        this.listeners();
        this.render();
    }

    private listeners() {
        on('keyDown:debug', () => {
            this.open = !this.open;

            SendNuiMessage(JSON.stringify({
                open: this.open,
                action: 'open'
            }));
        });
    }

    private addKeybinds() : void {
        this.keyBinder.map({
            restricted: false,
            mapping: {
                commandString: 'debug',
                description: 'Debug',
                defaultMapper: EKeyMapper.keyboard,
                defaultParameter: 'f5'
            }
        });
    }

    private render() : void {
        setTick(() => {
            if (this.open) {
                const playerID = GetPlayerPed(-1);
                const playerCoordinates = GetEntityCoords(playerID);
            
                SendNuiMessage(JSON.stringify({
                    playerCoordinates,
                    playerID,
                    action: 'debug'
                }));
            }
        });
    }
};

export default Debug;