var wohnzimmer = angular.module('Wohnzimmer', ['firebase']);

var OfferCtrl = function($scope, $firebase) {
    var offerRef = new Firebase('https://wohnzimmer.firebaseio.com/offers');
    $scope.offers = $firebase(offerRef);

    $scope.offer = {
        from: 10,
        to: 19
    };

    $scope.addOffer = function() {
        $scope.offers.$add($scope.offer);
        $scope.offer = {
            from: 10,
            to: 19
        };
    }
};

wohnzimmer.filter('range', function() {
    return function(input, min, max) {
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        for(var i=min; i<max; i++) {
            input.push(i);
        }
        return input;
    };
});



// Thanks to http://stackoverflow.com/a/20984017/1761563

wohnzimmer.directive('lowerThan', [
    function() {
        var link = function($scope, $element, $attrs, ctrl) {
            var validate = function(viewValue) {
                var comparisonModel = $attrs.lowerThan;
                if(!viewValue || !comparisonModel){
                    // It's valid because we have nothing to compare against
                    ctrl.$setValidity('lowerThan', true);
                }

                // It's valid if model is lower than the model we're comparing against
                ctrl.$setValidity('lowerThan', parseInt(viewValue, 10) <= parseInt(comparisonModel, 10) );
                return viewValue;
            };

            ctrl.$parsers.unshift(validate);
            ctrl.$formatters.push(validate);

            $attrs.$observe('lowerThan', function(comparisonModel){
                // Whenever the comparison model changes we'll re-validate
                return validate(ctrl.$viewValue);
            });
        };

        return {
        require: 'ngModel',
        link: link
        };
    }
]);
