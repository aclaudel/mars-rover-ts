import start from "./app";

describe("Mars rover", () => {
    it("should move forward", () => {
        let finalLocation;
        finalLocation = start('0 0 N', ['M']);
        expect(finalLocation).toBe('1 0 N');

        finalLocation = start('0 0 N', ['M', 'M']);
        expect(finalLocation).toBe('2 0 N');
    });
});
