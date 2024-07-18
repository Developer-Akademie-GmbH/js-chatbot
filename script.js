async function postChatMessage(){
    msgContainer.innerHTML += `<div class="msg-me">${chatField.value}</div>`;
    msgContainer.innerHTML += `<div class="msg">${await askChatGPT(chatField.value)}</div>`;
    chatField.value = '';
}


async function askChatGPT(question) {
    const apiKey = 'DEIN API KEY HIER';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `Du bist Programmierlehrer. Bitte antworte auf jede Frage so einfach, dass es auch ein 4 jähriges Kind versteht. Bitte antworte immer bildlich, z.B. mit einer Tabelle und gebe ein Beispiel.`
                },
                {
                    role: 'user',
                    content: question
                }
            ],
            max_tokens: 150
        })
    });

    if (!response.ok) {
        throw new Error(`Fehler: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}