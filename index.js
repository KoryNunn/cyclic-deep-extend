function extend(a, b, visited){
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

    if(!visited){
        visited = new Set();
    }

    for(var i = 0; i < bKeys.length; i++){
        var key = bKeys[i];

        if(!(key in b)){
            a[key] = b[key];
            continue;
        }

        if(visited.has(b[key])){
            return b;
        }

        visited.add(b[key]);

        a[key] = extend(a[key], b[key], visited);
    }

    return a;
};

module.exports = function(a, b){
    return extend(a, b);
}