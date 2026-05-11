import { useRef, useEffect, type FC, type ReactNode } from "react";

interface HeroProps {
  trustBadge?: { text: string; icons?: ReactNode[] };
  headline: { line1: string; line2: string };
  subtitle: string;
  buttons?: {
    primary?: { text: string; onClick?: () => void };
    secondary?: { text: string; onClick?: () => void };
  };
  className?: string;
}

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=.0;
  for(float i=.0;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}

void main(void){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    // Tinted toward navy + champagne gold (#C9A96E => ~vec3(0.79,0.66,0.43))
    col+=.0014/d*(cos(sin(i)*vec3(0.79,0.66,0.43)+vec3(1.0,2.0,3.0))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.0022*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.04,bg*.07,bg*.18),d);
  }
  O=vec4(col,1);
}`;

const Hero: FC<HeroProps> = ({ trustBadge, headline, subtitle, buttons, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      canvas.style.background =
        "radial-gradient(ellipse at center, rgba(201,169,110,0.15), rgba(10,26,47,1) 70%)";
      return;
    }

    let dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader error:", gl.getShaderInfoLog(sh));
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");

    const resize = () => {
      dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      const { clientWidth, clientHeight } = container;
      canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let frame = 0;
    const loop = (now: number) => {
      gl.useProgram(program);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={`relative isolate w-full overflow-hidden bg-[color:var(--navy)] ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[color:var(--navy)]/50 via-transparent to-[color:var(--navy)]/80" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center text-cream md:py-32">
        {trustBadge && (
          <div className="animate-fade-in-down mb-8 inline-flex items-center gap-3 border border-cream/20 bg-cream/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-cream/85 backdrop-blur">
            {trustBadge.icons?.map((icon, i) => (
              <span key={i} className="text-gold">{icon}</span>
            ))}
            <span>{trustBadge.text}</span>
          </div>
        )}

        <h1 className="font-display text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
          <span className="animate-fade-in-up block">{headline.line1}</span>
          <span className="animate-fade-in-up animation-delay-200 mt-2 block bg-gradient-to-r from-gold via-cream to-gold bg-clip-text text-transparent">
            {headline.line2}
          </span>
        </h1>

        <p className="animate-fade-in-up animation-delay-400 mt-7 max-w-2xl text-base text-cream/75 md:text-lg">
          {subtitle}
        </p>

        {buttons && (
          <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-col gap-3 sm:flex-row">
            {buttons.primary && (
              <button onClick={buttons.primary.onClick} className="btn-gold min-w-[180px]">
                {buttons.primary.text}
              </button>
            )}
            {buttons.secondary && (
              <button
                onClick={buttons.secondary.onClick}
                className="min-w-[180px] border border-cream/40 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-cream hover:text-[color:var(--navy)]"
              >
                {buttons.secondary.text}
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fade-in-up   { from { opacity: 0; transform: translateY(30px); }  to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
        .animate-fade-in-up   { animation: fade-in-up 0.9s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
};

export default Hero;
