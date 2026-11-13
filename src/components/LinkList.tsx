"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { Link } from "@/lib/links";

type LinkListProps = {
  links: readonly Link[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모두 0회로 표시한다.
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let ignore = false;
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Record<string, number>) => {
        if (ignore) return;
        // 조회 응답이 늦게 와도 그 사이 누른 클릭이 사라지지 않도록 큰 값을 유지한다.
        setCounts((prev) => {
          const next = { ...data };
          for (const [id, n] of Object.entries(prev)) next[id] = Math.max(n, next[id] ?? 0);
          return next;
        });
      })
      .catch((error) => console.error("클릭 수를 불러오지 못했습니다:", error));
    return () => {
      ignore = true;
    };
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 +1 반영하고, 서버에는 새 탭으로 이동해도 끊기지 않도록 keepalive로 보낸다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    }).catch((error) => console.error("클릭 수를 저장하지 못했습니다:", error));
  }

  return (
    <nav className="flex w-full flex-col gap-5">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          title={link.title}
          url={link.url}
          clicks={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
