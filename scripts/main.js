class Table {
    constructor(rows, columns) {
        this.createTableElement(rows, columns);
    }

    createTableElement(rows, columns) {
        const table = document.createElement('table');

        for(let i = 0; i <= rows; i++) {
            table.appendChild(this.createRowElement(i, columns));
        }

        document.querySelector('main').innerHTML = '';
        document.querySelector('main').appendChild(table);
    }

    createRowElement(i, columns) {
        const tr = document.createElement('tr');
        for(let j = 0; j <= columns; j++) {
            tr.appendChild(this.createCellElement(i, j));
        }
        return tr;
    }

    createCellElement(i, j) {
        if(i == 0 && j == 0) return this.createFirstCellElement();
        if(i == 0) return this.createHeaderCellElement(j);
        if(j == 0) return this.createKeyCellElement(i);
        return this.createDefaultCellElement(i, j);
    }

    createFirstCellElement() {
        const cell = document.createElement('input');
        cell.classList.add('key-cell');
        cell.disabled = true;
        return cell;
    }

    createHeaderCellElement(j) {
        const cell = document.createElement('input');
        cell.classList.add(String.fromCharCode(64 + j));
        cell.classList.add('header-cell');
        cell.value = String.fromCharCode(j + 64);
        cell.disabled = true;
        return cell;
    }

    createKeyCellElement(i) {
        const cell = document.createElement('input');
        cell.classList.add('key-cell');
        cell.value = i;
        cell.disabled = true;
        return cell;
    }

    createDefaultCellElement(i, j) {
        const that = this;
        const cell = document.createElement('input');
        cell.classList.add(String.fromCharCode(64 + j));
        cell.addEventListener('change', function() {
            if(cell.value.charAt(0) == '=') {
                cell.value = that.getFormulaResult(cell.value.substr(1, cell.value.length - 1));
            }
        });
        return cell;
    }

    getFormulaResult(src) {
        let result = "";
        let readingCell = false;
        for(let i = 0; i < src.length; i++) {
            if(src.charAt(i) >= 'A' && src.charAt(i) <= 'Z') {
                result += 'parseFloat(document.querySelectorAll(\'.' + src.charAt(i) + '\')[';
                readingCell = true;
            } else if(src.charAt(i) >= '0' && src.charAt(i) <= '9') {
                result += src.charAt(i);
            } else {
                if(readingCell) {
                    result += '].value)';
                    readingCell = false;
                }
                result += src.charAt(i);
            }
        }
        if(readingCell) result += '].value)';
        return eval(result);
    }
}

new Table(50, 26);