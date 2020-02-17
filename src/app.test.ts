import start from "./app";

describe("Mars rover", () => {
    it("should move forward twice", () => {
        const finalLocation = start('0 0 N', ['F']);
        expect(finalLocation).toBe('1 0 N');
    });
});
