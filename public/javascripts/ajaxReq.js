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