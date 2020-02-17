import {Orientation} from "../App";

export default class EngineService {

    move(coordinates: string, orientation: Orientation): string {
        const tokens = coordinates.split(' ');
        const x = parseInt(tokens[0]);
        const y = parseInt(tokens[1]);

        switch (orientation) {
            case "E": return this.format(x+1, y);
            default: return this.format(x, y+1);
        }
    }

    private format(x, y) {
        return `${x} ${y}`;
    }
}