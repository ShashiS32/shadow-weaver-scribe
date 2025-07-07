const REGISTRATION_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1391818988274712729/kqQsz3nWoGB1VvfqeFxNhXsqY__INu4OcoaEozvg3WTPim3vQHydmN5sIbtFeSOagdoo";
const CLASS_SIGNUP_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1391819024823881768/Z3mXieWXdXvIYtTObQ6KhHEfG4wiHAWxL3WkCQOxtkgHEAqONBNGo__-zA0MjHM0eac1";

interface PayloadField {
  name: string;
  value: string;
  inline?: boolean;
}

const buildEmbed = (title: string, fields: PayloadField[]) => ({
  embeds: [
    {
      title,
      fields,
      timestamp: new Date().toISOString(),
    },
  ],
});

export const sendNotificationWebhook = async (
  type: "registration" | "class_signup",
  data: Record<string, any>
): Promise<boolean> => {
  try {
    const url =
      type === "registration"
        ? REGISTRATION_WEBHOOK_URL
        : CLASS_SIGNUP_WEBHOOK_URL;
    const fields: PayloadField[] = Object.entries(data).map(([key, val]) => ({
      name: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      value: String(val),
      inline: !!["email", "gradeLevel"].includes(key),
    }));
    const embedPayload = buildEmbed(
      type === "registration"
        ? "🔔 New User Registration"
        : "📝 New Class Signup",
      fields
    );
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(embedPayload),
    });
    return true;
  } catch {
    return false;
  }
};

export const sendRegistrationNotification = (userData: {
  fullName: string;
  email: string;
  gradeLevel: string;
  confidenceLevel: string;
}) => sendNotificationWebhook("registration", userData);

export const sendClassSignupNotification = (formData: {
  fullName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  preferredTime: string;
  comments: string;
}) => sendNotificationWebhook("class_signup", formData);
