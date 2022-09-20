$(document).ready(function () {

    var widget;

    $(window).on('load', function(event) {
        if ($('#g-recaptcha').length) {
            widget = grecaptcha.render("g-recaptcha", {
                sitekey: "6LfK-cEhAAAAACrST0H0ZBOecJyZVBSY22jD6_9D", 
                theme: "light",
            });
        }
    });

    $('a[href="#next"]').on('click', function (event) {
        event.preventDefault();
        $('#step-1').addClass('hidden');
        $('#step-2').removeClass('hidden');
    });
    
    var getAQuoteForm = $(".get-a-quote-form").validate({
        submitHandler: function (form) {

            $('.get-a-quote-form .submit').addClass('opacity-50 pointer-events-none');

            $.ajax({
                url: 'https://submit-form.com/jFzFEjL4',
                type: 'POST',
                dataType: 'json',
                data: {
                    'name': $('#name').val(),
                    'email': $('#email').val(),
                    'message': $('#message').val(),
                    'phone': $('#phone').val(),
                    'city': $('#city').val(),
                    'location': $('input[name="type[]"]:checked').val(),
                    'g-recaptcha-response': grecaptcha.getResponse(widget)
                },
            })
            .done(function() {
                $(".get-a-quote-form").next('.response').text('We\'re crunching the numbers and will reach out in just a bit!').removeClass('hidden');
                $(".get-a-quote-form").addClass('hidden');
            });    
        }
    });

});