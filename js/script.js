var next = function (currentStep) {
    var currentElement = $("fieldset[data-step='" + currentStep + "']");
    var nextElement = $("fieldset[data-step='" + (currentStep + 1) + "']");

    currentElement.addClass('complete');
    currentElement.find('input').prop('disabled', true);
    currentElement.find('select').prop('disabled', true);
    currentElement.find('input').addClass('disabled');
    currentElement.find('.js-next').hide();
    currentElement.find('.js-change').show();

    if (nextElement.length) {
        nextElement.show();
        nextElement.find('input').focus();
        nextElement.find('select').focus();
    }
};

var _resetField = function (field) {
    field.find('.js-next').show();
    field.find('.js-change').hide();
    field.find('input').prop('disabled', false);
    field.find('input').removeClass('disabled');
    field.find('select').prop('disabled', false);
}

var change = function (stepToChange) {
    // reset fields after step to edit
    $('fieldset').each(function (i) {
        var step = $(this).data('step');
        if (step > stepToChange) {
            var field = $(this);
            _resetField(field);
            field.hide();
        }
    });

    var field = $("fieldset[data-step='" + stepToChange + "']");
    _resetField(field);
}

$(function () {
    $('.js-show').show();
    $("fieldset[data-step='" + 1 + "']").show();

    $('.js-change').on('click', function (e) {
        e.preventDefault();
        var step = $(this).parents('fieldset').data('step');
        change(step);
    });

    $('.js-next').on('click', function (e) {
        e.preventDefault();
        var field = $(this).parents('fieldset');
        var fieldStep = field.data('step');
        next(fieldStep);
    });

    $("input[type='text']").on('keypress', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var field = $(this).parents('fieldset');
            var fieldStep = field.data('step');
            next(fieldStep);
        }
    });

    $("select").on('keypress', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var field = $(this).parents('fieldset');
            var fieldStep = field.data('step');
            next(fieldStep);
        }
    });
})
