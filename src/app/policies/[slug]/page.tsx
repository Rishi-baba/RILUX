import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/info/PageHero";
import { getPolicy, policies } from "@/components/info/policies";
import { Prose } from "@/components/info/Prose";
import { routes } from "@/lib/content";

// Only the four known policies exist; anything else 404s.
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return { title: policy.title, description: `Placeholder ${policy.title.toLowerCase()} for the storefront template.` };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <PageHero title={policy.title} />
      <div className="mx-auto max-w-[1100px] lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 lg:px-4">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="mb-3 font-ui text-[12px] font-medium uppercase tracking-[0.08em] text-black">On this page</p>
            <ul className="flex flex-col gap-2 border-l border-black/10">
              {policy.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent pl-4 font-ui text-[13px] leading-[1.5] text-stone transition-colors hover:border-black hover:text-black"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="lg:[&>div]:mx-0 lg:[&>div]:px-0">
          <Prose>
            <div
              role="note"
              className="mb-6 border-l-4 border-brand bg-sand px-5 py-4 font-ui text-[13px] leading-[1.6] text-black"
            >
              <strong className="font-semibold">Placeholder text</strong> — replace with your store&apos;s own policy,
              reviewed by a legal professional.
            </div>
            <p className="text-[13px]! text-stone!">Last updated: placeholder date</p>
            {policy.sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{s.heading}</h2>
                {s.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </section>
            ))}
            <p className="mt-10">
              Questions? <Link href={routes.contact}>Contact us</Link>.
            </p>
          </Prose>
        </article>
      </div>
    </>
  );
}
