import EngineService from "./EngineService";

describe("Engine service", () => {
    const engineService = new EngineService();

    describe("when oriented to N", () => {
        it("should increment y in (x,y)", () => {
            const coordinates = engineService.move('0 0', 'N');
            expect(coordinates).toBe('0 1');
        });
    });

    describe("when oriented to E", () => {
        it("should increment x in (x,y)", () => {
            const coordinates = engineService.move('1 1', 'E');
            expect(coordinates).toBe('2 1');

            const coordinates2 = engineService.move('2 2', 'E');
            expect(coordinates2).toBe('3 2');
        });
    });
});