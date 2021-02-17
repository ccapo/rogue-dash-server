$(document).ready(function() {
    $('#highscores').DataTable( {
        "processing": true,
        //"serverSide": true,
        "order": [[ 1, "desc" ]],
        "ajax": {
            "url": "/api/scores",
            "type": "POST"
        },
        "columns": [
            { "data": "name" },
            { "data": "score" },
            { "data": "updatedAt" }
        ]
    } );
} );
