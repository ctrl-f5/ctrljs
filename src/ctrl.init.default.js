$(function () {
    $('form.ctrljs-validate').live('submit', function () {
        if (CtrlJs.Forms.isValid($(this))) {
            $(this).find('.form-actions .alert').remove();
        } else {
            $(this).find('.form-actions').prepend(
                $('<div class="alert alert-error"><strong>Hold on!</strong> Some required fields are missing a value.</div>')
            );
            return false;
        }
        return true;
    });

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
});