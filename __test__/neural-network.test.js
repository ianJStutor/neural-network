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
        expect(Array.isArray(nn1.levels[0].inputs[0])).toBeFalsy();
        expect(Array.isArray(nn1.levels[0].outputs)).toBe(true);
        expect(Array.isArray(nn1.levels[0].outputs[0])).toBeFalsy();
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
        expect(nn2.levels[0].inputs.every(a => !Boolean(a))).toBe(true);
        expect(Array.isArray(nn2.levels[0].outputs)).toBe(true);
        expect(nn2.levels[0].outputs.length).toBe(outputs2);
        expect(nn2.levels[0].outputs.every(a => !Boolean(a))).toBe(true);
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

describe("NN feed forward", () => {
    const inputs = 1;
    const outputs = 1;
    const nn = new NeuralNetwork(inputs, outputs);
    test("returns zero or one", () => {
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
        expect([0,1].includes(NeuralNetwork.feedForward(nn, [Math.random()*2-1])[0])).toBe(true);
    });
    test("returns the same output for the same input", () => {
        const input = Math.random()*2-1;
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
        expect(NeuralNetwork.feedForward(nn, [input])[0] === NeuralNetwork.feedForward(nn, [input])[0]).toBe(true);
    });
});

describe("NN mutation", () => {
    const inputs = 1;
    const outputs = 1;
    const nn = new NeuralNetwork(inputs, outputs);
    test("does not mutate values with zero amount", () => {
        const bias = nn.levels[0].biases[0];
        const weight = nn.levels[0].weights[0][0];
        NeuralNetwork.mutate(nn, 0);
        expect(nn.levels[0].biases[0] === bias).toBe(true);
        expect(nn.levels[0].weights[0][0] === weight).toBe(true);
    });
    test("mutates values with nonzero amount", () => {
        const bias = nn.levels[0].biases[0];
        const weight = nn.levels[0].weights[0][0];
        NeuralNetwork.mutate(nn);
        expect(nn.levels[0].biases[0] !== bias).toBe(true);
        expect(nn.levels[0].weights[0][0] !== weight).toBe(true);
    });
});

describe("NN serialization and cloning", () => {
    const shape = [2,3,4];
    const nn = new NeuralNetwork(...shape);
    test("stringifies to valid JSON", () => {
        const str = NeuralNetwork.toString(nn);
        const obj = JSON.parse(str);
        expect(typeof str === 'string').toBe(true);
        expect(obj).toHaveProperty("shape");
        expect(obj).toHaveProperty("levels");
    });
    test("parses into exact clone", () => {
        const str = NeuralNetwork.toString(nn);
        const nnClone = NeuralNetwork.fromString(str);
        const nnCloneStr = NeuralNetwork.toString(nnClone);
        const inputs = [Math.random()*2-1, Math.random()*2-1];
        const nnOutputs = JSON.stringify(NeuralNetwork.feedForward(nn, inputs));
        const nnCloneOutputs = JSON.stringify(NeuralNetwork.feedForward(nnClone, inputs));
        expect(str === nnCloneStr).toBe(true);
        expect(nnOutputs === nnCloneOutputs).toBe(true);
    });
    test("direct clone functionality works", () => {
        const str = NeuralNetwork.toString(nn);
        const nnClone = NeuralNetwork.clone(nn);
        const nnCloneStr = NeuralNetwork.toString(nnClone);
        expect(str === nnCloneStr).toBe(true);
    });
});