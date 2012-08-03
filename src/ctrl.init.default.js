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
});