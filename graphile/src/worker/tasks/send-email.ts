import { Task } from 'graphile-worker'
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { Partial, Record, String, Array } from 'runtypes'
import { ETHEREAL_EMAIL_PASSWORD, ETHEREAL_EMAIL_USERNAME } from '../../config/constants'

const SendEmailPayload = Record({
    to: Array(String),
    subject: String,
    text: String,
}).And(Partial({
    html: String,
    fromEmail: String,
    fromName: String,
}))

export interface ISendEmailPayload {
    to: [ string ]
    subject: string
    text: string
    html?: string
    fromEmail?: string
    fromName?: string
}

let _transporter: Mail
const getTransport = async (): Promise<Mail> => {
    if (!_transporter)
    {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let user = ETHEREAL_EMAIL_USERNAME
        let pass = ETHEREAL_EMAIL_PASSWORD
        if (!user || !pass)
        {
            const testAccount = await createTestAccount()
            user = testAccount.user
            pass = testAccount.pass
        }

        // create reusable transporter object using the default SMTP transport
        _transporter = createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user, // generated ethereal user
                pass, // generated ethereal password
            },
        })
    }

    return _transporter
}

export const sendEmail: Task = async (payload) => {
    const { to, subject, text, html, fromEmail, fromName } = SendEmailPayload.check(payload)

    const transporter = await getTransport()

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `'${fromName || 'Legit Apps'}' <${fromEmail || 'support@legitapps.com'}>`, // sender address
        to: to.join(','), // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    })

    console.log("Message sent: %s", info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", getTestMessageUrl(info))
}