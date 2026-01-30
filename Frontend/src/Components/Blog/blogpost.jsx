// // import React, { useEffect, useState } from "react";
// // import { useLocation, useParams, useNavigate } from "react-router-dom";
// // import { INITIAL_POSTS } from "./postsData";
// // import { Heart, User, MessageCircle } from "lucide-react";

// // export default function BlogPost() {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [post, setPost] = useState(location.state?.post || null);
// //   const [loading, setLoading] = useState(!post);
// //   const [likes, setLikes] = useState(post?.likes || 0);

// //   useEffect(() => {
// //     if (post) return;
// //     const fallback = INITIAL_POSTS.find((p) => String(p.id) === String(id));
// //     if (fallback) {
// //       setPost(fallback);
// //       setLikes(fallback.likes || 0);
// //       setLoading(false);
// //       return;
// //     }
// //     // no remote API configured -> show not found
// //     setLoading(false);
// //   }, [id, post]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center p-8">
// //         <div>Loading…</div>
// //       </div>
// //     );
// //   }

// //   if (!post) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center p-8">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-semibold">Post not found</h2>
// //           <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#5B8FA8] text-white rounded">
// //             Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-[#F4F0E6] text-[#3E3B32]">
// //       <div className="max-w-4xl mx-auto px-6 py-12">
// //         <div className="overflow-hidden rounded-3xl shadow">
// //           <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
// //         </div>

// //         <div className="mt-8">
// //           <div className="text-sm text-[#5B8FA8] uppercase tracking-wider">{post.category}</div>
// //           <h1 className="mt-2 text-4xl font-serif text-[#3E3B32]">{post.title}</h1>
// //           <div className="mt-3 flex items-center gap-4 text-sm text-[#3E3B32]/70">
// //             <User size={16} />
// //             <span>{post.author}</span>
// //             <span>•</span>
// //             <span>{post.date}</span>
// //           </div>

// //           <div className="mt-6 leading-relaxed text-[#3E3B32]/90 whitespace-pre-line">
// //             {post.content}
// //           </div>

// //           <div className="mt-8 flex items-center gap-4">
// //             <button onClick={() => setLikes((l) => l + 1)} className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-[#3E3B32]">
// //               <Heart size={18} /> Appreciate · {likes}
// //             </button>

// //             <div className="flex items-center gap-3 text-sm text-[#3E3B32]/70">
// //               <MessageCircle size={18} />
// //               <span>{post.comments?.length || 0} comments</span>
// //             </div>

// //             <button onClick={() => navigate(-1)} className="ml-auto text-sm underline">Back</button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { INITIAL_POSTS } from "./postsData";
// import { Heart, User, MessageCircle } from "lucide-react";

// export default function BlogPost() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(location.state?.post || null);
//   const [likes, setLikes] = useState(post?.likes || 0);

//   useEffect(() => {
//     if (post) return;
//     const found = INITIAL_POSTS.find((p) => String(p.id) === String(id));
//     setPost(found || null);
//     setLikes(found?.likes || 0);
//   }, [id, post]);

//   if (!post) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-8">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold">Post not found</h2>
//           <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#5B8FA8] text-white rounded">
//             Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F4F0E6] text-[#3E3B32]">
//       <div className="max-w-4xl mx-auto px-6 py-12">
//         <div className="overflow-hidden rounded-3xl shadow">
//           <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
//         </div>

//         <div className="mt-8">
//           <div className="text-sm text-[#5B8FA8] uppercase tracking-wider">{post.category}</div>
//           <h1 className="mt-2 text-4xl font-serif text-[#3E3B32]">{post.title}</h1>
//           <div className="mt-3 flex items-center gap-4 text-sm text-[#3E3B32]/70">
//             <User size={16} />
//             <span>{post.author}</span>
//             <span>•</span>
//             <span>{post.date}</span>
//           </div>

//           <div className="mt-6 leading-relaxed text-[#3E3B32]/90 whitespace-pre-line">
//             {post.content}
//           </div>

//           <div className="mt-8 flex items-center gap-4">
//             <button onClick={() => setLikes((l) => l + 1)} className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-[#3E3B32]">
//               <Heart size={18} /> Appreciate · {likes}
//             </button>

//             <div className="flex items-center gap-3 text-sm text-[#3E3B32]/70">
//               <MessageCircle size={18} />
//               <span>{post.comments?.length || 0} comments</span>
//             </div>

//             <button onClick={() => navigate(-1)} className="ml-auto text-sm underline">Back</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ...existing code...
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { INITIAL_POSTS } from "./postsData";
import { Heart, User, MessageCircle } from "lucide-react";

export default function BlogPost() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!post);
  const [likes, setLikes] = useState(post?.likes || 0);

  useEffect(() => {
    if (post) return;
    const found = INITIAL_POSTS.find((p) => String(p.id) === String(id));
    setPost(found || null);
    setLikes(found?.likes || 0);
    setLoading(false);
  }, [id, post]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div>Loading…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Post not found</h2>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-[#5B8FA8] text-white rounded">
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#3E3B32]">
      <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="overflow-hidden rounded-2xl shadow">
          <img src={post.image} alt={post.title} className="w-full h-56 sm:h-96 object-cover" />
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="text-xs sm:text-sm text-[#5B8FA8] uppercase tracking-wider">{post.category}</div>
          <h1 className="mt-2 text-2xl sm:text-4xl font-serif text-[#3E3B32]">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#3E3B32]/70">
            <User size={16} />
            <span className="text-sm">{post.author}</span>
            <span>•</span>
            <span className="text-sm">{post.date}</span>
          </div>

          <div className="mt-5 leading-relaxed text-[#3E3B32]/90 whitespace-pre-line text-sm sm:text-base">
            {post.content}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={() => setLikes((l) => l + 1)}
              className="w-full sm:w-auto inline-flex items-center gap-2 justify-center rounded-full bg-yellow-400 px-4 py-3 font-semibold text-[#3E3B32]"
            >
              <Heart size={18} /> Appreciate · {likes}
            </button>

            <div className="flex items-center gap-3 text-sm text-[#3E3B32]/70">
              <MessageCircle size={18} />
              <span>{post.comments?.length || 0} comments</span>
            </div>

            <button onClick={() => navigate(-1)} className="mt-2 sm:mt-0 ml-auto text-sm underline">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// ...existing code...