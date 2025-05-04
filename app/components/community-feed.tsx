"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageSquare, Share2, Send } from "lucide-react"

export default function CommunityFeed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        username: "alexj",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Just hit a new PR on muscle-ups! 5 clean reps, no kipping. Consistency is key! 💪",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      liked: false,
    },
    {
      id: 2,
      user: {
        name: "Sarah Williams",
        username: "sarahw",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Day 30 of handstand practice. Finally able to hold it for 20 seconds! Here's my progress video. Any tips for improving balance?",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 12,
      liked: true,
    },
    {
      id: 3,
      user: {
        name: "Mike Chen",
        username: "mikec",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Front lever progression update: Now able to hold the advanced tuck position for 10 seconds. It's been a challenging journey but worth every second!",
      image: "/placeholder.svg?height=400&width=600",
      timestamp: "Yesterday",
      likes: 36,
      comments: 8,
      liked: false,
    },
  ])

  const [newPost, setNewPost] = useState("")

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  const handlePostSubmit = () => {
    if (!newPost.trim()) return

    const newPostObj = {
      id: posts.length + 1,
      user: {
        name: "You",
        username: "user",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      liked: false,
    }

    setPosts([newPostObj, ...posts])
    setNewPost("")
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
            <AvatarFallback>YO</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your progress or ask for advice..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="resize-none"
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handlePostSubmit}>
                <Send className="h-4 w-4 mr-2" /> Post
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{post.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  @{post.user.username} · {post.timestamp}
                </div>
              </div>
            </div>
            <p className="text-sm mb-3">{post.content}</p>
            {post.image && (
              <div className="relative aspect-video mb-3 overflow-hidden rounded-md">
                <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
              </div>
            )}
            <div className="flex items-center space-x-4 text-sm">
              <button
                className={`flex items-center space-x-1 ${post.liked ? "text-red-500" : ""}`}
                onClick={() => handleLike(post.id)}
              >
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Load More
        </Button>
      </CardFooter>
    </Card>
  )
}
