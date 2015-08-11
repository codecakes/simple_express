$('#form-reflow').submit(function (e) {
        e.preventDefault();
        var posting = $.post( $('#form-reflow').attr( 'action' ), 
            {data:$("#textinp").val().toLocaleString()
            })
        posting.done(
            function onDone (val) {
                console.log(val);
                $("#form-reflow").removeAttr('action');
                $("#form-reflow")
                .html("<p> hello baby " + val.data + "</p>");
                });
        return false;
    });

/*
$('#form-reflow').submit(function (evt) {
    //how preventDefault and its cousins are different
    //https://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false#comment32754627_1357118
    //then https://jsfiddle.net/APQk6/
    
    evt.preventDefault();
    evt.stopPropagation();
    console.log("going for $.post");
    //$("#form-reflow").html('');
    (function caller() {
        $.post( $('#form-reflow').attr( 'action' ), 
                    {data:$("#textinp").val().toLocaleString()
                    }, 
                    function onDone (val) {
                        console.log(val);
                        $("#form-reflow")
                        .html(
                            "<p> hello baby " + val.data + "</p>");
                    });
    })();
    return false;
    });
*/