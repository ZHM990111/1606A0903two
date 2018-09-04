$(function() {
    $('.inp').on('input', function() {
        var val = $(this).val();
        if (!val) {
            $('.list').html('')
            return
        } else {
            $.ajax({
                url: "/api/list?key=" + val,
                dataType: 'json',
                success: function(res) {
                    if (res.code === 1) {
                        var str = ''
                        res.data.forEach(function(item) {
                            str += '<li>' + item.cont + '</li>'
                        });
                        $('.list').html(str);
                    }
                },
                error: function(error) {
                    console.warn(error)
                }

            })
        }
    })
})