import SteeringService from "./SteeringService";
import {Orientation} from "../App";

describe("Steering service", () => {
    const steeringService = new SteeringService();

    function turnRightAndAssert(initialOrientation: Orientation, expectedOrientation: Orientation) {
        expect(steeringService.turnRight(initialOrientation)).toBe(expectedOrientation);
    }

    function turnLeftAndAssert(initialOrientation: Orientation, expectedOrientation: Orientation) {
        expect(steeringService.turnLeft(initialOrientation)).toBe(expectedOrientation);
    }

    it("should turn right", () => {
        turnRightAndAssert('N', 'E');
        turnRightAndAssert('E', 'S');
        turnRightAndAssert('S', 'W');
        turnRightAndAssert('W', 'N');
    });

    it("should turn left", () => {
        turnLeftAndAssert('N', 'W');
        turnLeftAndAssert('W', 'S');
        turnLeftAndAssert('S', 'E');
        turnLeftAndAssert('E', 'N');
    });
});