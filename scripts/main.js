function createTable(rows, columns) {
    const table = document.createElement('table');

    for(let i = 0; i <= rows; i++) {
        table.appendChild(createRow(i, columns));
    }

    document.querySelector('main').innerHTML = '';
    document.querySelector('main').appendChild(table);
}

function createRow(i, columns) {
    const tr = document.createElement('tr');
    for(let j = 0; j <= columns; j++) {
        tr.appendChild(createCell(i, j));
    }
    return tr;
}

function createCell(i, j) {
    if(i == 0 && j == 0) return createFirstCell();
    if(i == 0) return createHeaderCell(j);
    if(j == 0) return createKeyCell(i);
    return createDefaultCell(i, j);
}

function createFirstCell() {
    const cell = document.createElement('input');
    cell.classList.add('key-cell');
    cell.disabled = true;
    return cell;
}

function createHeaderCell(j) {
    const cell = document.createElement('input');
    cell.classList.add('header-cell');
    cell.value = String.fromCharCode(j + 64);
    cell.disabled = true;
    return cell;
}

function createKeyCell(i) {
    const cell = document.createElement('input');
    cell.classList.add('key-cell');
    cell.value = i;
    cell.disabled = true;
    return cell;
}

function createDefaultCell(i, j) {
    const cell = document.createElement('input');
    return cell;
}

createTable(50, 26);