import NeuralNetwork from "../neural-network.js";

describe("NN instantiation", () => {
    const inputs = 1;
    const outputs = 1;
    const nn = new NeuralNetwork(inputs, outputs);
    test("is NN object", () => {
        expect(nn).toBeInstanceOf(NeuralNetwork);
    });
});