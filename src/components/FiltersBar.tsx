import React, { useCallback } from "react";
import type { Query } from "../lib/query";

export const FiltersBar: React.FC<{
  value: Required<Query>;
  onChange: (q: Partial<Query>) => void;
  total: number;
  shown: number;
}> = ({ value, onChange, total, shown }) => {
  const onInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange({ q: e.target.value }),
    [onChange]
  );
  const onSelect =
    (key: keyof Query) => (e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange({ [key]: e.target.value } as any);

  return (
    <div className="panel" style={{ marginBottom: 16 }}>
      <div
        className="row"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <div className="row" style={{ flex: 1, minWidth: 260 }}>
          <input
            className="input"
            placeholder="Search title or description…"
            value={value.q}
            onChange={onInput}
          />
          <select
            className="select"
            value={value.status}
            onChange={onSelect("status")}
          >
            <option value="all">All status</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select
            className="select"
            value={value.priority}
            onChange={onSelect("priority")}
          >
            <option value="all">All priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="row">
          <select
            className="select"
            value={value.sort}
            onChange={onSelect("sort")}
          >
            <option value="createdAt">Sort: Created</option>
            <option value="dueDate">Sort: Due</option>
            <option value="title">Sort: Title</option>
          </select>
          <select
            className="select"
            value={value.dir}
            onChange={onSelect("dir")}
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>
      <div className="small" style={{ marginTop: 8 }}>
        {shown} of {total} tasks shown
      </div>
    </div>
  );
};
