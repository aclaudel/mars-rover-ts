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

    describe("when oriented to S", () => {
        it("should decrement y in (x,y)", () => {
            const coordinates = engineService.move('1 1', 'S');
            expect(coordinates).toBe('1 0');

            const coordinates2 = engineService.move('2 2', 'S');
            expect(coordinates2).toBe('2 1');
        });
    });

    describe("when oriented to W", () => {
        it("should decrement x in (x,y)", () => {
            const coordinates = engineService.move('1 1', 'W');
            expect(coordinates).toBe('0 1');

            const coordinates2 = engineService.move('2 2', 'W');
            expect(coordinates2).toBe('1 2');
        });
    });
});