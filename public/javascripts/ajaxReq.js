function docreflow() {
    $('#form-reflow').on('submit', function (evt) {
        //how preventDefault and its cousins are different
        //https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false#comment32754627_1357118
        //then https://jsfiddle.net/APQk6/
        console.log("going for $.post");
        
        evt.preventDefault();
        evt.stopPropagation();
        console.log("going for $.post");
        $("#form-reflow").html('');
        $.getJSON( $('#form-reflow').attr( 'action' ), {data:$("#textinp").val()}, 
                    function onDone (data) {
                        $("#form-reflow").html("<p> hello baby " + JSON.parse(data).data.toString() + "</p>");
                    });
            
            /*
            {   
                url: $('#form-reflow').attr( 'action' ),
                jsonp: "callback",
                data: $("#textinp").val(),
                crossDomain:true,
                dataType: "jsonp",
                method: 'POST',
                dataType: 'json',
                headers: {'X-Requested-With': 'XMLHttpRequest'},
                success: function onDone (data) {
                            console.log("returned data is: ");
                            var data = JSON.parse(data).data;
                            console.log(data);
                            $('#form-reflow').html(data);
                        }
            
            })
            .done(function onDone (data) {
                //var src = new EventSource('/'); //create sse evt source
                $("#form-reflow").html("<p> hello baby " + JSON.parse(data).data.toString() + "</p>");
                //remove form html
            
            
                src.addEventListener('open', function(evt) {
                    $("#form-reflow").html('');
                },
                false);
                
                src.onmessage = function (incoming) {
                    console.log("returned data is: ");
                    console.log(incoming);
                    $("#form-reflow").html("<p> hello baby " + incoming.toString() + "</p>");
                    //$("#form-reflow").html("<p> hello baby " + JSON.parse(incoming).toString() + "</p>");   
                };
                
                src.addEventListener('error', function(e) {
                      if (e.readyState == EventSource.CLOSED) {
                        // Connection was closed.
                        var res = $("#form-reflow").html();
                        $("#form-reflow").html(res + "<br>" + "Event was closed");
                      }
                    }, false);
                
                console.log("returned data is: ");
                //var data = JSON.parse(val);
                //console.log("returned value");
                console.log(val);
                var $div = $("<div>", {id:"ajaxReq"})
                $div.html(val);
                $('body').appendChild(val);
                //$('#form-reflow').html("<p>" + data.toString() + "</p>");
                
            })
            .fail(function onFail(xhr, errmsg, err) {
                console.log("Failed Ajax reponse");
                console.log(xhr);
                $('#form-reflow').html("<p> There Wazza Khold Dey</p>" + 
                "There was an error: %s %s", errmsg, err);
            });
            */
            return false;
    })
}