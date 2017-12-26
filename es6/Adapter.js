const call = (key, ...args) => context => context[key](...args);
Promise.resolve( [ 1, 2, 3 ] ).then( call('map', x => 2 * x ) ).then( console.log ) //[ 2, 4, 6 ]
const map = call.bind(null, 'map');
Promise.resolve( [ 1, 2, 3 ] ).then( map( x => 2 * x ) ).then( console.log ) //[ 2, 4, 6 ]

const collectInto = fn => (...args) => fn(args);
const Pall = collectInto( Promise.all.bind(Promise) )
let p1 = Promise.resolve(1)
let p2 = Promise.resolve(2)
let p3 = new Promise((resolve) => setTimeout(resolve,2000,3))
Pall(p1, p2, p3).then(console.log)
