import { useMutation } from '@tanstack/react-query';
import { loginUsuarioClave, loginTokenEncriptado } from './services';

export function useLogin() {
  return useMutation({
    mutationFn: async ({ usuario, clave }: { usuario: string; clave: string }) => {
      const data = await loginUsuarioClave(usuario, clave);
      const token = data?.value?.token ?? data?.token;
      if (token) sessionStorage.setItem('token', token);
      return data;
    },
  });
}

export function useLoginByEncryptedToken() {
  return useMutation({
    mutationFn: async (token: string) => {
      const data = await loginTokenEncriptado(token);
      const tk = data?.value?.token ?? data?.token;
      if (tk) sessionStorage.setItem('token', tk);
      return data;
    },
  });
}


