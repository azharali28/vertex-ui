// Display code previews (docs)
document.querySelectorAll(".vx-snippet").forEach(block => {
    const preview = block.querySelector(".vx-preview");
    const codeBlock = block.querySelector(".vx-code code");

    if (!preview || !codeBlock) return;

    let html = preview.innerHTML;

    const lines = html.split("\n");

    // Remove first and last empty lines
    while (lines.length && lines[0].trim() === "") lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();

    // Detect minimum indentation
    const indents = lines
        .filter(line => line.trim())
        .map(line => line.match(/^(\s*)/)[0].length);

    const minIndent = indents.length ? Math.min(...indents) : 0;

    // Remove base indentation
    const cleaned = lines
        .map(line => line.slice(minIndent))
        .join("\n");

    codeBlock.textContent = cleaned;
});

// Copy button
document.querySelectorAll('[data-copy-icon]').forEach(copyIcon => {
    copyIcon.addEventListener('click', () => {
        const block = copyIcon.closest('[data-copy]');
        const code = block.querySelector('[data-copy-code]');
        const icon = copyIcon.querySelector('i');

        navigator.clipboard.writeText(code.textContent).then(() => {
            icon.className = 'fa-solid fa-check';
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
            }, 2000);
        })
    });
});