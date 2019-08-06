// Markdown Preview
$('#desc-edit').on('shown.bs.tab', function (event) {
    if (event.target.hash == '#desc-preview'){
        var editor_value = $('#desc-editor').val();
        $(event.target.hash).html(
            window.challenge.render(editor_value)
        );
    }
});
$('#new-desc-edit').on('shown.bs.tab', function (event) {
    if (event.target.hash == '#new-desc-preview'){
        var editor_value = $('#new-desc-editor').val();
        $(event.target.hash).html(
            window.challenge.render(editor_value)
        );
    }
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
