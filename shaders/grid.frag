#version 110

uniform float u_time;
uniform vec2  u_resolution;

const float line_width = 0.05;

void main()
{
  vec2 uv = 2.0 *  (gl_FragCoord.xy / u_resolution) - vec2(0.85);
  uv.x *= u_resolution.x / u_resolution.y;

  float x = fract(uv * 8.0).x;
  float y = fract(uv * 8.0).y;

  vec3 color = vec3(0.7);
  if(x < line_width || y < line_width)
  {
    color = vec3(0.1);
  }

  if(abs(uv.x) < line_width / 4.0 || abs(uv.y) < line_width / 4.0)
  {
    color = vec3(0.0);
  }

  gl_FragColor = vec4(color, 1.0);
}
