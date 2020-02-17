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
        let nextOrientation: Orientation;

        if(commands[0] === 'R')
            nextOrientation = this.steeringService.turnRight('N');
        else
            nextOrientation = this.steeringService.turnLeft('N');

        return {
            ...initialPosition,
            orientation: nextOrientation
        };
    }
}

