"use client";

import { useState, type FormEvent } from "react";
import { useStore } from "@/lib/store";
import {
  errorProps,
  Field,
  inputClass,
  isEmail,
  primaryButtonClass,
  Select,
  SuccessState,
  textareaClass,
  type FieldErrors,
  secondaryButtonClass,
} from "@/components/info/fields";

const subjects = ["Order", "Returns", "Product", "Other"] as const;

type Key = "name" | "email" | "phone" | "order" | "subject" | "message";
const initial: Record<Key, string> = { name: "", email: "", phone: "", order: "", subject: "", message: "" };

// Front-end only: validates, then shows an inline success state. Nothing is sent.
export function ContactForm() {
  const { notify } = useStore();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors<Key>>({});
  const [sent, setSent] = useState(false);

  const set = (key: Key) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: FieldErrors<Key> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!isEmail(values.email)) next.email = "Please enter a valid email address.";
    if (!values.subject) next.subject = "Please choose a subject.";
    if (!values.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setSent(true);
    notify("Message sent");
  };

  if (sent) {
    return (
      <div className="rounded-[6px] border border-black/10">
        <SuccessState
          title="Thanks — we'll get back to you soon."
          action={
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => {
                setValues(initial);
                setSent(false);
              }}
            >
              Send another message
            </button>
          }
        />
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Contact form" className="grid gap-5 sm:grid-cols-2">
      <Field id="contact-name" label="Name" error={errors.name}>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          className={inputClass}
          value={values.name}
          onChange={(e) => set("name")(e.target.value)}
          {...errorProps("contact-name", errors.name)}
        />
      </Field>
      <Field id="contact-email" label="Email" error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
          {...errorProps("contact-email", errors.email)}
        />
      </Field>
      <Field id="contact-phone" label="Phone" optional>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
          value={values.phone}
          onChange={(e) => set("phone")(e.target.value)}
        />
      </Field>
      <Field id="contact-order" label="Order number" optional>
        <input
          id="contact-order"
          name="order"
          placeholder="#1001"
          className={inputClass}
          value={values.order}
          onChange={(e) => set("order")(e.target.value)}
        />
      </Field>
      <Field id="contact-subject" label="Subject" error={errors.subject} className="sm:col-span-2">
        <Select
          id="contact-subject"
          value={values.subject}
          onChange={set("subject")}
          options={subjects}
          placeholder="Choose a subject"
          error={errors.subject}
        />
      </Field>
      <Field id="contact-message" label="Message" error={errors.message} className="sm:col-span-2">
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className={textareaClass}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          {...errorProps("contact-message", errors.message)}
        />
      </Field>
      <div className="sm:col-span-2">
        <button type="submit" className={primaryButtonClass}>
          Send
        </button>
      </div>
    </form>
  );
}
