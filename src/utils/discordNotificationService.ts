
interface DiscordEmbed {
  title: string;
  description: string;
  color: number;
  fields: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  timestamp: string;
}

interface DiscordMessage {
  embeds: DiscordEmbed[];
}

const DISCORD_WEBHOOKS = {
  registration: 'https://discord.com/api/webhooks/1391818988274712729/kqQsz3nWoGB1VvfqeFxNhXsqY__INu4OcoaEozvg3WTPim3vQHydmN5sIbtFeSOagdoo',
  classSignup: 'https://discord.com/api/webhooks/1391819024823881768/Z3mXieWXdXvIYtTObQ6KhHEfG4wiHAWxL3WkCQOxtkgHEAqONBNGo__-zA0MjHM0eac1'
};

export const sendDiscordNotification = async (type: 'registration' | 'classSignup', data: any) => {
  try {
    const webhook = DISCORD_WEBHOOKS[type];
    let embed: DiscordEmbed;

    if (type === 'registration') {
      embed = {
        title: "🎓 New Student Registration",
        description: "A new student has registered for SAT Math Pro!",
        color: 0x3B82F6, // Blue color
        fields: [
          { name: "👤 Name", value: data.fullName, inline: true },
          { name: "📧 Email", value: data.email, inline: true },
          { name: "🎯 Grade Level", value: `${data.gradeLevel}th Grade`, inline: true },
          { name: "📊 Confidence Level", value: data.confidenceLevel.charAt(0).toUpperCase() + data.confidenceLevel.slice(1), inline: true },
          { name: "📅 Registration Date", value: new Date().toLocaleDateString(), inline: true }
        ],
        timestamp: new Date().toISOString()
      };
    } else {
      embed = {
        title: "📚 New Class Registration",
        description: "A student has registered for SAT Math classes!",
        color: 0x10B981, // Green color
        fields: [
          { name: "👤 Name", value: data.fullName, inline: true },
          { name: "📧 Email", value: data.email, inline: true },
          { name: "📞 Phone", value: data.phone || "Not provided", inline: true },
          { name: "🎯 Grade Level", value: `${data.gradeLevel}th Grade`, inline: true },
          { name: "⏰ Preferred Time", value: data.preferredTime.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()), inline: true },
          { name: "💬 Comments", value: data.comments || "No additional comments", inline: false }
        ],
        timestamp: new Date().toISOString()
      };
    }

    const message: DiscordMessage = {
      embeds: [embed]
    };

    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    console.log(`${type} Discord notification sent successfully`);
    return true;
  } catch (error) {
    console.error(`Discord notification failed for ${type}:`, error);
    return false;
  }
};

export const sendRegistrationNotification = async (userData: {
  fullName: string;
  email: string;
  gradeLevel: string;
  confidenceLevel: string;
}) => {
  return await sendDiscordNotification('registration', userData);
};

export const sendClassSignupNotification = async (formData: {
  fullName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  preferredTime: string;
  comments: string;
}) => {
  return await sendDiscordNotification('classSignup', formData);
};
