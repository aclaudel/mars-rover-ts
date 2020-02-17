import {Orientation} from "../App";

export default class EngineService {

    move(coordinates: string, orientation: Orientation): string {
        const tokens = coordinates.split(' ');
        const x = parseInt(tokens[0]);
        const y = parseInt(tokens[1]);

        switch (orientation) {
            case "E": return EngineService.format(x+1, y);
            case "S": return EngineService.format(x, y-1);
            case "W": return EngineService.format(x-1, y);
            case "N": return EngineService.format(x, y+1);
        }
    }

    private static format(x, y) {
        return `${x} ${y}`;
    }
}