#version 110
//varying vec3 color;
//varying vec2 position;
uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t)
{
  return vec3(0.5) + vec3(0.5)*cos(6.28318*(vec3(1.0) * t + vec3(0.263, 0.416, 0.557)));
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution * 2.0 - 0.85; //0.85, 1.0
    uv.x *=  u_resolution.x / u_resolution.y;
    vec2 uv0 = uv;
    vec3 final = vec3(0.0);

    for(float i = 0.0; i < 4.0; i++)
    {
      uv = fract(uv * 1.5) - 0.5;

      float d = length(uv) * exp(-length(uv0));
      vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);

      d  = sin(d * 8.0 + u_time) / 8.0;
      d  = abs(d);

      d  = pow(0.01 / d, 1.2);       //d  = smoothstep(0.0, 0.1, d);
                           
      final += col * d;
    }

    gl_FragColor = vec4(final, 1.0);
};

