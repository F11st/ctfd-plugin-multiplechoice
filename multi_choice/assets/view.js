window.challenge.data = undefined;

window.challenge.renderer = new markdownit({
    html: true,
    linkify: true,
});

window.challenge.preRender = function () {

};

window.challenge.render = function (markdown) {
    return window.challenge.renderer.render(markdown);
};


window.challenge.postRender = function () {

};


window.challenge.submit = function (cb, preview) {
    var challenge_id = parseInt($('#challenge-id').val());
    var url = "/api/v1/challenges/attempt";

    if (preview) {
        url += "?preview=true";
    }

    var zimu = "ABCDEFGH";
    var check = document.getElementsByClassName('form-group')[0].getElementsByClassName('btn');
    var checklen = check.length;
    var submission = "";
    for(var i=0;i<checklen;i++){
        if(check[i].getAttribute('class').indexOf("act") != -1){
            submission += zimu[i];
        }
    }

    var params = {
        'challenge_id': challenge_id,
        'submission': submission
    };

    CTFd.fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status === 429) {
            // User was ratelimited but process response
            return response.json();
        }
        if (response.status === 403) {
            // User is not logged in or CTF is paused.
            return response.json();
        }
        return response.json();
    }).then(function (response) {
        cb(response);
    });
};