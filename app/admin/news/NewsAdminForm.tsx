"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type NewsFormProps = {
  initial?: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    body: string;
    status: "rascunho" | "publicado";
  };
};

export default function NewsAdminForm({ initial }: NewsFormProps) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = {
      title: form.get("title"),
      slug: form.get("slug"),
      excerpt: form.get("excerpt"),
      body: form.get("body"),
      status: form.get("status"),
    };

    const url = initial ? `/api/admin/news/${initial.id}` : "/api/admin/news";
    const method = initial ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setState("error");
      setMessage(result.error || "Não foi possível salvar.");
      return;
    }

    router.push("/admin/news");
    router.refresh();
  }

  async function remove() {
    if (!initial) return;
    if (!confirm(`Excluir a notícia "${initial.title}"? Essa ação não pode ser desfeita.`)) return;
    await fetch(`/api/admin/news/${initial.id}`, { method: "DELETE" });
    router.push("/admin/news");
    router.refresh();
  }

  return (
    <form className="newsForm" onSubmit={submit}>
      <label>
        <span>Título</span>
        <input name="title" required minLength={3} defaultValue={initial?.title} />
      </label>
      <label>
        <span>URL (slug) <small>opcional — gerado do título se vazio</small></span>
        <input name="slug" defaultValue={initial?.slug} placeholder="ex: eder-visita-cascavel" />
      </label>
      <label>
        <span>Resumo</span>
        <textarea name="excerpt" required minLength={3} rows={2} defaultValue={initial?.excerpt} />
      </label>
      <label>
        <span>Conteúdo</span>
        <textarea name="body" required minLength={3} rows={12} defaultValue={initial?.body} />
      </label>
      <label className="newsFormStatus">
        <span>Status</span>
        <select name="status" defaultValue={initial?.status || "rascunho"}>
          <option value="rascunho">Rascunho</option>
          <option value="publicado">Publicado</option>
        </select>
      </label>

      <div className="newsFormActions">
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Salvando..." : "Salvar notícia"}
        </button>
        {initial && (
          <button type="button" className="newsFormDelete" onClick={remove}>
            Excluir
          </button>
        )}
      </div>
      {message && <p className="newsFormError">{message}</p>}
    </form>
  );
}
