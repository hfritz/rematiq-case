"use client";

import { Fragment, type ReactNode } from "react";
import type { Block, Inline } from "@/lib/types";
import { CitationTrigger } from "./citation-trigger";
import { resolveCitation } from "@/lib/mock-data";

/**
 * Render a run of inline content as prose and collect every citation it
 * references. Citations are never shown mid-sentence — they are returned so the
 * caller can render them as chips at the end of the block (paragraph / list
 * item), in first-appearance order with duplicates removed.
 */
function renderInlines(nodes: Inline[]): {
  body: ReactNode;
  citationIds: string[];
} {
  const citationIds: string[] = [];
  const push = (id: string) => {
    if (!citationIds.includes(id)) citationIds.push(id);
  };

  const body = nodes.map((node, i) => {
    if (node.type === "text") return <Fragment key={i}>{node.text}</Fragment>;
    if (node.type === "bold")
      return (
        <strong key={i} className="font-semibold text-foreground">
          {node.text}
        </strong>
      );
    if (node.type === "claim") {
      push(node.citationId);
      const broken = !!resolveCitation(node.citationId)?.contentUnit?.deleted;
      return (
        <span key={i} className={broken ? "" : "text-foreground"}>
          {node.text}
        </span>
      );
    }
    // claims — synthesized text grounded in several sources
    node.citationIds.forEach(push);
    return (
      <span key={i} className="text-foreground">
        {node.text}
      </span>
    );
  });

  return { body, citationIds };
}

/** A trailing row of citation chips, rendered at the end of a block. */
function TrailingCitations({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;
  return (
    <>
      {ids.map((id) => (
        <CitationTrigger key={id} citationId={id} />
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
          case "p": {
            const { body, citationIds } = renderInlines(block.content);
            return (
              <p key={i} className="text-[15px] leading-relaxed text-text-secondary">
                {body}
                <TrailingCitations ids={citationIds} />
              </p>
            );
          }
          case "ul":
            return (
              <ul key={i} className="space-y-1.5 pl-1">
                {block.items.map((item, j) => {
                  const { body, citationIds } = renderInlines(item);
                  return (
                    <li
                      key={j}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-text-secondary"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-muted" />
                      <span>
                        {body}
                        <TrailingCitations ids={citationIds} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-5 text-[15px] leading-relaxed text-text-secondary marker:text-text-muted">
                {block.items.map((item, j) => {
                  const { body, citationIds } = renderInlines(item);
                  return (
                    <li key={j}>
                      {body}
                      <TrailingCitations ids={citationIds} />
                    </li>
                  );
                })}
              </ol>
            );
          case "quote": {
            const { body } = renderInlines(block.content);
            return (
              <blockquote
                key={i}
                className="border-l-2 border-brand/40 bg-bg-subtle py-2.5 pl-4 pr-3 text-[14px] italic leading-relaxed text-text-secondary"
              >
                {body}
                {block.citationId ? (
                  <span className="not-italic">
                    {" "}
                    <CitationTrigger citationId={block.citationId} />
                  </span>
                ) : null}
              </blockquote>
            );
          }
          case "hr":
            return <hr key={i} className="border-border" />;
        }
      })}
    </div>
  );
}
