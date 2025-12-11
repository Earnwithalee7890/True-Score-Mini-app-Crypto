import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const fid = searchParams.get('fid');

        // Fetch user data from Neynar
        let score = 0;
        let username = 'user';
        let displayName = 'User';
        let reputation = 'Unknown';

        if (fid) {
            try {
                const neynarResponse = await fetch(
                    `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
                    {
                        headers: {
                            'accept': 'application/json',
                            'x-api-key': process.env.NEYNAR_API_KEY || '',
                        },
                    }
                );

                if (neynarResponse.ok) {
                    const data = await neynarResponse.json();
                    const user = data.users?.[0];

                    if (user) {
                        const rawScore = user.experimental?.neynar_user_score || 0;
                        score = Math.round(rawScore * 100);
                        username = user.username || 'user';
                        displayName = user.display_name || user.username || 'User';

                        // Calculate reputation
                        if (score >= 80) reputation = 'SAFE';
                        else if (score >= 50) reputation = 'NEUTRAL';
                        else if (score >= 25) reputation = 'RISKY';
                        else reputation = 'SPAMMY';
                    }
                }
            } catch (error) {
                console.error('Neynar API error:', error);
            }
        }

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#000',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* Logo/Title */}
                        <div
                            style={{
                                fontSize: 48,
                                fontWeight: 'bold',
                                background: 'linear-gradient(90deg, #00d9ff, #00ffcc)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: 40,
                            }}
                        >
                            TRUESCORE
                        </div>

                        {/* Score */}
                        <div
                            style={{
                                fontSize: 180,
                                fontWeight: 'bold',
                                color: '#fff',
                                lineHeight: 1,
                            }}
                        >
                            {score}
                        </div>

                        {/* Label */}
                        <div
                            style={{
                                fontSize: 24,
                                color: 'rgba(255,255,255,0.6)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                marginTop: 20,
                            }}
                        >
                            Neynar Score
                        </div>

                        {/* User Info */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: 40,
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 32,
                                    fontWeight: '600',
                                    color: '#fff',
                                }}
                            >
                                {displayName}
                            </div>
                            <div
                                style={{
                                    fontSize: 20,
                                    color: 'rgba(255,255,255,0.5)',
                                }}
                            >
                                @{username}
                            </div>
                        </div>

                        {/* Reputation Badge */}
                        <div
                            style={{
                                marginTop: 30,
                                padding: '10px 28px',
                                borderRadius: 999,
                                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                                border: '2px solid #a855f7',
                                color: '#a855f7',
                                fontSize: 18,
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            {reputation}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e) {
        console.error('OG Image generation error:', e);
        return new Response(`Failed to generate image`, {
            status: 500,
        });
    }
}
