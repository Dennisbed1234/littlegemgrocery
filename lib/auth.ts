export const SESSION_COOKIE = "lg_session";

function secret() {
  return process.env.ADMIN_SECRET || "little-gem-dev-secret-change-me";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "littlegem";
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

async function hmacHex(message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message),
  );
  return toHex(sig);
}

export function passwordsMatch(input: string, expected: string) {
  if (input.length !== expected.length) return false;
  let out = 0;
  for (let i = 0; i < input.length; i++) {
    out |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return out === 0;
}

export async function createSessionToken() {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const sig = await hmacHex(String(exp));
  return `${exp}.${sig}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token || !token.includes(".")) return false;
  const [expRaw, sig] = token.split(".");
  const exp = Number(expRaw);
  if (!exp || Date.now() > exp) return false;
  if (!sig || sig.length < 16) return false;
  const expected = await hmacHex(String(exp));
  return timingSafeEqualHex(sig, expected);
}
