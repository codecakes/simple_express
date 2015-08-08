function docreflow() {
    $('#form-reflow').on('submit', function (evt) {
        //how preventDefault and its cousins are different
        //https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false#comment32754627_1357118
        //then https://jsfiddle.net/APQk6/
        console.log("going for $.post");
        
        evt.preventDefault();
        evt.stopPropagation();
        console.log("going for $.post");
        $.post($('#form-reflow').attr( 'action' ),
            {   
                //url: window.location.href.replace(window.location.pathname, '') + $('#form-reflow').attr( 'action' ),
                data: $("#textinp").val(),
                //method: 'POST',
                //dataType: 'json',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                /*success: function onDone (data) {
                            console.log("returned data is: ");
                            var data = JSON.parse(data).data;
                            console.log(data);
                            $('#form-reflow').html(data);
                        }*/
            })
            .done(function onDone (val) {
                            console.log("returned data is: ");
                            //var data = JSON.parse(val);
                            //console.log("returned value");
                            console.log(val);
                            var $div = $("<div>", {id:"ajaxReq"})
                            $div.html(val);
                            $('body').appendChild(val);
                            //$('#form-reflow').html("<p>" + data.toString() + "</p>");
                        }
            )
            .fail(function onFail(xhr, errmsg, err) {
                console.log("Failed Ajax reponse");
                console.log(xhr);
                $('#form-reflow').html("<p> There Wazza Khold Dey</p>" + 
                "There was an error: %s %s", errmsg, err);
            });
            return false;
    })
}