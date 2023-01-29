
class SelectWindow {
    #attr;
    #els;
    #clicou = false;
    #opts = {};
    /**
     * 
     * @param {*} nome 
     * @param {*} pos 
     * @param {*} div 
     */
    #optClick = (nome, pos, div) => {
        console.log('2@@ clicou')
        this.#els[pos].getElementsByTagName('input')[0].value = nome;
        div.remove();
    }
    /**
     * 
     * @param {*} y 
     * @param {*} top 
     * @param {*} pos 
     * @returns 
     */
    #windowConstructor = (y, top, pos) => {
        let div = document.createElement('div');
        div.className = 'select-window-container';
        div.style.top = top + y + 'px';
        let options = this.#els[pos].getElementsByTagName('moption');
        for (let opt of options) {
            let span = document.createElement('span');
            span.className = 'select-window-options'
            span.innerText = opt.innerText;
            span.onclick = (event) => {
                console.log('clicou feito', this.#els[pos].getElementsByTagName('input'))
                this.#els[pos].getElementsByTagName('input')[0].onblur = null;
                event.preventDefault();
                this.#clicou = true;
                this.#optClick(opt.innerText, pos, div);
            }
            div.appendChild(span);
        }
        return div;
    }
    #selectConstructor = (label, placeholder, pos) => {
        let div = document.createElement('div');
        div.className = 'select-input';
        let input = document.createElement('input');
        input.placeholder = placeholder;
        input.type = 'text';
        input.name = `sel-text${pos}`;
        input.id = `sel-text${pos}`;
        input.setAttribute('readonly', 'readonly');
        input.onfocus = (event) => {
            event.preventDefault();
            console.log('@@@ elfo', this.#els[pos].getElementsByTagName('input'));
            let box = this.#els[pos].getElementsByTagName('input')[0].getBoundingClientRect();
            console.log('@@@ caixinha', box);
            let parent = this.#els[pos].parentNode;
            parent.appendChild(this.#windowConstructor(box.y, box.top, pos));
            // input.onblur = (event) => {
            //     event.preventDefault();
            //     event.stopPropagation();
            //     let _els = document.getElementsByClassName('select-window-container');
            //     if (!this.#clicou && _els && _els?.length > 0) {
            //         for (let _el of document.getElementsByClassName('select-window-container')) {
            //             _el.remove();
            //         }
            //     } else {
            //         this.#clicou = false;
            //     }
            // }
        }
       
        div.appendChild(input);
        let _label = document.createElement('label');
        _label.setAttribute('for', `sel-text${pos}`);
        _label.innerText = label;
        div.appendChild(_label);
        return div;
    }
    // #select = (label, pos)=>`
    // <div class="select-input">
    //     <input type="text" name="sel-test" id="sel-test${}" readonly>
    //     <label for="sel-test${}">Seleciona:</label>
    // </div>
    // `
    constructor(attr) {
        this.#attr = attr;
        console.log('@@@ class is built...', attr)
    }
    load() {
        console.log('@@@ iniciou...');
        this.#els = document.getElementsByTagName(this.#attr);
        console.log('@@@ os elementos', this.#els);
        let pos = 0;
        for (let el of this.#els) {
            let name = el.getAttribute('label').replace(/[\'\"]/g, '');
            let placeholder = el.getAttribute('placeholder').replace(/[\'\"]/g, '');
            let options = el.getElementsByTagName('moption');
            for (let opt of options) {
                opt.style.display = 'none';
            }
            el.appendChild(this.#selectConstructor(name, placeholder, pos));
            pos++;
        }
    }
}