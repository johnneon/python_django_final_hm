const user_remove_btns = [... (document.querySelectorAll('[data-remove]') ?? [])];

user_remove_btns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const user = btn.dataset.remove;

        if (!user) {
            return;
        }

        await fetch('/accounts/action', {
            method: 'POST',
            body: JSON.stringify({ user, action: 'delete' }),
        });

        btn.parentNode.remove();
    });
});
