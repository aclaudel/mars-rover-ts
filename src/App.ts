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
            switch (commands[i]) {
                case 'R':
                    currentOrientation = this.steeringService.turnRight(currentOrientation);
                    break;
                case 'L':
                    currentOrientation = this.steeringService.turnLeft(currentOrientation);
                    break;
                default: throw new Error('not implemented');
            }
        }

        return {
            ...initialPosition,
            orientation: currentOrientation
        };
    }
}

