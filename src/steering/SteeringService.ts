import {Orientation} from "../App";

export default class SteeringService {

    turnRight(currentOrientation: Orientation): Orientation {
        switch (currentOrientation) {
            case "N": return "E";
            case "E": return "S";
            case "S": return "W";
            case "W": return "N";
        }
    }

    turnLeft(currentOrientation: Orientation): Orientation {
        switch (currentOrientation) {
            case "N": return "W";
            case "W": return "S";
            case "S": return "E";
            case "E": return "N";
        }
    }
}