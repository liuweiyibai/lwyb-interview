// exports = 1;


// -------------
module.exports = 1;
exports.a = 1; // 相当于在exports对象上增加了一个属性

/*
    (function(exports,require,module,__dirname,__filename){
        this = module.exports;
        console.log('加载');
        module.exports = 'zfpx'; 
    })({},req,{filename,exports:{}})

*/