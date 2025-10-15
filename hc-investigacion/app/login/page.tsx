"use client";
import { Suspense, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { axiosInstance } from '@/lib/axios/axiosInstance';
import { motion } from 'framer-motion';
import { Toast } from '@/components/ui/Toast';
import LoginIcon from '@/components/icons/LoginIcon';

const alfanumerico = /^[A-Za-z0-9]+$/;
const loginSchema = z.object({
  usuario: z
    .string({ required_error: 'El usuario es obligatorio' })
    .min(3, { message: 'El usuario debe tener al menos 3 caracteres' })
    .max(10, { message: 'El usuario no puede superar 10 caracteres' })
    .regex(alfanumerico, { message: 'Solo letras y números' }),
  clave: z
    .string({ required_error: 'La clave es obligatoria' })
    .min(3, { message: 'La clave debe tener al menos 3 caracteres' })
    .max(10, { message: 'La clave no puede superar 10 caracteres' })
    .regex(alfanumerico, { message: 'Solo letras y números' }),
});
type LoginInput = z.infer<typeof loginSchema>;

const Background = styled.div.attrs({
  className: 'min-h-screen w-full flex items-center justify-center',
})`
  position: relative;
  background: var(--color-primary-gradient);
  &:before{
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(60rem 60rem at -10% -10%, rgba(255,255,255,0.06), transparent 60%),
      radial-gradient(45rem 45rem at 110% 110%, rgba(255,255,255,0.06), transparent 60%);
    pointer-events: none;
  }
`;

const Card = styled(motion.div).attrs({
  className: 'w-full max-w-md rounded-2xl shadow-xl pt-4 px-8 pb-8 bg-white/95 backdrop-blur-sm',
})``;

const Subtitle = styled.p.attrs({ className: 'mb-2 c-grey45' })``;
const Brand = styled.div.attrs({ className: 'flex items-center gap-3' })``;
const Welcome = styled.div.attrs({ className: '' })``;
const Divider = styled.div.attrs({ className: 'h-px w-full bg-gray-200 mb-4' })``;
const ErrorText = styled.p.attrs({ className: 'rb12b c-danger mt-2' })``;
const Label = styled.label.attrs({ className: 'block text-sm text-gray-700 mt-3 first:mt-0 rb14l' })``;
const Button = styled.button.attrs({
  className:
    'w-full mt-6 py-2.5 rounded-md bg-[var(--color-latex10)] text-white hover:brightness-110 disabled:opacity-60 flex items-center justify-center gap-2 rb16m',
})``;
const Input = styled.input.attrs({
  className:
    'w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-latex30 rb12l c-latex30',
})`
  &::placeholder{
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
  }
`;

const PasswordField = styled.div.attrs({ className: 'relative' })``;
const ToggleBtn = styled.button.attrs({
  className: 'absolute top-1/2 -translate-y-1/2 right-3 mt-[4px] flex items-center text-gray-500 hover:text-gray-700',
  type: 'button'
})``;

export const dynamic = 'force-dynamic';

function LoginInner() {
  const router = useRouter();
  const search = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const usuarioVal = watch('usuario') ?? '';
  const claveVal = watch('clave') ?? '';
  const canSubmit = usuarioVal.length >= 3 && claveVal.length >= 3;

  const allowKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (alfanumerico.test(key)) return;
    if ([
      'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Delete'
    ].includes(key)) return;
    e.preventDefault();
  };

  const sanitizePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const data = e.clipboardData.getData('text');
    if (!/^[A-Za-z0-9]*$/.test(data)) e.preventDefault();
  };

  useEffect(() => {
    const tokenQuery = search.get('t');
    if (tokenQuery) {
      startTransition(async () => {
        try {
          const api = await axiosInstance();
          const res = await api.post('/login/encriptado', tokenQuery);
          const token = res?.data?.value?.token ?? res?.data?.token;
          if (token) {
            sessionStorage.setItem('token', token);
            router.replace('/protected/dashboard');
          } else {
            setError('Token inválido');
          }
        } catch (e: any) {
          setError(e?.response?.data?.error?.errorMessage ?? 'Error de autenticación');
        }
      });
    }
  }, [search, router]);

  const onSubmit = (data: LoginInput) => {
    setError(null);
    startTransition(async () => {
      try {
        const api = await axiosInstance();
        const res = await api.post('/login', { usuario: data.usuario, clave: data.clave });
        const token = res?.data?.value?.token ?? res?.data?.token;
        if (token) {
          sessionStorage.setItem('token', token);
          router.replace('/protected/dashboard');
        } else {
          setError('Credenciales inválidas');
        }
      } catch (e: any) {
        setError(e?.response?.data?.error?.errorMessage ?? 'No se pudo conectar con el servidor');
      }
    });
  };

  return (
    <Background>
      <div className="flex flex-col items-center gap-6 w-full px-4">
        <Brand>
          <Image src="/assets/images/empresa/IsoLogo.png" alt="Logo" width={200} height={200} priority />
        </Brand>
        <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Welcome>
            <Subtitle className="rb18b text-center">HC - Investigación</Subtitle>
            <span className="rb16mb">Ingresá tus datos</span>
          </Welcome>
          <Divider />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label className="rb14b c-latex30">Usuario</Label>
            <Input aria-invalid={!!errors.usuario} maxLength={10} onKeyDown={allowKey} onPaste={sanitizePaste} {...register('usuario')} placeholder="Nombre de usuario" autoComplete="username" className={errors.usuario ? 'border-red-500 focus:ring-red-500' : ''} />
            {errors.usuario && <ErrorText role="alert">{errors.usuario.message}</ErrorText>}

            <Label className="rb14b c-latex30">Clave</Label>
            <PasswordField>
              <Input aria-invalid={!!errors.clave} maxLength={10} onKeyDown={allowKey} onPaste={sanitizePaste} type={showPassword ? 'text' : 'password'} {...register('clave')} placeholder="Clave" autoComplete="current-password" className={errors.clave ? 'border-red-500 focus:ring-red-500' : ''} />
              <ToggleBtn aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword(v => !v)}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.46-1.07 1.12-2.09 1.94-3M10.58 10.58a2 2 0 0 0 2.83 2.83"/><path d="M1 1l22 22"/><path d="M9.88 9.88a3 3 0 0 1 4.24 4.24"/><path d="M21.06 21.06A10.94 10.94 0 0 0 23 12c-.46-1.07-1.12-2.09-1.94-3A10.94 10.94 0 0 0 12 4c-1.07 0-2.09.17-3 .5"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </ToggleBtn>
            </PasswordField>
            {errors.clave && <ErrorText>{errors.clave.message}</ErrorText>}

            <Button type="submit" disabled={pending || !canSubmit} className={canSubmit ? '' : 'bgc-grey65'}>
              <LoginIcon />
              {pending ? 'Ingresando' : 'Ingresar'}
            </Button>
          </form>
        </Card>
      </div>
      <Toast open={!!error} onClose={() => setError(null)} tone="danger" text={error ?? ''} />
    </Background>
    //checkeo pepito 1
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div />}> 
      <LoginInner />
    </Suspense>
  );
}


