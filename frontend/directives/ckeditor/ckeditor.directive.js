const ckEditorDirective = {
    require: '?ngModel',
    name: 'ckeditor',
    link: link,
};

function link(scope, elm, attr, ngModel) {
	let vm = this;
	let CKEDITOR = window.CKEDITOR;
    let ck = CKEDITOR.replace(elm[0]);

    if (!ngModel) return;

    ck.on('instanceReady', function() {
        ck.setData(ngModel.$viewValue);
    });

    function updateModel() {
        scope.$apply(function() {
            if (ck.getData().length) {
                ngModel.$setViewValue(ck.getData());
            }
        });
    }

    ck.on('change', updateModel);
    ck.on('key', updateModel);
    ck.on('dataReady', updateModel);
    ck.on('pasteState', updateModel);

    ngModel.$render = function(value) {
        ck.setData(ngModel.$viewValue || '');
    };
}
export {
    ckEditorDirective
};