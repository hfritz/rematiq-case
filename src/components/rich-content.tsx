"use client";

import type { Block, Inline } from "@/lib/types";
import { CitationTrigger } from "./citation-trigger";

function InlineSpan({ node }: { node: Inline }) {
  if (node.type === "text") return <>{node.text}</>;
  if (node.type === "bold")
    return <strong className="font-semibold text-foreground">{node.text}</strong>;
  // claim
  return <CitationTrigger citationId={node.citationId}>{node.text}</CitationTrigger>;
}

function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => (
        <InlineSpan key={i} node={n} />
      ))}
    </>
  );
}

export function RichContent({
  blocks,
  variant = "document",
}: {
  blocks: Block[];
  /** "document" gives generous spacing; "chat" is tighter. */
  variant?: "document" | "chat";
}) {
  const gap = variant === "document" ? "space-y-4" : "space-y-3";

  return (
    <div className={gap}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h1":
            return (
              <h1
                key={i}
                className="text-[22px] font-semibold leading-snug text-foreground"
              >
                {block.text}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="pt-1 text-[18px] font-semibold leading-snug text-foreground"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="text-[16px] font-semibold leading-snug text-foreground"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[15px] leading-relaxed text-text-secondary">
                <Inlines nodes={block.content} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-1.5 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted" />
                    <span>
                      <Inlines nodes={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed text-text-secondary marker:text-text-muted">
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inlines nodes={item} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-brand/40 bg-bg-subtle py-2.5 pl-4 pr-3 text-[14px] italic leading-relaxed text-text-secondary"
              >
                <Inlines nodes={block.content} />
                {block.citationId ? (
                  <span className="not-italic">
                    {" "}
                    <CitationTrigger citationId={block.citationId} markerOnly />
                  </span>
                ) : null}
              </blockquote>
            );
          case "hr":
            return <hr key={i} className="border-border" />;
        }
      })}
    </div>
  );
}
