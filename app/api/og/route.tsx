import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get('fid') || '338060';

    // Fetch user data with high-speed timeout
    let score = 0;
    let username = 'user';
    let reputation = 'Unknown';

    try {
      const response = await fetch(
        `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
        {
          headers: {
            'accept': 'application/json',
            'x-api-key': process.env.NEYNAR_API_KEY || '',
          },
          next: { revalidate: 3600 } // Cache for 1 hour
        }
      );

      if (response.ok) {
        const data = await response.json();
        const user = data.users?.[0];
        if (user) {
          const rawScore = user.experimental?.neynar_user_score || 0;
          score = Math.round(rawScore * 100);
          username = user.username || 'user';
          if (score >= 80) reputation = 'SAFE';
          else if (score >= 50) reputation = 'NEUTRAL';
          else if (score >= 25) reputation = 'RISKY';
          else reputation = 'SPAMMY';
        }
      }
    } catch (e) { }

    // Solid colors for maximum stability
    let repColor = '#94a3b8';
    if (reputation === 'SAFE') repColor = '#4ade80';
    if (reputation === 'NEUTRAL') repColor = '#38bdf8';
    if (reputation === 'RISKY') repColor = '#fb923c';
    if (reputation === 'SPAMMY') repColor = '#f87171';

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
            backgroundColor: '#0f172a',
            color: 'white',
            padding: '40px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '8px', color: '#22d3ee', marginBottom: '40px' }}>
            TRUESCORE
          </div>

          {/* Simple Score Box */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '320px',
            borderRadius: '40px',
            border: '4px solid #1e293b',
            backgroundColor: '#1e293b',
            marginBottom: '40px',
          }}>
            <div style={{ fontSize: '150px', fontWeight: 900, lineHeight: 1 }}>{score}</div>
          </div>

          {/* User Info */}
          <div style={{ display: 'flex', fontSize: '60px', fontWeight: 800, marginBottom: '20px' }}>
            @{username}
          </div>

          {/* Reputation */}
          <div style={{
            display: 'flex',
            fontSize: '30px',
            fontWeight: 900,
            padding: '10px 40px',
            borderRadius: '100px',
            border: `3px solid ${repColor}`,
            color: repColor,
            letterSpacing: '4px'
          }}>
            {reputation}
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response('Error rendering image', { status: 500 });
  }
}
