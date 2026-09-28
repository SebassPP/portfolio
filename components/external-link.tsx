import type { ReactNode } from "react";

import { ExternalArrow } from "./external-arrow";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
};

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="link inline-flex items-baseline"
    >
      {children}
      <ExternalArrow />
    </a>
  );
}
