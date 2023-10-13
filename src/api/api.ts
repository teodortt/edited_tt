const baseUrl = 'https://05lxh502r0.execute-api.us-east-1.amazonaws.com/dev';

export enum METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface RequestOptions {
  url: string;
  payload?: any;
  method?: 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'GET';
}

export async function makeRequest({ url, payload, method }: RequestOptions) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: method ?? 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      ...(method !== 'GET' && { body: JSON.stringify(payload) }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
