import start, {Commands} from "./app";

function startAndAssert(initialLocation: string,
                        commands: Commands,
                        expectedFinalLocation: string) {
    const finalLocation = start(initialLocation, commands);
    expect(finalLocation).toBe(expectedFinalLocation);
}

describe("Mars rover", () => {
    it("should move forward", () => {
        startAndAssert('0 0 N', ['M'], '1 0 N');
        startAndAssert('0 0 N', ['M', 'M'], '2 0 N');
    });

    it("should turn right", () => {
        startAndAssert('0 0 N', ['R'], '0 0 E');
        startAndAssert('0 0 N', ['R', 'R'], '0 0 S');
    });
});
