#include <glad/gl.h>

#include <GFX/system.hpp>
#include <GFX/graphics.hpp>

#include <string>
#include <filesystem>

int main(int argc, const char* argv[])
{
  Log::level(Log::Level::all);
  std::string shader_prefix = (argc > 1)? argv[1] : "default";

  std::string vshader_file = "../shaders/default.vert"; //"../shaders/" + shader_prefix + ".vert";
  std::string fshader_file = "../shaders/" + shader_prefix + ".frag";

  if(!std::filesystem::exists(vshader_file))
  {
    vshader_file = "shaders/default.vert";
  }

  if(!std::filesystem::exists(fshader_file))
  {
    fshader_file = "shaders/" + shader_prefix + ".frag";
  }

  const int width  = 1600;
  const int height = 900;

  gfx::context context;
  context.setVersion({2, 0});
  context.setWindowData(width, height, "gfx-test", true);

  bool result = context.init();
  GLFW_ASSERT(result, "failed to create gfx context");

  GLFWwindow* window;
  context.getWindow(window);

  glfwSetKeyCallback(window, gfx::callback::key);

  gfx::program program;
  result = program.create(
      vshader_file,
      fshader_file
      );
  //GLFW_ASSERT(result, "failed to create shader program because can't find shader files");
  program.link();

  int mvp_loc                                = program.getUniformLocation("MVP");
  gfx::vertex2d::attributes::vpos_location() = program.getAttribLocation("vPos");
  gfx::vertex2d::attributes::vcol_location() = program.getAttribLocation("vCol");
  int u_time_loc                             = program.getUniformLocation("u_time");
  int u_res_loc                              = program.getUniformLocation("u_resolution");


  float a = (float)width / height;
  gfx::box                    b{0, 0, 2, 2};
  gfx::vbuffer<gfx::vertex2d> vbuff;
  vbuff.bind();
  vbuff.append(gfx::vertex2d(b.x - (b.width / 2) * a, b.y - (b.height / 2), gfx::gruv::red));
  vbuff.append(gfx::vertex2d(b.x + (b.width / 2) * a, b.y - (b.height / 2), gfx::gruv::aqua));
  vbuff.append(gfx::vertex2d(b.x - (b.width / 2) * a, b.y + (b.height / 2), gfx::gruv::green));
  vbuff.append(gfx::vertex2d(b.x + (b.width / 2) * a, b.y + (b.height / 2), gfx::gruv::yellow));
  vbuff.load_data();

  gfx::clock timer;

  gfx::view view(width, height);
  float fov = 1.57;

  gfx::vector3f eye(0, 0, 2.1);
  gfx::vector3f centre(0, 0,  1);
  gfx::vector3f up(0, 1,  0);

  float time = 0.f;

  gfx::vector2f resolution(width, height);

  while(!context.should_close())
  {
    float dt = timer.restart();
    time += dt * 1;

    view.update(window);
    view.ortho(1, -1, 1);
    view.multiply();

    if(glfwGetKey(window, GLFW_KEY_R) == GLFW_PRESS)
    {
      program.reload(vshader_file, fshader_file);
      program.link();
    }

    program.use();
    glUniform1fv(u_time_loc, 1, (const float*)&time);
    glUniform2fv(u_res_loc, 1, reinterpret_cast<const float*>(&resolution));

    view.set_mvp(mvp_loc);

    context.clear(gfx::gruv::white, GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
      vbuff.draw(GL_TRIANGLE_STRIP);
    context.display();

  }
  return 0;
}

