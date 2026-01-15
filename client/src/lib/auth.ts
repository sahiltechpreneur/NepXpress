export interface UserPayload {
  id: string;
  role: 'admin' | 'customer';
  exp: number;
}

export function getUser(): UserPayload | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

export function isAdmin(): boolean {
  const user = getUser();
  return user?.role === 'admin';
}

export function isLoggedIn(): boolean {
  return !!getUser();
}
