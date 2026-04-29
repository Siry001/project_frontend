import * as React from "react";

import WorkoutSystemCard from "../components/dashboard/WorkoutSystemCard";
import { Box } from "@mui/material";

export default function Workout() {
  const [workout, updateWorkout] = React.useState({});
  const [workoutSource, setWorkoutSource] = React.useState("manual");
  const [aiWorkoutContent, setAiWorkoutContent] = React.useState(null);
  const [workoutLoading, setWorkoutLoading] = React.useState(false);
  const [workoutError, setWorkoutError] = React.useState("");
  const [isWorkoutPlanVisible, setIsWorkoutPlanVisible] = React.useState(false);

  //   const workoutPlan = getWorkout();
  //   const canShowWorkoutPlan = hasRequiredWorkoutData(workout);

  //   function formatManualPlan(label, description, sections) {
  //     return {
  //       source: "manual",
  //       headline: label,
  //       description,
  //       sections,
  //     };
  //   }

  //   function setWorkout(data) {
  //     updateWorkout((current) => ({ ...current, ...data }));
  //     setWorkoutSource("manual");
  //     setWorkoutError("");
  //   }

  //   function showWorkoutPlan() {
  //     if (hasRequiredWorkoutData(workout)) {
  //       setIsWorkoutPlanVisible(true);
  //     }
  //   }

  //   function getWorkout() {
  //     if (workoutSource === "ai" && aiWorkoutContent) {
  //       return formatAiPlan(
  //         aiWorkoutContent,
  //         "AI workout plan",
  //         "Generated from your latest workout preferences.",
  //       );
  //     }

  //     return formatManualWorkout(workout);
  //   }

  //   function formatManualWorkout(values) {
  //     return formatManualPlan(
  //       "Manual workout setup",
  //       "Your current manual workout targets are ready for AI generation.",
  //       [
  //         {
  //           title: "Targets",
  //           items: [
  //             `Goal: ${values.goal || "Not set yet"}`,
  //             `Training frequency: ${values.daysPerWeek || "Not set"} days per week`,
  //             `Session length: ${values.sessionLength || "Not set"}`,
  //           ],
  //         },
  //         {
  //           title: "Preferences",
  //           items: [
  //             values.notes ||
  //               "Add equipment, injury, or split preferences to guide the plan.",
  //           ],
  //         },
  //       ],
  //     );
  //   }

  //   async function handleGenerateWorkout() {
  //     try {
  //       setWorkoutLoading(true);
  //       setWorkoutError("");
  //       const response = await generateAiWorkout(workout);
  //       setAiWorkoutContent(response);
  //       setWorkoutSource("ai");
  //       setIsWorkoutPlanVisible(true);
  //     } catch (error) {
  //       setWorkoutError(
  //         error?.response?.data?.message ||
  //           "Unable to generate workout plan right now.",
  //       );
  //     } finally {
  //       setWorkoutLoading(false);
  //     }
  //   }

  //   function hasRequiredWorkoutData(values) {
  //     return Boolean(
  //       values.goal.trim() &&
  //       values.daysPerWeek.trim() &&
  //       values.sessionLength.trim(),
  //     );
  //   }

  return (
    <Box sx={{ flex: "1 1 520px", minWidth: 0 }}>
      <WorkoutSystemCard
        values={workout}
        // displayPlan={workoutPlan}
        // onChange={setWorkout}
        // onShowPlan={showWorkoutPlan}
        // onGenerate={handleGenerateWorkout}
        // loading={workoutLoading}
        // error={workoutError}
        // isPlanVisible={isWorkoutPlanVisible}
        // canShowPlan={canShowWorkoutPlan}
      />
    </Box>
  );
}
