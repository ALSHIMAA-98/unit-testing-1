const { createArray } = require("../lab1");

describe("Problem 2", () => {
    // 1 - Test that the return value is of type array
    it("should return a value of array type", () => {
        expect(createArray(1)).toEqual(jasmine.any(Array));
    });

    // 2 - Test if we pass 2 it will return an array of length 2 and test it includes 1
    it("should return an array of length 2 when passing 2 and it includes 1", () => {
        const result = createArray(2);
        expect(result.length).toBe(2);
        expect(result).toContain(1);
    });

    // 3 - Test if we pass 3 it will return an array of length 3 and test it doesn't include 3
    it("should return an array of length 3 when passing 3 and it doesn't include 3", () => {
        const result = createArray(3);
        expect(result.length).toBe(3);
        expect(result).not.toContain(3);
    });
});
