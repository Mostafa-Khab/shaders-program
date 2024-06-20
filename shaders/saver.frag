#version 110
uniform float u_time;
uniform vec2 u_resolution;

void main()
{
  vec2 uv = 2.0 * (gl_FragCoord.xy / u_resolution)  - vec2(0.85);
  uv.x *= u_resolution.x / u_resolution.y;

  float d = length(uv);
  d -= 0.5;

  gl_FragColor = vec4(
          sin(d * 8.0 + u_time * 2.0),
          sin(d * 8.0 + u_time * 2.0),
          cos(d * 8.0 + u_time * 2.0),
          1.0
      );
};

