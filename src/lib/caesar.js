// lib/caesar.js
export function normalizeShift(shift) {
  const n = ((shift % 26) + 26) % 26;
  return n;
}

export function caesar(text, shift) {
  const s = normalizeShift(shift);

  return text.replace(/[A-Za-z]/g, (ch) => {
    const isLower = ch >= 'a' && ch <= 'z';
    const base = isLower ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
    const code = ch.charCodeAt(0) - base;
    const rotated = (code + s) % 26;
    return String.fromCharCode(base + rotated);
  });
}

export function caesarDecrypt(text, shift) {
  return caesar(text, -shift);
}
