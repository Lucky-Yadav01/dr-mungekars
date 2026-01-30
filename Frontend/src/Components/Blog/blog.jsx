// // // import React, { useMemo, useState } from "react";
// // // import {
// // //   Heart,
// // //   MessageCircle,
// // //   Share,
// // //   Trash2,
// // //   User,
// // //   Shield,
// // // } from "lucide-react";
// // // const INITIAL_POSTS = [
// // //   {
// // //     id: 1,
// // //     title: "Transform Your Smile with Advanced Dental Techniques",
// // //     excerpt:
// // //       "Discover how minimally invasive cosmetic treatments can create a radiant smile while preserving natural teeth.",
// // //     content:
// // //       "At Dr. Mungerkars Dental Clinic, we blend artistry with precision. Our advanced cosmetic procedures—from porcelain veneers to laser gum contouring—are tailored to each patient’s unique facial structure. During your consultation, we map out a comprehensive plan, using digital smile design to preview results before treatment begins. Combined with sedation dentistry options, your journey to a confident smile becomes comfortable, efficient, and luxurious.",
// // //     author: "Dr. Lucky Yadav",
// // //     date: "Mar 18 · 2 min read",
// // //     image:
// // //       "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
// // //     category: "Cosmetic",
// // //     likes: 24,
// // //     comments: [
// // //       { user: "Aarav", text: "Loved reading about veneers. Super helpful!" },
// // //       { user: "Meera", text: "The digital preview is such a confidence boost." },
// // //     ],
// // //   },
// // //   {
// // //     id: 2,
// // //     title: "Expert Dental Services for Brighter Smiles",
// // //     excerpt:
// // //       "From ultrasonic cleaning to enamel strengthening, here’s how we keep your smile luminous all year.",
// // //     content:
// // //       "Our hygiene specialists focus on preventative care that feels indulgent. Each visit includes ultrasonic scaling, guided biofilm therapy, and mineral-rich varnish to strengthen enamel. We round it off with personalized at-home care plans and hand-selected products suited to your enamel profile. This concierge approach ensures your smile stays bright between visits.",
// // //     author: "Dr. Lucky Yadav",
// // //     date: "Mar 18 · 1 min read",
// // //     image:
// // //       "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=900&q=80",
// // //     category: "Hygiene",
// // //     likes: 18,
// // //     comments: [{ user: "Sofia", text: "The varnish treatment worked wonders." }],
// // //   },
// // //   {
// // //     id: 3,
// // //     title: "Top Dental Care Tips for Healthy Smiles",
// // //     excerpt:
// // //       "Maintain impeccable oral health with our curated daily rituals and smart product recommendations.",
// // //     content:
// // //       "To keep your smile balanced, focus on consistency. Begin with pH-balanced rinses, follow up with sonic brushing, and finish with silk floss. Twice weekly, incorporate remineralizing gels. Our clinicians tailor the ideal ritual during your wellness visit, pairing luxury with intentional care for long-term oral harmony.",
// // //     author: "Dr. Lucky Yadav",
// // //     date: "Mar 18 · 2 min read",
// // //     image:
// // //       "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
// // //     category: "Wellness",
// // //     likes: 32,
// // //     comments: [],
// // //   },
// // // ];

// // // const Badge = ({ label }) => (
// // //   <span className="px-3 py-1 rounded-full text-xs tracking-wide bg-[#5B8FA8]/10 text-[#5B8FA8] uppercase">
// // //     {label}
// // //   </span>
// // // );

// // // const Blog = () => {
// // //   const [posts, setPosts] = useState(INITIAL_POSTS);
// // //   const [selectedPost, setSelectedPost] = useState(null);
// // //   const [adminMode, setAdminMode] = useState(false);
// // //   const [newPost, setNewPost] = useState({
// // //     title: "",
// // //     excerpt: "",
// // //     content: "",
// // //     category: "",
// // //     image: "",
// // //   });
// // //   const [commentForm, setCommentForm] = useState({ user: "", text: "" });

// // //   const handleLike = (postId) => {
// // //     setPosts((prev) =>
// // //       prev.map((p) =>
// // //         p.id === postId ? { ...p, likes: p.likes + 1 } : p
// // //       )
// // //     );
// // //   };

// // //   const handleAddComment = (postId) => {
// // //     if (!commentForm.user.trim() || !commentForm.text.trim()) return;
// // //     setPosts((prev) =>
// // //       prev.map((p) =>
// // //         p.id === postId
// // //           ? { ...p, comments: [...p.comments, commentForm] }
// // //           : p
// // //       )
// // //     );
// // //     setCommentForm({ user: "", text: "" });
// // //   };

// // //   const handleAddPost = () => {
// // //     if (
// // //       !newPost.title.trim() ||
// // //       !newPost.content.trim() ||
// // //       !newPost.category.trim() ||
// // //       !newPost.image.trim()
// // //     )
// // //       return;

// // //     const excerpt =
// // //       newPost.excerpt ||
// // //       `${newPost.content.slice(0, 110).trim()}…`;

// // //     const post = {
// // //       id: Date.now(),
// // //       title: newPost.title,
// // //       excerpt,
// // //       content: newPost.content,
// // //       author: "Clinic Editorial",
// // //       date: "Just now · 1 min read",
// // //       image: newPost.image,
// // //       category: newPost.category,
// // //       likes: 0,
// // //       comments: [],
// // //     };
// // //     setPosts((prev) => [post, ...prev]);
// // //     setNewPost({ title: "", excerpt: "", content: "", category: "", image: "" });
// // //   };

// // //   const handleDeletePost = (postId) => {
// // //     setPosts((prev) => prev.filter((p) => p.id !== postId));
// // //     if (selectedPost?.id === postId) setSelectedPost(null);
// // //   };

// // //   const relatedPosts = useMemo(() => {
// // //     if (!selectedPost) return [];
// // //     return posts
// // //       .filter(
// // //         (p) => p.category === selectedPost.category && p.id !== selectedPost.id
// // //       )
// // //       .slice(0, 3);
// // //   }, [posts, selectedPost]);

// // //   return (
// // //     <div className="min-h-screen bg-[#F4F0E6] text-[#3E3B32]">
// // //       <header className="px-6 py-8 border-b border-[#3E3B32]/10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
// // //         <div>
// // //           <p className="uppercase tracking-[0.3em] text-xs text-[#5B8FA8] flex items-center gap-2">
// // //             <Shield size={16} />
// // //             Dr. Mungerkars Dental Journal
// // //           </p>
// // //           <h1 className="text-4xl md:text-5xl font-serif text-[#3E3B32]">
// // //             All Posts
// // //           </h1>
// // //         </div>
// // //         <button
// // //           onClick={() => setAdminMode((prev) => !prev)}
// // //           className={`px-5 py-3 rounded-full text-sm font-semibold transition-all ${
// // //             adminMode
// // //               ? "bg-[#5B8FA8] text-white"
// // //               : "bg-yellow-400 text-[#3E3B32]"
// // //           }`}
// // //         >
// // //           {adminMode ? "Exit Admin Mode" : "Enter Admin Mode"}
// // //         </button>
// // //       </header>

// // //       {adminMode && (
// // //         <section className="mx-auto mt-8 w-full max-w-5xl rounded-3xl bg-white/70 p-6 shadow-xl">
// // //           <h2 className="mb-4 font-serif text-2xl text-[#3E3B32]">
// // //             Add New Post
// // //           </h2>
// // //           <div className="grid gap-4 md:grid-cols-2">
// // //             <input
// // //               className="rounded-lg border border-[#3E3B32]/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B8FA8]"
// // //               placeholder="Title"
// // //               value={newPost.title}
// // //               onChange={(e) =>
// // //                 setNewPost((p) => ({ ...p, title: e.target.value }))
// // //               }
// // //             />
// // //             <input
// // //               className="rounded-lg border border-[#3E3B32]/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B8FA8]"
// // //               placeholder="Category"
// // //               value={newPost.category}
// // //               onChange={(e) =>
// // //                 setNewPost((p) => ({ ...p, category: e.target.value }))
// // //               }
// // //             />
// // //             <input
// // //               className="rounded-lg border border-[#3E3B32]/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B8FA8]"
// // //               placeholder="Image URL"
// // //               value={newPost.image}
// // //               onChange={(e) =>
// // //                 setNewPost((p) => ({ ...p, image: e.target.value }))
// // //               }
// // //             />
// // //             <input
// // //               className="rounded-lg border border-[#3E3B32]/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B8FA8]"
// // //               placeholder="Custom excerpt (optional)"
// // //               value={newPost.excerpt}
// // //               onChange={(e) =>
// // //                 setNewPost((p) => ({ ...p, excerpt: e.target.value }))
// // //               }
// // //             />
// // //             <textarea
// // //               className="md:col-span-2 rounded-lg border border-[#3E3B32]/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B8FA8]"
// // //               placeholder="Full content"
// // //               rows={4}
// // //               value={newPost.content}
// // //               onChange={(e) =>
// // //                 setNewPost((p) => ({ ...p, content: e.target.value }))
// // //               }
// // //             />
// // //           </div>
// // //           <button
// // //             onClick={handleAddPost}
// // //             className="mt-4 rounded-full bg-yellow-400 px-6 py-3 font-semibold text-[#3E3B32] transition hover:bg-yellow-300"
// // //           >
// // //             Publish Post
// // //           </button>
// // //         </section>
// // //       )}

// // //       <main className="mx-auto max-w-6xl px-6 py-10">
// // //         <section className="grid gap-8 md:grid-cols-2">
// // //           {posts.map((post) => (
// // //             <article
// // //               key={post.id}
// // //               className="group rounded-3xl bg-white/70 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
// // //             >
// // //               <div className="relative h-64 overflow-hidden rounded-t-3xl">
// // //                 <img
// // //                   src={post.image}
// // //                   alt={post.title}
// // //                   className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
// // //                 />
// // //                 <div className="absolute left-4 top-4">
// // //                   <Badge label={post.category} />
// // //                 </div>
// // //                 {adminMode && (
// // //                   <button
// // //                     onClick={() => handleDeletePost(post.id)}
// // //                     className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-[#3E3B32] shadow"
// // //                     aria-label="Delete post"
// // //                   >
// // //                     <Trash2 size={16} />
// // //                   </button>
// // //                 )}
// // //               </div>
// // //               <div className="space-y-4 p-6">
// // //                 <h3 className="font-serif text-2xl text-[#3E3B32]">
// // //                   {post.title}
// // //                 </h3>
// // //                 <p className="text-sm text-[#3E3B32]/80">{post.excerpt}</p>
// // //                 <div className="flex items-center gap-2 text-sm text-[#3E3B32]/70">
// // //                   <User size={16} />
// // //                   <span>{post.author}</span>
// // //                   <span className="mx-2">•</span>
// // //                   <span>{post.date}</span>
// // //                 </div>
// // //                 <div className="flex items-center justify-between">
// // //                   <button
// // //                     onClick={() => setSelectedPost(post)}
// // //                     className="rounded-full bg-[#5B8FA8] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4A7A8F]"
// // //                   >
// // //                     Read More
// // //                   </button>
// // //                   <div className="flex gap-3 text-[#3E3B32]/70">
// // //                     <button
// // //                       onClick={() => handleLike(post.id)}
// // //                       className="flex items-center gap-1"
// // //                     >
// // //                       <Heart size={18} />
// // //                       <span>{post.likes}</span>
// // //                     </button>
// // //                     <div className="flex items-center gap-1">
// // //                       <MessageCircle size={18} />
// // //                       <span>{post.comments.length}</span>
// // //                     </div>
// // //                     <Share size={18} />
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </article>
// // //           ))}
// // //         </section>
// // //       </main>

// // //       {selectedPost && (
// // //         <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/30 px-4 py-10">
// // //           <div className="relative max-w-4xl rounded-3xl bg-[#F4F0E6] shadow-2xl">
// // //             <button
// // //               onClick={() => setSelectedPost(null)}
// // //               className="absolute right-6 top-6 text-sm uppercase tracking-[0.2em] text-[#3E3B32]/60"
// // //             >
// // //               Close
// // //             </button>
// // //             <div className="h-80 overflow-hidden rounded-t-3xl">
// // //               <img
// // //                 src={selectedPost.image}
// // //                 alt={selectedPost.title}
// // //                 className="h-full w-full object-cover"
// // //               />
// // //             </div>
// // //             <div className="space-y-6 p-8">
// // //               <Badge label={selectedPost.category} />
// // //               <h2 className="font-serif text-4xl text-[#3E3B32]">
// // //                 {selectedPost.title}
// // //               </h2>
// // //               <div className="flex items-center gap-3 text-sm text-[#3E3B32]/70">
// // //                 <User size={18} />
// // //                 <span>{selectedPost.author}</span>
// // //                 <span>•</span>
// // //                 <span>{selectedPost.date}</span>
// // //               </div>
// // //               <p className="leading-relaxed text-[#3E3B32]/90">
// // //                 {selectedPost.content}
// // //               </p>

// // //               <button
// // //                 onClick={() => handleLike(selectedPost.id)}
// // //                 className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-[#3E3B32] transition hover:bg-yellow-300"
// // //               >
// // //                 <Heart size={18} />
// // //                 Appreciate · {selectedPost.likes}
// // //               </button>

// // //               <section className="space-y-4 rounded-2xl bg-white/70 p-6">
// // //                 <h3 className="font-serif text-2xl text-[#3E3B32]">Comments</h3>
// // //                 <div className="space-y-3">
// // //                   {selectedPost.comments.length === 0 && (
// // //                     <p className="text-sm text-[#3E3B32]/70">
// // //                       Be the first to share kind words.
// // //                     </p>
// // //                   )}
// // //                   {selectedPost.comments.map((comment, idx) => (
// // //                     <div
// // //                       key={idx}
// // //                       className="rounded-2xl border border-[#3E3B32]/10 bg-white px-4 py-3"
// // //                     >
// // //                       <p className="text-sm font-semibold text-[#3E3B32]">
// // //                         {comment.user}
// // //                       </p>
// // //                       <p className="text-sm text-[#3E3B32]/80">
// // //                         {comment.text}
// // //                       </p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //                 <div className="space-y-3">
// // //                   <input
// // //                     className="w-full rounded-xl border border-[#3E3B32]/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B8FA8]"
// // //                     placeholder="Your name"
// // //                     value={commentForm.user}
// // //                     onChange={(e) =>
// // //                       setCommentForm((p) => ({ ...p, user: e.target.value }))
// // //                     }
// // //                   />
// // //                   <textarea
// // //                     className="w-full rounded-xl border border-[#3E3B32]/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B8FA8]"
// // //                     placeholder="Share your thoughts"
// // //                     rows={3}
// // //                     value={commentForm.text}
// // //                     onChange={(e) =>
// // //                       setCommentForm((p) => ({ ...p, text: e.target.value }))
// // //                     }
// // //                   />
// // //                   <button
// // //                     onClick={() => handleAddComment(selectedPost.id)}
// // //                     className="rounded-full bg-[#5B8FA8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4A7A8F]"
// // //                   >
// // //                     Post Comment
// // //                   </button>
// // //                 </div>
// // //               </section>

// // //               {relatedPosts.length > 0 && (
// // //                 <section className="space-y-4">
// // //                   <h3 className="font-serif text-2xl text-[#3E3B32]">
// // //                     You might also like
// // //                   </h3>
// // //                   <div className="grid gap-4 md:grid-cols-2">
// // //                     {relatedPosts.map((post) => (
// // //                       <button
// // //                         key={post.id}
// // //                         onClick={() => setSelectedPost(post)}
// // //                         className="rounded-2xl border border-[#3E3B32]/10 bg-white/70 p-4 text-left transition hover:border-[#5B8FA8]"
// // //                       >
// // //                         <p className="text-xs uppercase tracking-[0.3em] text-[#5B8FA8]">
// // //                           {post.category}
// // //                         </p>
// // //                         <p className="font-serif text-lg text-[#3E3B32]">
// // //                           {post.title}
// // //                         </p>
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                 </section>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Blog;


// // // ...existing code...
// // import React, { useMemo, useState } from "react";
// // import { Heart, MessageCircle, Share, User, Shield } from "lucide-react";
// // import { useNavigate } from "react-router-dom";
// // import drsiddhesh from "../../assets/drsiddhesh.png";

// // const INITIAL_POSTS = [
// //   {
// //     id: 1,
// //     title: "Transform Your Smile with Advanced Dental Techniques",
// //     excerpt:
// //       "Discover how minimally invasive cosmetic treatments can create a radiant smile while preserving natural teeth.",
// //     content:
// //       "At Dr. Siddhesh Mungekar's clinic, we blend artistry with precision. Our advanced cosmetic procedures — from porcelain veneers to laser gum contouring — are tailored to each patient’s unique facial structure. During your consultation, we map out a comprehensive plan using digital smile design to preview results before treatment begins. Combined with sedation options, your journey to a confident smile becomes comfortable and efficient.\n\nWe prioritise conservative dentistry that preserves tooth structure and delivers long-lasting, natural results. Your personalised treatment plan will outline phases, expected outcomes, timelines and follow-ups so you feel informed at every step.",
// //     author: "Dr. Siddhesh Mungekar",
// //     date: "Mar 18 · 2 min read",
// //     image: drsiddhesh,
// //     category: "Cosmetic",
// //     likes: 24,
// //     comments: [
// //       { user: "Aarav", text: "Loved reading about veneers. Super helpful!" },
// //       { user: "Meera", text: "The digital preview is such a confidence boost." },
// //     ],
// //   },
// //   {
// //     id: 2,
// //     title: "Expert Dental Services for Brighter Smiles",
// //     excerpt:
// //       "From ultrasonic cleaning to enamel strengthening, here’s how we keep your smile luminous all year.",
// //     content:
// //       "Our hygiene specialists focus on preventative care that feels indulgent. Each visit includes ultrasonic scaling, guided biofilm therapy and mineral-rich varnish to strengthen enamel. We round it off with personalised at-home care plans and hand-selected products suited to your enamel profile. This concierge approach ensures your smile stays bright between visits.\n\nRegular visits let us catch early issues and provide targeted, minimally invasive interventions for long term oral health.",
// //     author: "Dr. Siddhesh Mungekar",
// //     date: "Mar 18 · 1 min read",
// //     image: drsiddhesh,
// //     category: "Hygiene",
// //     likes: 18,
// //     comments: [{ user: "Sofia", text: "The varnish treatment worked wonders." }],
// //   },
// //   {
// //     id: 3,
// //     title: "Top Dental Care Tips for Healthy Smiles",
// //     excerpt:
// //       "Maintain impeccable oral health with our curated daily rituals and smart product recommendations.",
// //     content:
// //       "To keep your smile balanced, focus on consistency. Begin with pH-balanced rinses, follow up with sonic brushing and finish with flossing. Twice weekly, incorporate remineralizing gels. Our clinicians tailor the ideal ritual during your wellness visit, pairing practical advice with personalised product recommendations so patients feel confident managing oral health at home.",
// //     author: "Dr. Siddhesh Mungekar",
// //     date: "Mar 18 · 2 min read",
// //     image: drsiddhesh,
// //     category: "Wellness",
// //     likes: 32,
// //     comments: [],
// //   },
// // ];

// // const Badge = ({ label }) => (
// //   <span className="px-3 py-1 rounded-full text-xs tracking-wide bg-[#5B8FA8]/10 text-[#5B8FA8] uppercase">
// //     {label}
// //   </span>
// // );

// // export default function Blog() {
// //   const [posts, setPosts] = useState(INITIAL_POSTS);
// //   const navigate = useNavigate();

// //   const handleLike = (postId) => {
// //     setPosts((prev) =>
// //       prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
// //     );
// //   };

// //   const relatedPosts = useMemo(() => posts.slice(0, 3), [posts]);

// //   return (
// //     <div className="min-h-screen bg-[#F4F0E6] text-[#3E3B32]">
// //       <header className="px-6 py-8 border-b border-[#3E3B32]/10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
// //         <div>
// //           <p className="uppercase tracking-[0.3em] text-xs text-[#5B8FA8] flex items-center gap-2">
// //             <Shield size={16} />
// //             Dr. Mungerkars Dental Journal
// //           </p>
// //           <h1 className="text-4xl md:text-5xl font-serif text-[#3E3B32]">
// //             All Posts
// //           </h1>
// //         </div>
// //       </header>

// //       <main className="mx-auto max-w-6xl px-6 py-10">
// //         <section className="grid gap-8 md:grid-cols-2">
// //           {posts.map((post) => (
// //             <article
// //               key={post.id}
// //               className="group rounded-3xl bg-white/70 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
// //             >
// //               <div className="relative h-64 overflow-hidden rounded-t-3xl">
// //                 <img
// //                   src={post.image}
// //                   alt={post.title}
// //                   className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
// //                 />
// //                 <div className="absolute left-4 top-4">
// //                   <Badge label={post.category} />
// //                 </div>
// //               </div>

// //               <div className="space-y-4 p-6">
// //                 <h3 className="font-serif text-2xl text-[#3E3B32]">{post.title}</h3>
// //                 <p className="text-sm text-[#3E3B32]/80">{post.excerpt}</p>

// //                 <div className="flex items-center gap-2 text-sm text-[#3E3B32]/70">
// //                   <User size={16} />
// //                   <span>{post.author}</span>
// //                   <span className="mx-2">•</span>
// //                   <span>{post.date}</span>
// //                 </div>

// //                 <div className="flex items-center justify-between">
// //                   <button
// //                     onClick={() => navigate(`/blog/${post.id}`, { state: { post } })}
// //                     className="rounded-full bg-[#5B8FA8] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4A7A8F]"
// //                   >
// //                     Read More
// //                   </button>

// //                   <div className="flex gap-3 text-[#3E3B32]/70">
// //                     <button
// //                       onClick={() => handleLike(post.id)}
// //                       className="flex items-center gap-1"
// //                       aria-label="Like post"
// //                     >
// //                       <Heart size={18} />
// //                       <span>{post.likes}</span>
// //                     </button>

// //                     <div className="flex items-center gap-1">
// //                       <MessageCircle size={18} />
// //                       <span>{post.comments.length}</span>
// //                     </div>

// //                     <Share size={18} />
// //                   </div>
// //                 </div>
// //               </div>
// //             </article>
// //           ))}
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }
// // // ...existing code...



// import React, { useMemo, useState } from "react";
// import { Heart, MessageCircle, Share, User, Shield } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { INITIAL_POSTS } from "./postsData";

// const Badge = ({ label }) => (
//   <span className="px-3 py-1 rounded-full text-xs tracking-wide bg-[#5B8FA8]/10 text-[#5B8FA8] uppercase">
//     {label}
//   </span>
// );

// export default function Blog() {
//   const [posts, setPosts] = useState(INITIAL_POSTS);
//   const navigate = useNavigate();

//   const handleLike = (postId) => {
//     setPosts((prev) =>
//       prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
//     );
//   };

//   const relatedPosts = useMemo(() => posts.slice(0, 3), [posts]);

//   return (
//     <div className="min-h-screen bg-[#F4F0E6] text-[#3E3B32]">
//       <header className="px-6 py-8 border-b border-[#3E3B32]/10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <p className="uppercase tracking-[0.3em] text-xs text-[#5B8FA8] flex items-center gap-2">
//             <Shield size={16} />
//             Dr. Mungerkars Dental Journal
//           </p>
//           <h1 className="text-4xl md:text-5xl font-serif text-[#3E3B32]">
//             All Posts
//           </h1>
//         </div>
//       </header>

//       <main className="mx-auto max-w-6xl px-6 py-10">
//         <section className="grid gap-8 md:grid-cols-2">
//           {posts.map((post) => (
//             <article
//               key={post.id}
//               className="group rounded-3xl bg-white/70 shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
//             >
//               <div className="relative h-64 overflow-hidden rounded-t-3xl">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute left-4 top-4">
//                   <Badge label={post.category} />
//                 </div>
//               </div>

//               <div className="space-y-4 p-6">
//                 <h3 className="font-serif text-2xl text-[#3E3B32]">{post.title}</h3>
//                 <p className="text-sm text-[#3E3B32]/80">{post.excerpt}</p>

//                 <div className="flex items-center gap-2 text-sm text-[#3E3B32]/70">
//                   <User size={16} />
//                   <span>{post.author}</span>
//                   <span className="mx-2">•</span>
//                   <span>{post.date}</span>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   {/* navigate by id so BlogPost fetches/loads full content */}
//                   <button
//                     onClick={() => navigate(`/blog/${post.id}`)}
//                     className="rounded-full bg-[#5B8FA8] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4A7A8F]"
//                   >
//                     Read More
//                   </button>

//                   <div className="flex gap-3 text-[#3E3B32]/70">
//                     <button
//                       onClick={() => handleLike(post.id)}
//                       className="flex items-center gap-1"
//                       aria-label="Like post"
//                     >
//                       <Heart size={18} />
//                       <span>{post.likes}</span>
//                     </button>

//                     <div className="flex items-center gap-1">
//                       <MessageCircle size={18} />
//                       <span>{post.comments.length}</span>
//                     </div>

//                     <Share size={18} />
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// }

// ...existing code...
import React, { useMemo, useState } from "react";
import { Heart, MessageCircle, Share, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { INITIAL_POSTS } from "./postsData";

const Badge = ({ label }) => (
  <span className="px-3 py-1 rounded-full text-xs tracking-wide bg-[#5B8FA8]/10 text-[#5B8FA8] uppercase">
    {label}
  </span>
);

export default function Blog() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const navigate = useNavigate();

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const relatedPosts = useMemo(() => posts.slice(0, 3), [posts]);

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#3E3B32]">
      <header className="px-4 py-6 sm:px-6 sm:py-8 border-b border-[#3E3B32]/10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-[#5B8FA8] flex items-center gap-2">
            <Shield size={14} />
            Dr. Mungerkars Dental Journal
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#3E3B32]">
            All Posts
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
        <section className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl bg-white/80 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg overflow-hidden"
            >
              <div className="relative h-48 sm:h-64 md:h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge label={post.category} />
                </div>
              </div>

              <div className="space-y-3 p-4 sm:p-6">
                <h3 className="font-serif text-lg sm:text-2xl text-[#3E3B32]">{post.title}</h3>
                <p className="text-sm text-[#3E3B32]/80 line-clamp-3">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-2 text-sm text-[#3E3B32]/70 mt-1">
                  <User size={14} />
                  <span className="text-xs sm:text-sm">{post.author}</span>
                  <span className="mx-1">•</span>
                  <span className="text-xs sm:text-sm">{post.date}</span>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <button
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="w-full sm:w-auto text-center rounded-full bg-[#5B8FA8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4A7A8F]"
                  >
                    Read More
                  </button>

                  <div className="flex items-center gap-4 text-[#3E3B32]/70 justify-between sm:justify-end w-full sm:w-auto">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1 text-sm"
                      aria-label="Like post"
                    >
                      <Heart size={16} />
                      <span className="text-sm">{post.likes}</span>
                    </button>

                    <div className="flex items-center gap-1 text-sm">
                      <MessageCircle size={16} />
                      <span>{post.comments.length}</span>
                    </div>

                    <button aria-label="Share" className="p-1">
                      <Share size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
// ...existing code...