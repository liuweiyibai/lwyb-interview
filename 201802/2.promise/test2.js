'use strict';

var r = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var content1, content2;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return read('./2.promise/100.txt', 'utf8');

                    case 3:
                        content1 = _context.sent;
                        _context.next = 6;
                        return read(content1, 'utf8');

                    case 6:
                        content2 = _context.sent;
                        return _context.abrupt('return', content2);

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);
                        // 如果出错会catch
                        console.log('err', _context.t0);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 10]]);
    }));

    return function r() {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    // it.next(arg)  {value,done}
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error); return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            } 
            return step("next");
        });
    };
}