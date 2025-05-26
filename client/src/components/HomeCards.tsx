import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react'
import { Badge } from './ui/badge'
import  { Link } from 'react-router-dom'

const HomeCards = ({question}:any) => {
  return (
    <div>
        <Link
            to={`/questions/${question.id}`}
            key={question.id}
            className="block"
          >
            <Card className="h-full transition-all hover:border-primary hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{question.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      {question.votes}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      {question.answers}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">
                  {question.content}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {question.tags.map((tag:string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={question.authorImage || "/placeholder.svg"}
                        alt={question.author}
                      />
                      <AvatarFallback>{question.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {question.author}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {question.timePosted}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
    </div>
  )
}

export default HomeCards