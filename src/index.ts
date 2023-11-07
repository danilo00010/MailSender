import Elysia from 'elysia'
import { APP_PORT } from './infrastructure/environment'
import { Request, Response, mailer } from './mailer'

new Elysia()
	.post('/send-mail', async req => {
		const body: Request = req.body
		const response: Response = await mailer({ ...body })

		req.set.status = response.code
		delete response.code

		return response
	})
	.listen(APP_PORT, () => {
		console.log(`Server running on port ${APP_PORT}`)
	})
