import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ id: post.id }));
}

export default async function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#FBF8F5]">
      <article className="max-w-3xl mx-auto px-6" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6570] hover:text-[#5B1F6A] transition-colors duration-300 mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Back to Home
        </Link>

        {/* Hero Image */}
        <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden mb-8 relative">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A2A5D] bg-[#F2EAF3] rounded-full px-3 py-1">
            {post.category}
          </span>
          <span className="text-xs text-[#6B6570] font-medium">{post.date}</span>
        </div>

        {/* Title */}
        <h1
          className="text-3xl md:text-4xl text-[#2E2E2E] leading-snug mb-6"
          style={{ fontFamily: "var(--font-dm-serif), serif" }}
        >
          {post.title}
        </h1>

        {/* Introduction */}
        <p className="text-[#2E2E2E] text-base md:text-lg leading-relaxed mb-8 font-medium border-l-2 border-[#8E5C8F] pl-4 italic">
          {post.introduction}
        </p>

        {/* Sections */}
        <div className="space-y-8 mb-10">
          {post.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h2
                className="text-xl font-semibold text-[#2E2E2E]"
                style={{ fontFamily: "var(--font-dm-serif), serif" }}
              >
                {section.title}
              </h2>
              <p className="text-[#6B6570] text-sm md:text-base leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="bg-[#F2EAF3] text-[#5A2A5D] p-6 rounded-2xl border-l-4 border-[#5A2A5D] mb-8 shadow-sm">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">Expert Takeaway</p>
          <p className="text-sm md:text-base leading-relaxed">
            {post.conclusion}
          </p>
        </div>

        {/* Author */}
        <div className="border-t border-[#E4DFE8] pt-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#5A2A5D] flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-md">
            SP
          </div>
          <div>
            <p className="text-xs text-[#8E5C8F] font-semibold uppercase tracking-widest">Written & Reviewed By</p>
            <p className="text-sm md:text-base font-bold text-[#2E2E2E] mt-0.5">Dr. Shruthi Pavana Janardhanan</p>
            <p className="text-[10px] md:text-xs text-[#6B6570] font-medium">Founder & Lead Dermatologist · MBBS, MD.DVL</p>
          </div>
        </div>
      </article>
    </div>
  );
}
