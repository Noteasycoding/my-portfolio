import type { Metadata } from 'next';
import { Contact } from '@/components/blocks/contact';
import { PageFrame } from '@/components/workspace/page-frame';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email, LinkedIn, GitHub and resume.',
};

export default function ContactPage() {
  return (
    <PageFrame path="contact.sh" title="Contact" command="./contact.sh">
      <Contact />
    </PageFrame>
  );
}
