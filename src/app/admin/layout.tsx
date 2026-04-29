/**
 * Admin Layout
 * Wraps all admin routes with the AdminLayout component
 */

'use client';

import { ReactNode } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';

export default function AdminGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
