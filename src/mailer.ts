import {
	APP_NAME,
	MAIL_HOST,
	MAIL_PORT,
	MAIL_SERVICE,
	MAIL_SECURE,
	MAIL_USERNAME,
	MAIL_PASSWORD,
} from './infrastructure/environment'
import nodemailer, { Transporter } from 'nodemailer'

export type Request = {
	subject: string
	text: string
	to_emails: string[]
}

export type Response = {
	status: string
	message: string
	emails_failed?: string[]
	code?: number
}

export async function mailer(request: Request) {
	const transporter: Transporter<any> = await nodemailer.createTransport({
		host: MAIL_HOST,
		port: MAIL_PORT,
		service: MAIL_SERVICE,
		secure: MAIL_SECURE,
		auth: {
			user: MAIL_USERNAME,
			pass: MAIL_PASSWORD,
		},
	})

	const promises: Promise<any>[] = request.to_emails.map(
		async (email: string) => {
			return new Promise(async (resolve, reject) => {
				await transporter.sendMail(
					{
						from: {
							name: APP_NAME,
							address: MAIL_USERNAME,
						},
						to: email,
						subject: request.subject,
						text: request.text,
					},
					(err: any) => {
						if (err) {
							reject({ email })
						} else {
							resolve({ email })
						}
					}
				)
			})
		}
	)

	return await Promise.allSettled(promises).then(results => {
		const error: boolean = results.some(
			(result: any) => result.status === 'rejected'
		)

		let response: Response = {
			status: 'success',
			message: 'Email sent!',
			code: 200,
		}

		if (error) {
			const emails_failed: string[] = results
				.filter((result: any) => result.status === 'rejected')
				.map((result: any) => result.reason.email)

			response = {
				status: 'error',
				message: 'Error sending email!',
				code: 500,
				emails_failed,
			}
		}

		return response
	})
}
