import LoginForm from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Login - Admin Panel',
};    

export default function LoginPage() {
  return (
    <main className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <LoginForm />
      </div>
    </main>
  );
}
