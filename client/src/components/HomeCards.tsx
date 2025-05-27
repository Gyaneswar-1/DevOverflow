import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react'
import { Badge } from './ui/badge'
import  { Link } from 'react-router-dom'
import type { QuestionInterface } from '@/types/ObjectTypes'

const HomeCards = ({question}:{question:QuestionInterface}) => {
  console.log("dfsdfd",question);
  
  return (
    <div >
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
                      {question.upvote}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      {question._count.answers}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-2 text-muted-foreground">
                  {question.description}
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
                        src={question.createdBy.profileImage }
                        alt={question.createdBy.fullName}
                      />
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {question.createdBy.fullName}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {question.createdAt}
                  </span>
                </div>
              </CardFooter>
            </Card>
          </Link>
    </div>
  )
}

export default HomeCards