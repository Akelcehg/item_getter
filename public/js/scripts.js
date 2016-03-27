$(document).ready(function () {
    $('#signupButton').bind('click', function () {

        $.post('/signup/?ts=' + new Date().getTime(), $('#f').serialize(), function (response) {
            var errorDiv = $('#error');
            errorDiv.empty();
            if (response.errors) {
                for (var key in response.errors) {
                    errorDiv.append('<div>' + response.errors[key].message + '</div>');
                }
            } else window.location.href = '/';

        });
    });

    $('#modalLoginButton').bind('click', function () {

        $.post('/login/?ts=' + new Date().getTime(), $('#loginForm').serialize(), function (response) {
            var errorDiv = $('#error');
            errorDiv.empty();
            if (response.errors) {
                for (var key in response.errors) {
                    errorDiv.append('<div>' + response.errors[key].message + '</div>');
                }
            } else window.location.href = '/';

        });
    });
});