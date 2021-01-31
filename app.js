const btnAddColumn = document.querySelector(`.btn_add_column`)

addHeaderButtons()
btnAddColumn.onclick = addColumnItem

const btnScrollLeft = document.getElementById(`btn_scroll_left`)
btnScrollLeft.onclick = function() {
    window.scrollTo(0, 0)
}

function addHeaderButtons() {
    const peopleImgs = document.getElementsByClassName(`people_img`)
    peopleImgs[1].onclick = function() { alert(`This is Big Smoke.`) }
    peopleImgs[2].onclick = function() { alert(`This is Sweet.`) }
    peopleImgs[3].onclick = function() { alert(`This is Ryder.`) }
    peopleImgs[4].onclick = function() { alert(`This is OG Loc.`) }
    peopleImgs[5].onclick = function() { alert(`hvatit.`) }
}

function addColumnItem() {
    // создать в DOM новую колонку
    const columnItem = document.createElement(`div`)
    columnItem.classList.add([`column_item`])
    // найти в DOM основной контейнер
    const mainContainer = document.querySelector(".main_container")
    // расположение в DOM новой колонки
    mainContainer.insertBefore(columnItem, btnAddColumn) 
    // -------column_item_title----------
    // добавить блок шапки колонки (название и кнопка удаления колонки)
    const columnItemTitle = document.createElement(`div`)
    columnItemTitle.classList.add([`column_item_title`])
    columnItem.appendChild(columnItemTitle)
    // добавить блок названия колонки
    const columnItemName = document.createElement(`div`)
    columnItemName.classList.add([`column_item_name`])
    columnItemName.textContent = `Column item name`
    columnItemTitle.appendChild(columnItemName)
    columnItemName.onclick = function() {
        editColName(columnItem);
    }
    // добавить кнопку удаления колонки
    const btnDelColumn = document.createElement(`div`)
    btnDelColumn.classList.add([`btn_del_column`])
    btnDelColumn.src = `img/icons/del-column.svg`
    btnDelColumn.alt = `del`
    columnItemTitle.appendChild(btnDelColumn)
    // онклик кнопки удаления колонки
    btnDelColumn.onclick = function() {
        columnItem.remove()
    }
    // добавить прокручиваемый блок внутренних итемов
    const columnContent = document.createElement(`div`)
    columnContent.classList.add([`column_content`])
    columnItem.appendChild(columnContent)
    // --------btn_add_inner---------
    // добавить кнопку добавления внутреннего итема
    const btnAddInner = document.createElement(`div`)
    btnAddInner.classList.add([`square_btn`])
    btnAddInner.classList.add([`btn_add_inner`])
    columnItem.appendChild(btnAddInner)
    // иконка кнопки добавления внутреннего итема
    const imgAddInner = document.createElement(`div`)
    imgAddInner.classList.add([`img_add_inner`])
    btnAddInner.appendChild(imgAddInner)
    calcColHeightPX(columnItem) // пересчет высоты колонки
    // онклик кнопки добавления внутреннего итема
    btnAddInner.onclick = function() {
        addInnerItem(columnContent)
    }
    addInnerItem(columnContent)
    // кнопка добавления колонки всегда видна
    // гориз. скролл всегда максимально справа
    btnAddColumn.scrollIntoView()
    window.scrollBy(100, 0)

    calcColHeightPX(columnItem) // пересчет высоты колонки
}

// подсчет высоты контента колонки
function calcColHeightPX(columnItem) {
    // найти в DOM элемент header
    const header = document.querySelector(`.header`)
    const columnTitle = columnItem.querySelector(`.column_item_title`)
    const btnAddInner = columnItem.querySelector(`.btn_add_inner`)
    const columnContent = columnItem.querySelector(`.column_content`)
    const scrollWidth = 8
    const otherMargins = 45 + scrollWidth
    // ограничение максимальной высоты колонки
    const maxH = `${window.innerHeight - header.clientHeight -
        columnTitle.clientHeight - btnAddInner.clientHeight - otherMargins}px`
    columnContent.style.maxHeight = maxH
}

function editColName(column) {
    let area = null;
    let view = column.querySelector(`.column_item_name`)

    area = document.createElement(`input`)
    area.classList.add(`edition`)
    area.classList.add(`edition_col_name`)
    area.value = view.innerHTML
    area.maxLength = 20
    area.onkeydown = function(event) {
      if (event.key == `Enter`) {
        this.blur();
      }
    };

    area.onblur = function() {
        if (area.value == ``) {
            view.innerHTML = `Column item name`
        } else view.innerHTML = area.value
        area.replaceWith(view)
    };

    view.replaceWith(area);
    area.focus();
}

// -------add-inner-item----------
function addInnerItem(columnContent) {
    const innerItem = document.createElement(`div`)
    innerItem.classList.add([`inner_item`])
    const btnAddInner = columnContent.querySelector(`.btn_add_inner`)
    columnContent.insertBefore(innerItem,btnAddInner)

    const innerItemTitle = document.createElement(`div`)
    innerItemTitle.classList.add([`inner_item_title`])
    innerItem.appendChild(innerItemTitle)

    const innerItemName = document.createElement(`div`)
    innerItemName.classList.add([`inner_item_name`])
    innerItemName.textContent = `Inner item name`
    innerItemTitle.appendChild(innerItemName)
    innerItemName.onclick = function() {
        editInnerName(innerItemName)
    }

    const btnDelInner = document.createElement(`img`)
    btnDelInner.classList.add([`btn_del_inner`])
    btnDelInner.src = `img/icons/del-inner.svg`
    btnDelInner.alt = `del`
    innerItemTitle.appendChild(btnDelInner)
    btnDelInner.onclick = function() {
        innerItem.remove()
    }

    const innerItemDescription = document.createElement(`div`)
    innerItemDescription.classList.add([`inner_item_description`])
    innerItemDescription.textContent = `Inner item description`
    innerItem.appendChild(innerItemDescription)
    innerItemDescription.onclick = function() {
        editInnerDescription(innerItemDescription)
    }
}

function editInnerName(innerItemName) {
    let area = null;
    let view = innerItemName
    
    area = document.createElement(`input`)
    area.classList.add(`edition`)
    area.classList.add(`edition_inner_name`)
    area.value = view.innerHTML
    area.maxLength = 18
    area.onkeydown = function(event) {
      if (event.key == `Enter`) {
        this.blur();
      }
    };

    area.onblur = function() {
        if (area.value == ``) {
            view.innerHTML = `Inner item name`
        } else view.innerHTML = area.value
        area.replaceWith(view)
    };

    view.replaceWith(area);
    area.focus();
}

function editInnerDescription(innerItemDescription) {
    let area = null;
    let view = innerItemDescription
    
    area = document.createElement(`textarea`)
    //area.classList.add(`edition`)
    area.classList.add(`edition_inner_description`)
    area.value = view.innerHTML
    area.maxLength = 100
    area.onkeydown = function(event) {
      if (event.key == `Enter`) {
        this.blur();
      }
    };

    area.onblur = function() {
        if (area.value == ``) {
            view.innerHTML = `Inner item description`
        } else view.innerHTML = area.value
        area.replaceWith(view)
    };

    view.replaceWith(area);
    area.focus();
}



