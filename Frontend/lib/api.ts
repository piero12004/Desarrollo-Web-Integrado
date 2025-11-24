export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function apiFetch(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });

  const text = await res.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) throw data || { status: res.status, body: text };
    return data;
  } catch (e) {
    if (!res.ok) throw { status: res.status, body: text };
    return text;
  }
}
