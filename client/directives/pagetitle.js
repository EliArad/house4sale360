app.directive('pageTitle', function() {
    return {
        restrict: 'EA',
        link: function($scope, $element) {
            var el = $element[0];
            el.hidden = true; // So the text not actually visible on the page

            var text = function() {
                return el.innerHTML;
            };
            var setTitle = function(title) {
                document.title = title;
            };
            $scope.$watch(text, setTitle);
        }
    };
});