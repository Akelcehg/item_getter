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
            console.log('Done');
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

});
