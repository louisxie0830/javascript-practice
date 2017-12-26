'use strict';

var call = function call(key) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return function (context) {
    return context[key].apply(context, args);
  };
};
Promise.resolve([1, 2, 3]).then(call('map', function (x) {
  return 2 * x;
})).then(console.log); //[ 2, 4, 6 ]
var map = call.bind(null, 'map');
Promise.resolve([1, 2, 3]).then(map(function (x) {
  return 2 * x;
})).then(console.log); //[ 2, 4, 6 ]

var collectInto = function collectInto(fn) {
  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fn(args);
  };
};
var Pall = collectInto(Promise.all.bind(Promise));
var p1 = Promise.resolve(1);
var p2 = Promise.resolve(2);
var p3 = new Promise(function (resolve) {
  return setTimeout(resolve, 2000, 3);
});
Pall(p1, p2, p3).then(console.log);