import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(
        async (
            url,
            method = "GET",
            body = null,
            headers = { "Content-type": "application/json" }
        ) => {
            setLoading(true); // Показываем спиннер в начале запроса
            try {
                // Try / catch - пытаемся сделать запрос на сервер
                const response = await fetch(url, { method, body, headers });
                // Response - ответ Await - ждем ответа от сервера
                if (!response.ok) {
                    throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);
                }
                const data = await response.json(); // data - чистые данные которые мы получаем при запросе к API
                setLoading(false); // Убираем спиннер
                return data;
            } catch (error) {
                setLoading(false); // Убираем спиннер
                setError(error.message); // Устанавливаем ошибку /Показываем текст ошибки
                throw error; // Вернет ошибку
            }
        },
        []
    ); // Вернет чистые данные которые вернет API (data) или выкинет ошибку
    // Сразу в нем контролируем спиннер при загрузке и ошибку при запросе данных

    const clearError = useCallback(() => setError(null), []); //clearError перезатирает ошибку

    return { loading, error, request, clearError }; // Возвращаем нужное
};
