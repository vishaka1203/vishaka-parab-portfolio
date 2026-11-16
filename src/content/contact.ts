export const contactEmail = "devvishakaparab@gmail.com";

export function emailDraft(input: {
  name: string;
  email: string;
  message: string;
}) {
  const subject = encodeURIComponent("Portfolio enquiry");
  const body = encodeURIComponent(
    `Hi Vishaka,\n\n${input.message}\n\nFrom: ${input.name}\nReply to: ${input.email}`,
  );
  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}
