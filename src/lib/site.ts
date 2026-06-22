export const CONTACT_EMAIL = "max@populique.com";

export const WEBSITE_URL = "https://populique.com";

export const INSTAGRAM_URL = "https://www.instagram.com/populique.official/";

export const LINKEDIN_PERSONAL_URL =
  "https://www.linkedin.com/in/max-van-der-sterren-33a971418";

/** Set once the Populique company page is live. */
export const LINKEDIN_COMPANY_URL: string | null = null;

export const DEMO_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "/contact?intent=demo";

export const ESTIMATE_URL = "/pricing";

export function mailtoHref(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`;
}
