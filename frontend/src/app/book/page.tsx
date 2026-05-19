import { redirect } from 'next/navigation';

export default function OldBookPageRedirect() {
  redirect('/dashboard/book');
}
