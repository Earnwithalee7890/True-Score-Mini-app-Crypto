import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid') || '338060';

  // Fetch user data
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
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  // Reputation Colors
  let repColor = '#94a3b8'; // Default gray
  if (reputation === 'SAFE') repColor = '#4ade80'; // Green
  if (reputation === 'NEUTRAL') repColor = '#38bdf8'; // Blue
  if (reputation === 'RISKY') repColor = '#fb923c'; // Orange
  if (reputation === 'SPAMMY') repColor = '#f87171'; // Red

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
          backgroundColor: '#0f172a', // Dark theme background
          backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e1b4b)', // Subtle purple depth
          color: 'white',
          padding: '40px',
        }}
      >
        {/* Header: TrueScore */}
        <div style={{
          display: 'flex',
          fontSize: '40px',
          fontWeight: 900,
          letterSpacing: '10px',
          color: '#22d3ee', // Cyan accent
          marginBottom: '30px'
        }}>
          TRUESCORE
        </div>

        {/* Big Score Number */}
        <div style={{
          display: 'flex',
          fontSize: '200px',
          fontWeight: 900,
          lineHeight: 1,
          color: 'white',
          marginBottom: '20px'
        }}>
          {score}
        </div>

        {/* Username */}
        <div style={{
          display: 'flex',
          fontSize: '60px',
          fontWeight: 800,
          marginBottom: '20px'
        }}>
          @{username}
        </div>

        {/* Reputation Badge */}
        <div style={{
          display: 'flex',
          fontSize: '30px',
          fontWeight: 900,
          padding: '12px 40px',
          borderRadius: '100px',
          backgroundColor: `${repColor}20`, // Transparent version of rep color
          border: `3px solid ${repColor}`,
          color: repColor,
          letterSpacing: '5px'
        }}>
          {reputation}
        </div>

        {/* Footer info */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '50px',
          fontSize: '20px',
          color: 'rgba(255,255,255,0.3)',
          fontWeight: 700
        }}>
          FID: {fid}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
