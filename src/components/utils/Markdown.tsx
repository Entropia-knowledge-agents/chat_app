import Link from 'next/link';
import React, { memo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Code = ({ inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className ?? '');
  return !inline && match ? (
    <pre
      {...props}
      className={`${className} text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll bg-zinc-100 p-3 rounded-lg mt-2 dark:bg-zinc-800`}
    >
      <code className={match[1]}>{children}</code>
    </pre>
  ) : (
    <code
      className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
      {...props}
    >
      {children}
    </code>
  );
};

const OrderedList = ({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) => {
  return (
    <ol className="list-decimal list-outside ml-4" {...props}>
      {children}
    </ol>
  );
};

const ListItem = ({ children, ...props }: React.ComponentPropsWithoutRef<'li'>) => {
  return (
    <li className="py-1" {...props}>
      {children}
    </li>
  );
};

const UnorderedList = ({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) => {
  return (
    <ul className="list-disc list-outside ml-4" {...props}>
      {children}
    </ul>
  );
};

const Strong = ({ children, ...props }: React.ComponentPropsWithoutRef<'span'>) => {
  return (
    <span className="font-semibold" {...props}>
      {children}
    </span>
  );
};

const CustomLink = ({ children, href, ...props }: React.ComponentPropsWithoutRef<'a'>) => {
  return (
    <Link
      href={href as string}
      className="text-blue-500 hover:underline"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </Link>
  );
};

const Heading1 = ({ children, ...props }: React.ComponentPropsWithoutRef<'h1'>) => {
  return (
    <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h1>
  );
};

const Heading2 = ({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) => {
  return (
    <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h2>
  );
};

const Heading3 = ({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) => {
  return (
    <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h3>
  );
};

const Heading4 = ({ children, ...props }: React.ComponentPropsWithoutRef<'h4'>) => {
  return (
    <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
      {children}
    </h4>
  );
};

const Heading5 = ({ children, ...props }: React.ComponentPropsWithoutRef<'h5'>) => {
  return (
    <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
      {children}
    </h5>
  );
};

const Heading6 = ({ children, ...props }: React.ComponentPropsWithoutRef<'h6'>) => {
  return (
    <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
      {children}
    </h6>
  );
};

const NonMemoizedMarkdown = ({ children }: { children: string }) => {
  const components: Partial<Components> = {
    code: Code,
    ol: OrderedList,
    li: ListItem,
    ul: UnorderedList,
    strong: Strong,
    a: CustomLink,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);