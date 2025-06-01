
import HomeCards from "@/components/HomeCards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionAsync } from "../store/actions/question.action";
import { type AppDispatch, type RootState } from "@/store/store";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector((state: RootState) => state.questionReducer);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        dispatch(setQuestionAsync());
      } catch (error) {
        console.log(error);
      }
    }
    fetchQuestions();
  }, []);

  
  return (
     <div className="container mx-auto flex gap-6 px-4 py-8 min-h-[calc(100vh-4rem)]">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">All Questions</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {sortedQuestions.length} questions • Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "latest" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSortChange("latest")}
            >
              Latest
            </Button>
            <Button
              variant={sortBy === "top" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSortChange("top")}
            >
              Top
            </Button>
            <Button
              variant={sortBy === "unanswered" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSortChange("unanswered")}
            >
              Unanswered
            </Button>
          </div>
        </div> */}
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {question.questions.map((question) => (
          <HomeCards key={question.id} question={question} />
        ))}
      </div>

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="mt-8 mb-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )} */}
      </main>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
}
