// /**
//  * https://webpack.github.io/docs/context.html
//  * load each test file into the webpack context

var context = require.context('./test/components', true, /-test/);
context.keys().forEach(context);
