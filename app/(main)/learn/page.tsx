import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { Unit } from "./unit";
import { UserProgress } from "@/components/user-progress";
import { getUserSubscription, getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { regenerateHearts } from "@/actions/user-progress";
import { redirect } from "next/navigation";
import { lessons, units as unitsSchema } from "@/db/schema";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import LanguageSwitcherWrapper from "@/components/language-switcher-wrapper"; // <-- use wrapper

export default async function LearnPage() {
  try {
    await regenerateHearts();
  } catch (error) {
    console.error("Heart regeneration failed:", error);
  }

  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }
  const isPro = !!userSubscription?.isActive;

  return (
    <div className="relative">
      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <div className="flex items-center justify-end w-full mb-4 gap-4">
            {/* Move the language switcher here, align right with a flex row */}
            <LanguageSwitcherWrapper />
          </div>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress.hearts}
            points={userProgress.points}
            streaks={userProgress.streak}
            lastActive={userProgress.lastActive}
            hasActiveSubscription={isPro}
            lastHeartLoss={userProgress.lastHeartLoss}
          />
          {!isPro && <Promo />}
          <Quests points={userProgress.points} />
        </StickyWrapper>

        <FeedWrapper>
          <Header title={userProgress.activeCourse.title} />
          {units.map((unit) => (
            <div key={unit.id} className="mb-10">
              <Unit
                id={unit.id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={courseProgress?.activeLesson as typeof lessons.$inferSelect & {
                  unit: typeof unitsSchema.$inferSelect;
                } | undefined}
                activeLessonPercentage={lessonPercentage}
                allUnits={units}
                hearts={userProgress.hearts}
                hasActiveSubscription={isPro}
                lastHeartLoss={userProgress.lastHeartLoss}
              />
            </div>
          ))}
        </FeedWrapper>
      </div>
    </div>
  );
}


