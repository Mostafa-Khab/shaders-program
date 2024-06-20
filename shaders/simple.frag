#version 110
uniform vec2 u_resolution;
uniform float u_time;

vec3 palette(float t)
{
  return vec3(0.5) + vec3(0.5)*cos(6.28318*(vec3(1.0) * t + vec3(0.263, 0.416, 0.557)));
}

void main()
{
  vec2 uv = (2.0 * gl_FragCoord.xy / u_resolution) - vec2(0.85);
  uv.x *= u_resolution.x / u_resolution.y;

  uv = fract(uv * 0.5) - 0.5;

  float d = length(uv);

  vec3 col = palette(d + u_time);

  d = sin(d * 8.0 + u_time) / 0.8;
  d = abs(d);

  d = 0.02 / d;

  col *= d;

  gl_FragColor = vec4(col, 1.0);
}
