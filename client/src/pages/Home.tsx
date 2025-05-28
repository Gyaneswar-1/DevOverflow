import { Button } from "@/components/ui/button";

import HomeCards from "@/components/HomeCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionAsync } from "../store/actions/question.action";
import { type AppDispatch, type RootState } from "@/store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector((state: RootState) => state.questionReducer);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        dispatch(setQuestionAsync());
        console.log("Question data:", question);
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuestions();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Recent Questions</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Latest
          </Button>
          <Button variant="ghost" size="sm">
            Top
          </Button>
          <Button variant="ghost" size="sm">
            Unanswered
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {question.questions.map((question) => (
          <HomeCards key={question.id} question={question} />
        ))}
      </div>
    </main>
  );
}
