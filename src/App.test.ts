import App from "./App";
import {instance, mock, verify} from "ts-mockito";
import SteeringService from "./steering/SteeringService";

describe("Mars rover", () => {
    describe("acceptance test", () => {
        it("should move forward and turn around", () => {
            const app = new App(new SteeringService());

            const finalLocation = app.start('0 0 ', 'N', ['M', 'R', 'M']);

            expect(finalLocation).toBe('1 1 E');
        });
    });
    describe("unit test", () => {
        it("should turn right when 'R' is received", () => {
            const steeringServiceMock = mock(SteeringService);
            const app = new App(instance(steeringServiceMock));

            app.start('0 0', 'N', ['R']);

            verify(steeringServiceMock.turnRight('N')).called();
        });
    });
});
