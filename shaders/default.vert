#version 110
uniform mat4 MVP;
attribute vec3 vCol;
attribute vec2 vPos;
//varying vec3 color;
//varying vec2 position;
void main()
{
    gl_Position = MVP * vec4(vPos, 1.0, 1.0);
    //color = vCol;
    //position = vPos;
}
