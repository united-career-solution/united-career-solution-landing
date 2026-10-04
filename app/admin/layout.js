import './admin.css';

export const metadata = {
  title: 'Admin Panel | United Career Solutions',
  description: 'Admin dashboard to manage contact form submissions.',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
