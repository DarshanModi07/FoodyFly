import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_KEY = import.meta.env.GEMINI_KEY;

console.log("🔑 GEMINI_KEY Loaded:", GEMINI_KEY ? "YES ✅" : "NO ❌");

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export async function runAI(userQuestion, allFeedData) {

    console.log("======================================");
    console.log("🚀 runAI FUNCTION STARTED");
    console.log("👤 User Question:", userQuestion);
    console.log("📦 allFeedData type:", typeof allFeedData);
    console.log("📦 Restaurants Count:", allFeedData?.length);
    console.log("======================================");

    console.log("🤖 Initializing Model...");
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest"
    });

    console.log("✅ Model Initialized");

    console.log("📝 Building Context Text...");

    const contextText = allFeedData.map((restro, index) => {

        console.log(`➡ Processing Restaurant ${index + 1}`);
        console.log("   Name:", restro?.RestroName);
        console.log("   Cuisine:", restro?.cuisine);
        console.log("   Rating:", restro?.rating);
        console.log("   Price:", restro?.price);
        console.log("   Keywords:", restro?.keywords);

        return `
Restaurant Name: ${restro?.RestroName}
Cuisine: ${restro?.cuisine}
Rating: ${restro?.rating} Stars
Price for Two: ₹${restro?.price * 2} (approx)
Famous Dishes: ${restro?.keywords?.join(", ")}
        `;
    }).join("\n---\n");

    console.log("📄 Context Built Successfully");
    console.log("📄 Context Length:", contextText.length);

    const prompt = `
Act as a smart AI Waiter for "FoodyFly".

Here is our list of Restaurants and their Menu Highlights:
${contextText}

USER ASKS: "${userQuestion}"

RULES:
1. Answer using ONLY the data above.
2. If the user asks for a dish (e.g., "Butter Chicken"), find a restaurant that lists it in "Famous Dishes".
3. Suggest the specific restaurant and the dish name.
4. Keep it short, helpful, and use emojis 😋.
5. If no restaurant has the item, say "Sorry, I couldn't find that nearby."
`;

    console.log("📤 Prompt Ready");
    console.log("📊 Prompt Length:", prompt.length);
    console.log("📤 Sending Request To Gemini...");

    const result = await model.generateContent(prompt);

    console.log("✅ Gemini Response Received");
    console.log("🔍 Raw Result Object:", result);

    const response = await result.response;

    console.log("📨 Response Object:", response);

    const finalText = response.text();

    console.log("🤖 Final AI Response:", finalText);
    console.log("======================================");

    return finalText;
}
