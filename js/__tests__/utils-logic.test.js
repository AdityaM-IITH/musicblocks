// Copyright (c) 2026 Aditya Mishra
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the The GNU Affero General Public
// License as published by the Free Software Foundation; either
// version 3 of the License, or (at your option) any later version.
//
// You should have received a copy of the GNU Affero General Public
// License along with this library; if not, write to the Free Software
// Foundation, 51 Franklin Street, Suite 500 Boston, MA 02110-1335 USA

/* global describe, it, expect */

const UtilsLogic = require("../utils/utils-logic");

describe("UtilsLogic", () => {
    describe("GCD (Greatest Common Divisor)", () => {
        it("calculates GCD of two positive numbers", () => {
            expect(UtilsLogic.GCD(48, 18)).toBe(6);
            expect(UtilsLogic.GCD(7, 3)).toBe(1);
        });

        it("handles negative numbers properly", () => {
            expect(UtilsLogic.GCD(-48, 18)).toBe(6);
            expect(UtilsLogic.GCD(48, -18)).toBe(6);
            expect(UtilsLogic.GCD(-48, -18)).toBe(6);
        });
    });

    describe("LCD (Least Common Denominator)", () => {
        it("calculates LCD correctly", () => {
            expect(UtilsLogic.LCD(4, 6)).toBe(12);
            expect(UtilsLogic.LCD(21, 6)).toBe(42);
        });
    });

    describe("rationalToFraction", () => {
        it("converts a decimal to a fraction array", () => {
            expect(UtilsLogic.rationalToFraction(0.5)).toEqual([1, 2]);
            expect(UtilsLogic.rationalToFraction(0.75)).toEqual([3, 4]);
            expect(UtilsLogic.rationalToFraction(0.33333333)).toEqual([1, 3]);
        });

        it("handles whole numbers", () => {
            expect(UtilsLogic.rationalToFraction(1)).toEqual([1, 1]);
            expect(UtilsLogic.rationalToFraction(5)).toEqual([5, 1]);
        });

        it("returns [0, 1] for 0, NaN, or Infinity", () => {
            expect(UtilsLogic.rationalToFraction(0)).toEqual([0, 1]);
            expect(UtilsLogic.rationalToFraction(NaN)).toEqual([0, 1]);
            expect(UtilsLogic.rationalToFraction(Infinity)).toEqual([0, 1]);
        });
    });

    describe("rationalSum", () => {
        it("adds two fractions and returns [numerator, denominator] against LCD", () => {
            // 1/2 + 1/4 = 3/4
            expect(UtilsLogic.rationalSum([1, 2], [1, 4])).toEqual([3, 4]);

            // 1/3 + 1/6 = 3/6 (does not simplify in the logic)
            expect(UtilsLogic.rationalSum([1, 3], [1, 6])).toEqual([3, 6]);
        });

        it("handles fallback to [0, 1] on invalid input", () => {
            expect(UtilsLogic.rationalSum(null, [1, 2])).toEqual([0, 1]);
            expect(UtilsLogic.rationalSum([1, 0], [1, 2])).toEqual([0, 1]); // zero denominator
        });
    });

    describe("mixedNumber", () => {
        it("converts numbers to mixed fraction string", () => {
            expect(UtilsLogic.mixedNumber(1.5)).toBe("1 1/2");
            expect(UtilsLogic.mixedNumber(0.75)).toBe("3/4");
            expect(UtilsLogic.mixedNumber(2)).toBe("2/1");
        });

        it("returns original value if not a number", () => {
            expect(UtilsLogic.mixedNumber("hello")).toBe("hello");
        });
    });

    describe("deepClone", () => {
        it("clones nested objects and arrays safely", () => {
            const original = { a: 1, b: [2, 3], c: { d: 4 } };
            const cloned = UtilsLogic.deepClone(original);

            expect(cloned).toEqual(original);
            expect(cloned).not.toBe(original);
            expect(cloned.b).not.toBe(original.b);
            expect(cloned.c).not.toBe(original.c);
        });

        it("returns primitives as-is", () => {
            expect(UtilsLogic.deepClone(null)).toBe(null);
            expect(UtilsLogic.deepClone(42)).toBe(42);
            expect(UtilsLogic.deepClone("string")).toBe("string");
        });
    });

    describe("safeJSONParse", () => {
        it("parses valid JSON string", () => {
            expect(UtilsLogic.safeJSONParse('{"a":1}')).toEqual({ a: 1 });
        });

        it("returns fallback on invalid JSON", () => {
            expect(UtilsLogic.safeJSONParse("invalid", { fallback: true })).toEqual({
                fallback: true
            });
            expect(UtilsLogic.safeJSONParse(null)).toBe(null);
        });
    });

    describe("rgbToHex / hexToRGB / hex2rgb", () => {
        it("converts RGB to Hex", () => {
            expect(UtilsLogic.rgbToHex(255, 0, 0)).toBe("#ff0000");
            expect(UtilsLogic.rgbToHex(0, 255, 0)).toBe("#00ff00");
        });

        it("converts Hex to RGB", () => {
            expect(UtilsLogic.hexToRGB("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
            expect(UtilsLogic.hexToRGB("00ff00")).toEqual({ r: 0, g: 255, b: 0 });
        });

        it("converts Hex to RGBA string", () => {
            expect(UtilsLogic.hex2rgb("ff0000")).toBe("rgba(255,0,0,1)");
        });
    });
});
