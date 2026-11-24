import type { CSSProperties } from 'react';

interface CatStorySceneProps {
  mode: 'reading' | 'moving' | 'celebrate' | 'bridgeCry';
  moveStep?: number;
}

export function CatStoryScene({ mode, moveStep = 0 }: CatStorySceneProps) {
  if (mode === 'celebrate') {
    return (
      <div className="flex flex-col items-center justify-center py-2 select-none">
        <div className="relative w-64 h-44 flex items-end justify-center">
          {/* Jumping & Hugging Cats */}
          <div className="animate-cat-jump relative flex items-end justify-center">
            <svg
              viewBox="0 0 260 175"
              className="w-64 h-44 overflow-visible"
              role="img"
              aria-label="Hai chú mèo dễ thương nhảy tưng lên ăn mừng và ôm nhau hạnh phúc"
            >
              {/* Soft glow beneath jumping cats */}
              <ellipse cx="130" cy="164" rx="78" ry="9" fill="#FDA4AF" opacity="0.25" />

              {/* Left Cream-Ginger Cat */}
              <g className="animate-cats-hug-sway" style={{ transformOrigin: '96px 145px' }}>
                {/* Tail forming left half of heart */}
                <path
                  d="M66 138 Q36 115 48 92 Q58 76 74 92"
                  stroke="#FDBA74"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Body */}
                <ellipse cx="98" cy="128" rx="30" ry="32" fill="#FED7AA" />
                <ellipse cx="102" cy="132" rx="18" ry="20" fill="#FFF7ED" />
                {/* Ears */}
                <polygon points="74,68 68,40 92,56" fill="#FDBA74" />
                <polygon points="75,62 72,46 87,56" fill="#FDA4AF" />
                <polygon points="118,56 128,38 126,68" fill="#FDBA74" />
                <polygon points="118,57 125,44 124,64" fill="#FDA4AF" />
                {/* Head */}
                <ellipse cx="99" cy="78" rx="31" ry="27" fill="#FED7AA" />
                {/* Happy ^ ^ eyes */}
                <path d="M82 76 Q87 70 92 76" stroke="#2D1B22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M104 76 Q109 70 114 76" stroke="#2D1B22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Cheeks & smile */}
                <ellipse cx="78" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                <ellipse cx="118" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                <polygon points="97,81 101,81 99,84" fill="#E11D48" />
                <path d="M93 86 Q99 92 105 86" stroke="#2D1B22" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Paws hugging */}
                <ellipse cx="127" cy="118" rx="13" ry="8" transform="rotate(-14 127 118)" fill="#FDBA74" />
                {/* Little feet */}
                <ellipse cx="83" cy="157" rx="10" ry="6" fill="#FDBA74" />
                <ellipse cx="110" cy="157" rx="10" ry="6" fill="#FDBA74" />
              </g>

              {/* Right Silver-White Cat walking in to hug */}
              <g className="animate-cat-walk-in">
                <g className="animate-cats-hug-sway" style={{ transformOrigin: '162px 145px', animationDelay: '0.2s' }}>
                  {/* Tail */}
                  <path
                    d="M194 138 Q224 115 212 92 Q202 76 186 92"
                    stroke="#CBD5E1"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Body */}
                  <ellipse cx="160" cy="128" rx="30" ry="32" fill="#E2E8F0" />
                  <ellipse cx="156" cy="132" rx="18" ry="20" fill="#FFFFFF" />
                  {/* Ears */}
                  <polygon points="134,68 132,38 148,56" fill="#CBD5E1" />
                  <polygon points="136,64 135,45 145,57" fill="#FDA4AF" />
                  <polygon points="168,56 192,40 186,68" fill="#CBD5E1" />
                  <polygon points="172,56 187,46 184,62" fill="#FDA4AF" />
                  {/* Head */}
                  <ellipse cx="159" cy="78" rx="31" ry="27" fill="#F1F5F9" />
                  {/* Happy ^ ^ eyes */}
                  <path d="M144 76 Q149 70 154 76" stroke="#2D1B22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M166 76 Q171 70 176 76" stroke="#2D1B22" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  {/* Cheeks & smile */}
                  <ellipse cx="141" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                  <ellipse cx="180" cy="83" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.7" />
                  <polygon points="157,81 161,81 159,84" fill="#E11D48" />
                  <path d="M153 86 Q159 92 165 86" stroke="#2D1B22" strokeWidth="2" strokeLinecap="round" fill="none" />
                  {/* Hugging paw */}
                  <ellipse cx="132" cy="126" rx="13" ry="8" transform="rotate(14 132 126)" fill="#E2E8F0" />
                  {/* Little feet */}
                  <ellipse cx="148" cy="157" rx="10" ry="6" fill="#CBD5E1" />
                  <ellipse cx="174" cy="157" rx="10" ry="6" fill="#CBD5E1" />
                </g>
              </g>

              {/* Floating little heart right between the hugging cats */}
              <path
                d="M129 36 C129 31 122 28 120 33 C118 28 111 31 111 36 C111 43 120 49 120 49 C120 49 129 43 129 36 Z"
                fill="#F43F5E"
                transform="translate(10, -4)"
              />
            </svg>
          </div>
        </div>
        <p className="text-xs text-pink-200/90 mt-1">
          Hai chú mèo đang nhảy tưng lên ăn mừng và ôm nhau nè!
        </p>
      </div>
    );
  }

  if (mode === 'bridgeCry') {
    return (
      <div className="flex flex-col items-center justify-center select-none my-2">
        <div className="relative w-full max-w-[380px] h-52 rounded-2xl overflow-hidden border border-slate-400/20 bg-gradient-to-b from-[#0B1221] via-[#10192D] to-[#08101E]">
          <svg
            viewBox="0 0 380 210"
            className="w-full h-full"
            role="img"
            aria-label="Chú mèo buồn ngồi trên cây cầu đêm mưa uống bia và khóc"
          >
            {/* Distant moonlit mist & river */}
            <rect x="0" y="152" width="380" height="58" fill="#060D1A" />
            {/* Shimmering moon reflections on water */}
            <g className="animate-water-ripple" style={{ transformOrigin: '295px 175px' }}>
              <ellipse cx="295" cy="166" rx="34" ry="2.2" fill="#CBD5E1" opacity="0.35" />
              <ellipse cx="290" cy="176" rx="46" ry="2.5" fill="#CBD5E1" opacity="0.25" />
              <ellipse cx="300" cy="187" rx="28" ry="2" fill="#CBD5E1" opacity="0.2" />
            </g>

            {/* Warm bridge streetlamp */}
            <line x1="64" y1="54" x2="64" y2="148" stroke="#475569" strokeWidth="4" />
            <circle cx="64" cy="52" r="18" fill="#FDE68A" opacity="0.16" />
            <circle cx="64" cy="52" r="6" fill="#FEF3C7" />

            {/* Wooden Bridge Structure & Railings */}
            <path d="M-10 156 Q190 128 390 156 L390 170 Q190 142 -10 170 Z" fill="#334155" />
            {/* Bridge handrail & posts */}
            <path d="M-10 120 Q190 92 390 120" stroke="#475569" strokeWidth="4" fill="none" />
            {[35, 95, 155, 215, 275, 335].map((px) => (
              <line key={px} x1={px} y1="108" x2={px} y2="152" stroke="#475569" strokeWidth="3.5" />
            ))}

            {/* Sad Cat sitting on the bridge edge */}
            <g className="animate-cat-sob" transform="translate(155, 72)">
              {/* Drooping sad tail */}
              <path
                d="M15 62 Q-4 72 4 86"
                stroke="#E2A46D"
                strokeWidth="7.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cat hunched body */}
              <ellipse cx="32" cy="54" rx="20" ry="22" fill="#FDBA74" />
              <ellipse cx="34" cy="57" rx="12" ry="13" fill="#FFF7ED" />

              {/* Drooped sad ears */}
              <polygon points="14,22 2,14 20,12" fill="#E2A46D" />
              <polygon points="44,12 62,14 50,22" fill="#E2A46D" />

              {/* Cat head tilted slightly down */}
              <ellipse cx="32" cy="24" rx="22" ry="19" fill="#FED7AA" />

              {/* Sad teary eyes */}
              <circle cx="23" cy="23" r="3.2" fill="#1E293B" />
              <circle cx="22" cy="22" r="1.1" fill="#FFFFFF" />
              <circle cx="41" cy="23" r="3.2" fill="#1E293B" />
              <circle cx="40" cy="22" r="1.1" fill="#FFFFFF" />
              {/* Sad eyebrows */}
              <path d="M18 18 L27 20" stroke="#7C2D12" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M46 18 L37 20" stroke="#7C2D12" strokeWidth="1.6" strokeLinecap="round" />

              {/* Trembling sad mouth */}
              <path d="M27 32 Q32 28 37 32" stroke="#2D1B22" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Animated falling teardrops */}
              <circle
                cx="21"
                cy="27"
                r="2.3"
                fill="#7DD3FC"
                className="animate-tear-drop"
                style={{ '--tx': '-3px' } as CSSProperties}
              />
              <circle
                cx="43"
                cy="27"
                r="2.3"
                fill="#7DD3FC"
                className="animate-tear-drop"
                style={{ '--tx': '3px', animationDelay: '0.6s' } as CSSProperties}
              />

              {/* Paw holding a little beer bottle */}
              <g transform="translate(46, 36) rotate(-18)">
                <rect x="0" y="6" width="11" height="22" rx="3" fill="#92400E" stroke="#FDE68A" strokeWidth="0.7" />
                <rect x="3" y="0" width="5" height="8" rx="1.5" fill="#92400E" />
                <rect x="0" y="13" width="11" height="6" fill="#FDE68A" />
                <circle cx="5.5" cy="16" r="1.5" fill="#B45309" />
              </g>
              <ellipse cx="48" cy="52" rx="8" ry="5.5" fill="#FDBA74" />

              {/* Extra little beer can sitting beside the cat on the bridge */}
              <g transform="translate(-8, 60)">
                <rect x="0" y="0" width="10" height="15" rx="2" fill="#F59E0B" />
                <rect x="0" y="4" width="10" height="5" fill="#FEF3C7" />
              </g>

              {/* Dangling legs over bridge edge */}
              <ellipse cx="24" cy="76" rx="6" ry="9" fill="#FDBA74" />
              <ellipse cx="40" cy="76" rx="6" ry="9" fill="#FDBA74" />
            </g>
          </svg>
        </div>
        <p className="text-xs text-slate-300/80 mt-2">
          Chú mèo buồn bã ra ngồi trên cây cầu uống bia và khóc dưới mưa...
        </p>
      </div>
    );
  }

  // 'reading' or 'moving' (QUESTION stage: cat reading message on phone; moves away on "Cút")
  const offsetPx = mode === 'moving' ? Math.min(moveStep * 14, 130) : 0;
  const isSadMoving = mode === 'moving' && moveStep > 0;

  return (
    <div className="w-full flex flex-col items-center justify-center select-none overflow-hidden py-1">
      <div
        className="transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${offsetPx}px, 0, 0)` }}
      >
        <svg
          viewBox="0 0 180 145"
          className="w-40 h-32 overflow-visible"
          role="img"
          aria-label={
            isSadMoving
              ? 'Chú mèo đang buồn bã di chuyển ra xa'
              : 'Chú mèo dễ thương đang đọc tin nhắn trên điện thoại'
          }
        >
          {/* Soft shadow */}
          <ellipse cx="90" cy="134" rx="46" ry="7" fill="#FB7185" opacity="0.2" />

          {/* Swishing tail */}
          <g className="animate-tail-swish" style={{ transformOrigin: '58px 114px' }}>
            <path
              d="M58 114 Q30 100 36 78 Q40 66 49 74"
              stroke="#FDBA74"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Cat body */}
          <ellipse cx="90" cy="102" rx="34" ry="30" fill="#FED7AA" />
          <ellipse cx="90" cy="106" rx="20" ry="20" fill="#FFF7ED" />

          {/* Cat ears (droop slightly when sad/moving) */}
          <g className="animate-ear-twitch" style={{ transformOrigin: '66px 48px' }}>
            <polygon
              points={isSadMoving ? '64,52 46,34 78,42' : '64,52 56,22 82,42'}
              fill="#FDBA74"
            />
            <polygon
              points={isSadMoving ? '65,49 52,36 75,43' : '65,49 60,29 77,42'}
              fill="#FDA4AF"
            />
          </g>
          <polygon
            points={isSadMoving ? '116,52 134,34 102,42' : '116,52 124,22 98,42'}
            fill="#FDBA74"
          />
          <polygon
            points={isSadMoving ? '115,49 128,36 105,43' : '115,49 120,29 103,42'}
            fill="#FDA4AF"
          />

          {/* Cat head */}
          <ellipse cx="90" cy="60" rx="35" ry="29" fill="#FED7AA" />

          {/* Whiskers */}
          <g stroke="#9A3412" strokeWidth="1.2" opacity="0.55" strokeLinecap="round">
            <line x1="50" y1="62" x2="64" y2="64" />
            <line x1="49" y1="68" x2="64" y2="68" />
            <line x1="116" y1="64" x2="130" y2="62" />
            <line x1="116" y1="68" x2="131" y2="68" />
          </g>

          {/* Blinking eyes */}
          <g className="animate-cat-blink" style={{ transformOrigin: '90px 56px' }}>
            <circle cx="76" cy="56" r="4.5" fill="#2D1B22" />
            <circle cx="74.5" cy="54.3" r="1.5" fill="#FFFFFF" />
            <circle cx="104" cy="56" r="4.5" fill="#2D1B22" />
            <circle cx="102.5" cy="54.3" r="1.5" fill="#FFFFFF" />
          </g>

          {/* Sad teardrop if moving away */}
          {isSadMoving && (
            <circle
              cx="74"
              cy="61"
              r="2.2"
              fill="#7DD3FC"
              className="animate-tear-drop"
              style={{ '--tx': '-2px' } as CSSProperties}
            />
          )}

          {/* Rosy cheeks, nose, mouth */}
          <ellipse cx="66" cy="65" rx="6" ry="3.5" fill="#FB7185" opacity="0.55" />
          <ellipse cx="114" cy="65" rx="6" ry="3.5" fill="#FB7185" opacity="0.55" />
          <polygon points="87,63 93,63 90,66.5" fill="#E11D48" />
          {isSadMoving ? (
            <path
              d="M84 72 Q90 68 96 72"
              stroke="#2D1B22"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          ) : (
            <path
              d="M84 69 Q87 73 90 69 Q93 73 96 69"
              stroke="#2D1B22"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Glowing Phone held in cat's paws */}
          <g transform="translate(73, 84)">
            <rect x="0" y="0" width="34" height="44" rx="6" fill="#1E1B4B" stroke="#F9A8D4" strokeWidth="1.6" />
            <rect x="3" y="4" width="28" height="35" rx="3.5" fill="#FFF1F2" />
            {/* Tiny chat message lines on screen */}
            <rect x="6" y="9" width="18" height="5" rx="2.5" fill="#FDA4AF" />
            <rect x="10" y="17" width="18" height="5" rx="2.5" fill="#E11D48" />
            <rect x="6" y="25" width="14" height="5" rx="2.5" fill="#FBCFE8" />
          </g>

          {/* Cat paws holding the phone */}
          <ellipse cx="71" cy="108" rx="9" ry="6.5" transform="rotate(-15 71 108)" fill="#FDBA74" />
          <ellipse cx="109" cy="108" rx="9" ry="6.5" transform="rotate(15 109 108)" fill="#FDBA74" />
        </svg>
      </div>

      <p className="text-xs text-rose-200/80 mt-1">
        {isSadMoving
          ? `Chú mèo đang buồn bã bước đi xa (${moveStep}/11)...`
          : 'Chú mèo nhỏ đang chăm chú đọc tin nhắn chờ hồi âm'}
      </p>
    </div>
  );
}
