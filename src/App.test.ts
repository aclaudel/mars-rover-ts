import App, {Orientation, Position} from "./App";
import {instance, mock, reset, verify, when} from "ts-mockito";
import SteeringService from "./steering/SteeringService";
import EngineService from "./engine/EngineService";

describe("Mars rover", () => {
    describe("acceptance test", () => {
        it("should move forward and turn around", () => {
            const app = new App(new SteeringService(), new EngineService());
            const initialPosition: Position = {
                coordinates: '0 0',
                orientation: 'N'
            };
            const finalLocation = app.start(initialPosition, ['M', 'R', 'M']);

            expect(finalLocation).toBe('1 1 E');
        });
    });
    describe("unit test", () => {
        const steeringServiceMock = mock(SteeringService);
        const engineServiceMock = mock(EngineService);
        const app = new App(instance(steeringServiceMock), instance(engineServiceMock));

        const initialOrientation = 'N';
        const initialPosition: Position = {
            coordinates: '0 0',
            orientation: initialOrientation
        };

        beforeEach(() => {
            reset(steeringServiceMock);
        });

        describe("steering feature", () => {
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
                setup_turn_right_of_steering_service(initialOrientation, nextOrientation);

                const finalPosition = app.start(initialPosition, ['R']);

                verify(steeringServiceMock.turnRight(initialOrientation)).once();
                expect(finalPosition.orientation).toBe(nextOrientation);
            });

            it("should turn right when 'L' is received", () => {
                const nextOrientation = 'W';
                setup_turn_left_of_steering_service(initialOrientation, nextOrientation);

                const finalPosition = app.start(initialPosition, ['L']);

                verify(steeringServiceMock.turnLeft(initialOrientation)).once();
                expect(finalPosition.orientation).toBe(nextOrientation);
            });

            it("should be able to turn right multiple times", () => {
                const intermediateOrientation = 'E';
                const finalOrientation = 'S';
                setup_turn_right_of_steering_service(initialOrientation, intermediateOrientation);
                setup_turn_right_of_steering_service(intermediateOrientation, finalOrientation);

                const finalPosition = app.start(initialPosition, ['R', 'R']);

                verify(steeringServiceMock.turnRight(initialOrientation)).once();
                verify(steeringServiceMock.turnRight(intermediateOrientation)).once();

                expect(finalPosition.orientation).toBe(finalOrientation);
            });

            it("should be able to turn right and left", () => {
                const intermediateOrientation1 = 'E';
                const intermediateOrientation2 = 'W';
                const finalOrientation = 'S';
                setup_turn_right_of_steering_service(initialOrientation, intermediateOrientation1);
                setup_turn_left_of_steering_service(intermediateOrientation1, intermediateOrientation2);
                setup_turn_right_of_steering_service(intermediateOrientation2, finalOrientation);

                const finalPosition = app.start(initialPosition, ['R', 'L', 'R']);

                verify(steeringServiceMock.turnRight(initialOrientation)).once();
                verify(steeringServiceMock.turnLeft(intermediateOrientation1)).once();
                verify(steeringServiceMock.turnRight(intermediateOrientation2)).once();

                expect(finalPosition.orientation).toBe(finalOrientation);
            });
        });
        describe("moving feature", () => {
            it("should move forward when 'M' command is received", () => {
                const finalCoordinates = '1 0';
                when(engineServiceMock.move(initialPosition.coordinates))
                    .thenReturn(finalCoordinates);

                const finalPosition = app.start(initialPosition, ['M']);

                verify(engineServiceMock.move(initialPosition.coordinates)).called();
                expect(finalPosition.coordinates).toBe(finalCoordinates);
            });
        });
    });
});
