import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Clock, MessageCircle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getUserQuestionsAsync } from "@/store/actions/userQuestion.action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { formatDistanceToNow } from "date-fns";
import Loader from "./Loader";

function UserQuestions() {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, isError, isLoading } = useSelector(
    (state: RootState) => state.userQuestionsReducer
  );

  useEffect(() => {
    async function fetchUserQuestions() {
      try {
        dispatch(getUserQuestionsAsync());
      } catch (error) {
        console.error("Failed to fetch user questions:", error);
      }
    }
    fetchUserQuestions();
  }, [dispatch]);
  if (questions === null) {
    return (
      <div className="flex justify-center items-center">
        {" "}
        No question posted{" "}
      </div>
    );
  }
  if (!questions) {
    return (
      <div className="flex justify-center items-center">
        {" "}
        <Loader />{" "}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center text-red-500">Failed to load questions.</div>
    );
  }

  return (
    <div>
      <TabsContent value="questions" className="space-y-6">
        <h2 className="text-xl font-semibold">Your Questions</h2>

        {questions.map((question) => (
          <Card key={question.id}>
            <CardHeader className="pb-2">
              <Link
                to={`/questions/${question.id}`}
                className="hover:underline"
              >
                <h3 className="font-semibold">{question.title}</h3>
                <p className="font-thin">
                  {question.description.slice(0, 100)}...
                </p>
              </Link>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="mb-2 flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sm">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    {question.upvote}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    {question._count.answers}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />

                  {`Posted ${formatDistanceToNow(new Date(question.createdAt), {
                    addSuffix: true,
                  })}`}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-center">
          <Link to="/ask">
            <Button>Ask a New Question</Button>
          </Link>
        </div>
      </TabsContent>
    </div>
  );
}

export default UserQuestions;
