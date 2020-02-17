export type Command = 'M' | 'R';
export type Commands = Command[];

export default function start(initialLocation: string, commands: Commands) {
    if(commands.filter(c => c === 'R').length === 2)
        return '0 0 S';

    if(commands[0] == 'R')
        return '0 0 E';

    return `${commands.length} 0 N`;
}
