import App, {Position} from "./App";
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
        const initialPosition:Position = {
            coordinates: '0 0',
            orientation: 'N'
        };

        beforeEach(() => {
            reset(steeringServiceMock);
        });

        it("should turn right when 'R' is received", () => {
            const nextOrientation = 'E';
            when(steeringServiceMock.turnRight('N'))
                .thenReturn(nextOrientation);

            const finalPosition = app.start(initialPosition, ['R']);

            verify(steeringServiceMock.turnRight('N')).once();
            expect(finalPosition.orientation).toBe(nextOrientation);
        });

        it("should turn right when 'L' is received", () => {
            const nextOrientation = 'W';
            when(steeringServiceMock.turnLeft('N'))
                .thenReturn(nextOrientation);

            const finalPosition = app.start(initialPosition, ['L']);

            verify(steeringServiceMock.turnLeft('N')).once();
            expect(finalPosition.orientation).toBe(nextOrientation);
        });
    });
});
