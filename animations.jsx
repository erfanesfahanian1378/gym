// Stick-figure animation library — SVG with CSS keyframes per anim key
// Each animation is a small loop showing the key movement pattern.
window.ExerciseAnim = function ExerciseAnim({ anim, size = 240 }) {
  const fallback = "generic";
  const key = ANIMS[anim] ? anim : fallback;
  return (
    <div className="anim-wrap" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" width={size} height={size} className={`anim anim-${key}`}>
        <defs>
          <style>{ANIM_CSS}</style>
        </defs>
        {ANIMS[key]()}
      </svg>
      <div className="anim-label">animated reference</div>
    </div>
  );
};

// shared body parts builder — clean stickman with thicker strokes for clarity
const Stick = {
  // returns common stickman elements; positioned by parent <g>
  head: (cx = 100, cy = 50, r = 12) => <circle cx={cx} cy={cy} r={r} className="head" />,
  line: (x1, y1, x2, y2, cls = "limb") => <line x1={x1} y1={y1} x2={x2} y2={y2} className={cls} />,
};

const ANIMS = {
  // Squat — torso goes down/up, knees bend
  squat: () => (
    <g className="figure squat">
      <g className="body">
        <circle cx="100" cy="40" r="11" className="head" />
        <line x1="100" y1="51" x2="100" y2="105" className="limb torso" />
        <line x1="100" y1="65" x2="80" y2="95" className="limb arm" />
        <line x1="100" y1="65" x2="120" y2="95" className="limb arm" />
        <rect x="75" y="85" width="50" height="20" rx="2" className="weight" />
        <line x1="100" y1="105" x2="80" y2="135" className="limb thigh" />
        <line x1="100" y1="105" x2="120" y2="135" className="limb thigh" />
        <line x1="80" y1="135" x2="80" y2="170" className="limb shin" />
        <line x1="120" y1="135" x2="120" y2="170" className="limb shin" />
        <line x1="70" y1="170" x2="90" y2="170" className="ground-foot" />
        <line x1="110" y1="170" x2="130" y2="170" className="ground-foot" />
      </g>
    </g>
  ),
  rdl: () => (
    <g className="figure rdl">
      <g className="body">
        <circle cx="100" cy="40" r="11" className="head" />
        <line x1="100" y1="51" x2="100" y2="105" className="limb torso" />
        <line x1="100" y1="70" x2="100" y2="125" className="limb arm" />
        <rect x="85" y="120" width="30" height="10" rx="2" className="weight" />
        <line x1="100" y1="105" x2="85" y2="140" className="limb thigh" />
        <line x1="100" y1="105" x2="115" y2="140" className="limb thigh" />
        <line x1="85" y1="140" x2="85" y2="170" className="limb shin" />
        <line x1="115" y1="140" x2="115" y2="170" className="limb shin" />
        <line x1="75" y1="170" x2="125" y2="170" className="ground" />
      </g>
    </g>
  ),
  curl: () => (
    <g className="figure curl">
      <g className="body">
        <circle cx="100" cy="40" r="11" className="head" />
        <line x1="100" y1="51" x2="100" y2="115" className="limb torso" />
        <line x1="100" y1="70" x2="80" y2="95" className="limb upperarm" />
        <line x1="100" y1="70" x2="120" y2="95" className="limb upperarm" />
        <g className="forearmL">
          <line x1="80" y1="95" x2="80" y2="120" className="limb forearm" />
          <rect x="70" y="115" width="20" height="8" rx="2" className="weight" />
        </g>
        <g className="forearmR">
          <line x1="120" y1="95" x2="120" y2="120" className="limb forearm" />
          <rect x="110" y="115" width="20" height="8" rx="2" className="weight" />
        </g>
        <line x1="100" y1="115" x2="85" y2="170" className="limb leg" />
        <line x1="100" y1="115" x2="115" y2="170" className="limb leg" />
        <line x1="75" y1="170" x2="125" y2="170" className="ground" />
      </g>
    </g>
  ),
  inclinecurl: () => (
    <g className="figure inclinecurl">
      <line x1="40" y1="170" x2="170" y2="60" className="bench" />
      <line x1="40" y1="170" x2="170" y2="170" className="ground" />
      <g className="body">
        <circle cx="155" cy="65" r="10" className="head" />
        <line x1="155" y1="75" x2="80" y2="160" className="limb torso" />
        <line x1="120" y1="115" x2="135" y2="155" className="limb upperarm" />
        <g className="forearm-incline">
          <line x1="135" y1="155" x2="135" y2="125" className="limb forearm" />
          <rect x="125" y="120" width="20" height="8" rx="2" className="weight" />
        </g>
      </g>
    </g>
  ),
  hammer: () => (
    <g className="figure hammer">
      <g className="body">
        <circle cx="100" cy="40" r="11" className="head" />
        <line x1="100" y1="51" x2="100" y2="115" className="limb torso" />
        <line x1="100" y1="70" x2="80" y2="95" className="limb upperarm" />
        <line x1="100" y1="70" x2="120" y2="95" className="limb upperarm" />
        <g className="hammerL">
          <line x1="80" y1="95" x2="80" y2="125" className="limb forearm" />
          <rect x="74" y="115" width="12" height="20" rx="2" className="weight" />
        </g>
        <g className="hammerR">
          <line x1="120" y1="95" x2="120" y2="125" className="limb forearm" />
          <rect x="114" y="115" width="12" height="20" rx="2" className="weight" />
        </g>
        <line x1="100" y1="115" x2="85" y2="170" className="limb leg" />
        <line x1="100" y1="115" x2="115" y2="170" className="limb leg" />
        <line x1="75" y1="170" x2="125" y2="170" className="ground" />
      </g>
    </g>
  ),
  pulldown: () => (
    <g className="figure pulldown">
      <line x1="20" y1="20" x2="180" y2="20" className="bar-track" />
      <g className="pull-bar">
        <line x1="60" y1="35" x2="140" y2="35" className="bar" />
        <line x1="80" y1="35" x2="80" y2="20" className="cable" />
        <line x1="120" y1="35" x2="120" y2="20" className="cable" />
      </g>
      <g className="body">
        <circle cx="100" cy="60" r="10" className="head" />
        <line x1="100" y1="70" x2="100" y2="130" className="limb torso" />
        <line x1="100" y1="80" x2="75" y2="50" className="limb upperarm armL" />
        <line x1="100" y1="80" x2="125" y2="50" className="limb upperarm armR" />
        <line x1="75" y1="50" x2="60" y2="35" className="limb forearm" />
        <line x1="125" y1="50" x2="140" y2="35" className="limb forearm" />
        <line x1="100" y1="130" x2="80" y2="160" className="limb thigh" />
        <line x1="100" y1="130" x2="120" y2="160" className="limb thigh" />
        <line x1="80" y1="160" x2="80" y2="180" className="limb shin" />
        <line x1="120" y1="160" x2="120" y2="180" className="limb shin" />
      </g>
    </g>
  ),
  cablerow: () => (
    <g className="figure cablerow">
      <rect x="10" y="120" width="180" height="6" className="ground" />
      <g className="body">
        <circle cx="80" cy="70" r="10" className="head" />
        <line x1="80" y1="80" x2="80" y2="120" className="limb torso" />
        <g className="row-arm">
          <line x1="80" y1="85" x2="120" y2="100" className="limb upperarm" />
          <line x1="120" y1="100" x2="160" y2="100" className="limb forearm" />
        </g>
        <line x1="80" y1="120" x2="120" y2="120" className="limb thigh" />
        <line x1="120" y1="120" x2="120" y2="140" className="limb shin" />
      </g>
      <line x1="170" y1="100" x2="190" y2="100" className="cable" />
    </g>
  ),
  facepull: () => (
    <g className="figure facepull">
      <line x1="180" y1="40" x2="180" y2="180" className="cable-tower" />
      <g className="body">
        <circle cx="80" cy="60" r="11" className="head" />
        <line x1="80" y1="71" x2="80" y2="140" className="limb torso" />
        <g className="fp-arms">
          <line x1="80" y1="75" x2="115" y2="50" className="limb upperarm" />
          <line x1="80" y1="75" x2="115" y2="70" className="limb upperarm" />
          <line x1="115" y1="50" x2="160" y2="60" className="limb forearm rope" />
          <line x1="115" y1="70" x2="160" y2="60" className="limb forearm rope" />
        </g>
        <line x1="80" y1="140" x2="65" y2="180" className="limb leg" />
        <line x1="80" y1="140" x2="95" y2="180" className="limb leg" />
      </g>
    </g>
  ),
  revpec: () => (
    <g className="figure revpec">
      <g className="body">
        <circle cx="100" cy="50" r="11" className="head" />
        <line x1="100" y1="61" x2="100" y2="130" className="limb torso" />
        <g className="rp-arm-l">
          <line x1="100" y1="75" x2="60" y2="75" className="limb upperarm" />
          <line x1="60" y1="75" x2="50" y2="60" className="limb forearm" />
        </g>
        <g className="rp-arm-r">
          <line x1="100" y1="75" x2="140" y2="75" className="limb upperarm" />
          <line x1="140" y1="75" x2="150" y2="60" className="limb forearm" />
        </g>
        <line x1="100" y1="130" x2="85" y2="170" className="limb leg" />
        <line x1="100" y1="130" x2="115" y2="170" className="limb leg" />
      </g>
    </g>
  ),
  shrug: () => (
    <g className="figure shrug">
      <g className="body">
        <circle cx="100" cy="50" r="11" className="head" />
        <g className="shoulders">
          <line x1="100" y1="61" x2="100" y2="130" className="limb torso" />
          <line x1="80" y1="68" x2="80" y2="140" className="limb arm" />
          <line x1="120" y1="68" x2="120" y2="140" className="limb arm" />
          <rect x="70" y="135" width="20" height="10" rx="2" className="weight" />
          <rect x="110" y="135" width="20" height="10" rx="2" className="weight" />
        </g>
        <line x1="100" y1="130" x2="85" y2="170" className="limb leg" />
        <line x1="100" y1="130" x2="115" y2="170" className="limb leg" />
      </g>
    </g>
  ),
  pullapart: () => (
    <g className="figure pullapart">
      <g className="body">
        <circle cx="100" cy="50" r="11" className="head" />
        <line x1="100" y1="61" x2="100" y2="130" className="limb torso" />
        <g className="band-arm-l">
          <line x1="100" y1="75" x2="70" y2="80" className="limb upperarm" />
          <line x1="70" y1="80" x2="60" y2="85" className="limb forearm" />
        </g>
        <g className="band-arm-r">
          <line x1="100" y1="75" x2="130" y2="80" className="limb upperarm" />
          <line x1="130" y1="80" x2="140" y2="85" className="limb forearm" />
        </g>
        <line className="band" x1="60" y1="85" x2="140" y2="85" />
        <line x1="100" y1="130" x2="85" y2="170" className="limb leg" />
        <line x1="100" y1="130" x2="115" y2="170" className="limb leg" />
      </g>
    </g>
  ),
  wallslide: () => (
    <g className="figure wallslide">
      <line x1="40" y1="20" x2="40" y2="180" className="wall" />
      <g className="body">
        <circle cx="55" cy="50" r="10" className="head" />
        <line x1="55" y1="60" x2="55" y2="140" className="limb torso" />
        <g className="ws-arms">
          <line x1="55" y1="70" x2="80" y2="60" className="limb upperarm" />
          <line x1="80" y1="60" x2="100" y2="70" className="limb forearm" />
        </g>
        <line x1="55" y1="140" x2="55" y2="180" className="limb leg" />
      </g>
    </g>
  ),
  chintuck: () => (
    <g className="figure chintuck">
      <g className="body">
        <g className="head-grp">
          <circle cx="105" cy="55" r="12" className="head" />
          <line x1="100" y1="65" x2="113" y2="65" className="chin" />
        </g>
        <line x1="100" y1="70" x2="100" y2="160" className="limb torso" />
      </g>
    </g>
  ),
  row: () => (
    <g className="figure row">
      <line x1="10" y1="160" x2="190" y2="160" className="rail" />
      <g className="rower">
        <circle cx="100" cy="80" r="10" className="head" />
        <line x1="100" y1="90" x2="100" y2="125" className="limb torso" />
        <g className="row-arms">
          <line x1="100" y1="95" x2="130" y2="125" className="limb arm" />
        </g>
        <line x1="100" y1="125" x2="140" y2="135" className="limb thigh" />
        <line x1="140" y1="135" x2="160" y2="155" className="limb shin" />
      </g>
    </g>
  ),
  bike: () => (
    <g className="figure bike">
      <circle cx="100" cy="140" r="22" className="wheel" />
      <circle cx="100" cy="140" r="3" className="hub" />
      <g className="pedal">
        <line x1="100" y1="140" x2="115" y2="155" className="crank" />
      </g>
      <line x1="100" y1="140" x2="100" y2="100" className="post" />
      <line x1="100" y1="100" x2="80" y2="100" className="seat" />
      <g className="rider">
        <circle cx="80" cy="60" r="9" className="head" />
        <line x1="80" y1="69" x2="80" y2="100" className="limb torso" />
        <line x1="80" y1="80" x2="120" y2="105" className="limb arm" />
        <line x1="80" y1="100" x2="115" y2="155" className="limb leg" />
      </g>
    </g>
  ),
  walk: () => (
    <g className="figure walk">
      <line x1="20" y1="170" x2="180" y2="120" className="incline" />
      <g className="walker">
        <circle cx="100" cy="60" r="10" className="head" />
        <line x1="100" y1="70" x2="100" y2="120" className="limb torso" />
        <g className="leg-fb">
          <line x1="100" y1="120" x2="85" y2="155" className="limb leg legA" />
          <line x1="100" y1="120" x2="115" y2="155" className="limb leg legB" />
          <line x1="100" y1="85" x2="78" y2="105" className="limb arm armA" />
          <line x1="100" y1="85" x2="122" y2="105" className="limb arm armB" />
        </g>
      </g>
    </g>
  ),
  catcow: () => (
    <g className="figure catcow">
      <g className="cc-body">
        <path d="M 60 130 Q 100 100 140 130" className="spine" />
        <line x1="60" y1="130" x2="60" y2="170" className="limb leg" />
        <line x1="140" y1="130" x2="140" y2="170" className="limb leg" />
        <line x1="60" y1="170" x2="140" y2="170" className="ground" />
        <circle cx="50" cy="120" r="9" className="head" />
      </g>
    </g>
  ),
  bridge: () => (
    <g className="figure bridge">
      <g className="bridge-body">
        <line x1="40" y1="170" x2="180" y2="170" className="ground" />
        <circle cx="50" cy="160" r="10" className="head" />
        <line x1="60" y1="160" x2="120" y2="120" className="limb torso" />
        <line x1="120" y1="120" x2="140" y2="160" className="limb thigh" />
        <line x1="140" y1="160" x2="140" y2="170" className="limb shin" />
      </g>
    </g>
  ),
  hipflex: () => (
    <g className="figure hipflex">
      <line x1="20" y1="170" x2="180" y2="170" className="ground" />
      <g className="body">
        <circle cx="80" cy="50" r="10" className="head" />
        <line x1="80" y1="60" x2="80" y2="120" className="limb torso" />
        <line x1="80" y1="120" x2="130" y2="140" className="limb thigh-front" />
        <line x1="130" y1="140" x2="130" y2="170" className="limb shin-front" />
        <line x1="80" y1="120" x2="50" y2="170" className="limb thigh-back" />
        <line x1="50" y1="170" x2="40" y2="155" className="limb foot" />
      </g>
    </g>
  ),
  hipthrust: () => (
    <g className="figure hipthrust">
      <line x1="20" y1="170" x2="180" y2="170" className="ground" />
      <line x1="20" y1="120" x2="80" y2="120" className="bench" />
      <g className="hipthrust-body">
        <circle cx="40" cy="110" r="9" className="head" />
        <line x1="50" y1="115" x2="120" y2="105" className="limb torso" />
        <rect x="100" y="92" width="50" height="10" rx="2" className="weight" />
        <line x1="120" y1="105" x2="140" y2="155" className="limb thigh" />
        <line x1="140" y1="155" x2="140" y2="170" className="limb shin" />
      </g>
    </g>
  ),
  legcurl: () => (
    <g className="figure legcurl">
      <line x1="20" y1="120" x2="160" y2="120" className="bench" />
      <g className="body">
        <circle cx="35" cy="115" r="9" className="head" />
        <line x1="40" y1="120" x2="120" y2="120" className="limb torso" />
        <line x1="120" y1="120" x2="155" y2="120" className="limb thigh" />
        <line x1="155" y1="120" x2="155" y2="100" className="limb shin curl-shin" />
      </g>
    </g>
  ),
  deadbug: () => (
    <g className="figure deadbug">
      <line x1="20" y1="160" x2="180" y2="160" className="ground" />
      <g className="body">
        <circle cx="50" cy="150" r="10" className="head" />
        <line x1="60" y1="155" x2="160" y2="155" className="limb torso" />
        <g className="db-armL">
          <line x1="80" y1="155" x2="80" y2="115" className="limb arm" />
        </g>
        <g className="db-legR">
          <line x1="140" y1="155" x2="160" y2="120" className="limb leg" />
          <line x1="160" y1="120" x2="180" y2="120" className="limb shin" />
        </g>
        <g className="db-armR">
          <line x1="100" y1="155" x2="100" y2="115" className="limb arm dim" />
        </g>
        <g className="db-legL">
          <line x1="120" y1="155" x2="135" y2="125" className="limb leg dim" />
        </g>
      </g>
    </g>
  ),
  birddog: () => (
    <g className="figure birddog">
      <line x1="20" y1="170" x2="180" y2="170" className="ground" />
      <g className="bd-body">
        <circle cx="50" cy="100" r="10" className="head" />
        <line x1="60" y1="105" x2="140" y2="105" className="limb torso" />
        <line x1="60" y1="105" x2="60" y2="170" className="limb arm" />
        <g className="bd-armR">
          <line x1="80" y1="105" x2="40" y2="80" className="limb arm-extend" />
        </g>
        <line x1="140" y1="105" x2="140" y2="170" className="limb leg" />
        <g className="bd-legL">
          <line x1="120" y1="105" x2="160" y2="80" className="limb leg-extend" />
        </g>
      </g>
    </g>
  ),
  plank: () => (
    <g className="figure plank">
      <line x1="20" y1="170" x2="180" y2="170" className="ground" />
      <g className="plank-body">
        <circle cx="40" cy="120" r="10" className="head" />
        <line x1="50" y1="125" x2="170" y2="135" className="limb torso plank-torso" />
        <line x1="50" y1="125" x2="50" y2="170" className="limb arm" />
        <line x1="170" y1="135" x2="170" y2="170" className="limb leg" />
      </g>
    </g>
  ),
  sideplank: () => (
    <g className="figure sideplank">
      <line x1="20" y1="170" x2="180" y2="170" className="ground" />
      <g className="sp-body">
        <circle cx="40" cy="105" r="10" className="head" />
        <line x1="50" y1="115" x2="170" y2="160" className="limb torso" />
        <line x1="50" y1="115" x2="50" y2="170" className="limb arm" />
      </g>
    </g>
  ),
  inclinepress: () => (
    <g className="figure inclinepress">
      <line x1="40" y1="170" x2="170" y2="60" className="bench" />
      <line x1="40" y1="170" x2="170" y2="170" className="ground" />
      <g className="body">
        <circle cx="155" cy="65" r="10" className="head" />
        <line x1="155" y1="75" x2="80" y2="160" className="limb torso" />
        <g className="press-arm">
          <line x1="120" y1="115" x2="155" y2="100" className="limb arm" />
          <rect x="140" y="92" width="25" height="10" rx="2" className="weight" />
        </g>
      </g>
    </g>
  ),
  shoulderpress: () => (
    <g className="figure shoulderpress">
      <rect x="60" y="100" width="80" height="80" className="seat-pad" />
      <g className="body">
        <circle cx="100" cy="80" r="10" className="head" />
        <line x1="100" y1="90" x2="100" y2="130" className="limb torso" />
        <g className="sp-arms">
          <line x1="100" y1="95" x2="75" y2="60" className="limb arm" />
          <line x1="100" y1="95" x2="125" y2="60" className="limb arm" />
        </g>
      </g>
    </g>
  ),
  lateral: () => (
    <g className="figure lateral">
      <g className="body">
        <circle cx="100" cy="50" r="11" className="head" />
        <line x1="100" y1="61" x2="100" y2="130" className="limb torso" />
        <g className="lat-arm-l">
          <line x1="100" y1="75" x2="60" y2="90" className="limb arm" />
          <rect x="50" y="85" width="14" height="10" rx="2" className="weight" />
        </g>
        <g className="lat-arm-r">
          <line x1="100" y1="75" x2="140" y2="90" className="limb arm" />
          <rect x="136" y="85" width="14" height="10" rx="2" className="weight" />
        </g>
        <line x1="100" y1="130" x2="85" y2="170" className="limb leg" />
        <line x1="100" y1="130" x2="115" y2="170" className="limb leg" />
      </g>
    </g>
  ),
  triceps: () => (
    <g className="figure triceps">
      <line x1="180" y1="20" x2="180" y2="60" className="cable" />
      <g className="body">
        <circle cx="100" cy="50" r="11" className="head" />
        <line x1="100" y1="61" x2="100" y2="130" className="limb torso" />
        <line x1="100" y1="75" x2="135" y2="80" className="limb upperarm" />
        <g className="tri-forearm">
          <line x1="135" y1="80" x2="180" y2="60" className="limb forearm" />
        </g>
        <line x1="100" y1="130" x2="85" y2="170" className="limb leg" />
        <line x1="100" y1="130" x2="115" y2="170" className="limb leg" />
      </g>
    </g>
  ),
  splitsquat: () => (
    <g className="figure splitsquat">
      <line x1="20" y1="170" x2="180" y2="170" className="ground" />
      <line x1="140" y1="140" x2="180" y2="140" className="bench" />
      <g className="body">
        <circle cx="80" cy="50" r="10" className="head" />
        <line x1="80" y1="60" x2="80" y2="120" className="limb torso" />
        <line x1="80" y1="120" x2="60" y2="170" className="limb thigh-front" />
        <line x1="80" y1="120" x2="140" y2="140" className="limb thigh-back" />
        <line x1="140" y1="140" x2="160" y2="140" className="limb shin-back" />
      </g>
    </g>
  ),
  calf: () => (
    <g className="figure calf">
      <line x1="60" y1="170" x2="140" y2="170" className="platform" />
      <g className="body">
        <circle cx="100" cy="50" r="10" className="head" />
        <line x1="100" y1="60" x2="100" y2="130" className="limb torso" />
        <line x1="100" y1="130" x2="90" y2="165" className="limb leg" />
        <line x1="100" y1="130" x2="110" y2="165" className="limb leg" />
        <g className="calf-feet">
          <line x1="85" y1="165" x2="95" y2="165" className="limb foot" />
          <line x1="105" y1="165" x2="115" y2="165" className="limb foot" />
        </g>
      </g>
    </g>
  ),
  scappush: () => (
    <g className="figure scappush">
      <line x1="20" y1="170" x2="180" y2="170" className="ground" />
      <g className="sp-body">
        <circle cx="40" cy="120" r="10" className="head" />
        <line x1="50" y1="125" x2="170" y2="135" className="limb torso scap-torso" />
        <line x1="50" y1="125" x2="50" y2="170" className="limb arm" />
        <line x1="170" y1="135" x2="170" y2="170" className="limb leg" />
      </g>
    </g>
  ),
  pallof: () => (
    <g className="figure pallof">
      <line x1="180" y1="20" x2="180" y2="180" className="cable-tower" />
      <g className="body">
        <circle cx="80" cy="60" r="11" className="head" />
        <line x1="80" y1="71" x2="80" y2="140" className="limb torso" />
        <g className="pallof-arms">
          <line x1="80" y1="80" x2="120" y2="80" className="limb arm" />
        </g>
        <line x1="120" y1="80" x2="180" y2="80" className="cable cable-pull" />
        <line x1="80" y1="140" x2="65" y2="180" className="limb leg" />
        <line x1="80" y1="140" x2="95" y2="180" className="limb leg" />
      </g>
    </g>
  ),
  generic: () => (
    <g className="figure generic">
      <circle cx="100" cy="50" r="12" className="head" />
      <line x1="100" y1="62" x2="100" y2="130" className="limb torso" />
      <line x1="100" y1="80" x2="70" y2="110" className="limb arm" />
      <line x1="100" y1="80" x2="130" y2="110" className="limb arm" />
      <line x1="100" y1="130" x2="80" y2="170" className="limb leg" />
      <line x1="100" y1="130" x2="120" y2="170" className="limb leg" />
    </g>
  ),
};

const ANIM_CSS = `
.head { fill: var(--ink); stroke: var(--ink); stroke-width: 1; }
.limb, .torso, .arm, .leg, .thigh, .shin, .upperarm, .forearm { stroke: var(--ink); stroke-width: 4; stroke-linecap: round; fill: none; }
.weight { fill: var(--ink); }
.ground, .ground-foot, .rail, .platform, .seat, .bench, .seat-pad { stroke: var(--ink-30); stroke-width: 2; fill: none; }
.seat-pad { fill: var(--ink-05); stroke: var(--ink-30); stroke-width: 2; }
.bar, .cable, .cable-tower, .cable-pull, .band, .rope, .bar-track, .post, .crank, .seat { stroke: var(--ink); stroke-width: 3; stroke-linecap: round; fill: none; }
.bar-track { stroke-dasharray: 3 4; stroke-width: 1.5; }
.wheel { fill: none; stroke: var(--ink); stroke-width: 3; }
.hub { fill: var(--ink); }
.spine { stroke: var(--ink); stroke-width: 4; fill: none; stroke-linecap: round; }
.wall { stroke: var(--ink-30); stroke-width: 3; stroke-dasharray: 2 4; }
.incline { stroke: var(--ink-30); stroke-width: 3; }
.cable-tower { stroke-dasharray: 2 4; stroke-width: 2; }
.dim { opacity: .25; }
.chin { stroke: var(--ink); stroke-width: 3; stroke-linecap: round; }

/* SQUAT */
.anim-squat .body { transform-origin: 100px 170px; animation: squatAnim 2.4s ease-in-out infinite; }
@keyframes squatAnim { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(.78) translateY(15px); } }

/* RDL — hinge */
.anim-rdl .body { transform-origin: 100px 110px; animation: rdlAnim 2.6s ease-in-out infinite; }
@keyframes rdlAnim { 0%,100% { transform: rotate(0); } 50% { transform: rotate(35deg) translateY(-10px); } }

/* CURL */
.anim-curl .forearmL, .anim-curl .forearmR { transform-origin: 80px 95px; }
.anim-curl .forearmR { transform-origin: 120px 95px; }
.anim-curl .forearmL { animation: curlAnim 1.6s ease-in-out infinite; }
.anim-curl .forearmR { animation: curlAnim 1.6s ease-in-out infinite; }
@keyframes curlAnim { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-130deg); } }

.anim-inclinecurl .forearm-incline { transform-origin: 135px 155px; animation: curlIncline 2s ease-in-out infinite; }
@keyframes curlIncline { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-100deg); } }

.anim-hammer .hammerL { transform-origin: 80px 95px; animation: curlAnim 1.6s ease-in-out infinite; }
.anim-hammer .hammerR { transform-origin: 120px 95px; animation: curlAnim 1.6s ease-in-out infinite; }

/* PULLDOWN */
.anim-pulldown .pull-bar { transform-origin: 100px 35px; animation: pulldownAnim 2.2s ease-in-out infinite; }
@keyframes pulldownAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(35px); } }

/* CABLE ROW */
.anim-cablerow .row-arm { transform-origin: 80px 85px; animation: rowArmAnim 2s ease-in-out infinite; }
@keyframes rowArmAnim { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-30px); } }

/* FACE PULL */
.anim-facepull .fp-arms { transform-origin: 80px 75px; animation: facepullAnim 2s ease-in-out infinite; }
@keyframes facepullAnim { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-40px); } }

/* REV PEC */
.anim-revpec .rp-arm-l { transform-origin: 100px 75px; animation: revpecL 2s ease-in-out infinite; }
.anim-revpec .rp-arm-r { transform-origin: 100px 75px; animation: revpecR 2s ease-in-out infinite; }
@keyframes revpecL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-25deg); } }
@keyframes revpecR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(25deg); } }

/* SHRUG */
.anim-shrug .shoulders { transform-origin: 100px 130px; animation: shrugAnim 1.6s ease-in-out infinite; }
@keyframes shrugAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

/* PULL APART */
.anim-pullapart .band-arm-l { transform-origin: 100px 75px; animation: paL 1.8s ease-in-out infinite; }
.anim-pullapart .band-arm-r { transform-origin: 100px 75px; animation: paR 1.8s ease-in-out infinite; }
.anim-pullapart .band { animation: bandStretch 1.8s ease-in-out infinite; }
@keyframes paL { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-30deg); } }
@keyframes paR { 0%,100% { transform: rotate(0); } 50% { transform: rotate(30deg); } }
@keyframes bandStretch { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(1.5); transform-origin: center; } }

/* WALL SLIDE */
.anim-wallslide .ws-arms { transform-origin: 55px 70px; animation: wsAnim 2.4s ease-in-out infinite; }
@keyframes wsAnim { 0%,100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-25px) rotate(20deg); } }

/* CHIN TUCK */
.anim-chintuck .head-grp { transform-origin: 100px 100px; animation: chintuckAnim 2s ease-in-out infinite; }
@keyframes chintuckAnim { 0%,100% { transform: translateX(8px); } 50% { transform: translateX(-4px); } }

/* ROW MACHINE */
.anim-row .rower { transform-origin: 100px 160px; animation: rowAnim 2.4s ease-in-out infinite; }
@keyframes rowAnim { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-20px) rotate(8deg); } }

/* BIKE */
.anim-bike .pedal { transform-origin: 100px 140px; animation: pedal 1s linear infinite; }
@keyframes pedal { 100% { transform: rotate(360deg); } }

/* WALK */
.anim-walk .legA, .anim-walk .armB { animation: walkA 1s ease-in-out infinite; transform-origin: 100px 120px; }
.anim-walk .legB, .anim-walk .armA { animation: walkB 1s ease-in-out infinite; transform-origin: 100px 120px; }
@keyframes walkA { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(15deg); } }
@keyframes walkB { 0%,100% { transform: rotate(15deg); } 50% { transform: rotate(-10deg); } }

/* CAT COW */
.anim-catcow .cc-body { animation: catcowAnim 3s ease-in-out infinite; transform-origin: 100px 130px; }
@keyframes catcowAnim { 0%,100% { transform: scaleY(.92); } 50% { transform: scaleY(1.1); } }

/* BRIDGE */
.anim-bridge .bridge-body { transform-origin: 50px 170px; animation: bridgeAnim 2.4s ease-in-out infinite; }
@keyframes bridgeAnim { 0%,100% { transform: translateY(15px) scaleY(.7); } 50% { transform: translateY(0) scaleY(1); } }

/* HIP THRUST */
.anim-hipthrust .hipthrust-body { transform-origin: 50px 115px; animation: hipthrustAnim 2.2s ease-in-out infinite; }
@keyframes hipthrustAnim { 0%,100% { transform: translateY(20px) rotate(-8deg); } 50% { transform: translateY(0) rotate(0); } }

/* LEG CURL */
.anim-legcurl .curl-shin { transform-origin: 155px 120px; animation: legcurlAnim 1.8s ease-in-out infinite; }
@keyframes legcurlAnim { 0%,100% { transform: rotate(0); } 50% { transform: rotate(95deg); } }

/* DEAD BUG */
.anim-deadbug .db-armL { transform-origin: 80px 155px; animation: dbAnim 2.4s ease-in-out infinite; }
.anim-deadbug .db-legR { transform-origin: 140px 155px; animation: dbAnim 2.4s ease-in-out infinite; }
@keyframes dbAnim { 0%,100% { transform: rotate(0); } 50% { transform: rotate(75deg); } }

/* BIRD DOG */
.anim-birddog .bd-armR { transform-origin: 80px 105px; animation: bdArm 2.4s ease-in-out infinite; }
.anim-birddog .bd-legL { transform-origin: 120px 105px; animation: bdLeg 2.4s ease-in-out infinite; }
@keyframes bdArm { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-15deg); } }
@keyframes bdLeg { 0%,100% { transform: rotate(0); } 50% { transform: rotate(15deg); } }

/* PLANK & SIDE PLANK — subtle breath */
.anim-plank .plank-body, .anim-sideplank .sp-body { animation: breathe 3s ease-in-out infinite; transform-origin: center; }
@keyframes breathe { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }

/* INCLINE PRESS */
.anim-inclinepress .press-arm { transform-origin: 120px 115px; animation: pressAnim 2s ease-in-out infinite; }
@keyframes pressAnim { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-25px); } }

/* SHOULDER PRESS */
.anim-shoulderpress .sp-arms { transform-origin: 100px 95px; animation: spAnim 2s ease-in-out infinite; }
@keyframes spAnim { 0%,100% { transform: translateY(15px) scaleY(.8); } 50% { transform: translateY(0) scaleY(1); } }

/* LATERAL */
.anim-lateral .lat-arm-l { transform-origin: 100px 75px; animation: latL 1.8s ease-in-out infinite; }
.anim-lateral .lat-arm-r { transform-origin: 100px 75px; animation: latR 1.8s ease-in-out infinite; }
@keyframes latL { 0%,100% { transform: rotate(40deg); } 50% { transform: rotate(0); } }
@keyframes latR { 0%,100% { transform: rotate(-40deg); } 50% { transform: rotate(0); } }

/* TRICEPS */
.anim-triceps .tri-forearm { transform-origin: 135px 80px; animation: triAnim 1.6s ease-in-out infinite; }
@keyframes triAnim { 0%,100% { transform: rotate(0); } 50% { transform: rotate(-40deg); } }

/* SPLIT SQUAT */
.anim-splitsquat .body { transform-origin: 80px 170px; animation: ssAnim 2.4s ease-in-out infinite; }
@keyframes ssAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(15px); } }

/* CALF */
.anim-calf .body { transform-origin: 100px 170px; animation: calfAnim 1.6s ease-in-out infinite; }
@keyframes calfAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

/* SCAP PUSHUP */
.anim-scappush .scap-torso { animation: scapAnim 2s ease-in-out infinite; transform-origin: 50px 125px; }
@keyframes scapAnim { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

/* PALLOF */
.anim-pallof .pallof-arms { transform-origin: 80px 80px; animation: pallofAnim 2s ease-in-out infinite; }
.anim-pallof .cable-pull { animation: pallofCable 2s ease-in-out infinite; transform-origin: 180px 80px; }
@keyframes pallofAnim { 0%,100% { transform: scaleX(.5); } 50% { transform: scaleX(1); } }
@keyframes pallofCable { 0%,100% { transform: scaleX(.7); } 50% { transform: scaleX(1); } }

.anim-generic { opacity: .85; }
`;
