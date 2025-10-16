import nodemailer from "nodemailer";

class ChatBotService {
  constructor() {
    this.conversations = new Map();
    this.supportEmail = "andiswacyriam@gmail.com";
  }

  getConversationState(socketId) {
    if (!this.conversations.has(socketId)) {
      this.conversations.set(socketId, {
        stage: "greeting",
        messageCount: 0,
        issue: "",
        messages: []
      });
    }
    return this.conversations.get(socketId);
  }

  async processMessage(socketId, userMessage) {
    const conversation = this.getConversationState(socketId);
    conversation.messageCount++;
    conversation.messages.push({ from: "User", text: userMessage });

    let botResponse = "";
    let shouldEscalate = false;

    switch (conversation.stage) {
      case "greeting":
        botResponse = "Hi! I'm here to help. Could you please describe the issue you're experiencing?";
        conversation.stage = "collecting_issue";
        break;

      case "collecting_issue":
        conversation.issue = userMessage;
        botResponse = this.getProbeQuestion(userMessage);
        conversation.stage = "probing";
        break;

      case "probing":
        conversation.messages.push({ from: "User", text: userMessage });

        if (conversation.messageCount >= 3) {
          botResponse = "Thank you for providing those details. Let me escalate this to our support team for further assistance. You'll receive a response at the email you provided, or our team will follow up with you shortly.";
          conversation.stage = "escalated";
          shouldEscalate = true;
        } else {
          botResponse = this.getFollowUpQuestion(conversation.messageCount);
        }
        break;

      case "escalated":
        botResponse = "Your query has already been escalated to our support team. They will get back to you soon. Is there anything else I can help you with?";
        break;

      default:
        botResponse = "I'm here to help! Please describe your issue.";
    }

    if (shouldEscalate) {
      await this.escalateToEmail(conversation, socketId);
    }

    return { text: botResponse, shouldEscalate };
  }

  getProbeQuestion(issue) {
    const lowerIssue = issue.toLowerCase();

    if (lowerIssue.includes("book") || lowerIssue.includes("read")) {
      return "I understand you're having trouble with books. Can you tell me which specific book or feature you're having issues with?";
    } else if (lowerIssue.includes("account") || lowerIssue.includes("login") || lowerIssue.includes("password")) {
      return "I see you're experiencing account-related issues. Are you unable to log in, or is there a problem with your account settings?";
    } else if (lowerIssue.includes("payment") || lowerIssue.includes("subscription")) {
      return "I understand you have a payment or subscription concern. Could you provide more details about what happened?";
    } else {
      return "I see. Can you provide more details about when this issue started and what you were trying to do?";
    }
  }

  getFollowUpQuestion(messageCount) {
    const questions = [
      "Have you tried any steps to resolve this issue? If so, what happened?",
      "Is there any error message you're seeing, or any other details that might help?",
      "When did this issue first occur? Is it happening consistently?"
    ];
    return questions[messageCount - 2] || questions[questions.length - 1];
  }

  async escalateToEmail(conversation, socketId) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const conversationHistory = conversation.messages
        .map(msg => `${msg.from}: ${msg.text}`)
        .join("\n");

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: this.supportEmail,
        subject: `[Support Query] New escalation from Live Chat - ${socketId}`,
        text: `A new support query has been escalated from the live chat.\n\nSocket ID: ${socketId}\n\nConversation History:\n${conversationHistory}\n\nPlease follow up with the customer.`
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Query escalated to ${this.supportEmail} for socket ${socketId}`);
    } catch (error) {
      console.error("❌ Error sending escalation email:", error.message);
    }
  }

  clearConversation(socketId) {
    this.conversations.delete(socketId);
  }
}

export default new ChatBotService();
