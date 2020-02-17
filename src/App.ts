import SteeringService from "./steering/SteeringService";
import EngineService from "./engine/EngineService";

export type Turn = 'R' | 'L';
export type Command = 'M' | Turn;
export type Commands = Command[];
export type Orientation = 'N' | 'E' | 'W' | 'S';

export type Position = {
    coordinates: string;
    orientation: Orientation
}

export default class App {
    private steeringService: SteeringService;
    private engineService: EngineService;

    constructor(steeringService: SteeringService, engineService: EngineService) {
        this.steeringService = steeringService;
        this.engineService = engineService;
    }

    start(initialPosition: Position, commands: Commands): Position {
        let currentOrientation = initialPosition.orientation;
        let currentCoordinates = initialPosition.coordinates;

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            switch (command) {
                case "M":
                    currentCoordinates = this.engineService.move(currentCoordinates, currentOrientation);
                    break;
                case 'R':
                    currentOrientation = this.steeringService.turnRight(currentOrientation);
                    break;
                case 'L':
                    currentOrientation = this.steeringService.turnLeft(currentOrientation);
                    break;
            }
    }

        return {
            coordinates: currentCoordinates,
            orientation: currentOrientation
        };
    }
}

