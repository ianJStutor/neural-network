export default class NeuralNetwork {
    constructor(...neuronCounts) {
        this.shape = neuronCounts;
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(network, givenInputs) {
        let outputs = Level.feedForward(network.levels[0], givenInputs);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(network.levels[i], outputs);
        }
        return outputs;
    }

    static mutate(network, amount = 1) {
        network.levels.forEach((level) => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = NeuralNetwork.lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                );
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = NeuralNetwork.lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    );
                }
            }
        });
    }

    static toString(network) {
        return JSON.stringify({
            shape: network.shape,
            levels: network.levels.map(Level.toString)
        });
    }

    static fromString(str) {
        const { shape, levels } = JSON.parse(str);
        const network = new NeuralNetwork(...shape);
        for (let i=0; i<levels.length; i++) {
            network.levels[i] = Level.fromString(levels[i]);
        }
        return network;
    }

    static lerp(a, b, t) {
        return a + (b - a) * t;
    }
}

class Level {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomize(this);
    }

    static #randomize(level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(level, givenInputs) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            level.outputs[i] = sum > level.biases[i] ? 1 : 0;
        }

        return level.outputs;
    }

    static toString(level) {
        return JSON.stringify({
            inputs: level.inputs.map(() => (null)),
            outputs: level.outputs.map(() => (null)),
            weights: level.weights,
            biases: level.biases
        });
    }

    static fromString(str) {
        const { inputs, outputs, weights, biases } = JSON.parse(str);
        const level = new Level(inputs.length, outputs.length);
        level.weights = weights;
        level.biases = biases;
        return level;
    }
}
