export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const headersWithAuth = {
  ...defaultHeaders,
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};

// Ejemplo abstracción del fetch
export async function request(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<Response> {
  return await fetch(input, {
    ...(init ? init : {}),
    headers: headersWithAuth,
  });
}
