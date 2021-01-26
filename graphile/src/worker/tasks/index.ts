import { TaskList } from 'graphile-worker'
import { sendForgotPasswordEmail } from './send-forgot-password-email'
import { sendEmail } from './send-email'

export const taskList: TaskList = {
    sendForgotPasswordEmail,
    sendEmail,
}