import type { Metadata } from 'next';
import Image from 'next/image';
import { About } from '@/components/blocks/misc';
import { PageFrame } from '@/components/workspace/page-frame';
import { profile } from '@/content/profile';

export const metadata: Metadata = {
  title: 'About',
  description: profile.statement,
};

export default function AboutPage() {
  return (
    <PageFrame path="about.md" title="About" command="whoami">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_14rem]">
        <About />
        <Image
          src="/assets/images/profile-image.jpeg"
          alt={`Portrait of ${profile.name}`}
          width={448}
          height={448}
          className="aspect-square w-40 object-cover md:w-full"
        />
      </div>
    </PageFrame>
  );
}
