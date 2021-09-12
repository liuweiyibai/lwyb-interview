'use strict';

var _marked = regeneratorRuntime.mark(read);

function read() {
    var a, b;
    return regeneratorRuntime.wrap(function read$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    console.log(1);
                    _context.next = 3;
                    return '珠峰';//结束了

                case 3:
                    a = _context.sent; // next('参数')

                    console.log(a);
                    _context.next = 7;
                    return 9;

                case 7:
                    b = _context.sent; //next(value)

                    console.log(b);
                    return _context.abrupt('return', b);

                case 10:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}