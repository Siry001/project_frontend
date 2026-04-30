// Logic
import * as React from "react";
import { generateAiDietPlan } from "../api/services/aiFeaturesServices";

// UI
import Box from "@mui/material/Box";
import DietSystemCard from "../components/dashboard/DietSystemCard";
import SelectMulti from "../components/dashboard/SelectMulti";
import { Button } from "@mui/material";
import { getAllDietPlans, getDietPlanDetails } from "../api/services/dietPlansServices";
import MealSection from "../components/dashboard/MealSection";

function hasRequiredDietData(values) {
    return Boolean(
        values.goal.trim() && values.calories.trim() && values.meals.trim(),
    );
}

function formatManualPlan(label, description, sections) {
    return {
        source: "manual",
        headline: label,
        description,
        sections,
    };
}

function formatManualDiet(values) {
    return formatManualPlan(
        "Manual nutrition setup",
        "These meal preferences are currently driving the nutrition plan preview.",
        [
            {
                title: "Targets",
                items: [
                    `Goal: ${values.goal || "Not set yet"}`,
                    `Calories: ${values.calories || "Not set"} kcal`,
                    `Meals per day: ${values.meals || "Not set"}`,
                ],
            },
            {
                title: "Preferences",
                items: [
                    values.notes ||
                    "Add dietary preferences, restrictions, or meal style notes.",
                ],
            },
        ],
    );
}

function formatAiPlan(data, fallbackHeadline, fallbackDescription) {
    if (typeof data === "string") {
        return {
            source: "ai",
            headline: fallbackHeadline,
            description: fallbackDescription,
            sections: [{ title: "AI Plan", items: [data] }],
        };
    }

    if (Array.isArray(data)) {
        return {
            source: "ai",
            headline: fallbackHeadline,
            description: fallbackDescription,
            sections: [{ title: "AI Plan", items: valueToItems(data) }],
        };
    }

    if (data && typeof data === "object") {
        const headline =
            data.title ||
            data.name ||
            data.summary ||
            data.goal ||
            data.planName ||
            fallbackHeadline;
        const description =
            data.description ||
            data.overview ||
            data.message ||
            data.intro ||
            fallbackDescription;

        const reserved = new Set([
            "title",
            "name",
            "summary",
            "goal",
            "planName",
            "description",
            "overview",
            "message",
            "intro",
        ]);
        const sections = Object.entries(data)
            .filter(([key]) => !reserved.has(key))
            .map(([key, value]) => ({
                title: toSentenceCase(key),
                items: valueToItems(value),
            }))
            .filter((section) => section.items.length > 0);

        return {
            source: "ai",
            headline,
            description,
            sections: sections.length
                ? sections
                : [{ title: "AI Plan", items: ["Plan generated successfully."] }],
        };
    }

    return {
        source: "ai",
        headline: fallbackHeadline,
        description: fallbackDescription,
        sections: [{ title: "AI Plan", items: ["Plan generated successfully."] }],
    };
}

function toSentenceCase(text) {
    return text
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/^\w/, (letter) => letter.toUpperCase());
}

function valueToItems(value) {
    if (value == null) {
        return [];
    }

    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        return [String(value)];
    }

    if (Array.isArray(value)) {
        return value.flatMap((entry) => valueToItems(entry));
    }

    if (typeof value === "object") {
        return Object.entries(value).map(
            ([key, entry]) => `${toSentenceCase(key)}: ${String(entry)}`,
        );
    }

    return [];
}

const pastDietPlanId = localStorage.getItem("dietPlanID")

export default function Diet() {
    const [plan, setPlan] = React.useState(pastDietPlanId || "");
    const [plans, setPlans] = React.useState([]);
    const [diet, setDiet] = React.useState({})

    React.useEffect(() => {
        let tempPlans
        async function fetchPlans() {
            tempPlans = await getAllDietPlans()
            setPlans(tempPlans)
            if (!plan) {
                setPlan(tempPlans.at(-1).id)
            }
        }
        fetchPlans()
    }, [])

    React.useEffect(() => {
        let tempDiet
        async function fetchDiet() {
            tempDiet = await getDietPlanDetails(plan)
            setDiet(tempDiet.diet)
        }
        if (plan) {
            localStorage.setItem("dietPlanID", plan)
            fetchDiet()
        }
    }, [plan])
    // const [dietSource, setDietSource] = React.useState("manual");
    // const [aiDietContent, setAiDietContent] = React.useState(null);
    // const [dietLoading, setDietLoading] = React.useState(false);

    // const [dietError, setDietError] = React.useState("");
    // const [isDietPlanVisible, setIsDietPlanVisible] = React.useState(false);

    // function setDietPlan(data) {
    //     updateDietPlan((current) => ({ ...current, ...data }));
    //     setDietSource("manual");
    //     setDietError("");
    // }

    // function showDietPlan() {
    //     if (hasRequiredDietData(dietPlan)) {
    //         setIsDietPlanVisible(true);
    //     }
    // }

    // function getDietPlan() {
    //     if (dietSource === "ai" && aiDietContent) {
    //         return formatAiPlan(
    //             aiDietContent,
    //             "AI diet plan",
    //             "Generated from your latest nutrition preferences.",
    //         );
    //     }

    //     return formatManualDiet(dietPlan);
    // }

    // async function handleGenerateDietPlan() {
    //     try {
    //         setDietLoading(true);
    //         setDietError("");
    //         const response = await generateAiDietPlan(dietPlan);
    //         setAiDietContent(response);
    //         setDietSource("ai");
    //         setIsDietPlanVisible(true);
    //     } catch (error) {
    //         setDietError(
    //             error?.response?.data?.message ||
    //             "Unable to generate diet plan right now.",
    //         );
    //     } finally {
    //         setDietLoading(false);
    //     }
    // }

    // const currentDietPlan = getDietPlan();
    // const canShowDietPlan = hasRequiredDietData(dietPlan);
    return (
        <>
            {/* <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                alignItems: "stretch",
            }}
        >
            <Box sx={{ flex: "1 1 520px", minWidth: 0 }}>
                <DietSystemCard
                    values={dietPlan}
                    displayPlan={currentDietPlan}
                    onChange={setDietPlan}
                    onShowPlan={showDietPlan}
                    onGenerate={handleGenerateDietPlan}
                    loading={dietLoading}
                    error={dietError}
                    isPlanVisible={isDietPlanVisible}
                    canShowPlan={canShowDietPlan}
                />
            </Box>
        </Box> */}

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                    <h2 style={{ fontSize: "35px" }}>Nutrition Plan</h2>
                    <p style={{ fontWeight: "200" }}>Track your daily meals and hit your macro goals.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <SelectMulti state={{ plan, setPlan }} data={{ plans, setPlans }} />
                    <Button color="secondary" variant="contained">+</Button>
                </div>
            </div >

            <hr style={{ width: "100%", height: "1px", opacity: "30%" }} />

            <MealSection title="Breakfast" color="#eab308" foods={diet.Breakfast && diet.Breakfast.foods} />
            <hr style={{ width: "100%", height: "1px", opacity: "30%" }} />

            <MealSection title="Lunch" color="#f97316" foods={diet.Lunch && diet.Lunch.foods} />
            <hr style={{ width: "100%", height: "1px", opacity: "30%" }} />

            <MealSection title="Dinner" color="#eab308" foods={diet.Dinner && diet.Dinner.foods} />
        </>
    );
}