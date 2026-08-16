import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/data/blog";

export const metadata = {
  title: "Blog | Amethyst Skin Clinic",
  description: "Expert dermatology advice, skincare tips, and treatment insights from Dr. Shruthi Pavana Janardhanan.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#F7F3EF]">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="mb-12">
          <h1
            className="text-3xl md:text-4xl text-[#2E2E2E] mb-3"
            style={{ fontFamily: "var(--font-dm-serif), serif" }}
          >
            Helpful tips and expert advice
          </h1>
          <p className="text-sm text-[#6B6570]">
            Insights from Dr. Shruthi on skincare, treatments, and healthy skin habits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-white border border-[#E4DFE8] rounded-[32px] overflow-hidden hover:shadow-lg hover:border-[#8E5C8F] transition-all duration-300"
            >
              <div className="w-full h-48 overflow-hidden relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#8E5C8F] border border-[#E4DFE8] rounded-full px-3 py-1">
                    {post.category}
                  </span>
                  <span className="text-xs text-[#6B6570]">{post.date}</span>
                </div>
                <h2
                  className="text-lg md:text-xl text-[#2E2E2E] leading-snug group-hover:text-[#5A2A5D] transition-colors duration-300 mb-3"
                  style={{ fontFamily: "var(--font-dm-serif), serif" }}
                >
                  {post.title}
                </h2>
                <p className="text-xs text-[#6B6570] leading-relaxed line-clamp-2">
                  {post.introduction}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
