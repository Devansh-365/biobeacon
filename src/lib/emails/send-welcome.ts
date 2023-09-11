import { sendEmail } from "@/lib/resend";
import WelcomeEmail from "@/components/emails/welcome";
import { CreateUserEmailProps } from "@/types";

export const sendWelcomeEmail = async (params: CreateUserEmailProps) => {
  const { name, email } = params.user;
  const emailTemplate = WelcomeEmail({ name });
  await sendEmail({
    from: "Devansh from BioBeacon <devnashtiwari365@gmail.com>",
    to: email as string,
    subject: "Welcome to BioBeacon!",
    react: emailTemplate,
  });
};
