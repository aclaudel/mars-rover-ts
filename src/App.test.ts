import App, {Orientation, Position} from "./App";
import {instance, mock, reset, verify, when} from "ts-mockito";
import SteeringService from "./steering/SteeringService";

describe("Mars rover", () => {
    describe("acceptance test", () => {
        it("should move forward and turn around", () => {
            const app = new App(new SteeringService());
            const initialPosition:Position = {
                coordinates: '0 0',
                orientation: 'N'
            };
            const finalLocation = app.start(initialPosition, ['M', 'R', 'M']);

            expect(finalLocation).toBe('1 1 E');
        });
    });
    describe("unit test", () => {
        const steeringServiceMock = mock(SteeringService);
        const app = new App(instance(steeringServiceMock));
        const initalOrientation = 'N';
        const initialPosition:Position = {
            coordinates: '0 0',
            orientation: initalOrientation
        };

        beforeEach(() => {
            reset(steeringServiceMock);
        });

        function setup_turn_right_of_steering_service(currentOrientation: Orientation, nextOrientation: Orientation) {
            when(steeringServiceMock.turnRight(currentOrientation))
                .thenReturn(nextOrientation);
        }

        function setup_turn_left_of_steering_service(currentOrientation: Orientation, nextOrientation: Orientation) {
            when(steeringServiceMock.turnLeft(currentOrientation))
                .thenReturn(nextOrientation);
        }

        it("should turn right when 'R' is received", () => {
            const nextOrientation = 'E';
            setup_turn_right_of_steering_service(initalOrientation, nextOrientation);

            const finalPosition = app.start(initialPosition, ['R']);

            verify(steeringServiceMock.turnRight(initalOrientation)).once();
            expect(finalPosition.orientation).toBe(nextOrientation);
        });

        it("should turn right when 'L' is received", () => {
            const nextOrientation = 'W';
            setup_turn_left_of_steering_service(initalOrientation, nextOrientation);

            const finalPosition = app.start(initialPosition, ['L']);

            verify(steeringServiceMock.turnLeft(initalOrientation)).once();
            expect(finalPosition.orientation).toBe(nextOrientation);
        });

        it("should be able to turn right multiple times", () => {
            const intermediateOrientation = 'E';
            const finalOrientation = 'S';
            setup_turn_right_of_steering_service(initalOrientation, intermediateOrientation);
            setup_turn_right_of_steering_service(intermediateOrientation, finalOrientation);

            const finalPosition = app.start(initialPosition, ['R', 'R']);

            verify(steeringServiceMock.turnRight(initalOrientation)).once();
            verify(steeringServiceMock.turnRight(intermediateOrientation)).once();

            expect(finalPosition.orientation).toBe(finalOrientation);
        });

        it("should be able to turn right and left", () => {
            const intermediateOrientation = 'E';
            const finalOrientation = 'N';
            setup_turn_right_of_steering_service(initalOrientation, intermediateOrientation);
            setup_turn_left_of_steering_service(intermediateOrientation, finalOrientation);

            const finalPosition = app.start(initialPosition, ['R', 'L']);

            verify(steeringServiceMock.turnRight(initalOrientation)).once();
            verify(steeringServiceMock.turnLeft(intermediateOrientation)).once();

            expect(finalPosition.orientation).toBe(finalOrientation);
        });
    });
});
