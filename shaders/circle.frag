#version 110

uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t)
{
  return vec3(0.5) + vec3(0.5)*cos(6.28318*(vec3(1.0) * t + vec3(0.263, 0.416, 0.557)));
}

void main()
{
  vec2 uv = (gl_FragCoord.xy / u_resolution) - vec2(0.4); //0.5
  uv *=  2.0;
  uv.x *= u_resolution.x / u_resolution.y;

  vec2 uv0  = uv;
  uv = fract(uv * 2.0) - 0.5;

  float d = length(uv);

  vec3 col = palette(length(uv0) + u_time);

  d = sin(d * 8.0 + u_time) / 8.0;
  d = abs(d);

  d = 0.02 / d;

  col *= d;

  gl_FragColor = vec4(col, 1.0);
};

