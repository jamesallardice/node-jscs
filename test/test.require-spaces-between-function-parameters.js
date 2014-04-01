var Checker = require('../lib/checker');
var assert = require('assert');

describe('rules/require-spaces-between-function-parameters', function() {
    var checker;

    beforeEach(function() {
        checker = new Checker();
        checker.registerDefaultRules();
        checker.configure({ requireSpacesBetweenFunctionParameters: true });
    });

    it('should report one missing space for function a(b,c) {}', function() {
        assert(checker.checkString('function a(b,c) {}').getErrorCount() === 1);
    });

    it('should report two missing spaces for function a(b,c,d) {}', function() {
        assert(checker.checkString('function a(b,c,d) {}').getErrorCount() === 2);
    });

    it('should report one missing space for function a(b, c,d) {}', function() {
        assert(checker.checkString('function a(b,c) {}').getErrorCount() === 1);
    });

    it('should report one missing space for function a(b,c, d) {}', function() {
        assert(checker.checkString('function a(b,c) {}').getErrorCount() === 1);
    });

    it('should not report missing spaces for function a(b, c) {}', function() {
        assert(checker.checkString('function a(b, c) {}').isEmpty());
    });

    it('should not report missing spaces for function a(b, c, d) {}', function() {
        assert(checker.checkString('function a(b, c, d) {}').isEmpty());
    });

});
