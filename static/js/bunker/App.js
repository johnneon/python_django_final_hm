import {
    ADD_SECTION_ATTR,
    EDITABLE_SECTION_ATTR,
    REMOVE_SECTION_ATTR,
    ADD_ITEM_ATTR,
    EDITABLE_ITEM_ATTR,
    REMOVE_ITEM_ATTR,
} from '/static/js/bunker/constants.js';

export class App {
    static DEFAUTL_ITEM_VALUE = 'Type something...';

    static SECTION_TEMPLATE = `
<div class="bunker__list">
    <div class="bunker__list__title">
        <h4 data-editable-section contenteditable="true">
            Section 1
        </h4>
        <button class="btn-remove bunker__list__title__remove" data-remove-section>❌</button>
    </div>
    <button class="btn bunker__list__btn" data-add-item>Add new item</button>
</div>
<div class="separator"></div>
`;

    static ITEM_TEMPLATE = `
<div class="bunker__list__item">
    <div class="bunker__list__item_inner">
        <div class="bunker__list__item__num">1.</div>
        <div class="bunker__list__item__login bunker__list__item__login-empty">
            <span>Login: </span><span data-editable-item contenteditable="true">Type something...</span>
        </div>
        <div class="bunker__list__item__separator"></div>
        <div class="bunker__list__item__password bunker__list__item__password-empty">
            <span>Password: </span><span data-editable-item>Type something...</span>
        </div>
        <div class="bunker__list__item__separator"></div>
        <div class="btn-remove bunker__list__item__remove" data-remove>❌</div>
    </div>
</div>
`;

    addSectionItems = [];
    editableSections = [];
    removeSectionItems = [];
    activeSectionTitle = null;
    isSectionCreation = false;
    activeSectionValue = '';

    editableItems = [];
    removeItems = [];
    addItemItems = [];
    isItemCreation = false;
    activeItemValue = '';
    activeItem = null;

    constructor(api) {
        this.api = api;

        this.editableSections =  [... (document.querySelectorAll(EDITABLE_SECTION_ATTR) ?? [])];
        this.editableItems =  [... (document.querySelectorAll(EDITABLE_ITEM_ATTR) ?? [])];
        this.removeItems =  [... (document.querySelectorAll(REMOVE_ITEM_ATTR) ?? [])];
        this.removeSectionItems =  [... (document.querySelectorAll(REMOVE_SECTION_ATTR) ?? [])];
        this.addItemItems =  [... (document.querySelectorAll(ADD_ITEM_ATTR) ?? [])];
        this.addSectionItems =  [... (document.querySelectorAll(ADD_SECTION_ATTR) ?? [])];
    }

    // region Section

    onAddSectionClick = ({ target }) => {
        this.isSectionCreation = true;

        const element = document.createElement('div');
        element.innerHTML = App.SECTION_TEMPLATE;
        element.replaceWith(...element.childNodes);

        const editableElement = element.querySelector('[contenteditable]');
        const addItemElement = element.querySelector(ADD_ITEM_ATTR);
        const removeSectionElement = element.querySelector(REMOVE_SECTION_ATTR);
        editableElement.addEventListener('click', this.onEditableSectionClick);
        addItemElement.addEventListener('click', this.onAddItemClick);
        removeSectionElement.addEventListener('click', this.onRemoveSectionClick);

        target.parentNode.before(element);

        const sectionNum = document.querySelectorAll(EDITABLE_SECTION_ATTR)?.length;
        const sectionName = `Section ${sectionNum}`;
        editableElement.innerText = `Section ${sectionNum}`;
        editableElement.click();
    }

    onEditableSectionBlur = ({ target }) => {
        this.activeSectionTitle = null;

        target.removeAttribute('contenteditable');

        const text = target.innerText;

        if (!text || text === App.DEFAUTL_ITEM_VALUE) {
            target.innerText = this.activeItemValue;
            this.activeItemValue = '';
            return;
        }

        this.isSectionCreation
            ? this.api.createSection(text)
            : this.api.updateSection(text, this.activeSectionValue);

        this.isSectionCreation = false;
        this.activeSectionValue = '';
    }

    onEditableSectionClick = ({ target }) => {
        this.activeSectionTitle = target;
        this.activeSectionValue = target.innerText;

        target.setAttribute('contenteditable', true);
        target.focus();
        target.addEventListener('blur', this.onEditableSectionBlur);
    }

    onRemoveSectionClick = ({ target }) => {
        const section = target.parentNode.querySelector(EDITABLE_SECTION_ATTR)?.innerText;
        this.api.removeSection(section);
        target?.parentNode?.parentNode?.remove();
    }

    // endregion

    // region Item

    onAddItemClick = ({ target }) => {
        this.isItemCreation = true;

        const element = document.createElement('div');
        element.innerHTML = App.ITEM_TEMPLATE;
        target.before(element);

        const editableElement = element.querySelector('[contenteditable]');
        const editableElements = [...element.querySelectorAll(EDITABLE_ITEM_ATTR)];
        const removeBtn = element.querySelector(REMOVE_ITEM_ATTR);
        editableElements.forEach(item => {
            item.addEventListener('click', this.onEditableClick);
        });
        element.replaceWith(...element.childNodes);

        editableElement.click();

        removeBtn.addEventListener('click', this.onRemoveClick);
    }

    onEditableClick = ({ target }) => {
        this.activeItem = target;
        this.activeItemValue = target.innerText;

        target.setAttribute('contenteditable', true);
        target.focus();
        target.addEventListener('input', this.onEditableChange);
        target.addEventListener('blur', this.onEditableBlur);
    }

    onEditableChange = ({ target }) => {
        target.parentNode?.classList?.remove('bunker__list__item__password-empty');
        target.parentNode?.classList?.remove('bunker__list__item__login-empty');
    }

    onEditableBlur = ({ target }) => {
        this.activeItem = null;

        target.removeAttribute('contenteditable');

        const text = target.innerText;

        if (!text || text === App.DEFAUTL_ITEM_VALUE) {
            if (this.isItemCreation) {
                target?.parentNode?.parentNode?.parentNode?.remove();
            } else {
                target.innerText = this.activeItemValue;
                this.activeItemValue = '';
            }
            return;
        }

        const section = this.getParentSection(target)?.innerText;
        const login = this.getSiblingLoginField(target, 3)?.innerText;
        const password = this.getSiblingPasswordField(target)?.innerText;

        const isLoginEditing = target.parentNode.classList.contains('bunker__list__item__login');

        this.isItemCreation
            ? this.api.createField(section, isLoginEditing ? text : login, '')
            : this.api.updateField(section, isLoginEditing ? text : login, password, isLoginEditing && this.activeItemValue);

        this.isItemCreation = false;
        this.activeItemValue = '';
    }

    onRemoveClick = ({ target }) => {
        const section = target?.parentNode
            ?.parentNode
            ?.parentNode.querySelector(EDITABLE_SECTION_ATTR)?.innerText;
        const login = target
            ?.parentNode.querySelector(`.bunker__list__item__login ${EDITABLE_ITEM_ATTR}`)?.innerText;
        this.api.removeField(section, login);

        target?.parentNode?.parentNode?.remove();
    }

    // endregion

    // region Utils

    getParentSection = (element) => {
        return element
            ?.parentNode
            ?.parentNode
            ?.parentNode
            ?.parentNode.querySelector(EDITABLE_SECTION_ATTR);
    }

    getSiblingPasswordField = (element) => {
        return element
            ?.parentNode
            ?.parentNode
            ?.parentNode.querySelector(`.bunker__list__item__password ${EDITABLE_ITEM_ATTR}`);
    }

    getSiblingLoginField = (element, level = 2) => {
        if (level === 2) {
             return element
                ?.parentNode
                ?.parentNode.querySelector(`.bunker__list__item__login ${EDITABLE_ITEM_ATTR}`);
        }

        return element
            ?.parentNode
            ?.parentNode
            ?.parentNode.querySelector(`.bunker__list__item__login ${EDITABLE_ITEM_ATTR}`);
    }

    // endregion

    init = () => {
        this.editableItems.forEach(item => {
            item.addEventListener('click', this.onEditableClick);
        });

        this.editableSections.forEach(item => {
            item.addEventListener('click', this.onEditableSectionClick);
        });

        this.removeItems.forEach(item => {
            item.addEventListener('click', this.onRemoveClick);
        });

        this.removeSectionItems.forEach(item => {
            item.addEventListener('click', this.onRemoveSectionClick);
        });

        this.addItemItems.forEach(item => {
            item.addEventListener('click', this.onAddItemClick);
        });

        this.addSectionItems.forEach(item => {
            item.addEventListener('click', this.onAddSectionClick);
        });
    }
}
