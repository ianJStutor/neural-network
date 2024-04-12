# Neural Network

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Description

Toy neural network, not optimized for speed, but perfect for game AIs, demo projects, or education. Fully connected, feed-forward artificial neural network. Output is clamped to either zero or one. No backpropagation is currently provided, but a basic genetic mutation algorithm is implemented.

## Testing

```bash
npm test
```

Provided testing uses Jest on a Node environment. Please note that special configuration has been made for Node and for Jest to both use ECMAScript modules (<code>import</code> instead of the Common.js <code>require()</code>).

The following was inserted into <code>package.json</code> for testing to work.

```json
"type": "module",
"jest": {
    "transform": {}
},
"scripts": {
  "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
}
```

## Usage

Include <code>neural-network.js</code> in your project.

```js
import NeuralNetwork from "./neural-network.js";
```

Import the JS into your main JavaScript file and call <code>new NeuralNetwork(args)</code>, where <code>args</code> is a comma-separated list of inputs and outputs needed for the network. For example:

*   ```js
    const nn = new NeuralNetwork(2, 3);
    ```
    This produces a network with two inputs and three outputs.

*   ```js
    const nn = new NeuralNetwork(2, 3, 4);
    ```
    This produces a network with two inputs, four outputs, and three nodes on a single hidden layer.

Using the network makes use of static methods, which simplifies serialization since instance methods cannot be converted to JSON.

```js
const nn = new NeuralNetwork(2, 3, 1);
const inputs = [1, -1];
const output = NeuralNetwork.feedForward(nn, inputs); //either [0] or [1]
```