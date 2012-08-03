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

/**
 * CtrlLib.Forms
 */
CtrlJs.Dialogs = CtrlJs_Dialogs;

function CtrlJs_Dialogs() {}

CtrlJs_Dialogs.confirm = function (trigger, func) {
    if (trigger == undefined) {
        console.log('CtrlJs.Dialogs.confirm() was called without a trigger argument');
        return false;
    }
    var msg = $(trigger).attr('data-confirm-msg');
    if (!msg) {
        msg = 'Are you sure you want to do this?';
    }
    if (confirm(msg)) {
        func(trigger);
    }
};
