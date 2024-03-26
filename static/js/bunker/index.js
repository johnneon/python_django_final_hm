const SECTION_TEMPLATE = `
<div class="bunker__list">
    <h4 class="bunker__list__title" data-editable-section contenteditable="true">
        Section 1
    </h4>
    <button class="btn bunker__list__btn" data-add-item>Add new item</button>
</div>
<div class="separator"></div>
`;

const ITEM_TEMPLATE = `
<div class="bunker__list__item">
    <div class="bunker__list__item_inner">
        <div class="bunker__list__item__num">1.</div>
        <div class="bunker__list__item__login-empty">
            <span>Login: </span><span data-editable-item contenteditable="true">Type something...</span>
        </div>
        <div class="bunker__list__item__separator"></div>
        <div class="bunker__list__item__password-empty">
            <span>Password: </span><span data-editable-item>Type something...</span>
        </div>
        <div class="bunker__list__item__separator"></div>
        <div class="btn-remove bunker__list__item__remove" data-remove>❌</div>
    </div>
</div>
`;

const editableSections =  [... (document.querySelectorAll('[data-editable-section]') ?? [])];
const editableItems =  [... (document.querySelectorAll('[data-editable-item]') ?? [])];
const removeItems =  [... (document.querySelectorAll('[data-remove]') ?? [])];
const addItemItems =  [... (document.querySelectorAll('[data-add-item]') ?? [])];
const addSectionItems =  [... (document.querySelectorAll('[data-add-section]') ?? [])];

const onEditableBlur = ({ target }) => {
    target.removeAttribute('contenteditable');
};

const onEditableClick = ({ target }) => {
    target.setAttribute('contenteditable', true);
    target.focus();
    target.addEventListener('blur', onEditableBlur);
};

const onRemoveClick = ({ target }) => {
    target?.parentNode?.parentNode?.remove();
};

const onAddItemClick = ({ target }) => {
    const element = document.createElement('div');
    element.innerHTML = ITEM_TEMPLATE;
    target.before(element);

    const editableElement = element.querySelector('[contenteditable]');
    const removeBtn = element.querySelector('[data-remove]');
    editableElement.addEventListener('click', onEditableClick);

    editableElement.click();

    removeBtn.addEventListener('click', onRemoveClick);
};

const onAddSectionClick = ({ target }) => {
    const element = document.createElement('div');
    element.innerHTML = SECTION_TEMPLATE;
    target.parentNode.before(element);

    const editableElement = element.querySelector('[contenteditable]');
    const addItemElement = element.querySelector('[data-add-item]');
    addItemElement.addEventListener('click', onAddItemClick);

    const sectionNum = document.querySelectorAll('[data-editable-section]')?.length;
    editableElement.innerText = `Section ${sectionNum}`;
    editableElement.click();
}

editableItems.forEach(item => {
    item.addEventListener('click', onEditableClick);
});

removeItems.forEach(item => {
    item.addEventListener('click', onRemoveClick);
});

addItemItems.forEach(item => {
    item.addEventListener('click', onAddItemClick);
});

addSectionItems.forEach(item => {
    item.addEventListener('click', onAddSectionClick);
});
