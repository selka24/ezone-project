import { serverSupabaseClient } from '#supabase/server';
import { createError } from 'h3';
// import { createTwilioClient } from '../utilities/twilio-loader.js';
import { Resend } from 'resend';
export default defineEventHandler(async (event) => {
    // handle GET requests for the `api/foo` endpoint
    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const client = await serverSupabaseClient(event);
    const body = await readBody(event);

    const {email, ...rest} = body.booking;

        const {data, error} = await client
        .from('bookings')
        .insert(rest)
        .select('*, companies (*)')
    if (error) {
        throw createError({ statusMessage: error.message })
    }

    const [booking] = data;
    const {companies} = booking;

    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : 'https://e-zone-project.vercel.app'
    const message = `Përshëndetje <strong>${booking.client_name}</strong>,<br> Orari juaj ${companies.name} osht zon me sukses! <br>
                            Ju lutem klikoni mbi linkun e referencës për të konfirmuar rezervimin: <a href="${host}/ezon/${booking.booking_id}">${booking.start_time}</a>`
    const emailPayload = {
        from: 'E ZON <onboarding@resend.dev>',
        to: [email],
        subject: 'Rezervim',
        html: `<strong>${message}</strong>`,
    }

    try {
        const data = await resend.emails.send(emailPayload);

        console.log(data, 'dataaaa')

        return data
    } catch (errorResend) {
        throw createError({ statusMessage: errorResend.message })
    }



    // const prefix = '+355'
    // const phoneNumber = prefix.concat(booking.phone_number.slice(1))
    // const twilioClient = createTwilioClient(accountSid, authToken);
    // const response = await twilioClient.messages.create({
    //         body: message,
    //         from: '+15302145217',
    //         to: phoneNumber
    //     })
    //
    // return response;


  })
