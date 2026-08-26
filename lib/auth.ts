import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "lg_session";

function secret() {
  return process.env.ADMIN_SECRET || "little-gem-dev-secret-change-me";
}

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "littlegem";
}

export function passwordsMatch(input: string, expected: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken() {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  const sig = createHmac("sha256", secret()).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !token.includes(".")) return false;
  const [expRaw, sig] = token.split(".");
  const exp = Number(expRaw);
  if (!exp || Date.now() > exp) return false;
  const expected = createHmac("sha256", secret()).update(String(exp)).digest("hex");
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
