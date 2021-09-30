const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2'

const request = async (url, params) => {
    let response;
    let abortController
    if (params.expiresAfter) {
        abortController = new AbortController()
        setTimeout(() => {
            if (!response) {
                abortController.abort()
                if (params.expirationMessage) {
                    // showNotification(params.expirationMessage);
                }
            }
        }, params.expiresAfter)
    }

    return new Promise(async (resolve, reject) => {
        try {
            let _url = `${BASE_URL}${url}`;

            let queryParams = {
                developer: 'YuriNikulin'
            }

            if (params.queryParams) {
                queryParams = {
                    ...queryParams,
                    ...params.queryParams
                }
            }
            
            _url = `${_url}?${new URLSearchParams(queryParams)}`;
            const headers = {
                ...(params.headers || {}),
            }

            const method = params.method || 'GET';
            const body = method !== 'GET' ? new FormData() : undefined
            if (body && params.body) {
                Object.entries(params.body).forEach(([key, value]) => {
                    body.set(key, value)
                })
            }

            const res = await fetch(_url, {
                headers,
                body,
                method,
                signal: abortController?.signal
            });
            if (!params.returnRawResponse) {
                response = await res.json();
            } else {
                response = res
            }

            if (response.status === 'ok') {
                if (params.onSuccess) {
                    params.onSuccess(response.message)
                }
            } else if (params.onError) {
                params.onError(response.message)
            }
            
            if (!res.ok) {
                throw new Error(res);
            }

            if (!params.returnRawResponse) {
                return resolve(response);
            }
            return resolve(res);
        } catch (e) {
            if (params.showErrorNotification) {
                
            }
            return reject(e);
        }
    });
};

export default request;
