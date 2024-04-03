
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "8px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "255 255 255",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #2c3656 
		"--color-primary-50": "223 225 230", // #dfe1e6
		"--color-primary-100": "213 215 221", // #d5d7dd
		"--color-primary-200": "202 205 213", // #cacdd5
		"--color-primary-300": "171 175 187", // #abafbb
		"--color-primary-400": "107 114 137", // #6b7289
		"--color-primary-500": "44 54 86", // #2c3656
		"--color-primary-600": "40 49 77", // #28314d
		"--color-primary-700": "33 41 65", // #212941
		"--color-primary-800": "26 32 52", // #1a2034
		"--color-primary-900": "22 26 42", // #161a2a
		// secondary | #0470dc 
		"--color-secondary-50": "217 234 250", // #d9eafa
		"--color-secondary-100": "205 226 248", // #cde2f8
		"--color-secondary-200": "192 219 246", // #c0dbf6
		"--color-secondary-300": "155 198 241", // #9bc6f1
		"--color-secondary-400": "79 155 231", // #4f9be7
		"--color-secondary-500": "4 112 220", // #0470dc
		"--color-secondary-600": "4 101 198", // #0465c6
		"--color-secondary-700": "3 84 165", // #0354a5
		"--color-secondary-800": "2 67 132", // #024384
		"--color-secondary-900": "2 55 108", // #02376c
		// tertiary | #ecbc55 
		"--color-tertiary-50": "252 245 230", // #fcf5e6
		"--color-tertiary-100": "251 242 221", // #fbf2dd
		"--color-tertiary-200": "250 238 213", // #faeed5
		"--color-tertiary-300": "247 228 187", // #f7e4bb
		"--color-tertiary-400": "242 208 136", // #f2d088
		"--color-tertiary-500": "236 188 85", // #ecbc55
		"--color-tertiary-600": "212 169 77", // #d4a94d
		"--color-tertiary-700": "177 141 64", // #b18d40
		"--color-tertiary-800": "142 113 51", // #8e7133
		"--color-tertiary-900": "116 92 42", // #745c2a
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "249 221 234", // #f9ddea
		"--color-error-100": "246 209 228", // #f6d1e4
		"--color-error-200": "244 198 221", // #f4c6dd
		"--color-error-300": "238 163 200", // #eea3c8
		"--color-error-400": "225 94 159", // #e15e9f
		"--color-error-500": "212 25 118", // #D41976
		"--color-error-600": "191 23 106", // #bf176a
		"--color-error-700": "159 19 89", // #9f1359
		"--color-error-800": "127 15 71", // #7f0f47
		"--color-error-900": "104 12 58", // #680c3a
		// surface | #495a8f 
		"--color-surface-50": "228 230 238", // #e4e6ee
		"--color-surface-100": "219 222 233", // #dbdee9
		"--color-surface-200": "210 214 227", // #d2d6e3
		"--color-surface-300": "182 189 210", // #b6bdd2
		"--color-surface-400": "128 140 177", // #808cb1
		"--color-surface-500": "73 90 143", // #495a8f
		"--color-surface-600": "66 81 129", // #425181
		"--color-surface-700": "55 68 107", // #37446b
		"--color-surface-800": "44 54 86", // #2c3656
		"--color-surface-900": "36 44 70", // #242c46
		
	}
}