"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ContactTable from '@/components/admin/ContactTable';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;
      const res = await fetch(`/api/admin/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUnreadCount(data.data.filter(c => !c.isRead).length);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setIsAuthorized(true);
      fetchUnreadCount();
    }
  }, [router, fetchUnreadCount]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>United Career Solutions</p>
        </div>
        <nav>
          <div className="nav-item">
            <span>Contact Submissions</span>
            {unreadCount > 0 && (
              <span className="badge-unread">{unreadCount}</span>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>

        <section>
          <h2>Inbox</h2>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            Manage recent contact inquiries.
          </p>

          <ContactTable onUpdateUnreadCount={fetchUnreadCount} />
        </section>
      </main>
    </div>
  );
}
