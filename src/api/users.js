export const API_BASE_URL = "https://disc-assignment-5-users-api-iyct.onrender.com";

export async function getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/api/users`);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}