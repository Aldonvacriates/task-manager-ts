export type Query = {
  q?: string;
  status?: "all" | "todo" | "in_progress" | "done";
  priority?: "all" | "low" | "medium" | "high";
  sort?: "createdAt" | "dueDate" | "title";
  dir?: "asc" | "desc";
};

export function parseQuery(sp: URLSearchParams): Required<Query> {
  return {
    q: sp.get("q") ?? "",
    status: (sp.get("status") as any) ?? "all",
    priority: (sp.get("priority") as any) ?? "all",
    sort: (sp.get("sort") as any) ?? "createdAt",
    dir: (sp.get("dir") as any) ?? "desc",
  };
}

export function toQueryString(q: Query): URLSearchParams {
  const sp = new URLSearchParams();
  if (q.q) sp.set("q", q.q);
  if (q.status) sp.set("status", q.status);
  if (q.priority) sp.set("priority", q.priority);
  if (q.sort) sp.set("sort", q.sort);
  if (q.dir) sp.set("dir", q.dir);
  return sp;
}
