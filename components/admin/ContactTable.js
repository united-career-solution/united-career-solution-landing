"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactTable({ onUpdateUnreadCount }) {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const router = useRouter();

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/contacts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to load contact submissions');
      if (data.success && data.data) {
        setContacts(data.data);
      } else {
        throw new Error('Failed to load contact submissions');
      }
    } catch (err) {
      setError(err.message || 'Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchContacts();
  }, [router]);

  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isRead: !currentStatus })
      });
      if (res.ok) {
        setContacts(prev => prev.map(c => c._id === id ? { ...c, isRead: !currentStatus } : c));
        if (onUpdateUnreadCount) onUpdateUnreadCount();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c._id !== id));
        setExpandedId(null);
        if (onUpdateUnreadCount) onUpdateUnreadCount();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredContacts = contacts.filter(c => {
    if (filter === 'Candidate') return c.role === 'Candidate';
    if (filter === 'Employer') return c.role === 'Employer';
    return true;
  });

  const getRoleBadge = (role) => {
    if (role === 'Candidate') return <span className="badge badge-candidate">Candidate</span>;
    if (role === 'Employer') return <span className="badge badge-employer">Employer</span>;
    return <span className="badge badge-unassigned">Old</span>;
  };

  const getName = (c) => {
    if (c.firstName || c.lastName) return `${c.firstName || ''} ${c.lastName || ''}`.trim();
    return c.fullName || 'Unknown';
  };

  const formatDateTime = (dateString) => {
    const d = new Date(dateString);
    const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    return `${d.toLocaleDateString('en-US', dateOptions)} · ${d.toLocaleTimeString('en-US', timeOptions)}`;
  };

  if (loading && contacts.length === 0) {
    return <div className="loading">Loading contacts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <div className="filters">
        <div className="filter-group">
          {['All', 'Candidate', 'Employer'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Message</th>
              <th>Submitted At</th>
              <th style={{ width: '40px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="6">
                  <div className="empty-state">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3>No submissions yet</h3>
                    <p style={{ marginTop: '0.5rem' }}>They'll appear here when someone reaches out.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredContacts.map((contact) => (
                <React.Fragment key={contact._id}>
                  <tr
                    className={`expandable-row ${contact.isRead ? 'row-read' : 'row-unread'}`}
                    onClick={() => setExpandedId(expandedId === contact._id ? null : contact._id)}
                  >
                    <td>{getName(contact)}</td>
                    <td>{contact.email}</td>
                    <td>{getRoleBadge(contact.role)}</td>
                    <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={contact.message}>
                      {contact.message}
                    </td>
                    <td style={{ fontSize: '0.9rem', color: '#666' }}>{formatDateTime(contact.createdAt)}</td>
                    <td>
                      <svg className={`chevron ${expandedId === contact._id ? 'open' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </td>
                  </tr>

                  {expandedId === contact._id && (
                    <tr className="expanded-row">
                      <td colSpan="6">
                        <div className="expanded-detail">
                          <div className="expanded-grid">
                            <div className="detail-group">
                              <label>Full Name</label>
                              <div>{getName(contact)}</div>
                            </div>
                            <div className="detail-group">
                              <label>Email Address</label>
                              <div><a href={`mailto:${contact.email}`} style={{ color: '#007bff' }}>{contact.email}</a></div>
                            </div>
                            <div className="detail-group">
                              <label>Role</label>
                              <div>{getRoleBadge(contact.role)}</div>
                            </div>
                            {contact.phone && (
                              <div className="detail-group">
                                <label>Phone</label>
                                <div>{contact.phone}</div>
                              </div>
                            )}
                            {contact.company && (
                              <div className="detail-group">
                                <label>Company</label>
                                <div>{contact.company}</div>
                              </div>
                            )}
                            {contact.linkedin && (
                              <div className="detail-group">
                                <label>LinkedIn URL</label>
                                <div><a href={contact.linkedin} target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>View Profile &nearr;</a></div>
                              </div>
                            )}
                            <div className="detail-group">
                              <label>Submitted At</label>
                              <div>{formatDateTime(contact.createdAt)}</div>
                            </div>
                          </div>

                          <div className="detail-group">
                            <label>Message</label>
                            <div className="detail-message">{contact.message}</div>
                          </div>

                          <div className="detail-actions">
                            <button
                              className="btn-sm btn-outline"
                              onClick={(e) => { e.stopPropagation(); toggleReadStatus(contact._id, contact.isRead); }}
                            >
                              {contact.isRead ? 'Mark as Unread' : 'Mark as Read'}
                            </button>
                            <button
                              className="btn-sm btn-danger"
                              onClick={(e) => { e.stopPropagation(); deleteContact(contact._id); }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
