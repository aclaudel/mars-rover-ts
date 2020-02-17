import SteeringService from "./steering/SteeringService";

export type Turn = 'R' | 'L';
export type Command = 'M' | Turn;
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
            const command = commands[i];
            switch (command) {
                case "M": throw new Error('not yet implemented');
                default: currentOrientation = this.getNextOrientation(currentOrientation, command);
            }
        }

        return {
            ...initialPosition,
            orientation: currentOrientation
        };
    }

    private getNextOrientation(currentOrientation: Orientation, command: Turn) {
        switch (command) {
            case 'R':
                return this.steeringService.turnRight(currentOrientation);
            case 'L':
                return this.steeringService.turnLeft(currentOrientation);
        }
    }
}

