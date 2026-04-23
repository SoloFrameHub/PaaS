import { ApiResponse } from './response-utils';

class ApiClient {
    private async request<T>(url: string, options?: RequestInit): Promise<T> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal // Allow override? If options has signal, this might conflict. But for now default is safer.
            });
            clearTimeout(timeoutId);

            const result: ApiResponse<T> = await response.json();

            if (!response.ok || result.error) {
                const error = result.error?.message || 'An unexpected error occurred';
                throw new Error(error);
            }

            return result.data as T;
        } catch (error: unknown) { // Explicit unknown
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timed out');
            }
            throw error;
        }
    }

    get<T>(url: string, options?: RequestInit) {
        return this.request<T>(url, { ...options, method: 'GET' });
    }

    post<T>(url: string, body: any, options?: RequestInit) {
        return this.request<T>(url, {
            ...options,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...options?.headers },
            body: JSON.stringify(body),
        });
    }

    put<T>(url: string, body: any, options?: RequestInit) {
        return this.request<T>(url, {
            ...options,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...options?.headers },
            body: JSON.stringify(body),
        });
    }

    patch<T>(url: string, body: any, options?: RequestInit) {
        return this.request<T>(url, {
            ...options,
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...options?.headers },
            body: JSON.stringify(body),
        });
    }

    delete<T>(url: string, options?: RequestInit) {
        return this.request<T>(url, { ...options, method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();
