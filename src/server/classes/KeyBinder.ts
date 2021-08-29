import IKeyBind from "../interfaces/IKeyBind";
import IKeyBindRegister from "../interfaces/IKeyBindRegister";

class KeyBinder {
    public pressed: Map<string, boolean>;

    constructor() {
        this.pressed = new Map();
    }

    public map(keyBind: IKeyBind) : void {
        this.registerKeyMapping(keyBind);
        this.registerCommands(keyBind);
    }

    private registerKeyMapping(keyBind: IKeyBind) : void {
        RegisterKeyMapping(
            keyBind.mapping.commandString,
            keyBind.mapping.description,
            keyBind.mapping.defaultMapper,
            keyBind.mapping.defaultParameter
        );
    }

    private registerCommands(keyBind: IKeyBind) : void {
        this.registerCommand({ keyBind: keyBind, keyDown: true });
        this.registerCommand({ keyBind: keyBind, keyDown: false });
    }

    private registerCommand(keyBindRegister: IKeyBindRegister) : void {
        const eventName = keyBindRegister.keyDown ? 'keyDown' : 'keyUp';
        const operator = keyBindRegister.keyDown ? '+' : '-';

        RegisterCommand(`${ operator.concat(keyBindRegister.keyBind.mapping.commandString) }`, () => {
            this.pressed.set(keyBindRegister.keyBind.mapping.commandString, keyBindRegister.keyDown);
            emit(`${ eventName }:${ keyBindRegister.keyBind.mapping.commandString }`);
        }, keyBindRegister.keyBind.restricted);
    }
};

export default new KeyBinder();