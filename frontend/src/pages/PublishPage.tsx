import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, ImagePlus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Topic {
  id: string
  name: string
  domainId: number
}

const topics: Topic[] = [
  { id: "1", name: "React", domainId: 1 },
  { id: "2", name: "DevOps", domainId: 2 },
  { id: "3", name: "Machine Learning", domainId: 3 },
  { id: "4", name: "Psychology", domainId: 4 },
  { id: "5", name: "Trading", domainId: 5 },
]

interface PublishPageProps {
  onClose: () => void
  onPublish: () => Promise<void>
  onDomainSelect: (domainId: number) => void
  title: string
  content: string
}

export default function PublishPage({ onClose, onPublish, onDomainSelect, title, content }: PublishPageProps) {
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([])
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const handleSelectTopic = (topic: Topic) => {
    if (selectedTopics.length < 5 && !selectedTopics.find((t) => t.id === topic.id)) {
      setSelectedTopics([...selectedTopics, topic])
      onDomainSelect(topic.domainId)
    }
  }

  const handleRemoveTopic = (topicId: string) => {
    setSelectedTopics(selectedTopics.filter((topic) => topic.id !== topicId))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto pt-[5vh]">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg mb-[5vh] relative">
        <div className="flex items-start justify-between mb-6">
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Story Preview</h2>
            <div className="bg-gray-50 rounded-lg w-full h-64 flex items-center justify-center text-gray-500 mb-4 relative overflow-hidden">
              {image ? (
                <img src={image || "/placeholder.svg"} alt="Story preview" className="w-full h-full object-cover" />
              ) : (
                <p className="text-center px-4">
                  Include a high-quality image in your story to make it more inviting to readers.
                </p>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-4 left-4"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                {image ? "Change image" : "Add image"}
              </Button>
            </div>
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{content.slice(0, 150)}...</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="sticky top-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="border-t pt-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-1">Publishing to: AKSHAR</h3>
            <p className="text-gray-600 text-sm mb-4">
              Add or change topics (up to 5) so readers know what your story is about
            </p>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedTopics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {topic.name}
                    <button className="hover:text-gray-700" onClick={() => handleRemoveTopic(topic.id)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Add a topic..."
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200"
                  onClick={() => setOpen(!open)}
                />
                {open && (
                  <div
                    className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50"
                    style={{
                      maxHeight: "300px",
                      overflow: "auto",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search topics..."
                      className="w-full p-3 border-b sticky top-0 bg-white"
                    //   onChange={(e) => {
                        // Implement search logic here
                    //   }}
                    />
                    <div>
                      {topics.map((topic) => (
                        <button
                          key={topic.id}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 ${
                            selectedTopics.some((t) => t.id === topic.id) ? "opacity-50" : ""
                          }`}
                          onClick={() => {
                            handleSelectTopic(topic)
                            setOpen(false)
                          }}
                          disabled={selectedTopics.some((t) => t.id === topic.id)}
                        >
                          {topic.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6">
            <span className="font-medium">Note:</span> Changes here will affect how your story appears in public places
            like Medium's homepage and in subscribers' inboxes — not the contents of the story itself.
          </p>

          <div className="flex items-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={onPublish}>
              Publish now
            </Button>
            <Button variant="ghost">Schedule for later</Button>
          </div>
        </div>
      </div>
    </div>
  )
}




