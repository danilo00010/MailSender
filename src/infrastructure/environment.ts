function env(value: string, defaultValue: any = null): string {
	return process.env[value] ?? defaultValue
}

export const APP_NAME = env('APP_NAME')
export const APP_URL = env('APP_URL')
export const APP_PORT = env('APP_PORT', 3000)

export const MAIL_HOST = env('MAIL_HOST')
export const MAIL_PORT = env('MAIL_PORT')
export const MAIL_SERVICE = env('MAIL_SERVICE')
export const MAIL_SECURE = env('MAIL_SECURE')
export const MAIL_USERNAME = env('MAIL_USERNAME')
export const MAIL_PASSWORD = env('MAIL_PASSWORD')
