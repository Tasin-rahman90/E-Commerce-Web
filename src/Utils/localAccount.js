const USERS_KEY = "exclusive.localUsers";
const SESSION_KEY = "exclusive.localSession";
const AUTH_EVENT = "exclusive:account-change";

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const getSessionId = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null")?.id || null;
  } catch {
    return null;
  }
};

const normalizeIdentifier = (identifier) => identifier.trim().toLowerCase();

const validateIdentifier = (identifier) => {
  const value = identifier.trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^\+?\d[\d ()-]{6,}$/.test(value);
  if (!isEmail && !isPhone) throw new Error("Enter a valid email address or phone number.");
};

const toHex = (bytes) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

const fromHex = (value) => new Uint8Array(value.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)));

const hashPassword = async (password, salt = crypto.getRandomValues(new Uint8Array(16))) => {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" }, key, 256);
  return { salt: toHex(salt), passwordHash: toHex(new Uint8Array(bits)) };
};

const privateAccountFields = new Set(["passwordHash", "salt", "normalizedIdentifier"]);

const toPublicAccount = (account) => Object.fromEntries(
  Object.entries(account).filter(([key]) => !privateAccountFields.has(key)),
);

const notifyAccountChange = () => window.dispatchEvent(new Event(AUTH_EVENT));

const saveSession = (account) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: account.id }));
  notifyAccountChange();
};

export const getCurrentAccount = () => {
  const id = getSessionId();
  if (!id) return null;
  const account = getUsers().find((user) => user.id === id);
  return account ? toPublicAccount(account) : null;
};

export const subscribeToAccountChanges = (listener) => {
  window.addEventListener(AUTH_EVENT, listener);
  return () => window.removeEventListener(AUTH_EVENT, listener);
};

export const registerLocalAccount = async ({ name, identifier, password }) => {
  validateIdentifier(identifier);
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const users = getUsers();
  if (users.some((user) => user.normalizedIdentifier === normalizedIdentifier)) {
    throw new Error("An account with this email or phone number already exists.");
  }

  const [firstName = "", ...lastNameParts] = name.trim().split(/\s+/);
  const credentials = await hashPassword(password);
  const account = {
    id: crypto.randomUUID(),
    firstName,
    lastName: lastNameParts.join(" "),
    emailOrPhone: identifier.trim(),
    address: "",
    normalizedIdentifier,
    ...credentials,
  };

  users.push(account);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  saveSession(account);
  return toPublicAccount(account);
};

export const loginLocalAccount = async ({ identifier, password }) => {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  const account = getUsers().find((user) => user.normalizedIdentifier === normalizedIdentifier);
  if (!account) throw new Error("No account was found for that email or phone number.");

  const { passwordHash } = await hashPassword(password, fromHex(account.salt));
  if (passwordHash !== account.passwordHash) throw new Error("The password you entered is incorrect.");

  saveSession(account);
  return toPublicAccount(account);
};

export const updateLocalAccount = async ({ firstName, lastName, emailOrPhone, address, currentPassword, newPassword, confirmPassword }) => {
  const id = getSessionId();
  const users = getUsers();
  const account = users.find((user) => user.id === id);
  if (!account) throw new Error("Please log in again to update your profile.");

  validateIdentifier(emailOrPhone);
  const normalizedIdentifier = normalizeIdentifier(emailOrPhone);
  if (users.some((user) => user.id !== id && user.normalizedIdentifier === normalizedIdentifier)) {
    throw new Error("Another account already uses this email or phone number.");
  }

  const changingPassword = currentPassword || newPassword || confirmPassword;
  if (changingPassword) {
    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new Error("Fill in all three password fields to change your password.");
    }
    const { passwordHash: currentHash } = await hashPassword(currentPassword, fromHex(account.salt));
    if (currentHash !== account.passwordHash) throw new Error("Your current password is incorrect.");
    if (newPassword.length < 8) throw new Error("Your new password must be at least 8 characters.");
    if (newPassword !== confirmPassword) throw new Error("The new passwords do not match.");
    Object.assign(account, await hashPassword(newPassword));
  }

  Object.assign(account, {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    emailOrPhone: emailOrPhone.trim(),
    normalizedIdentifier,
    address: address.trim(),
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  notifyAccountChange();
  return toPublicAccount(account);
};

export const signOutLocalAccount = () => {
  localStorage.removeItem(SESSION_KEY);
  notifyAccountChange();
};