import { useEffect } from "react";
import { SITE_URL } from "@/config/site";
import { applyPageMeta, type PageMetaTags } from "@/lib/seo";

export function useDocumentMeta(meta: PageMetaTags): void {
  useEffect(() => {
    applyPageMeta(meta, SITE_URL);
  }, [meta.title, meta.description, meta.image, meta.url, meta.type]);
}
