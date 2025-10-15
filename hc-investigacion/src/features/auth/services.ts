import { axiosInstance } from '@/lib/axios/axiosInstance';

export async function loginUsuarioClave(usuario: string, clave: string) {
  const api = await axiosInstance();
  const res = await api.post('/login', { usuario, clave });
  return res.data;
}

export async function loginTokenEncriptado(token: string) {
  const api = await axiosInstance();
  const res = await api.post('/login/encriptado', token);
  return res.data;
}


