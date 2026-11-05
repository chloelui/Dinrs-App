export const API_BASE_URL = "https://disc-assignment-5-users-api-iyct.onrender.com";

export async function getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/api/users`);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

// Turns form's values into multipart body used in fetch()
export function buildUserFormData({ name, email, bio, major, graduationYear, image }) {
  const [firstName, ...restOfName] = name.trim().split(/\s+/);

  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", restOfName.join(" "));
  formData.append("email", email.trim());
  formData.append("bio", bio.trim());
  formData.append("major", major.trim());
  formData.append("graduationYear", graduationYear.trim());
  formData.append("image", image); // image is File object

  return formData;
}

// Creates new user
export async function createUser(formData) {
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}