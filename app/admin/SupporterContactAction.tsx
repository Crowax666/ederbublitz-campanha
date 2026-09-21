"use client";

function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("55") ? digits : `55${digits}`;
}

export default function SupporterContactAction({ phone, message }: { phone: string; message: string }) {
  const href = `https://wa.me/${whatsappNumber(phone)}?text=${encodeURIComponent(message)}`;
  return <a className="adminContactButton" href={href} target="_blank" rel="noopener noreferrer">Conversar <span aria-hidden="true">→</span></a>;
}
