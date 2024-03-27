const TEXT = `
Your own password bunker.
No one can steal data from here, Alcatras in the world of $ prisoners.
`;
const PRE_TEXT = 'login-password';

const liveTextElement = document.querySelector('#live_text');

const sleep = async (time) =>
    await new Promise((res) => setTimeout(() => res(), time));

const liveTextAnimation = async (speed = 40) => {
    const text = TEXT.split('');
    for (let symbol of text) {
        await sleep(speed);

        if (symbol === '$') {
            const pre = document.createElement('pre');
            pre.classList.add('pre');
            liveTextElement.append(pre);
            for (let symbol of PRE_TEXT.split('')) {
                await sleep(speed);
                pre.innerHTML += symbol;
            }
            continue;
        }
        liveTextElement.innerHTML += symbol;
    }
};

liveTextAnimation();
