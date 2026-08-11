import { getChatGPTUser } from "../chatgpt-auth";
import { getRuntimeConfig } from "../../db/runtime";
import { headers } from "next/headers";

export async function getAuthorizedAdmin() {
  const requestHeaders = await headers();
  const accessEmail = requestHeaders.get("cf-access-authenticated-user-email");
  const chatGPTUser = await getChatGPTUser();
  const user = accessEmail
    ? { displayName: accessEmail, email: accessEmail, fullName: null }
    : chatGPTUser;
  if (!user) return { user: null, authorized: false };
  const configured = getRuntimeConfig().ADMIN_EMAILS || "contato@ederbublitz.com.br";
  const allowed = configured.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  return { user, authorized: allowed.includes(user.email.toLowerCase()) };
}
