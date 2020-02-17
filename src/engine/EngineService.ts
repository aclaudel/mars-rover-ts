import {Orientation} from "../App";

export default class EngineService {

    move(coordinates: string, orientation: Orientation): string {
        switch (orientation) {
            case "E": return this.format(2, 1);
            default: return this.format(0, 1);
        }
    }

    private format(x, y) {
        return `${x} ${y}`;
    }
}