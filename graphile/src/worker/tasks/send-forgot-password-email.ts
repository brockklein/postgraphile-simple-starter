import { Task } from 'graphile-worker'
import { Record, String } from 'runtypes'
import { ROOT_URL } from '../../config/constants'
import { ISendEmailPayload } from './send-email'
import { htmlToText } from 'html-to-text'

const SendForgotPasswordEmailPayload = Record({
    userId: String,
    email: String,
    token: String
})
export const sendForgotPasswordEmail: Task = async (payload, { addJob }) => {
    const { email, token, userId } = SendForgotPasswordEmailPayload.check(payload)

    const html = `
        <div>
            <p><b>Password Reset</b></p>
            <p>Someone just requested a password reset for the Legit Apps account associated with this email address (${email}).</p>
            <p>If you did not request a password reset please contact us immediately at <a href="mailto:support@legitapps.com">support@legitapps.com</a>.</p>
            <p><a href="${ROOT_URL}/reset-password?userId=${userId}&token=${encodeURIComponent(token)}">Reset Password</a></p>
        </div>
    `

    const sendEmailPayload: ISendEmailPayload = {
        to: [ email ],
        subject: 'Password Reset',
        text: htmlToText(html),
        html
    }

    await addJob('sendEmail', sendEmailPayload, { maxAttempts: 3 })
}