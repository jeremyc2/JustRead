// https://stackoverflow.com/questions/2136461/use-javascript-to-intercept-all-document-link-clicks

class State {
    
    constructor(init) {
        this.params = new URLSearchParams(init);
    }

    updateDocumentLinks() {
        [...document.links].forEach(link => {
            link.href = link.href.replace(/\?.*/,'?' + this.toString());
        })
    }

    add(key, value) {
        if(this.params.has(key)) {
            this.params.set(key, value);
        } else {
            this.params.append(key, value);
        }
    }

    remove(key) {
        this.params.delete(key);
    }

    has(key) {
        return this.params.has(key);
    }

    get(key) {
        return this.params.get(key);
    }

    toString() {
        return this.params.toString();
    }

}