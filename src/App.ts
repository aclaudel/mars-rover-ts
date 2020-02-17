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

        for(const command in commands) {
            if(commands[0] === 'R')
                currentOrientation = this.steeringService.turnRight(currentOrientation);
            else
                currentOrientation = this.steeringService.turnLeft(currentOrientation);
        }

        return {
            ...initialPosition,
            orientation: currentOrientation
        };
    }
}

