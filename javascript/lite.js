var i = 0,
    j = 0;

const state = new State(window.location.search);
var index = state.get("index");
state.remove("index");

var content,
    prependContentButton,
    appendContentButton,
    modal,
    selected;

var promise;

function copy(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
}

// Insert random span.tab every 1 to 4 sentences whether 
// by injectText() prependText() or appendText()
var paragraph = {prepend: 0, postpend: 0};
function isNewParagraph(isPrepended) {

    if(isPrepended != null && isPrepended) {
        if (paragraph.prepend >= 3 || Math.random() < 0.25) {
            paragraph.prepend = 0;
            return true;
        } else {
            paragraph.prepend++;
            return false;
        }      
    } else {
        if (paragraph.postpend >= 3 || Math.random() < 0.25) {
            paragraph.postpend = 0;
            return true;
        } else {
            paragraph.postpend++;
            return false;
        }
    }

}

function buildBookmarkURL(index) {
    // TODO Add state from url
    return document.location.origin + document.location.pathname + `?index=${index}`
}

function bookmarkToClipboard() {

    copy(buildBookmarkURL(selected.id));
    hideModal();

}

function bookmarkToHistory() {
    // TODO Add state from url
    window.history.pushState(null, null, `?index=${selected.id}`);
    hideModal();
}

function showModal() {
    modal.style.display = "block";
    modal.classList.remove("hide");
    modal.classList.add("show");
}

function hideModal() {

    modal.classList.remove("show");

    // https://css-tricks.com/restart-css-animation/
    void modal.offsetWidth;
    
    modal.classList.add("hide");
}

function injectText(index, text) {
    if(content == null) return;

    console.log(`ITI: ${index}`);

    var span = document.createElement("span");
    span.addEventListener("dblclick", function(e) {
        window.getSelection().removeAllRanges();
        selected = e.target;
        selected.classList.add("selected");
    });

    span.addEventListener("animationend", function(e) {
        e.target.classList.remove("selected");
        showModal();
    });
 
    span.id = index;

    span.innerHTML = `<span class="tab"></span>${text} `;
    content.appendChild(span);
    i = j = index;
}

function prependText(index, text) {
    if(content == null) return;

    console.log(`PTI: ${index}`);

    var span = document.createElement("span");
    span.addEventListener("dblclick", function(e) {
        window.getSelection().removeAllRanges();
        selected = e.target;
        selected.classList.add("selected");
    });

    span.addEventListener("animationend", function(e) {
        e.target.classList.remove("selected");
        showModal();
    });

    span.id = index;

    var firstChild = content.firstChild;
    if(firstChild.innerHTML.startsWith("<span class=\"tab\">")) {
        firstChild.innerHTML = "</br>" + firstChild.innerHTML;
    } else if(isNewParagraph(true)) {
        firstChild.innerHTML = "</br><span class=\"tab\"></span>" + firstChild.innerHTML;
    }

    span.innerHTML += text + " ";
    content.insertBefore(span,firstChild);

    if(index <= 0) {
        document.body.removeChild(prependContentButton);
    }

}

function appendText(index, text) {
    if(content == null) return;

    console.log(`ATI: ${index}`);

    var span = document.createElement("span");
    span.addEventListener("dblclick", function(e) {
        window.getSelection().removeAllRanges();
        selected = e.target;
        selected.classList.add("selected");
    });

    span.addEventListener("animationend", function(e) {
        e.target.classList.remove("selected");
        showModal();
    });

    span.id = index;

    span.innerHTML += (isNewParagraph(false)? `</br><span class="tab"></span>${text}` : text) + " ";
    content.appendChild(span);
}

function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 50 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function prependContent() {

    const prependMax = 10;
    for (var prependIndex = 0; prependIndex < prependMax; prependIndex++) {

        promise = promise
            .then(() => getPreviousSentence(j, prependText))
            .then(() => j--);
    }

}

function appendContent() {
    if(i >= 7624) {
        
        if(appendContentButton != null) {
            document.body.removeChild(appendContentButton);
        }

        appendContentButton = null;
        return;
    }

    if(isElementInViewport(appendContentButton)) {
        promise = promise
            .then(() => getNextSentence(i, appendText))
            .then(() => i++)
            .then(() => {
                if(isElementInViewport(appendContentButton)) {
                    appendContent();
                }
            });
    }
}

document.addEventListener('DOMContentLoaded', () => {

    content = document.getElementById("content");
    prependContentButton = document.getElementById("prepend-content-button");
    appendContentButton = document.getElementById("append-content-button");
    modal = document.getElementById("modal");

    modal.addEventListener("animationend", function(e) {
        if(e.target.classList.contains("hide")) {
            e.target.style.display = "none";
        }
    });

    document.getElementById("options").addEventListener("click", function(e) {e.stopPropagation()});

    modal.addEventListener("click", hideModal)

    if(state.has("dark")) {
        document.body.classList.add("dark");
        var darkLink = document.getElementById("dark-link");
        darkLink.onclick = () => {
            state.remove('dark');
            if(index != null)
                state.add('index',index);
        }
        darkLink.innerHTML = "Switch to light mode";
    }

    if(index != null) {
        i = j = index;

        if(i == 0) {
            document.body.removeChild(prependContentButton);
        }

        promise = getSentence(i, injectText);
    } else {
        document.body.removeChild(prependContentButton);
        promise = getFirstSentence(injectText);
    }

    appendContent();

    document.addEventListener('load', appendContent, false);
    document.addEventListener('scroll', appendContent, false);
    window.addEventListener('resize', appendContent, false);
}, false);