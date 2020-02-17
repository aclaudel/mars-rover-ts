import SteeringService from "./steering/SteeringService";

export type Command = 'M' | 'R' | 'L';
export type Commands = Command[];

export default class App {
    steeringService: SteeringService;

    constructor(steeringService: SteeringService) {
        this.steeringService = steeringService;
    }

    start(
        initialCoordinates: string,
        initOrientation: string,
        commands: Commands) {
        this.steeringService.turnRight('N');
        this.steeringService.turnLeft('N');
    }
}

