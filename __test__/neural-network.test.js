import NeuralNetwork from "../neural-network.js";

describe("NN instantiation", () => {
    const inputs1 = 1;
    const outputs1 = 1;
    const inputs2 = 10;
    const outputs2 = 15;
    const nn1 = new NeuralNetwork(inputs1, outputs1);
    const nn2 = new NeuralNetwork(inputs2, outputs2);
    const min = -1;
    const max = 1;
    test("is NN object", () => {
        expect(nn1).toBeInstanceOf(NeuralNetwork);
    });
    test("has 1 level", () => {
        expect(Array.isArray(nn1.levels)).toBe(true);
        expect(nn1.levels.length).toBe(1);
    });
    test("level has correct properties", () => {
        expect(Array.isArray(nn1.levels[0].inputs)).toBe(true);
        expect(Array.isArray(nn1.levels[0].outputs)).toBe(true);
        expect(Array.isArray(nn1.levels[0].biases)).toBe(true);
        expect(Array.isArray(nn1.levels[0].weights)).toBe(true);
        expect(Array.isArray(nn1.levels[0].weights[0])).toBe(true);
    });
    test("inputs and outputs have correct size", () => {
        expect(nn1.levels[0].inputs.length).toBe(1);
        expect(nn1.levels[0].outputs.length).toBe(1);
    });
    test("biases and weights are in correct range", () => {
        expect(nn1.levels[0].biases[0]).toBeGreaterThanOrEqual(min);
        expect(nn1.levels[0].biases[0]).toBeLessThanOrEqual(max);
        expect(nn1.levels[0].weights[0][0]).toBeGreaterThanOrEqual(min);
        expect(nn1.levels[0].weights[0][0]).toBeLessThanOrEqual(max);
    });
    test("works for larger number of inputs and outputs", () => {
        expect(nn2).toBeInstanceOf(NeuralNetwork);
        expect(Array.isArray(nn2.levels)).toBe(true);
        expect(nn2.levels.length).toBe(1);
        expect(Array.isArray(nn2.levels[0].inputs)).toBe(true);
        expect(nn2.levels[0].inputs.length).toBe(inputs2);
        expect(Array.isArray(nn2.levels[0].outputs)).toBe(true);
        expect(nn2.levels[0].outputs.length).toBe(outputs2);
        expect(Array.isArray(nn2.levels[0].biases)).toBe(true);
        expect(nn2.levels[0].biases.length).toBe(outputs2);
        expect(nn2.levels[0].biases.every(a => a >= min && a <= max));
        expect(Array.isArray(nn2.levels[0].weights)).toBe(true);
        expect(nn2.levels[0].weights.length).toBe(inputs2);
        expect(nn2.levels[0].weights.every(a => Array.isArray(a))).toBe(true);
        expect(nn2.levels[0].weights.every(a => a.length === outputs2)).toBe(true);
        expect(nn2.levels[0].weights.every(a => a.every(b => b >= min && b <= max))).toBe(true);
    });
});