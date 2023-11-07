import { expect, test } from 'bun:test'
import { Request, Response, mailer } from '../mailer'

test('mailer', async () => {
	const request: Request = {
		subject: 'Test',
		text: 'Test',
		to_emails: ['foo@bar.com'],
	}

	const response: Response = await mailer(request)

	expect(response.status).toBe('success')
})
