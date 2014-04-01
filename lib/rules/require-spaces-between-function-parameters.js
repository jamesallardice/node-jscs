var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {

    configure: function(spacesBetweenParams) {
        assert(
            typeof spacesBetweenParams === 'boolean',
            'requireSpacesBetweenFunctionParameters option requires boolean value'
        );
        assert(
            spacesBetweenParams === true,
            'requireSpacesBetweenFunctionParameters option requires true value or should be removed'
        );
    },

    getOptionName: function() {
        return 'requireSpacesBetweenFunctionParameters';
    },

    check: function(file, errors) {
        var tokens = file.getTokens();
        file.iterateNodesByType([ 'FunctionDeclaration', 'FunctionExpression' ], function(node) {

            node.params.forEach(function(param) {

                var paramTokenPos = file.getTokenPosByRangeStart(param.range[0]);
                var punctuatorToken = tokens[paramTokenPos + 1];

                if (punctuatorToken.value === ",") {

                    var nextParamToken = tokens[paramTokenPos + 2];

                    if (nextParamToken.range[0] === punctuatorToken.range[1]) {
                        errors.add(
                            'Missing space before function parameter \'' + nextParamToken.value + '\'',
                            nextParamToken.loc.start
                        );
                    }
                }
            });
        });
    }

};
