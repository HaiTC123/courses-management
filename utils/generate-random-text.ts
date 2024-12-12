export function generateRandomText(length: number = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
        const ch = String.fromCharCode(Math.floor(Math.random() * (91 - 65) + 65)); // ASCII codes for uppercase letters A-Z
        result += ch;
    }
    return result;
}
