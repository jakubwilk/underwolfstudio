import type { ContactRequest } from '../utils/contact';

export const CONTACT_ENDPOINT = '/api/contact';

// Client side: posts the form to the route handler. Resolves to whether the
// message was accepted.
export async function sendContact(request: ContactRequest): Promise<boolean> {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
    return response.ok;
  } catch {
    return false;
  }
}
