var isInstance = require('is-instance');

function extend(a, b, visitedA, visitedB){
    var aType = typeof a;

    if(aType !== typeof b){
        return b;
    }

    if(a == null || b == null || !(aType === 'object' || aType === 'function')){
        return b;
    }

    if(Array.isArray(a) !== Array.isArray(b)){
        return b;
    }

    var aKeys = Object.keys(a),
        bKeys = Object.keys(b);

    visitedA.add(a);
    visitedB.add(b);

    for(var i = 0; i < bKeys.length; i++){
        var key = bKeys[i];

        if(!(key in b)){
            a[key] = b[key];
            continue;
        }

        if(isInstance(b[key]) && visitedA.has(a[key])){
            if(visitedB.has(b[key])){
                continue;
            }

            a[key] = b[key];
        }

        a[key] = extend(a[key], b[key], visitedA, visitedB);
    }

    return a;
};

module.exports = function(a, b){
    return extend(a, b, new WeakSet(), new WeakSet());
}