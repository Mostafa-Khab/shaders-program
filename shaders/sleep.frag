#version 110
uniform float u_time;
uniform vec2 u_resolution;

void main()
{
    //float f = fract(u_time);
    //vec3 col = vec3(1.0 * f, 2.0 * f, 3.0 * f);
    vec2 uv = gl_FragCoord.xy / u_resolution * 2.0 - 0.85;
    uv.x *=  u_resolution.x / u_resolution.y;

    float d = length(uv);
    d = abs(d);
    d = sin(18.0 * d + 2.5 * u_time) / 8.0;
    d = smoothstep(0.0, 0.1, d);
    gl_FragColor = vec4(d,d,d, 1.f);
};

