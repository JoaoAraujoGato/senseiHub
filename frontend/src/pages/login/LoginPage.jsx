import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/features/auth/authApi';
import { setCredentials } from '@/features/auth/authSlice';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        try {
            const data = await login({ email, senha }).unwrap();
            dispatch(setCredentials({ token: data.token }));
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setErro(err?.data?.message ?? 'Não foi possível entrar');
        }
    };

    const inputStyle = {
        padding: '0.6rem',
        borderRadius: '0.5rem',
        border: '1px solid #2d3f4f',
        background: '#0c131a',
        color: '#fff',
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <form
                onSubmit={handleSubmit}
                style={{ width: '100%', maxWidth: 360, background: '#1f2830', padding: '2rem', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
                <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Sensei Hub</h1>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.9rem' }}>
                    E-mail
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.9rem' }}>
                    Senha
                    <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} style={inputStyle} />
                </label>

                {erro && <span style={{ color: '#f87171', fontSize: '0.85rem' }}>{erro}</span>}

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ background: '#C53A2C', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
}
