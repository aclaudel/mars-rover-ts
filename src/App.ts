import SteeringService from "./steering/SteeringService";

export type Command = 'M' | 'R' | 'L';
export type Commands = Command[];
export type Orientation = 'N' | 'E' | 'W' | 'S';

export type Position = {
    coordinates: string;
    orientation: Orientation
}

export default class App {
    steeringService: SteeringService;

    constructor(steeringService: SteeringService) {
        this.steeringService = steeringService;
    }

    start(initialPosition: Position, commands: Commands): Position {
        let currentOrientation = initialPosition.orientation;

        for (let i = 0; i < commands.length; i++) {
            currentOrientation = this.getNextOrientation(currentOrientation, commands[i]);
        }

        return {
            ...initialPosition,
            orientation: currentOrientation
        };
    }

    private getNextOrientation(currentOrientation: Orientation, command: Command) {
        switch (command) {
            case 'R':
                return this.steeringService.turnRight(currentOrientation);
            case 'L':
                return this.steeringService.turnLeft(currentOrientation);
            default: throw new Error('not implemented');
        }
    }
}

