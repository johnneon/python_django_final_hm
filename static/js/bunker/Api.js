export class Api {
    constructor() {
    }

    createSection = async (section) => {
        await fetch('/bunker/action', {
            method: 'POST',
            body: JSON.stringify({ user: location.search.slice(6),section, action: 'create_section' }),
        });
    };

    updateSection = async (section, prevSectionName) => {
        await fetch('/bunker/action', {
            method: 'POST',
            body: JSON.stringify({ user: location.search.slice(6),section, prev_section_name: prevSectionName, action: 'update_section' }),
        });
    };

    removeSection = async (section) => {
        await fetch('/bunker/action', {
            method: 'POST',
            body: JSON.stringify({ user: location.search.slice(6),section, action: 'remove_section' }),
        });
    };

    createField = async (section, login, password) => {
        await fetch('/bunker/action', {
            method: 'POST',
            body: JSON.stringify({ user: location.search.slice(6),section, login, password, action: 'create_field' }),
        });
    };

    updateField = async (section, login, password, prevLogin) => {
        await fetch('/bunker/action', {
            method: 'POST',
            body: JSON.stringify({ user: location.search.slice(6),section, login, password, prev_login: prevLogin, action: 'update_field' }),
        });
    };

    removeField = async (section, login) => {
        await fetch('/bunker/action', {
            method: 'POST',
            body: JSON.stringify({ user: location.search.slice(6),section, login, action: 'remove_field' }),
        });
    };
}
