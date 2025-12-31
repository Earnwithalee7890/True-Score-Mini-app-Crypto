const fs = require('fs');
const https = require('https');

// Simple .env parser
function getEnv() {
    try {
        const content = fs.readFileSync('.env.local', 'utf8');
        const match = content.match(/NEYNAR_API_KEY=(.*)/);
        return match ? match[1].trim() : null;
    } catch (e) {
        return null; // Fallback or handle error
    }
}

async function checkUser() {
    const apiKey = getEnv();
    if (!apiKey) {
        console.error("No API Key found in .env.local");
        return;
    }

    const options = {
        hostname: 'api.neynar.com',
        path: '/v2/farcaster/user/bulk?fids=338060', // Using owner FID for check
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'x-api-key': apiKey
        }
    };

    const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                const user = json.users ? json.users[0] : null;
                if (user) {
                    console.log("Keys:", Object.keys(user));
                    console.log("Stats:", JSON.stringify(user.follower_count, null, 2));
                    // Check deeply for other stats
                    console.log("Full Object snippet:", JSON.stringify(user, null, 2).substring(0, 500));

                    // Specific check for 'power_badge', 'active_status'
                    console.log("Power Badge:", user.power_badge);
                } else {
                    console.log("User not found or error", json);
                }
            } catch (e) {
                console.error("JSON Error", e);
            }
        });
    });

    req.on('error', (e) => {
        console.error("Request Error", e);
    });
    req.end();
}

checkUser();
