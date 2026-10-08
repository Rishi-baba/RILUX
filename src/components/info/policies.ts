// Placeholder policy content. NOT legal text — replace every section with your
// store's own policy, reviewed by a legal professional.

export interface PolicySection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface Policy {
  slug: string;
  title: string;
  sections: PolicySection[];
}

const p = (topic: string) =>
  `Placeholder paragraph about ${topic}. Replace this with your store's own wording.`;

const section = (heading: string, topic: string, two = false): PolicySection => ({
  id: heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  heading,
  paragraphs: two ? [p(topic), `A second short placeholder paragraph with more detail on ${topic}.`] : [p(topic)],
});

export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms & Conditions",
    sections: [
      section("Overview", "how these terms apply", true),
      section("Using the Site", "use of the website"),
      section("Orders & Pricing", "orders and pricing", true),
      section("Intellectual Property", "site content ownership"),
      section("Changes to These Terms", "updates to this page"),
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    sections: [
      section("Information We Collect", "the information collected", true),
      section("How We Use It", "how information is used"),
      section("Cookies", "cookies and similar tools"),
      section("Your Choices", "customer choices", true),
      section("Contact", "privacy questions"),
    ],
  },
  {
    slug: "refund",
    title: "Refund & Exchange Policy",
    sections: [
      section("Eligibility", "which items qualify", true),
      section("How to Request", "starting a request"),
      section("Refunds", "how refunds are handled", true),
      section("Exchanges", "how exchanges work"),
      section("Exceptions", "items that are excluded"),
    ],
  },
  {
    slug: "shipping",
    title: "Shipping Policy",
    sections: [
      section("Processing Time", "order processing", true),
      section("Delivery Estimates", "delivery timelines"),
      section("Shipping Charges", "shipping costs"),
      section("Tracking", "order tracking"),
      section("Delays & Issues", "delayed or lost parcels", true),
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((x) => x.slug === slug);
