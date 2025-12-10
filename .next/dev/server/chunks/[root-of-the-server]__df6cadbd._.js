module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/neynar/user/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const fid = searchParams.get("fid");
    if (!fid) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "FID is required"
        }, {
            status: 400
        });
    }
    const apiKey = process.env.NEYNAR_API_KEY;
    if (!apiKey) {
        // Return mock data if no API key
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            fid: Number.parseInt(fid),
            username: "demo_user",
            displayName: "Demo User",
            pfpUrl: "/profile-avatar-crypto-user.jpg",
            score: 75,
            reputation: "neutral",
            followers: 1234,
            following: 567,
            casts: 0,
            replies: 0,
            verifiedAddresses: []
        });
    }
    try {
        const userResponse = await fetch(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`, {
            headers: {
                accept: "application/json",
                "x-api-key": apiKey
            }
        });
        if (!userResponse.ok) {
            throw new Error("Failed to fetch user from Neynar");
        }
        const userData = await userResponse.json();
        const user = userData.users?.[0];
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "User not found"
            }, {
                status: 404
            });
        }
        const score = user.experimental?.neynar_user_score ?? 0;
        const scorePercent = Math.round(score * 100);
        let reputation = "neutral";
        if (scorePercent >= 80) reputation = "safe";
        else if (scorePercent >= 50) reputation = "neutral";
        else if (scorePercent >= 25) reputation = "risky";
        else reputation = "spammy";
        // Fetch user's casts to count total casts and replies
        let totalCasts = 0;
        let totalReplies = 0;
        try {
            const castsResponse = await fetch(`https://api.neynar.com/v2/farcaster/feed/user/${fid}?limit=150`, {
                headers: {
                    accept: "application/json",
                    "x-api-key": apiKey
                }
            });
            if (castsResponse.ok) {
                const castsData = await castsResponse.json();
                const casts = castsData.casts || [];
                // Count casts and replies
                casts.forEach((cast)=>{
                    if (cast.parent_hash || cast.parent_url) {
                        totalReplies++;
                    } else {
                        totalCasts++;
                    }
                });
            }
        } catch (err) {
            console.error("Error fetching casts:", err);
        // Continue with 0 counts if casts fetch fails
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            fid: user.fid,
            username: user.username,
            displayName: user.display_name,
            pfpUrl: user.pfp_url,
            score: scorePercent,
            reputation,
            followers: user.follower_count ?? 0,
            following: user.following_count ?? 0,
            casts: totalCasts,
            replies: totalReplies,
            verifiedAddresses: user.verified_addresses?.eth_addresses ?? []
        });
    } catch (error) {
        console.error("Neynar API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch user data"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__df6cadbd._.js.map