function CtrlJs() {}

/**
 * CtrlLib.Forms
 */
function CtrlJs_Forms() {}
CtrlJs.Forms = CtrlJs_Forms;

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
function CtrlJs_Dialogs() {}
CtrlJs.Dialogs = CtrlJs_Dialogs;

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

/**
 * CtrlLib.Widgets
 */
function CtrlJs_Widgets() {}
CtrlJs.Widgets = CtrlJs_Widgets;

CtrlJs_Widgets.threeStageGauge = function (options) {
    var self = this;
    this.canvas = null;
    this.centerX = 0;
    this.centerY = 0;
    this.value = 0;
    this.autoRender = true;
    this.animate = 'slow';

    this.setCanvas = function(canvas) {
        self.canvas = canvas;
        self.centerX = canvas.width / 2;
        self.centerY = canvas.height / 2;
        return self;
    }

    this.setValue = function(value) {
        self.value = value;
        if (self.autoRender) {
            self.render();
        }
        return self;
    }

    this.drawArc = function (context, centerX, centerY, percent, size, color) {

        context.beginPath();
        var start = 0;
        var end = Math.PI*2;
        if (percent < 100) {
            var width = (percent/50);
            start = Math.PI*1.5;
            width = (width > 0.5) ? width-0.5 : width+1.5;
            end = Math.PI*width;
        }
        context.arc(centerX, centerY, size , start, end, false);
        context.strokeStyle = color;
        context.lineWidth = centerX/2;
        context.stroke();
        context.closePath();

    }

    this.redraw = function (percent) {
        var context = self.canvas.getContext('2d');

        //erase everything
        context.clearRect(0,0, self.canvas.width, self.canvas.height);

        //green circle
        self.drawArc(context, self.centerX, self.centerY, percent, self.centerX*0.75, '#6D6');
        if (percent > 100)
            self.drawArc(context, self.centerX, self.centerY, percent-100, self.centerX*0.65, '#F33');
        if (percent > 200)
            self.drawArc(context, self.centerX, self.centerY, percent-200, self.centerX/2, '#633');

        //start indicator line
        context.beginPath();
        context.moveTo(self.centerX, self.centerY);
        context.lineTo(self.centerX, 0);
        context.strokeStyle = '#FFF';
        context.lineWidth = self.centerX/10;
        context.globalAlpha = 0.7;
        context.stroke();
        context.restore();
        context.globalAlpha = 1;
    };

    this.render = function (percent, animate) {

        if (percent == undefined) percent = self.value;
        if (animate == undefined) animate = self.animate;

        if (animate != false) {
            var p = 0;
            var ms = 1;
            if (animate == 'slow') ms = 5;
            var interval = setInterval(function () {
                if (p > percent) {
                    clearInterval(interval);
                    return;
                }
                self.redraw(p);
                p = p + 1;
            }, ms);
        } else {
            self.redraw(p);
        }
    }

    this.parseOptions = function (options) {
        var defaultOptions = {
            canvas: null,
            value: 0,
            autoRender: true,
            animate: 'slow'
        };
        for (var o in options) defaultOptions[o] = options[o];
        self.setCanvas(defaultOptions.canvas);
        self.autoRender = defaultOptions.autoRender;
        self.animate = defaultOptions.animate;

        //set value last
        self.setValue(defaultOptions.value);
    }

    //parse options and
    //return object for fluent interface
    self.parseOptions(options);
    return self;
}