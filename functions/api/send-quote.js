// Cloudflare Pages Function: /api/send-quote
// Seamlessly forwards inquiries to info@swanwindows.com.au via Resend API (<100ms response)

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400"
    }
  });
}

export async function onRequestPost(context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };

  try {
    const { request, env } = context;
    const data = await request.json().catch(() => ({}));

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not configured in Cloudflare Pages environment variables.");
      // Return clear guide response so frontend can still complete gracefully
      return new Response(JSON.stringify({
        success: false,
        warning: "RESEND_API_KEY is not configured in Cloudflare Pages environment variables.",
        simulated: true
      }), {
        status: 200,
        headers: corsHeaders
      });
    }

    const {
      name = "Prospective Client",
      email = "Not provided",
      phone = "Not provided",
      location = "Perth Metro",
      projectType = "General Inquiry",
      message = "Request for detailed window schedule and pricing."
    } = data;

    // Resend email sender & receiver configuration
    // Since your domain (swanwindows.com.au) is verified in Resend, use it as the 'from' sender!
    const fromEmail = env.RESEND_FROM_EMAIL || "SwanView Quotes <quotes@swanwindows.com.au>";
    // Receiver(s): supports comma-separated emails so both info and dhlwing can receive
    const rawTo = env.RESEND_TO_EMAIL || "info@swanwindows.com.au, dhlwing@gmail.com";
    const toRecipients = rawTo.split(",").map(e => e.trim()).filter(Boolean);

    // Clean, professional HTML email format for SwanView Windows team
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e5e7eb; }
    .header { background: #10231f; padding: 24px 32px; border-bottom: 3px solid #b6864b; }
    .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
    .header p { color: #b6864b; margin: 6px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
    .content { padding: 32px; color: #1f2937; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-size: 14px; vertical-align: top; }
    .table td.label { color: #6b7280; width: 38%; font-weight: 600; }
    .table td.value { color: #111827; font-weight: 500; }
    .quote-box { background: #fdfbf7; border: 1px solid #f1e4d0; border-left: 4px solid #b6864b; padding: 16px; border-radius: 8px; margin-top: 10px; }
    .quote-box h4 { margin: 0 0 8px 0; color: #b6864b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .quote-box p { margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #374151; }
    .footer { padding: 20px 32px; background: #fafafa; border-top: 1px solid #f3f4f6; text-align: center; font-size: 12px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>SwanView Windows — Quote Inquiry</h1>
      <p>New Website Lead Received</p>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <td class="label">Customer Name (姓名):</td>
          <td class="value"><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <td class="label">Phone / WhatsApp (电话):</td>
          <td class="value"><a href="tel:${escapeHtml(phone)}" style="color: #b6864b; text-decoration: none;">${escapeHtml(phone)}</a></td>
        </tr>
        <tr>
          <td class="label">Email Address (邮箱):</td>
          <td class="value"><a href="mailto:${escapeHtml(email)}" style="color: #b6864b; text-decoration: none;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td class="label">Project Location (项目位置):</td>
          <td class="value">${escapeHtml(location)}</td>
        </tr>
        <tr>
          <td class="label">Project Type (项目类型):</td>
          <td class="value">${escapeHtml(projectType)}</td>
        </tr>
      </table>

      <div class="quote-box">
        <h4>Specifications & Notes (需求详情与算价汇总):</h4>
        <p>${escapeHtml(message)}</p>
      </div>
    </div>
    <div class="footer">
      Delivered via SwanView Cloudflare Edge & Resend Engine
    </div>
  </div>
</body>
</html>
    `;

    const resendPayload = {
      from: fromEmail,
      to: toRecipients.length > 0 ? toRecipients : ["info@swanwindows.com.au"],
      reply_to: (email && email.includes("@")) ? email : undefined,
      subject: `[SwanView Quote] ${name} - ${location} (${projectType})`,
      html: htmlBody
    };

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resendPayload)
    });

    const resendJson = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend API rejected:", resendJson);
      return new Response(JSON.stringify({
        success: false,
        resendStatus: resendRes.status,
        error: resendJson.message || "Failed to send email via Resend",
        help: resendRes.status === 403
          ? "Resend 403 Error: Testing emails sent via onboarding@resend.dev can only be delivered to the exact email address you used to register your Resend account. To send to any recipient or info@swanwindows.com.au, add and verify your domain at resend.com/domains."
          : undefined
      }), {
        status: resendRes.status,
        headers: corsHeaders
      });
    }

    return new Response(JSON.stringify({
      success: true,
      id: resendJson.id
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (err) {
    console.error("Unhandled error in /api/send-quote:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
