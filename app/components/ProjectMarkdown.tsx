import katexStyles from "katex/dist/katex.min.css?url";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

type Props = {
  content: string;
};

export function links() {
  return [{ rel: "stylesheet", href: katexStyles }];
}

export default function ProjectMarkdown({ content }: Props) {
  return (
    <div className="project-prose prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-primary prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-muted prose-p:leading-relaxed prose-p:mb-6 prose-li:text-muted prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded prose-img:rounded-xl prose-img:border prose-img:border-border">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          img: ({ src, alt, ...imageProps }) => {
            const imageSrc = src?.startsWith("/images/")
              ? `${import.meta.env.BASE_URL}${src.slice(1)}`
              : src;
            return <img src={imageSrc} alt={alt ?? ""} {...imageProps} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
