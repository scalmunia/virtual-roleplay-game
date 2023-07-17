const defaultHeaders = () => {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: 'Bearer ' + localStorage.getItem('token') } : {})
  }
};

// Ejemplo abstracción del fetch
export async function fetcher(
  path: string,
  init?: RequestInit | undefined
): Promise<Response> {
  try {
    const baseUrl = 'http://localhost:3000/';
    const url = baseUrl + path;

    const response = await fetch(url, {
      ...(init ? init : {}),
      headers: defaultHeaders(),
    });

    if (response.status >= 400) throw response;

    return response;
  } catch (e: any) {
    const error = e as Response;

    if (error.status === 401) {
      window.location.href = '/login?error=sessionLost';
    }

    if (error.status === 403) {
      window.location.href = '/characters?error=forbidden';
    }

    throw error;
  }
}
