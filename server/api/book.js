import { serverSupabaseClient } from '#supabase/server';
import { createError } from 'h3';
import { createTwilioClient } from '../utilities/twilio-loader.js';

export default defineEventHandler(async (event) => {
    // handle GET requests for the `api/foo` endpoint
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = await serverSupabaseClient(event);
    const body = await readBody(event);
    const {data, error} = await client
        .from('bookings')
        .insert(body.booking)
        .select('*, companies (*)')

    if (error) {
        throw createError({ statusMessage: error.message })
    }

    const [booking] = data;
    const {companies} = booking;
    const prefix = '+355'
    const phoneNumber = prefix.concat(booking.phone_number.slice(1))

    const host = process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : 'https://e-zone-project.vercel.app'
    const message = `
        Përshëndetje, orari osht zon me sukses! Ju lutem klikoni mbi linkun e referencës për të konfirmuar rezervimin: ${host}/ezon/${booking.id}
     `
    const twilioClient = createTwilioClient(accountSid, authToken);
    const response = await twilioClient.messages.create({
            body: message,
            from: '+15302145217',
            to: phoneNumber
        })

    return response;
  })
