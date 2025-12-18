import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Simple helper to pick colors for reputations - using standard hex codes for stability
const getRepColor = (rep: string) => {
  const r = (rep || '').toLowerCase();
  if (r.indexOf('safe') !== -1) return '#4ade80';   // Green
  if (r.indexOf('neutral') !== -1) return '#38bdf8'; // Blue
  if (r.indexOf('risky') !== -1) return '#fb923c';   // Orange
  if (r.indexOf('spammy') !== -1) return '#f87171'; // Red
  return '#94a3b8';                                // Gray
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Get parameters directly from URL (Zero-Fetch Strategy)
  const score = searchParams.get('score') || '0';
  const username = searchParams.get('username') || 'user';
  const reputation = searchParams.get('rep') || 'Unknown';
  const fid = searchParams.get('fid') || '0';

  const repColor = getRepColor(reputation);

  // RETURN DIRECTLY - removing try/catch for cleaner execution
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
          backgroundColor: '#0a0e27', // Use solid color instead of gradient for speed
          color: 'white',
          padding: '40px',
        }}
      >
        {/* Header Title */}
        <div style={{
          display: 'flex',
          fontSize: '36px',
          fontWeight: 900,
          color: '#00d9ff',
          marginBottom: '50px',
          letterSpacing: '5px'
        }}>
          TRUESCORE
        </div>

        {/* 3 BOXES GRID - Using margins instead of gap for max Satori compatibility */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

          {/* Box 1: Neynar Score */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '330px',
            height: '330px',
            backgroundColor: '#161b33',
            borderRadius: '20px',
            border: '2px solid rgba(0, 217, 255, 0.5)',
            margin: '0 15px',
          }}>
            <div style={{ fontSize: '120px', fontWeight: 900, lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '20px' }}>
              NEYNER SCORE
            </div>
          </div>

          {/* Box 2: Username */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '330px',
            height: '330px',
            backgroundColor: '#161b33',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            margin: '0 15px',
          }}>
            <div style={{
              fontSize: '44px',
              fontWeight: 800,
              textAlign: 'center',
              width: '100%',
              padding: '0 20px',
              overflow: 'hidden'
            }}>
              @{username}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '20px' }}>
              USERNAME
            </div>
          </div>

          {/* Box 3: Reputation */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '330px',
            height: '330px',
            backgroundColor: '#161b33',
            borderRadius: '20px',
            border: `2px solid ${repColor}`,
            margin: '0 15px',
          }}>
            <div style={{ fontSize: '50px', fontWeight: 900, color: repColor }}>
              {reputation.toUpperCase()}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, opacity: 0.5, marginTop: '20px' }}>
              REPUTATION
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '50px',
          fontSize: '18px',
          color: 'rgba(255,255,255,0.1)',
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
