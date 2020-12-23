function getSentence(index, callback) {
    return fetch(`https://jeremyc2.github.io/JustRead/sentences/${index}.txt`)
        .then(response => {
            response.text().then(text => {
                callback(index, text);
            })
        });
}

function getRandomSentence(callback) {
    var i = Math.floor(Math.random() * 7625);
    return getSentence(i, callback);
}

function getFirstSentence(callback) {
    var i = 0;
    return getSentence(i, callback);
}

function getLastSentence(callback) {
    var i = 7624;
    return getSentence(i, callback);
}

function getPreviousSentence(current, callback) {
    if(current <= 0) {
        return;
    }
    return getSentence(--current, callback);
}

function getNextSentence(current, callback) {
    if(current >= 7624) {
        return;
    }
    return getSentence(++current, callback);
}