function CtrlJs() {}

/**
 * CtrlLib.Forms
 */
CtrlJs.Forms = CtrlJs_Forms;

function CtrlJs_Forms() {}

CtrlJs_Forms.isValid = function (form) {
    if (form == undefined) {
        console.log('CtrlJs.Forms.isValid() was called without a form argument');
        return false;
    }
    var isValid = true;
    form.find('input.required, select.required, textarea.required').each(function () {
        if ($(this).val()) {
            $(this).closest('.control-group').removeClass('error');
        } else {
            $(this).closest('.control-group').addClass('error');
            isValid = false;
        }
    });
    return isValid;
};
