$(document).ready(function() {

    $("a#test_source").click(function(e) {

        var self = $(this);
        self.addClass('disabled');
        var itemId = $('.item-functions').attr('id');
        self.children('.default-icon').hide();
        self.children('.loading-icon').show();
        $.post({
            url: "/admin/items/test_http",
            //type: 'post',
            data: {
                'itemId': itemId
            }
        }).done(function(response) {
            self.removeClass('disabled');
            self.children('.default-icon').show();
            self.children('.loading-icon').hide();
            if (response['status'] === 'ok') {
                $('#success_item_http').show();
                setTimeout(function() {
                    $("#success_item_http").fadeOut('fast');
                }, 10000);
            } else {
                $('#fail_item_http').show();
                setTimeout(function() {
                    $("#fail_item_http").fadeOut('fast');
                }, 10000);
            }
        });
        e.preventDefault();
    });


    $("a#test_links_list").click(function(e) {
        var self = $(this);
        self.addClass('disabled');

        var itemId = $('.item-functions').attr('id');

        self.children('.default-icon').hide();
        self.children('.loading-icon').show();
        $('.items_list_error').hide();

        $.post({
            url: "/admin/items/test_links",
            data: {
                'itemId': itemId
            }
        }).done(function(response) {

            self.removeClass('disabled');
            self.children('.default-icon').show();
            self.children('.loading-icon').hide();

            if (response['status'] === 'ok' && response['links'].length > 0) {
                response['links'].forEach(function(item, i, arr) {
                    $('ol#links_list').append('<li style="padding-bottom: 10px;">'+
                    	'<a href="'+item+'" target="_blank">Ссылка на описание</a> '+
                    	'<a type="button" href="#" class="btn btn-primary btn-sm">Спарсить страницу</a></li>');
                });
                $('.items_list_parsed').show();

            } else {
                $('.items_list_error').show();
                setTimeout(function() {
                    $(".items_list_error").fadeOut('fast');
                }, 10000);
            }
        });
        e.preventDefault();
    });

});
