
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UploadedFile {
  name: string;
  url: string;
  size: number;
  type: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, contactPerson, email, message, customerType, attachments } = await req.json()

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not found')
    }

    const emailSubject = `Ny kontakt från ${customerType === 'company' ? 'företag' : 'privatperson'}: ${name}`
    
    let emailBody = `
      <h2>Ny kontakt från hemsidan</h2>
      <p><strong>Typ:</strong> ${customerType === 'company' ? 'Företag' : 'Privatperson'}</p>
      <p><strong>${customerType === 'company' ? 'Företagsnamn' : 'Namn'}:</strong> ${name}</p>
    `
    
    if (customerType === 'company' && contactPerson) {
      emailBody += `<p><strong>Kontaktperson:</strong> ${contactPerson}</p>`
    }
    
    emailBody += `
      <p><strong>E-post:</strong> ${email}</p>
      <p><strong>Meddelande:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
    `

    if (attachments && attachments.length > 0) {
      emailBody += `<p><strong>Bifogade filer:</strong> ${attachments.length} st</p>`
    }

    emailBody += `<p><small>Skickat från hustoftasmide.se kontaktformulär</small></p>`

    const emailData: any = {
      from: 'onboarding@resend.dev',
      to: ['info@hustoftasmide.se'],
      subject: emailSubject,
      html: emailBody,
      reply_to: email,
    }

    // Download and attach files if any
    if (attachments && attachments.length > 0) {
      const emailAttachments = []
      
      for (const file of attachments as UploadedFile[]) {
        try {
          console.log('Downloading file from:', file.url)
          
          const fileResponse = await fetch(file.url)
          if (!fileResponse.ok) {
            console.error(`Failed to download file ${file.name}: ${fileResponse.status}`)
            continue
          }
          
          const fileBuffer = await fileResponse.arrayBuffer()
          const base64Content = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)))
          
          emailAttachments.push({
            filename: file.name,
            content: base64Content,
            type: file.type,
            disposition: 'attachment'
          })
          
          console.log(`Successfully processed attachment: ${file.name}`)
        } catch (error) {
          console.error(`Error processing attachment ${file.name}:`, error)
        }
      }
      
      if (emailAttachments.length > 0) {
        emailData.attachments = emailAttachments
      }
    }

    console.log('Skickar e-post med data:', {
      ...emailData,
      attachments: emailData.attachments ? `${emailData.attachments.length} filer` : 'Inga bilagor'
    })

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error('Resend API error:', errorText)
      throw new Error(`Failed to send email: ${resendResponse.status}`)
    }

    const result = await resendResponse.json()
    console.log('Email sent successfully:', result)

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
