import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const fid = searchParams.get('fid') || '338060';

        // Fetch user data from Neynar
        let username = 'user';
        let displayName = 'TrueScore User';
        let score = 0;
        let reputation = 'NEUTRAL';

        try {
            const response = await fetch(
                `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
                {
                    headers: {
                        'accept': 'application/json',
                        'x-api-key': process.env.NEYNAR_API_KEY || '',
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                const user = data.users?.[0];

                if (user) {
                    const rawScore = user.experimental?.neynar_user_score || 0;
                    score = Math.round(rawScore * 100);
                    username = user.username || 'user';
                    displayName = user.display_name || username;

                    // Calculate reputation
                    if (score >= 80) reputation = 'SAFE';
                    else if (score >= 50) reputation = 'NEUTRAL';
                    else if (score >= 25) reputation = 'RISKY';
                    else reputation = 'SPAMMY';
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }

        // Reputation colors
        const repColors: Record<string, { bg: string; text: string }> = {
            SAFE: { bg: '#22c55e', text: '#f0fdf4' },
            NEUTRAL: { bg: '#eab308', text: '#fefce8' },
            RISKY: { bg: '#f97316', text: '#fff7ed' },
            SPAMMY: { bg: '#ef4444', text: '#fef2f2' },
        };

        const repColor = repColors[reputation];

        return new ImageResponse(
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0e27, #1a2040)',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '60px',
                        borderRadius: '32px',
                        background: 'rgba(15, 20, 41, 0.9)',
                        border: '2px solid rgba(0, 217, 255, 0.3)',
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: '48px',
                            fontWeight: 900,
                            background: 'linear-gradient(135deg, #00d9ff, #00ffcc)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginBottom: '40px',
                        }}
                    >
                        TRUESCORE
                    </div>

                    {/* Avatar with Initials */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '30px',
                            marginBottom: '40px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #00d9ff, #00ffcc)',
                                fontSize: '40px',
                                fontWeight: 900,
                                color: '#0a0e27',
                            }}
                        >
                            {displayName.substring(0, 2).toUpperCase()}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    color: '#e0f4ff',
                                }}
                            >
                                {displayName}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    fontSize: '20px',
                                    color: '#7fa8c7',
                                }}
                            >
                                @{username}
                            </div>
                        </div>
                    </div>

                    {/* Score */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '30px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: '20px',
                                color: '#7fa8c7',
                                marginBottom: '10px',
                            }}
                        >
                            NEYNAR SCORE
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: '100px',
                                fontWeight: 900,
                                background: 'linear-gradient(135deg, #00d9ff, #00ffcc)',
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            {score}
                        </div>
                    </div>

                    {/* Reputation Badge */}
                    <div
                        style={{
                            display: 'flex',
                            padding: '12px 32px',
                            borderRadius: '999px',
                            background: repColor.bg,
                            fontSize: '24px',
                            fontWeight: 700,
                            color: repColor.text,
                        }}
                    >
                        {reputation}
                    </div>
                </div>
            </div>,
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (error) {
        console.error('OG Image error:', error);

        // Simple fallback
        return new ImageResponse(
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0e27',
                    color: '#00d9ff',
                    fontSize: '48px',
                    fontWeight: 700,
                }}
            >
                TrueScore
            </div>,
            {
                width: 1200,
                height: 630,
            }
        );
    }
}
