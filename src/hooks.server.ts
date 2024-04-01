import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'
import {PRIVATE_USER_SERVER_URL } from '$env/static/private'
import {PUBLIC_DOMAIN} from '$env/static/public'

export const handle: Handle = async ({ event, resolve }) => {
  
  event.locals.pb = new PocketBase(PRIVATE_USER_SERVER_URL);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
  event.locals.customer = null

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection('users').authRefresh()
    }
  } catch (_) {
    event.locals.pb.authStore.clear()
  }

  event.locals.user = event.locals.pb.authStore.model


  if(event.locals.user!=null){
    try{
        event.locals.customer = await event.locals.pb.collection('customers').getFirstListItem(`user.id="${event.locals.user.id}"`);
    }catch(_){

    }
  }

  const response = await resolve(event)
  response.headers.set(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({ httpOnly: true })
  )

  return response
}

// export async function handleError({ error, event, status, message }) {
	// const eventID = Sentry.captureException(error, {
	// 	extra: { event, status }
	// });


// 	return {
// 		message,
// 	};
// }