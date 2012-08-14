$(function () {
    $('form.ctrljs-validate').live('submit', function () {
        if (CtrlJs.Forms.isValid($(this))) {
            $(this).find('.form-actions .alert').remove();
        } else {
            if ($(this).find('.form-actions .alert').length == 0) {
                $(this).find('.form-actions').prepend(
                    $('<div class="alert alert-error"><strong>Hold on!</strong> Some required fields are missing a value.</div>')
                );
            }
            return false;
        }
        return true;
    });

    CtrlJs.Forms.setValidationPopups($('form.ctrljs-validate input'));

    $('a.ctrljs-confirm').live('click', function () {
        CtrlJs.Dialogs.confirm(this, function (trigger) {
            if ($(trigger).attr('href')) window.location = $(trigger).attr('href');
        });
        return false;//cancel the event
    });

    $('canvas.ctrljs-3stage-gauge').each(function(index) {
        $(this).data('ctrlGuage', new CtrlJs.Widgets.threeStageGauge({
            canvas: this,
            value: $(this).attr('guage-value')
        }));
    });

    $('form input[type=text]').first().focus();
});