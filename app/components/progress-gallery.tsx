"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

export default function ProgressGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const progressImages = [
    {
      date: "January 2023",
      image: "/placeholder.svg?height=400&width=300",
      notes: "Starting my calisthenics journey. Can do 5 push-ups max.",
    },
    {
      date: "March 2023",
      image: "/placeholder.svg?height=400&width=300",
      notes: "Two months in. Now able to do 15 push-ups and 3 pull-ups.",
    },
    {
      date: "June 2023",
      image: "/placeholder.svg?height=400&width=300",
      notes: "Making good progress. Achieved first muscle-up!",
    },
    {
      date: "September 2023",
      image: "/placeholder.svg?height=400&width=300",
      notes: "Six months of consistent training. Can hold a 20-second L-sit.",
    },
    {
      date: "December 2023",
      image: "/placeholder.svg?height=400&width=300",
      notes: "End of year progress. Working on handstand push-ups now.",
    },
    {
      date: "March 2024",
      image: "/placeholder.svg?height=400&width=300",
      notes: "One year milestone! Can do 5 muscle-ups and 10-second front lever.",
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === progressImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? progressImages.length - 1 : prevIndex - 1))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Progress Gallery</CardTitle>
        <CardDescription>Track your physical transformation over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline" className="mt-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="icon" onClick={prevImage}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">{progressImages[currentImageIndex].date}</span>
                <Button variant="outline" size="icon" onClick={nextImage}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image
                  src={progressImages[currentImageIndex].image || "/placeholder.svg"}
                  alt={`Progress photo from ${progressImages[currentImageIndex].date}`}
                  fill
                  className="object-cover"
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="icon" className="absolute bottom-2 right-2">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{progressImages[currentImageIndex].date}</DialogTitle>
                      <DialogDescription>{progressImages[currentImageIndex].notes}</DialogDescription>
                    </DialogHeader>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                      <Image
                        src={progressImages[currentImageIndex].image || "/placeholder.svg"}
                        alt={`Progress photo from ${progressImages[currentImageIndex].date}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{progressImages[currentImageIndex].notes}</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="gallery" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {progressImages.map((item, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <div className="relative aspect-square overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={`Progress photo from ${item.date}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-2">
                        <span className="text-white text-xs font-medium">{item.date}</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{item.date}</DialogTitle>
                      <DialogDescription>{item.notes}</DialogDescription>
                    </DialogHeader>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={`Progress photo from ${item.date}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Upload className="mr-2 h-4 w-4" /> Add New Photo
        </Button>
      </CardFooter>
    </Card>
  )
}
