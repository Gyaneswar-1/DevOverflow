import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Award, Clock, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { asyncUserAnswer } from "@/store/actions/userAnswer.action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { formatDistanceToNow } from "date-fns";

// const answers = [
//   {
//     id: 1,
//     questionTitle: "How do I implement authentication in Next.js?",
//     questionId: 101,
//     content:
//       "I would recommend using NextAuth.js. It's specifically designed for Next.js and provides a lot of functionality out of the box...",
//     votes: 15,
//     isAccepted: true,
//     timePosted: "3 days ago",
//   },
//   {
//     id: 2,
//     questionTitle: "What's the difference between useMemo and useCallback?",
//     questionId: 102,
//     content:
//       "The main difference is that useMemo is used to memoize values while useCallback is used to memoize functions...",
//     votes: 24,
//     isAccepted: true,
//     timePosted: "1 week ago",
//   },
//   {
//     id: 3,
//     questionTitle: "How to implement dark mode in a React application?",
//     questionId: 103,
//     content:
//       "You can use CSS variables combined with a context provider to implement a dark mode toggle...",
//     votes: 12,
//     isAccepted: false,
//     timePosted: "2 weeks ago",
//   },
// ];

function UserAnswers() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    function getUserAnswers() {
      dispatch(asyncUserAnswer());
    }
    getUserAnswers();
  }, [dispatch]);

  const { answers, isError, isLoading } = useSelector(
    (state: RootState) => state.userAnswerReducer
  );

  return (
    <div>
      <TabsContent value="answers" className="space-y-6">
        <h2 className="text-xl font-semibold">Recent Answers</h2>

        {answers.map((answer) => (
          <Card key={answer.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 pb-2">
              <Link to={`/questions/${answer.id}`} className="hover:underline">
                <h3 className="font-semibold">{answer.content}</h3>
              </Link>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {answer.content}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    {answer.upvote}
                  </span>
                  {answer.isAccepted && (
                    <Badge
                      variant="default"
                      className="flex items-center gap-1 bg-green-100 text-green-800"
                    >
                      <Award className="h-3 w-3" />
                      Accepted
                    </Badge>
                  )}
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />

                  {`Posted ${formatDistanceToNow(new Date(answer.createdAt), {
                    addSuffix: true,
                  })}`}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex justify-center">
          <Link to="#">
            <Button>Load more</Button>
          </Link>
        </div>
      </TabsContent>
    </div>
  );
}

export default UserAnswers;
