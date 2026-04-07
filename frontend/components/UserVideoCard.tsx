"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  author: string;
  likes: number;
  dislikes: number;
};

export default function UserVideoCard({
  title,
  author,
  likes,
  dislikes,
}: Props) {
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);

  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4 flex flex-col gap-2">
      <div className="aspect-video bg-gray-200 rounded-lg mb-2 flex items-center justify-center text-gray-500 text-xs">
        Vídeo de usuario (placeholder)
      </div>
      <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
      <p className="text-xs text-gray-500">Publicado por {author}</p>
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => setLocalLikes((v) => v + 1)}
          className="flex items-center gap-1 text-xs text-gray-700 hover:text-primary"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{localLikes}</span>
        </button>
        <button
          onClick={() => setLocalDislikes((v) => v + 1)}
          className="flex items-center gap-1 text-xs text-gray-700 hover:text-red-500"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{localDislikes}</span>
        </button>
      </div>
    </div>
  );
}
