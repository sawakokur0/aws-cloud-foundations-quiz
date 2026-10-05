// Computer Graphics Fundamentals (OKG 2214): открытые вопросы к мидтерму по лекциям L1.1–L5.2.
// Формат: { l: лекция, p: 1 если тема вероятна на мидтерме, q: вопрос (EN), ru: суть по-русски,
//           a: образец ответа (EN, HTML), k: что обязательно упомянуть }.
// id вопроса = лекция + ":" + номер внутри лекции, поэтому новые вопросы добавляй в конец своей лекции.
window.CGF_LECS = [
  { k: "1.1", s: "L1.1", t: "Introduction & Image Formation", ru: "Свет, цвет, synthetic camera, pipeline" },
  { k: "1.2", s: "L1.2", t: "OpenGL: Background & First Program", ru: "История API, библиотеки, buffer objects" },
  { k: "2.1", s: "L2.1", t: "Math, Shaders, Color & Attributes", ru: "Векторы, GLSL, qualifiers, triangulation" },
  { k: "2.2", s: "L2.2", t: "More GLSL & Three Dimensions", ru: "Linking shaders, double buffering, gasket, z-buffer" },
  { k: "3.1", s: "L3.1", t: "Input and Interaction", ru: "Logical devices, event mode, GLUT callbacks, menus" },
  { k: "3.2", s: "L3.2", t: "Geometry & Representation", ru: "Points/vectors, affine space, frames, homogeneous coords" },
  { k: "4.1", s: "L4.1", t: "Transformations", ru: "T, R, S, shear, order, fixed point, quaternions" },
  { k: "4.2", s: "L4.2", t: "Building Models & Classical Viewing", ru: "Vertex/edge lists, color cube, projection taxonomy" },
  { k: "5.1", s: "L5.1", t: "Computer Viewing & Projection", ru: "LookAt, Ortho/Frustum/Perspective, normalization" },
  { k: "5.2", s: "L5.2", t: "Shading", ru: "Phong/Blinn model, normals, flat/Gouraud/Phong" }
];

window.CGF_OQ = [
/* ---------------- L1.1 ---------------- */
{ l: "1.1", p: 1,
  q: "What are the elements of image formation in computer graphics? Why is their independence important?",
  ru: "Объекты, наблюдатель, источники света, свойства материалов. Они задаются независимо, поэтому API простой, а pipeline быстрый.",
  a: `<p>Image formation in CG imitates physical imaging systems (cameras, microscopes, telescopes, the human visual system). The elements are:</p>
<ul><li><b>Objects</b> — geometry defined by vertices;</li><li><b>Viewer</b> (camera) — forms the image;</li><li><b>Light source(s)</b>;</li><li><b>Attributes / material properties</b> that govern how light interacts with the materials.</li></ul>
<p>The objects, the viewer and the lights are <b>independent</b> of each other. This lets the API be simple: the programmer only specifies objects, materials, viewer and lights, and the implementation computes the image. It also makes 2D graphics a special case of 3D and allows a fast, pipelined hardware implementation.</p>`,
  k: ["objects", "viewer", "light sources", "material attributes", "independence → simple API"] },

{ l: "1.1", p: 1,
  q: "Explain the three-color theory. Why do we need only three primary colors?",
  ru: "В глазу три типа колбочек, в мозг идут три tristimulus values, поэтому хватает трёх первичных цветов.",
  a: `<p>The human visual system has two kinds of sensors: <b>rods</b> (monochromatic, night vision) and <b>cones</b> (color sensitive). There are <b>three types of cones</b>, and only three values — the <b>tristimulus values</b> — are sent to the brain.</p>
<p>So a display does not have to reproduce every wavelength of the visible spectrum (about 350–750 nm). It only has to match the three tristimulus values, which needs only <b>three primary colors</b> (e.g. R, G, B). Two colors with different spectra but the same tristimulus values look identical.</p>`,
  k: ["rods vs cones", "three types of cones", "tristimulus values", "match 3 values, not the full spectrum"] },

{ l: "1.1", p: 1,
  q: "Compare additive and subtractive color models. Give examples of where each is used.",
  ru: "Additive (RGB) складывает излучаемый свет: мониторы, проекторы. Subtractive (CMY) фильтрует белый свет: печать, плёнка.",
  a: `<p><b>Additive color (RGB):</b> a color is formed by <i>adding</i> amounts of three primaries — Red, Green, Blue. Used in light-emitting devices: CRTs and monitors, projection systems, positive film. R+G+B at full intensity gives white; the color space can be drawn as the <b>RGB color cube</b>.</p>
<p><b>Subtractive color (CMY):</b> a color is formed by <i>filtering white light</i> with Cyan, Magenta and Yellow filters. Each ink absorbs one primary: cyan absorbs red and reflects green and blue. To get blue we use cyan (absorbs red) + magenta (absorbs green). Used for hardcopy: printing, negative film, light–material interactions.</p>
<p>So RGB describes emitted light, CMY describes reflected light (we see the light that is not absorbed).</p>`,
  k: ["RGB = adding light", "CMY = filtering white light", "monitors / projectors", "printing", "cyan absorbs red"] },

{ l: "1.1", p: 0,
  q: "Describe the HSV (HSB) color model.",
  ru: "Hue = угол на конусе (красный 0°, жёлтый 60°, зелёный 120°), Saturation = чистота 0–100%, Value/Brightness = от чёрного до белого.",
  a: `<p>HSB (hue, saturation, brightness), also called HSV, describes color in perceptual terms, as a cone:</p>
<ul><li><b>Hue</b> — the actual color, measured in degrees around the cone: red = 0° (360°), yellow = 60°, green = 120°, etc.</li>
<li><b>Saturation</b> — purity of the color, in percent from the center of the cone (0) to the surface (100). At 0% saturation the hue is meaningless (gray).</li>
<li><b>Brightness (Value)</b> — from black (0%) to white (100%). At 0% brightness both hue and saturation are meaningless.</li></ul>
<p>It is more intuitive for people choosing colors than RGB, which is closer to the hardware.</p>`,
  k: ["hue in degrees", "saturation = purity", "brightness 0–100%", "cone"] },

{ l: "1.1", p: 1,
  q: "Describe the synthetic camera model and derive the projection of a point in a pinhole camera.",
  ru: "Проекторы идут от точки к center of projection; пересечение с image plane даёт проекцию. Подобные треугольники: xp = −x/(z/d).",
  a: `<p>The <b>synthetic camera model</b> forms an image the way a real camera does: a <b>projector</b> is drawn from each point <i>p</i> of the object to the <b>center of projection</b> (COP); where it crosses the <b>image plane</b> is the projection of <i>p</i>. Only local information is used to shade each point (<b>local lighting</b>).</p>
<p><b>Pinhole camera:</b> the pinhole is at the origin, the film plane is at distance <i>d</i>. By similar triangles a point (x, y, z) projects to</p>
<p><code>xp = −x / (z/d),  yp = −y / (z/d),  zp = d</code></p>
<p>These are the equations of simple perspective: the size of the image is inversely proportional to the distance z. In the synthetic camera the image plane is moved in front of the COP, so the image is not inverted.</p>`,
  k: ["projector", "center of projection", "image plane", "similar triangles", "xp = −x/(z/d)"] },

{ l: "1.1", p: 1,
  q: "Why don't we use ray tracing to design an interactive graphics system? Compare global and local lighting.",
  ru: "Ray tracing даёт глобальные эффекты, но медленный и требует всю сцену сразу. Pipeline обрабатывает объекты по одному с локальным освещением и реализуется в железе.",
  a: `<p><b>Ray tracing</b> follows rays of light from the center of projection until they are absorbed or go to infinity. It is physically based and can produce <b>global</b> effects: shadows, multiple reflections, translucent objects. <b>Radiosity</b> (energy-transfer approach) is even more global and very slow.</p>
<p>Problems: ray tracing is <b>slow</b>, not well-suited for interactive applications, and needs the <b>whole database</b> of objects available at all times (a ray can hit any object). Ray-tracing hardware (Pixel Machines) did not survive in the market, although GPU ray tracing is now close to real time.</p>
<p><b>Global lighting:</b> the color of an object cannot be computed independently — objects block light, reflect light onto each other, can be translucent. <b>Local lighting:</b> each object is shaded using only its own data and the lights.</p>
<p>The practical approach is the <b>pipeline</b>: process objects one at a time in the order the application generates them, using local lighting. Every step can be done in hardware, in a pipelined and parallel way, so it is fast enough for real time.</p>`,
  k: ["ray tracing = global effects", "slow, needs whole database", "local lighting", "objects processed one at a time", "pipeline in hardware"] },

{ l: "1.1", p: 1,
  q: "Describe the stages of the graphics pipeline.",
  ru: "Vertex processing → clipping и primitive assembly → rasterization → fragment processing → frame buffer.",
  a: `<p>Vertices from the application go through four main stages:</p>
<ol><li><b>Vertex processing</b> — converts object representations from one coordinate system to another (object → camera/eye → screen); every change of coordinates is a matrix transformation. Also computes vertex colors and does projection.</li>
<li><b>Clipping and primitive assembly</b> — vertices are collected into geometric objects (line segments, polygons, curves). Like a real camera, the virtual camera sees only part of the world; objects outside the view volume are <b>clipped out</b>.</li>
<li><b>Rasterization</b> — for each primitive that is not clipped, the rasterizer produces a set of <b>fragments</b> (potential pixels with location, color and depth). Vertex attributes are <b>interpolated</b> over the primitive.</li>
<li><b>Fragment processing</b> — determines the final color of each pixel in the frame buffer (texture mapping or interpolated vertex colors) and removes fragments hidden by closer ones (<b>hidden-surface removal</b>).</li></ol>`,
  k: ["vertex processing", "clipping + primitive assembly", "rasterization → fragments", "fragment processing", "hidden-surface removal"] },

{ l: "1.1", p: 0,
  q: "What is a fragment? How is it different from a pixel?",
  ru: "Fragment = потенциальный пиксель: позиция, цвет, глубина. Он может не попасть в кадр, если его закроет более близкий фрагмент.",
  a: `<p>A <b>fragment</b> is a "potential pixel" produced by the rasterizer. It has a location in the frame buffer plus color and depth attributes (interpolated from the vertices).</p>
<p>A <b>pixel</b> is the final value stored in the frame buffer. Several fragments can fall on the same pixel; fragment processing decides which one wins — e.g. a fragment blocked by a fragment closer to the camera is discarded (hidden-surface removal). So not every fragment becomes a pixel.</p>`,
  k: ["potential pixel", "location + color + depth", "produced by rasterizer", "may be hidden"] },

{ l: "1.1", p: 0,
  q: "Compare perspective and parallel projections.",
  ru: "Perspective: все проекторы сходятся в COP, выглядит реалистично. Parallel: проекторы параллельны (direction of projection), сохраняют форму и размеры.",
  a: `<p><b>Projection</b> combines the 3D view with the 3D objects to produce a 2D image.</p>
<ul><li><b>Perspective projection:</b> all projectors meet at the <b>center of projection</b>; a single viewing location, similar to a photograph. Far objects look smaller, so it looks realistic.</li>
<li><b>Parallel projection:</b> projectors are parallel; the center of projection is replaced by a <b>direction of projection</b> (viewer at infinity). Good for capturing <b>shape and dimensions</b> (engineering, CAD).</li></ul>
<p>Mathematically, parallel projection is the limit of perspective projection as the COP moves to infinity.</p>`,
  k: ["COP vs direction of projection", "realistic vs measurable", "parallel = limit of perspective"] },

{ l: "1.1", p: 0,
  q: "What does a graphics API have to specify? Describe the camera specification.",
  ru: "Objects (через вершины), viewer, lights, materials + input и capabilities. Камера: 6 степеней свободы, линза, размер плёнки, ориентация плоскости.",
  a: `<p>An API contains functions that specify what we need to form an image: <b>objects</b>, the <b>viewer</b>, <b>light sources</b>, <b>materials</b>, plus other information — input from devices (mouse, keyboard) and capabilities of the system.</p>
<p><b>Objects</b> are built from a limited set of primitives — points (0D), line segments (1D), polygons (2D), some curves and surfaces (quadrics, parametric polynomials) — all defined through vertices.</p>
<p><b>Camera:</b> six degrees of freedom (position of the center of the lens — 3, orientation — 3), the lens, the film size and the orientation of the film plane.</p>
<p><b>Lights:</b> point vs distributed sources, spotlights, near and far sources, color. <b>Materials:</b> absorption (color properties) and scattering (diffuse, specular).</p>`,
  k: ["objects, viewer, lights, materials", "primitives via vertices", "6 DOF camera", "lens, film size"] },

/* ---------------- L1.2 ---------------- */
{ l: "1.2", p: 1,
  q: "Compare immediate mode and retained mode graphics.",
  ru: "Immediate: геометрия отправляется и рисуется каждый раз, на GPU не хранится. Retained: хранится на GPU, CPU шлёт только команды и трансформации.",
  a: `<p><b>Immediate mode:</b> geometry is drawn as soon as the CPU sends it to the GPU; once drawn it is discarded, so all data must be <b>resent</b> every frame even if nothing changes. Needs major CPU–GPU bandwidth but minimizes GPU memory.</p>
<p><b>Retained mode:</b> geometry is sent to the GPU once and <b>stored</b>; it is displayed when the CPU directs it, and the CPU may send only transformations to move it. Minimizes data transfers, but the GPU needs enough memory to store the geometry.</p>
<p>Old OpenGL was an immediate-mode system (glBegin/glVertex/glEnd); modern OpenGL (3.1+) works in retained style with buffer objects.</p>`,
  k: ["resend every frame vs stored on GPU", "bandwidth vs GPU memory", "OpenGL 3.1 has no immediate mode"] },

{ l: "1.2", p: 0,
  q: "Briefly describe the history of graphics APIs that led to OpenGL. Why did OpenGL omit windowing and input?",
  ru: "GKS (2D, ISO), PHIGS (CAD, retained), X Window, SGI GL (1982) → OpenGL (1992). Окна и ввод убрали ради независимости от платформы.",
  a: `<ul><li><b>IFIPS (1973)</b> formed committees for a standard API: <b>GKS</b> (2D, good workstation model; became ISO and ANSI standard in the 1980s, hard to extend to 3D) and <b>Core</b> (2D and 3D).</li>
<li><b>PHIGS</b> came from the CAD community: a database model with retained graphics (structures). The <b>X Window System</b> (DEC/MIT) introduced a client–server architecture. <b>PEX</b> combined them but was hard to use.</li>
<li><b>SGI</b> implemented the graphics pipeline in hardware (1982) and programmers used the <b>GL</b> library, which made 3D interactive programming simple.</li>
<li><b>OpenGL (1992)</b> — a platform-independent version of GL: easy to use, close to the hardware for performance, focused on rendering.</li></ul>
<p>OpenGL <b>omitted windowing and input</b> to avoid window-system dependencies — so the same code runs on any platform; these jobs go to libraries such as GLUT.</p>
<p>OpenGL was controlled by the Architectural Review Board (SGI, Microsoft, Nvidia, HP, IBM…), now by the <b>Khronos Group</b>.</p>`,
  k: ["GKS", "PHIGS", "SGI GL 1982", "OpenGL 1992", "platform independence", "Khronos"] },

{ l: "1.2", p: 1,
  q: "What changed in OpenGL 3.1? What is modern OpenGL based on?",
  ru: "Полностью на шейдерах, нет default shaders и immediate mode, мало state variables, функции 2.5 deprecated. Приложение шлёт данные, GPU рисует.",
  a: `<p>Modern OpenGL gets performance by using the <b>GPU</b> instead of the CPU. The GPU is controlled by programs called <b>shaders</b>; the application's job is just to send data to the GPU, and the GPU does all rendering.</p>
<p><b>OpenGL 3.1 (2009):</b></p>
<ul><li>totally <b>shader-based</b> — no default shaders, every application must provide <b>both a vertex and a fragment shader</b>;</li>
<li><b>no immediate mode</b>;</li><li>few state variables;</li>
<li>most 2.5 functions <b>deprecated</b> (marked obsolete to be phased out);</li>
<li>backward compatibility not required.</li></ul>
<p>Related versions: OpenGL ES (embedded; ES 2.0 = simplified 3.1, shader-based), WebGL (JavaScript implementation of ES 2.0), OpenGL 4.1–4.5 added geometry and compute shaders and the tessellator.</p>`,
  k: ["shader-based", "vertex + fragment shader required", "no immediate mode", "deprecated", "app sends data, GPU renders"] },

{ l: "1.2", p: 1,
  q: "Describe the OpenGL-related libraries: GL, GLU, GLUT/freeglut, GLEW and the window-system links.",
  ru: "GL = ядро; GLU = утилиты (legacy); GLX/WGL/AGL = связь с оконной системой; GLUT = окно, ввод, меню; freeglut = обновлённый GLUT; GLEW = доступ к extensions.",
  a: `<ul><li><b>OpenGL core library</b> — OpenGL32 on Windows, GL (libGL) on Unix/Linux.</li>
<li><b>GLU</b> (OpenGL Utility Library) — higher-level functions built on core OpenGL; works only with legacy code.</li>
<li><b>Links with the window system</b> — GLX for X Window, WGL for Windows, AGL for Macintosh.</li>
<li><b>GLUT</b> (OpenGL Utility Toolkit) — functionality common to all window systems: open a window, get mouse and keyboard input, menus, event-driven model. Portable, but lacks widgets like slide bars.</li>
<li><b>freeglut</b> — updated GLUT with added capabilities and context checking.</li>
<li><b>GLEW</b> (OpenGL Extension Wrangler) — makes extensions available on a particular system easy to access; include <code>glew.h</code> and call <code>glewInit()</code>.</li></ul>`,
  k: ["GL core", "GLU legacy", "GLX/WGL/AGL", "GLUT windows + input", "GLEW extensions"] },

{ l: "1.2", p: 0,
  q: "Explain OpenGL as a state machine and as a data-flow machine. What types of OpenGL functions are there?",
  ru: "Функции: primitive generating (рисуют) и state changing (меняют состояние). С 3.1 больше data flow: данные идут на GPU, работа в шейдерах.",
  a: `<p><b>State machine:</b> OpenGL keeps a state; functions are of two types:</p>
<ul><li><b>primitive-generating</b> — can produce output if the primitive is visible; how vertices are processed and how the primitive looks is controlled by the state;</li>
<li><b>state-changing</b> — transformation functions and attribute functions.</li></ul>
<p>Function groups: primitives, attributes, data transfer and control (color, transformation, lighting), control and input (GLUT), query.</p>
<p><b>Data-flow model:</b> shader-based OpenGL is less a state machine and more a data flow: most state variables and pre-3.1 functions are deprecated, the application's job is to get data to the GPU, and the action happens in the shaders. Under 3.1 most "state" is defined by the application and sent to shaders.</p>`,
  k: ["primitive-generating vs state-changing", "state controls appearance", "data flow to shaders"] },

{ l: "1.2", p: 0,
  q: "Explain the OpenGL function naming convention using glUniform3fv as an example. Why are there so many similar functions?",
  ru: "gl = библиотека, Uniform = имя, 3 = размерность, f = float, v = указатель на массив. OpenGL не объектно-ориентированный, поэтому много вариантов одной функции.",
  a: `<p><code>glUniform3fv(p)</code>: <b>gl</b> — belongs to the GL library; <b>Uniform</b> — function name; <b>3</b> — dimensions (number of components); <b>f</b> — data type float (also i, d…); <b>v</b> — the argument is a pointer to an array (vector) instead of separate values like <code>glUniform3f(x, y, z)</code>.</p>
<p>OpenGL is <b>not object-oriented</b> (it is a C API), so one logical function has many versions: glUniform3f, glUniform2i, glUniform3dv… The underlying storage mode is the same. In C++ overloading would be easy, but efficiency is the issue.</p>
<p>Constants (<code>GL_DEPTH_TEST</code>, <code>GL_COLOR_BUFFER_BIT</code>) and types (<code>GLfloat</code>, <code>GLdouble</code>) are defined in gl.h, glu.h, glut.h.</p>`,
  k: ["gl prefix", "dimension", "type letter", "v = array pointer", "not object-oriented"] },

{ l: "1.2", p: 1,
  q: "Describe the structure of a typical OpenGL/GLUT program and the role of the event loop.",
  ru: "main(): окно, callbacks, glutMainLoop последним; init(): состояние и буферы; initShader(): read/compile/link; callbacks: display, input. Display callback обязателен.",
  a: `<p>Most OpenGL programs consist of:</p>
<ul><li><b>main()</b> — specifies callback functions, opens one or more windows with the required properties (glutInit, glutInitDisplayMode, glutInitWindowSize/Position, glutCreateWindow), and finally enters the event loop <code>glutMainLoop()</code> — the last executable statement.</li>
<li><b>init()</b> — sets state variables (viewing, attributes, clear color), creates vertex array objects and buffer objects.</li>
<li><b>initShader()</b> — reads, compiles and links the shaders.</li>
<li><b>callbacks</b> — the display function, input and window functions.</li></ul>
<p>Every GLUT program must have a <b>display callback</b> (<code>glutDisplayFunc(mydisplay)</code>); it is executed whenever OpenGL decides the display must be refreshed, e.g. when the window is opened. <code>glutMainLoop()</code> puts the program in an infinite <b>event loop</b> that waits for events and calls the matching callbacks. A display callback typically does: <code>glClear → glDrawArrays → glFlush</code> (or glutSwapBuffers).</p>`,
  k: ["main / init / initShader / callbacks", "glutMainLoop last", "display callback required", "event loop"] },

{ l: "1.2", p: 1,
  q: "What are vertex array objects and buffer objects? How do you create and fill a buffer object?",
  ru: "VAO объединяет все данные вершин; VBO переносит много данных на GPU. glGenBuffers → glBindBuffer → glBufferData (+ usage hint).",
  a: `<p>A <b>vertex array</b> holds vertex attributes in the application (position, color, texture coordinates, application data).</p>
<p>A <b>Vertex Array Object (VAO)</b> bundles all vertex data (positions, colors…). <code>glGenVertexArrays(1,&amp;vao); glBindVertexArray(vao);</code> — binding lets us switch between vertex arrays.</p>
<p>A <b>Buffer Object (BO)</b> transfers large amounts of data to the GPU. Steps:</p>
<ol><li><code>glGenBuffers(n, ids)</code> — create buffer objects, return their ids;</li>
<li><code>glBindBuffer(GL_ARRAY_BUFFER, id)</code> — make it current (GL_ELEMENT_ARRAY_BUFFER for index arrays);</li>
<li><code>glBufferData(target, size, data, usage)</code> — copy data; <i>usage</i> is a performance hint: STATIC / DYNAMIC / STREAM × DRAW / READ / COPY.</li></ol>
<p><code>glBufferSubData</code> replaces only a range starting at an offset (the total size must be set by glBufferData first); <code>glDeleteBuffers</code> frees them.</p>
<p><b>Why BOs:</b> the memory manager places data in the best memory (system, GPU, video) according to the hints, and the buffer is on the server side, so several clients can share it.</p>`,
  k: ["VAO bundles attributes", "glGenBuffers / glBindBuffer / glBufferData", "usage flags static/dynamic/stream", "glBufferSubData", "data stays on GPU"] },

{ l: "1.2", p: 0,
  q: "Describe the coordinate systems used in OpenGL, the default camera and the viewport.",
  ru: "Object/world → camera (eye) → window. Камера в начале координат смотрит в −z, default view volume — куб со стороной 2. glViewport(x,y,w,h) в пикселях.",
  a: `<p>Units of the points are chosen by the application: <b>object (world, model, problem) coordinates</b>. Objects are transformed into <b>camera (eye/viewing) coordinates</b>, and eventually pixels are produced in <b>window coordinates</b>.</p>
<p><b>OpenGL camera:</b> placed at the origin of camera space, pointing in the <b>negative z</b> direction. The default view volume is a box centered at the origin with sides of length 2: from (−1,−1,−1) to (1,1,1). The default projection is <b>orthographic</b>: points are projected along z onto the plane z = 0.</p>
<p><b>Viewport:</b> we don't have to use the whole window — <code>glViewport(x, y, w, h)</code> in pixels (window coordinates) selects the part used for the image.</p>`,
  k: ["object → eye → window", "camera at origin looking −z", "cube (−1..1)", "orthographic onto z=0", "glViewport"] },

/* ---------------- L2.1 ---------------- */
{ l: "2.1", p: 1,
  q: "Compare the roles of the vertex shader and the fragment shader. Give example applications of each.",
  ru: "Vertex shader обрабатывает каждую вершину (gl_Position, трансформации, освещение по вершинам). Fragment shader даёт цвет каждого фрагмента (per-fragment lighting, текстуры).",
  a: `<p><b>Vertex shader</b> — executed once per vertex sent by <code>glDrawArrays</code>; must output the vertex position <code>gl_Position</code>, then primitive assembly follows. Applications:</p>
<ul><li>moving vertices: transformations (modeling, projection), morphing, wave motion, fractals, particle systems;</li>
<li>lighting: per-vertex (Gouraud) shading, more realistic models, cartoon shaders.</li></ul>
<p><b>Fragment shader</b> — executed once per fragment produced by the rasterizer; outputs the fragment color that goes to the frame buffer. Applications:</p>
<ul><li>per-fragment lighting (Phong shading);</li><li>texture mapping, procedural textures, environment mapping, bump mapping.</li></ul>
<p>Data flow: application → vertex shader → primitive assembly → rasterizer (interpolates vertex outputs) → fragment shader → frame buffer.</p>
<pre><code>// vertex                       // fragment
in vec4 vPosition;               out vec4 fragcolor;
void main(){                     void main(){
  gl_Position = vPosition; }       fragcolor = vec4(1,0,0,1); }</code></pre>`,
  k: ["per vertex vs per fragment", "gl_Position", "transformations, morphing, particles", "Phong shading, textures, bump mapping"] },

{ l: "2.1", p: 1,
  q: "Explain the GLSL qualifiers attribute (in), uniform and varying (out/in). How often can each change?",
  ru: "Attribute/in: меняется раз на вершину. Uniform: постоянна для всего primitive, задаётся приложением, в шейдере только читается. Varying: из vertex в fragment, интерполируется rasterizer'ом.",
  a: `<p>Because of the execution model, variables can change once per vertex, once per primitive, once per fragment, or at any time in the application — so GLSL needs special qualifiers.</p>
<ul><li><b>Attribute (<code>in</code> in the vertex shader)</b> — changes at most <b>once per vertex</b>; user-defined per-vertex data from the application (e.g. <code>in vec4 vPosition; in float temperature;</code>).</li>
<li><b>Uniform</b> — <b>constant for an entire primitive</b>; set by the application (glUniform*) and sent to the shader; <b>cannot be changed in the shader</b>. Used for e.g. a transformation matrix, time, the bounding box of a primitive.</li>
<li><b>Varying</b> — passed from the vertex shader to the fragment shader and <b>automatically interpolated</b> by the rasterizer. Old style: <code>varying vec4 color;</code>; since GLSL 1.5: <code>out</code> in the vertex shader and <code>in</code> in the fragment shader.</li></ul>
<p>Also <code>const</code> as in C. GLSL 1.5 replaced attribute/varying with in/out without changes in the application.</p>`,
  k: ["in = per vertex", "uniform = per primitive, read-only in shader", "varying = vertex → fragment, interpolated", "out/in since 1.5"] },

{ l: "2.1", p: 0,
  q: "Describe the main features of GLSL (data types, functions, parameter passing, swizzling).",
  ru: "C-подобный язык: vec/mat типы, конструкторы как в C++, нет указателей и рекурсии, параметры in/out/inout (call by value-return), swizzling a.xw = b.yy.",
  a: `<ul><li>High-level <b>C-like language</b>, part of OpenGL 2.0+; similar to Nvidia's Cg and Microsoft's HLSL. Since 3.1 the application must provide shaders; code is sent as source and compiled at run time.</li>
<li><b>Types:</b> int, float, bool, uint, double; vectors <code>vec2/3/4</code> (also ivec, bvec, uvec, dvec); matrices <code>mat2/3/4</code> stored <b>by columns</b> (referenced m[row][column]); samplers. C++-style constructors: <code>vec3 a = vec3(1.0, 2.0, 3.0);</code></li>
<li><b>No pointers</b>; structs can be copied back from functions; matrices and vectors are basic types and can be passed in/out (<code>mat3 func(mat3 a)</code>).</li>
<li><b>User functions</b> cannot be recursive; parameters are passed by <b>value-return</b> with qualifiers <code>in</code>, <code>out</code>, <code>inout</code>.</li>
<li>Built-ins: trigonometric, arithmetic, <code>normalize</code>, <code>reflect</code>, <code>length</code>; overloaded operators for vectors and matrices.</li>
<li><b>Swizzling and selection:</b> components by [] or by names x,y,z,w / r,g,b,a / s,t,p,q — <code>a[2], a.b, a.z, a.p</code> are the same; <code>a.yz = vec2(1.0, 2.0); a.xw = b.yy;</code></li></ul>`,
  k: ["vec/mat types", "column-major", "no pointers, no recursion", "in/out/inout", "swizzling"] },

{ l: "2.1", p: 1,
  q: "Why does OpenGL render only triangles? What makes a polygon simple, convex and flat, and what are good and bad triangles?",
  ru: "OpenGL корректно рисует только simple, convex, flat полигоны, а треугольник всегда такой. Приложение делает triangulation; хорошие треугольники ≈ равносторонние (Delaunay).",
  a: `<p>A polygon can be rendered correctly only if it is:</p>
<ul><li><b>simple</b> — edges cannot cross;</li><li><b>convex</b> — all points on the line segment between any two points of the polygon are also in the polygon;</li><li><b>flat</b> — all vertices are in the same plane.</li></ul>
<p>Testing for simplicity and convexity is conceptually simple but <b>time consuming</b>. Older versions assumed both and left testing to the application; the present version <b>renders only triangles</b>, because a triangle is always simple, convex and flat. So the application must <b>tessellate (triangulate)</b> polygons (OpenGL 4.1 has a tessellator).</p>
<p>A convex polygon is easy: start with abc, remove b, then acd, … (a fan). Concave polygons need recursive division algorithms.</p>
<p><b>Good vs bad triangles:</b> long thin triangles render badly, equilateral ones render well → maximize the minimum angle; <b>Delaunay triangulation</b> does this for unstructured points.</p>`,
  k: ["simple, convex, flat", "testing is expensive", "triangles always valid", "triangulation", "maximize minimum angle / Delaunay"] },

{ l: "2.1", p: 0,
  q: "Explain smooth and flat shading of color and where a color can be set in an OpenGL program.",
  ru: "Smooth (по умолчанию): цвета вершин интерполируются. Flat: один цвет на polygon (цвет первой вершины). Цвет задают в приложении (attribute или uniform), в vertex shader (varying) или в fragment shader.",
  a: `<p><b>RGB color</b>: each component is stored separately in the frame buffer, usually 8 bits per component; values 0.0–1.0 as floats or 0–255 as unsigned bytes.</p>
<p><b>Smooth shading</b> (default) — OpenGL interpolates vertex colors across visible polygons. <b>Flat shading</b> — the color of the first vertex determines the fill color; handled in the shader.</p>
<p>Colors are ultimately set in the <b>fragment shader</b>, but can be determined:</p>
<ul><li>in the <b>application</b> — passed to the vertex shader as a <b>uniform</b> (changes rarely) or as a <b>vertex attribute</b> (per vertex);</li>
<li>in the <b>vertex shader</b> — passed to the fragment shader as a varying (out → in) variable;</li>
<li>in the <b>fragment shader</b> — altered by shader code.</li></ul>
<p>Other attributes: size and width of points/lines, stipple pattern, polygon mode (filled, edges, vertices); only a few (e.g. glPointSize) are OpenGL functions now.</p>`,
  k: ["smooth = interpolate vertex colors", "flat = first vertex color", "uniform vs attribute", "varying to fragment shader"] },

{ l: "2.1", p: 1,
  q: "How are the dot product and the cross product used in computer graphics?",
  ru: "Dot: длина, нормализация, угол (cos θ), ортогональность, проекция, освещение. Cross: вектор, перпендикулярный двум другим → нормаль к плоскости.",
  a: `<p><b>Dot product</b> u·v = u₁v₁ + … + uₙvₙ = |u||v| cos θ. Uses:</p>
<ul><li>length: |v| = √(v·v); Euclidean distance; <b>normalization</b> v/|v|;</li>
<li>angle between vectors: cos θ = u·v / (|u||v|); <b>orthogonality</b>: u·v = 0;</li>
<li>orthogonal projection of one vector on another;</li>
<li>lighting: diffuse term l·n, specular term v·r or n·h.</li></ul>
<p><b>Cross product</b> A × B = (a<sub>y</sub>b<sub>z</sub> − a<sub>z</sub>b<sub>y</sub>, a<sub>z</sub>b<sub>x</sub> − a<sub>x</sub>b<sub>z</sub>, a<sub>x</sub>b<sub>y</sub> − a<sub>y</sub>b<sub>x</sub>) gives a third vector <b>orthogonal to both</b> A and B (for non-parallel A, B). Used to find the <b>normal of a plane/polygon</b>: n = (p₂ − p₀) × (p₁ − p₀); the direction follows the right-hand rule.</p>
<p>Euclidean geometry adds the inner product to affine geometry, which by itself has no angles or distances.</p>`,
  k: ["|u||v|cos θ", "length, normalization", "orthogonal if u·v=0", "cross = perpendicular vector", "normals"] },

/* ---------------- L2.2 ---------------- */
{ l: "2.2", p: 1,
  q: "Describe the steps needed to link shaders with an application and connect application variables to shader variables.",
  ru: "Read → glCreateShader → glShaderSource → glCompileShader → glAttachShader → glLinkProgram → glUseProgram. Затем glGetAttribLocation + glVertexAttribPointer и glGetUniformLocation + glUniform.",
  a: `<ol><li><b>Read</b> the shader source (a file reader converts it into a null-terminated string).</li>
<li>Create a <b>program object</b> — a container for shaders: <code>glCreateProgram()</code>.</li>
<li>Create and compile each shader: <code>glCreateShader(GL_VERTEX_SHADER)</code>, <code>glShaderSource</code>, <code>glCompileShader</code>, then <code>glAttachShader(program, shader)</code>; same for the fragment shader.</li>
<li><b>Link</b> everything: <code>glLinkProgram</code>, then <code>glUseProgram</code>.</li>
<li><b>Link variables:</b> the linker forms a table of named variables.
  <ul><li>vertex attributes: <code>loc = glGetAttribLocation(program, "vPosition"); glEnableVertexAttribArray(loc); glVertexAttribPointer(loc, 4, GL_FLOAT, GL_FALSE, 0, BUFFER_OFFSET(0));</code></li>
  <li>uniforms: <code>loc = glGetUniformLocation(program, "angle"); glUniform1f(loc, my_angle);</code></li></ul></li></ol>`,
  k: ["program object", "create / source / compile / attach", "link / use", "glGetAttribLocation + glVertexAttribPointer", "glGetUniformLocation + glUniform"] },

{ l: "2.2", p: 1,
  q: "What is double buffering and why is it needed for animation? How do you animate with the idle callback?",
  ru: "Рисуем в back buffer, показываем front buffer, потом glutSwapBuffers — не видно наполовину нарисованного кадра. Idle callback меняет параметр и вызывает glutPostRedisplay.",
  a: `<p>Animation works by changing a value (e.g. a uniform angle) and redrawing. Problem: drawing into the frame buffer is decoupled from displaying it (dual-ported memory), so with one buffer the user can see a <b>partially redrawn</b> frame — flicker.</p>
<p><b>Double buffering</b> uses two color buffers:</p>
<ul><li><b>front buffer</b> — displayed but not written to;</li><li><b>back buffer</b> — written to but not displayed.</li></ul>
<p>We draw into the back buffer and <b>swap</b> the buffers when the frame is finished:</p>
<pre><code>glutInitDisplayMode(GLUT_RGB | GLUT_DOUBLE);
void mydisplay(){ glClear(...); glDrawArrays(...); glutSwapBuffers(); }</code></pre>
<p>The <b>idle callback</b> (<code>glutIdleFunc(myIdle)</code>) runs when no other events are pending: it changes something (<code>t += dt</code>, theta) and calls <code>glutPostRedisplay()</code> to force a redraw.</p>`,
  k: ["partially drawn frame", "front vs back buffer", "GLUT_DOUBLE", "glutSwapBuffers", "idle + glutPostRedisplay"] },

{ l: "2.2", p: 1,
  q: "Explain the Sierpinski gasket algorithm. Why is the gasket called a fractal?",
  ru: "Треугольник → соединить середины сторон → убрать центральный → рекурсия. Площадь → 0, периметр → ∞, дробная размерность.",
  a: `<p><b>Algorithm (2D):</b> start with a triangle; connect the midpoints (bisectors) of its sides and remove the central triangle; repeat for each of the three remaining triangles.</p>
<pre><code>void divide_triangle(a, b, c, m){
  if(m > 0){ ab=(a+b)/2; ac=(a+c)/2; bc=(b+c)/2;
    divide_triangle(a, ab, ac, m-1);
    divide_triangle(c, ac, bc, m-1);
    divide_triangle(b, bc, ac, m-1); }
  else triangle(a, b, c);   // store 3 vertices in points[]
}</code></pre>
<p>After n steps there are 3ⁿ triangles; they are put into an array, sent to the GPU and drawn with <code>glDrawArrays(GL_TRIANGLES, 0, NumVertices)</code>.</p>
<p><b>Fractal:</b> as we keep subdividing, the filled <b>area goes to zero</b> but the <b>perimeter goes to infinity</b>. It is neither a 2D nor a 1D object — it has a <b>fractional dimension</b>.</p>
<p><b>3D:</b> start with a tetrahedron and subdivide each of its four faces (or subdivide the volume into four smaller tetrahedra). In 3D the drawing order matters, so hidden-surface removal is needed.</p>`,
  k: ["midpoints", "remove middle triangle", "recursion", "area → 0, perimeter → ∞", "fractional dimension"] },

{ l: "2.2", p: 1,
  q: "Explain the z-buffer (depth buffer) algorithm. What must be done to use it in OpenGL?",
  ru: "Для каждого пикселя хранится глубина ближайшей точки; новый фрагмент записывается, только если он ближе. В OpenGL: GLUT_DEPTH, glEnable(GL_DEPTH_TEST), очистка GL_DEPTH_BUFFER_BIT.",
  a: `<p>In 3D, triangles are drawn in the order they are specified, so back triangles may cover front ones. We want to see only the surfaces in front — <b>hidden-surface removal</b>.</p>
<p>The <b>z-buffer algorithm</b> is a visible-surface detection algorithm implementable in hardware and software. It needs an extra data structure, the <b>z-buffer</b>, the same size as the frame buffer, that stores the depth of the closest point found so far for each pixel.</p>
<pre><code>initialize: F[x][y] = background; Z[x][y] = farthest depth
for each polygon
  for each pixel (x,y) in its projection
    pz = polygon depth at (x,y)
    if pz is closer than Z[x][y]:
       Z[x][y] = pz;  F[x][y] = polygon color at (x,y)</code></pre>
<p>Order of drawing no longer matters. In OpenGL the depth buffer must be:</p>
<ul><li><b>requested</b> in main: <code>glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB | GLUT_DEPTH)</code>;</li>
<li><b>enabled</b> in init: <code>glEnable(GL_DEPTH_TEST)</code>;</li>
<li><b>cleared</b> in display: <code>glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)</code>.</li></ul>`,
  k: ["depth per pixel", "replace only if closer", "order independent", "GLUT_DEPTH", "glEnable(GL_DEPTH_TEST)", "clear depth buffer"] },

{ l: "2.2", p: 0,
  q: "Give an example of a vertex shader that moves vertices (wave motion or particle system) and explain why this is done in the shader.",
  ru: "Wave: y += h·sin(time + xs·x) + h·sin(time + zs·z). Particle: x = x0 + v·t, y += g/(2m)·t². Приложение шлёт только uniform time, геометрию не пересылает.",
  a: `<p><b>Wave motion:</b> the application sends only uniforms (time, frequencies xs, zs, height h); the shader displaces each vertex:</p>
<pre><code>uniform float xs, zs, h, time;
in vec4 vPosition;
void main(){
  vec4 t = vPosition;
  t.y = vPosition.y + h*sin(time + xs*vPosition.x)
                    + h*sin(time + zs*vPosition.z);
  gl_Position = t; }</code></pre>
<p><b>Particle system:</b> <code>x = x₀ + vₓt, y = y₀ + v<sub>y</sub>t + g/(2m)·t², z = z₀ + v<sub>z</sub>t</code>, then <code>gl_Position = ModelViewProjectionMatrix * vec4(object_pos, 1)</code>.</p>
<p>Why in the shader: the geometry is sent to the GPU <b>once</b>; each frame only a uniform (time) changes, so there is no need to recompute and resend all vertices from the CPU, and the GPU processes vertices in parallel.</p>`,
  k: ["uniform time", "displace vertex in shader", "geometry sent once", "parallel on GPU"] },

/* ---------------- L3.1 ---------------- */
{ l: "3.1", p: 1,
  q: "Compare physical and logical input devices. List the six logical input devices defined by GKS/PHIGS.",
  ru: "Physical: что это за устройство (мышь, клавиатура). Logical: что получает программа через API. Шесть: locator, pick, keyboard, stroke, valuator, choice.",
  a: `<p>Input devices can be described by their <b>physical properties</b> (mouse, keyboard, trackball, light pen, data tablet, joystick, space ball) or by their <b>logical properties</b> — what is returned to the program through the API (a position, an object identifier, a scalar value…).</p>
<p>Example: <code>scanf("%d", &amp;x)</code> or <code>cin &gt;&gt; x</code> — we can't tell from the code whether the number came from a keyboard, a file or another program; the code provides <b>logical input</b>: an int is returned regardless of the physical device.</p>
<p>Graphical input is more varied. GKS and PHIGS defined <b>six logical devices</b>:</p>
<ul><li><b>Locator</b> — returns a position;</li><li><b>Pick</b> — returns the ID of an object;</li><li><b>Keyboard</b> — returns a string of characters;</li><li><b>Stroke</b> — returns an array of positions;</li><li><b>Valuator</b> — returns a floating-point number;</li><li><b>Choice</b> — returns one of n items.</li></ul>`,
  k: ["physical = device", "logical = what the program gets", "locator, pick, keyboard, stroke, valuator, choice"] },

{ l: "3.1", p: 0,
  q: "What is the difference between absolute and incremental (relative) input devices?",
  ru: "Data tablet даёт абсолютную позицию. Мышь, trackball, joystick дают приращения/скорости, которые надо интегрировать.",
  a: `<p>Devices such as the <b>data tablet</b> return a <b>position directly</b> to the operating system (absolute).</p>
<p>Devices such as the <b>mouse, trackball and joystick</b> return <b>incremental inputs (or velocities)</b> — rotation of the mouse cylinders, roll of the trackball. These must be <b>integrated</b> to obtain an absolute position. Consequences: it is difficult to obtain an absolute position, but we can get <b>variable sensitivity</b> (e.g. faster movement → larger cursor step).</p>`,
  k: ["tablet = absolute", "mouse/trackball/joystick = increments", "integrate", "variable sensitivity"] },

{ l: "3.1", p: 1,
  q: "Explain measure and trigger. Compare request mode and event mode.",
  ru: "Trigger — сигнал (кнопка, клавиша), measure — возвращаемые данные (позиция, ASCII). Request: ввод только по триггеру, программа ждёт. Event: каждое срабатывание кладёт событие в очередь.",
  a: `<p>Input devices contain a <b>trigger</b> used to send a signal to the OS (mouse button, pressing or releasing a key). When triggered, a device returns information — its <b>measure</b> (the mouse returns a position, the keyboard returns an ASCII code).</p>
<p><b>Request mode:</b> input is provided to the program <b>only when the user triggers</b> the device; the program waits. Typical of keyboard input: the user can edit with backspace until Enter (the trigger) is pressed.</p>
<p><b>Event mode:</b> most systems have several input devices, each of which can be triggered at an arbitrary time. Each trigger generates an <b>event</b> whose measure is put into an <b>event queue</b>, which the program examines. Event types: window (resize, expose, iconify), mouse (click), motion, keyboard (press/release), idle (non-event).</p>
<p>Event mode fits interactive graphics: the program reacts to whichever device the user uses, via <b>callbacks</b>.</p>`,
  k: ["trigger", "measure", "request = wait for trigger", "event queue", "multiple devices"] },

{ l: "3.1", p: 1,
  q: "How does event-driven programming work in GLUT? List the main callbacks.",
  ru: "Для каждого типа события регистрируется callback. glutMainLoop в цикле смотрит очередь и вызывает нужный callback; без callback событие игнорируется.",
  a: `<p>The programming interface for event-driven input: define a <b>callback function</b> for each type of event the graphics system recognizes; the user-supplied function is executed when the event occurs, e.g. <code>glutMouseFunc(mymouse)</code>.</p>
<p>GLUT callbacks (a subset of the events of Windows, X, Macintosh): <code>glutDisplayFunc</code>, <code>glutMouseFunc</code>, <code>glutReshapeFunc</code>, <code>glutKeyboardFunc</code>, <code>glutIdleFunc</code>, <code>glutMotionFunc</code>, <code>glutPassiveMotionFunc</code>; also <code>glutSpecialFunc</code>, <code>glutEntryFunc</code>, <code>glutTimerFunc</code>.</p>
<p><b>Event loop:</b> the last line of main is <code>glutMainLoop()</code>, an infinite loop. In each pass GLUT looks at the events in the queue and executes the matching callback if one is defined; events without a callback are ignored.</p>
<p>Callbacks have a <b>fixed interface</b> (e.g. <code>void mymouse(int button, int state, int x, int y)</code>), so information is passed to them through <b>global variables</b>. Callbacks can be redefined or undefined (<code>glutReshapeFunc(NULL)</code>) during execution.</p>`,
  k: ["callback per event type", "glutMainLoop", "queue → callback", "fixed signatures → globals"] },

{ l: "3.1", p: 1,
  q: "When is the display callback executed? Why should we use glutPostRedisplay() instead of calling the display function directly?",
  ru: "Display вызывается при открытии, изменении размера, раскрытии окна и по запросу программы. glutPostRedisplay ставит флаг, и перерисовка происходит один раз в конце прохода цикла.",
  a: `<p>The display callback is executed whenever GLUT decides the window should be refreshed: when the window is <b>first opened</b>, <b>reshaped</b>, <b>exposed</b>, or when the user program wants to change the display. Every GLUT program must have one.</p>
<p>Many events may invoke the display callback, which can lead to <b>multiple executions</b> on a single pass through the event loop. <code>glutPostRedisplay()</code> only <b>sets a flag</b>; at the end of the event loop GLUT checks the flag and, if set, executes the display callback <b>once</b>. So we call glutPostRedisplay at the end of every callback that changes the display (mouse, keyboard, menu, idle).</p>`,
  k: ["opened, reshaped, exposed, program request", "sets a flag", "redisplay once per loop", "avoid multiple redraws"] },

{ l: "3.1", p: 0,
  q: "Why must the y coordinate returned by the mouse callback be inverted? How is it done?",
  ru: "Окно меряет позицию от верхнего левого угла (обновление сверху вниз), OpenGL — от нижнего левого. y = h − y, h берут из reshape callback.",
  a: `<p>The mouse callback <code>mymouse(button, state, x, y)</code> returns the position in the screen window in pixels with the origin at the <b>top-left</b> corner — a consequence of refreshing the screen from top to bottom.</p>
<p>OpenGL uses a world coordinate system with the origin at the <b>bottom-left</b>. So we invert: <code>y = h − y;</code> where h is the window height.</p>
<p>The height can change while the program runs, so we track it in a global variable updated in the <b>reshape callback</b>, or use query functions (<code>glGetIntegerv</code>, <code>glGetFloatv</code>).</p>`,
  k: ["window origin top-left", "OpenGL origin bottom-left", "y = h − y", "height from reshape"] },

{ l: "3.1", p: 1,
  q: "What happens when the window is reshaped? Describe the reshape callback.",
  ru: "Нужно перерисовать: показать часть мира или весь мир, подогнав под окно (можно исказить aspect ratio). myreshape(w,h) получает новый размер, обычно вызывает glViewport, redisplay ставится автоматически.",
  a: `<p>When the user resizes the window by pulling its corner, the application must redraw. Two possibilities: <b>display part of the world</b>, or <b>display the whole world but force it to fit</b> the new window — which can alter the <b>aspect ratio</b> (distort the image).</p>
<p><code>glutReshapeFunc(myreshape); void myreshape(int w, int h)</code> — receives the new width and height in pixels. A redisplay is <b>posted automatically</b> at the end of the callback. GLUT has a default reshape callback, but usually we define our own.</p>
<p>It is a good place for viewing functions because it is also invoked when the window is <b>first opened</b>:</p>
<pre><code>void myReshape(int w, int h){
  glViewport(0, 0, w, h);   // viewport = whole window
  // update projection (e.g. aspect = w/h)
}</code></pre>`,
  k: ["part of world vs fit whole world", "aspect ratio", "new w, h", "glViewport", "redisplay posted automatically"] },

{ l: "3.1", p: 0,
  q: "How are menus created in GLUT? Also explain timers and multiple windows.",
  ru: "Меню: glutCreateMenu(cb) → glutAddMenuEntry → glutAttachMenu(кнопка), подменю glutAddSubMenu. Timer: glutTimerFunc(ms, f, value), одноразовый. У каждого окна свой context.",
  a: `<p><b>Menus</b> (pop-up, GLUT's main widget) — three steps: define entries, define the action for each entry, attach the menu to a mouse button.</p>
<pre><code>menu_id = glutCreateMenu(mymenu);
glutAddMenuEntry("clear Screen", 1);
glutAddMenuEntry("exit", 2);
glutAttachMenu(GLUT_RIGHT_BUTTON);
void mymenu(int id){ if(id==1) /*clear*/; if(id==2) exit(0); }</code></pre>
<p>Submenus: <code>glutAddSubMenu(name, submenu_id)</code>.</p>
<p><b>Timers:</b> <code>glutTimerFunc(ms, func, value)</code> calls func once after ms milliseconds; to repeat, re-register the timer inside the callback.</p>
<p><b>Multiple windows / subwindows:</b> <code>glutCreateWindow</code>, <code>glutCreateSubWindow</code>, <code>glutSetWindow</code>, <code>glutPostWindowRedisplay</code>. Each window has its own graphics context, so it needs its own VAO, buffers, shader programs and display callback; OpenGL renders to the <b>current</b> window.</p>
<p>Widgets (menus, slidebars, dials, input boxes) usually come from platform-dependent toolkits; GLUT provides only a few.</p>`,
  k: ["glutCreateMenu", "glutAddMenuEntry", "glutAttachMenu", "glutTimerFunc one-shot", "own context per window"] },

{ l: "3.1", p: 0,
  q: "Describe the basic interactive paradigm established by Sutherland's Sketchpad.",
  ru: "Пользователь видит объект → указывает на него устройством (pick) → объект меняется → повтор.",
  a: `<p>Ivan Sutherland (MIT, 1963), <b>Project Sketchpad</b>, established the paradigm of interactive computer graphics:</p>
<ol><li>the user sees an object on the display;</li><li>the user points to (<b>picks</b>) the object with an input device (light pen, mouse, trackball);</li><li>the object changes (moves, rotates, morphs);</li><li>repeat.</li></ol>
<p>This closed loop between display and input is what modern event-driven graphics programs implement with callbacks.</p>`,
  k: ["see", "pick", "object changes", "repeat", "1963"] },

/* ---------------- L3.2 ---------------- */
{ l: "3.2", p: 1,
  q: "Define scalars, vectors and points. Which operations between them are allowed? What is an affine space?",
  ru: "Scalar — число, vector — направление + длина без положения, point — положение. P − Q = вектор, P + v = точка, точки складывать нельзя. Affine space = точки + векторное пространство.",
  a: `<ul><li><b>Scalars</b> — members of sets combined by addition and multiplication obeying axioms (associativity, commutativity, inverses), e.g. real numbers. No geometric properties.</li>
<li><b>Vectors</b> — quantities with <b>direction and magnitude</b> (force, velocity, directed line segments). Every vector has an inverse, can be multiplied by a scalar, there is a zero vector, and vectors add head-to-tail. Vectors <b>lack position</b>: two vectors with the same direction and length are identical.</li>
<li><b>Points</b> — locations in space.</li></ul>
<p>Allowed operations: vector + vector → vector; scalar · vector → vector; <b>point − point → vector</b> (v = P − Q); <b>point + vector → point</b> (P = Q + v). Points cannot be added.</p>
<p>A <b>linear vector space</b> has only scalar–vector multiplication and vector–vector addition — not enough for geometry (no positions). An <b>affine space</b> = points + a vector space, with point–vector addition; by definition 1·P = P and 0·P = 0 (zero vector).</p>`,
  k: ["vector = direction + magnitude", "vectors lack position", "P − Q = vector", "P + v = point", "affine space"] },

{ l: "3.2", p: 1,
  q: "Describe the parametric form of a line. How do we get rays and line segments? Compare it with explicit and implicit forms.",
  ru: "P(α) = P0 + αd. α ≥ 0 — луч, 0 ≤ α ≤ 1 — отрезок между Q и R. Параметрическая форма устойчивее и обобщается на кривые и поверхности.",
  a: `<p>All points of the form <code>P(α) = P₀ + αd</code> form the line through P₀ in the direction of vector d — the <b>parametric form</b>.</p>
<ul><li><b>Ray:</b> α ≥ 0 — leaves P₀ in direction d.</li>
<li><b>Line segment:</b> with two points, <code>P(α) = Q + α(R − Q) = αR + (1 − α)Q</code>; for 0 ≤ α ≤ 1 we get all points on the segment joining Q and R.</li></ul>
<p>2D forms: explicit <code>y = mx + h</code> (fails for vertical lines), implicit <code>ax + by + c = 0</code>, parametric <code>x(α) = αx₀ + (1−α)x₁, y(α) = αy₀ + (1−α)y₁</code>.</p>
<p>The parametric form is <b>more robust and general</b> and extends to <b>curves</b> (P(α) nonlinear) and <b>surfaces</b> (two parameters P(α, β)).</p>`,
  k: ["P(α) = P0 + αd", "ray α ≥ 0", "segment 0 ≤ α ≤ 1", "robust, extends to curves/surfaces"] },

{ l: "3.2", p: 0,
  q: "Define convexity, affine sums and the convex hull.",
  ru: "Convex: отрезок между любыми двумя точками внутри объекта. Affine sum: Σαi Pi при Σαi = 1. Если ещё αi ≥ 0 — convex hull, «обтягивание» точек.",
  a: `<p>An object is <b>convex</b> iff for any two points in the object, all points on the line segment between them are also in the object.</p>
<p>The "sum" <code>P = α₁P₁ + α₂P₂ + … + αₙPₙ</code> makes sense if <code>α₁ + α₂ + … + αₙ = 1</code> — the <b>affine sum</b> of the points.</p>
<p>If, in addition, all <code>αᵢ ≥ 0</code>, we get the <b>convex hull</b> of P₁…Pₙ: the smallest convex object containing all the points, formed by "shrink wrapping" them.</p>`,
  k: ["segment inside", "Σα = 1", "αi ≥ 0", "smallest convex set / shrink wrap"] },

{ l: "3.2", p: 1,
  q: "How is a plane defined? How do we find its normal? Explain barycentric coordinates.",
  ru: "Плоскость: точка + два вектора или три точки, P(α,β) = R + αu + βv. Нормаль n = u × v, уравнение (P − P0)·n = 0. Barycentric: P = α1P + α2Q + α3R, Σα = 1, α ≥ 0.",
  a: `<p>A <b>plane</b> is defined by a point and two vectors or by three points:</p>
<p><code>P(α, β) = R + α(Q − R) + β(P − R) = R + αu + βv</code></p>
<p>Every plane has a <b>normal</b> vector n perpendicular to it. From the point–two-vector form, <code>n = u × v</code>, and the equivalent form of the plane is <code>(P(α, β) − P₀) · n = 0</code>.</p>
<p><b>Triangle:</b> for 0 ≤ α, β ≤ 1 with a convex sum we get all points of the triangle. Since a triangle is convex, any point inside can be written as an affine sum</p>
<p><code>P(α₁, α₂, α₃) = α₁P + α₂Q + α₃R,  α₁ + α₂ + α₃ = 1,  αᵢ ≥ 0</code></p>
<p>— the <b>barycentric coordinates</b> of the point. (Used e.g. for interpolating vertex attributes across a triangle.)</p>`,
  k: ["R + αu + βv", "n = u × v", "(P − P0)·n = 0", "barycentric: Σα = 1, α ≥ 0"] },

{ l: "3.2", p: 0,
  q: "Explain linear independence, dimension, basis and the representation of a vector. Why is a coordinate system not enough to represent points?",
  ru: "Базис = n линейно независимых векторов, коэффициенты α — representation. Coordinate system задаёт только векторы; для точек нужен frame = origin + базис.",
  a: `<p>Vectors v₁…vₙ are <b>linearly independent</b> if α₁v₁ + … + αₙvₙ = 0 only when all αᵢ = 0 (none can be written via the others).</p>
<p>The maximum number of linearly independent vectors is the <b>dimension</b> of the space. In an n-dimensional space any n linearly independent vectors form a <b>basis</b>, and every vector can be written uniquely as v = α₁v₁ + … + αₙvₙ. The list of scalars a = [α₁ … αₙ]ᵀ is the <b>representation</b> of v with respect to that basis (example: v = 2v₁ + 3v₂ − 4v₃ → a = [2, 3, −4]ᵀ).</p>
<p>A <b>coordinate system</b> (basis) is insufficient for points: vectors have no fixed location, so a basis cannot say <i>where</i> a point is. In an affine space we add a single point, the <b>origin</b> P₀, to the basis vectors to form a <b>frame</b> (P₀, v₁, v₂, v₃): vectors v = Σαᵢvᵢ, points P = P₀ + Σβᵢvᵢ.</p>`,
  k: ["linear independence", "dimension", "basis", "representation", "frame = origin + basis"] },

{ l: "3.2", p: 1,
  q: "What are homogeneous coordinates and why are they key to computer graphics?",
  ru: "4-мерная запись: вектор [a1 a2 a3 0], точка [b1 b2 b3 1]. Общая форма [wx wy wz w], возврат делением на w. Все T, R, S — матрицы 4×4, нужна perspective division.",
  a: `<p>In a frame, a point and a vector have similar 3-component representations, which <b>confuses points with vectors</b>. Defining 0·P = 0 and 1·P = P we can write both with a 4th component:</p>
<p><code>v = [α₁ α₂ α₃ 0] [v₁ v₂ v₃ P₀]ᵀ,  P = [β₁ β₂ β₃ 1] [v₁ v₂ v₃ P₀]ᵀ</code></p>
<p>So a vector is <code>[α₁ α₂ α₃ 0]ᵀ</code> and a point is <code>[β₁ β₂ β₃ 1]ᵀ</code> — the <b>homogeneous coordinate</b> representation. In general a 3D point [x y z] is written <code>[wx wy wz w]ᵀ</code>; we return to 3D (w ≠ 0) by x ← x′/w, y ← y′/w, z ← z′/w. If w = 0 it is a vector. A 3D point corresponds to a line through the origin in 4D.</p>
<p><b>Why they matter:</b></p>
<ul><li>all standard transformations — rotation, <b>translation</b>, scaling — become <b>4×4 matrix multiplications</b> and can be concatenated;</li>
<li>the hardware pipeline works with 4-dimensional representations;</li>
<li>for orthographic viewing w = 0 for vectors and w = 1 for points is kept; <b>perspective</b> needs a perspective division by w.</li></ul>`,
  k: ["w = 0 vector, w = 1 point", "[wx wy wz w], divide by w", "4×4 matrices incl. translation", "concatenation", "perspective division"] },

{ l: "3.2", p: 0,
  q: "Explain change of basis and change of frame. How are the world and camera frames related in OpenGL?",
  ru: "Новые базисные векторы выражаются через старые → матрица M, a = Mᵀb. Для frames — 4×4 матрица (affine transformation). World → camera через model-view matrix, изначально M = I.",
  a: `<p><b>Change of basis:</b> the same vector has representations a and b in two bases {v} and {u}. Each uᵢ can be written in terms of the first basis: uᵢ = γᵢ₁v₁ + γᵢ₂v₂ + γᵢ₃v₃. The coefficients form a 3×3 matrix M and <code>a = Mᵀb</code>.</p>
<p><b>Change of frame:</b> for frames (P₀, v₁, v₂, v₃) and (Q₀, u₁, u₂, u₃) we also express the origin: Q₀ = γ₄₁v₁ + γ₄₂v₂ + γ₄₃v₃ + P₀. This defines a <b>4×4 matrix</b> M; in homogeneous coordinates <code>a = Mᵀb</code> for both points and vectors. M specifies an <b>affine transformation</b>.</p>
<p><b>OpenGL:</b> we start in the <b>world frame</b>; eventually entities are represented in the <b>camera frame</b> by changing the representation with the <b>model-view matrix</b>. Initially the frames are the same (M = I). If objects are on both sides of z = 0, we must move the camera frame — e.g. translate by −d along z (d &gt; 0).</p>`,
  k: ["a = Mᵀb", "4×4 for frames", "affine transformation", "world → camera via model-view", "initially identity"] },

/* ---------------- L4.1 ---------------- */
{ l: "4.1", p: 1,
  q: "What is an affine transformation? Why is it important in the graphics pipeline?",
  ru: "Сохраняет прямые линии: rotation, translation (rigid body), scaling, shear. Достаточно преобразовать концы отрезков, остальное нарисует rasterizer.",
  a: `<p>A transformation maps points to points and/or vectors to vectors: Q = T(P), v = T(u).</p>
<p>An <b>affine transformation</b> is <b>line preserving</b>. Many physically important transformations are affine: <b>rigid body</b> transformations (rotation, translation), <b>scaling</b>, <b>shear</b>.</p>
<p>Importance: we only need to transform the <b>endpoints (vertices)</b> of line segments and let the implementation (rasterizer) draw the segment between the transformed endpoints. In the pipeline: vertices → transformation T (from the application) → rasterizer → pixels in the frame buffer. In homogeneous coordinates every affine transformation is a 4×4 matrix, so many can be concatenated into one.</p>`,
  k: ["line preserving", "rigid body + scaling + shear", "transform only vertices", "4×4 matrices"] },

{ l: "4.1", p: 1,
  q: "Write the homogeneous matrices for translation, rotation about the z axis and scaling, and give their inverses.",
  ru: "T(dx,dy,dz): последний столбец dx,dy,dz. Rz(θ): cos −sin / sin cos в левом верхнем блоке. S: sx,sy,sz на диагонали. T⁻¹ = T(−d), R⁻¹ = R(−θ) = Rᵀ, S⁻¹ = S(1/s).",
  a: `<p><b>Translation</b> by d = [dx dy dz 0]ᵀ: p′ = p + d, i.e. x′ = x + dx … In matrix form p′ = Tp:</p>
<div class="mx-row"><span class="mx" data-m="1 0 0 dx;0 1 0 dy;0 0 1 dz;0 0 0 1"></span></div>
<p><b>Rotation about z</b> by θ (z unchanged; 2D rotation in planes of constant z): x′ = x cos θ − y sin θ, y′ = x sin θ + y cos θ, z′ = z</p>
<div class="mx-row"><span class="mx" data-m="cosθ −sinθ 0 0;sinθ cosθ 0 0;0 0 1 0;0 0 0 1"></span></div>
<p>For rotation about x, x is unchanged; about y, y is unchanged.</p>
<p><b>Scaling</b> (fixed point at the origin): x′ = sₓx, y′ = s<sub>y</sub>y, z′ = s<sub>z</sub>z; negative factors give <b>reflection</b>.</p>
<div class="mx-row"><span class="mx" data-m="sx 0 0 0;0 sy 0 0;0 0 sz 0;0 0 0 1"></span></div>
<p><b>Inverses</b> (from geometry, no general formula needed): T⁻¹(dx, dy, dz) = T(−dx, −dy, −dz); R⁻¹(θ) = R(−θ) = <b>Rᵀ(θ)</b> (since cos(−θ) = cos θ, sin(−θ) = −sin θ); S⁻¹(sx, sy, sz) = S(1/sx, 1/sy, 1/sz).</p>`,
  k: ["translation in last column", "Rz with cos/sin", "S on diagonal", "R⁻¹ = Rᵀ", "T⁻¹ = T(−d)", "S⁻¹ = S(1/s)"] },

{ l: "4.1", p: 1,
  q: "Explain the order of transformations. Why is matrix multiplication order important? Show how to rotate about a fixed point.",
  ru: "p′ = ABCp: первой применяется правая матрица (C). Умножение не коммутативно. Поворот вокруг pf: M = T(pf) R(θ) T(−pf).",
  a: `<p>We can build any affine transformation by multiplying rotation, translation and scaling matrices: <b>concatenation</b>. Forming M = ABCD once is cheap compared with computing Mp for many vertices.</p>
<p><b>Order:</b> <code>p′ = ABCp = A(B(Cp))</code> — the matrix on the <b>right is applied first</b> (pre-multiplication with column vectors). With row vectors the same is p′ᵀ = pᵀCᵀBᵀAᵀ.</p>
<p>Matrix multiplication is <b>not commutative</b>: in general M₁M₂ ≠ M₂M₁ (e.g. a rotation then a reflection ≠ a reflection then a rotation; rotations about different axes do not commute).</p>
<p><b>Rotation about a fixed point p<sub>f</sub></b> (not the origin):</p>
<ol><li>move the fixed point to the origin: T(−p<sub>f</sub>);</li><li>rotate: R(θ);</li><li>move the fixed point back: T(p<sub>f</sub>).</li></ol>
<p><code>M = T(p_f) · R(θ) · T(−p_f)</code>. In code (mat.h): <code>m = Translate(1,2,3) * Rotate(30, 0,0,1) * Translate(-1,-2,-3);</code> — the <b>last matrix specified is the first applied</b>.</p>`,
  k: ["right-most applied first", "not commutative", "T(pf) R T(−pf)", "last specified = first applied"] },

{ l: "4.1", p: 0,
  q: "What is an instance transformation? In what order are its components applied?",
  ru: "Простой объект в начале координат стандартного размера → scale, orient (rotate), locate (translate): M = T R S, сначала S.",
  a: `<p>In modeling we often start with a simple object (a <b>symbol</b>) centered at the origin, oriented with the axes, at a standard size. To place a copy (<b>instance</b>) in the scene we apply an <b>instance transformation</b> to its vertices:</p>
<ol><li><b>Scale</b> — set the size;</li><li><b>Orient</b> — rotate;</li><li><b>Locate</b> — translate to the position.</li></ol>
<p><code>M_instance = T · R · S</code> — written in this order so that S is applied first (rightmost), then R, then T. Scaling and rotating are done while the object is still at the origin, so they don't move it.</p>`,
  k: ["standard object at origin", "scale → orient → locate", "M = T R S"] },

{ l: "4.1", p: 0,
  q: "Describe shear and reflection transformations.",
  ru: "Shear вдоль x: x′ = x + y·cot θ, y и z не меняются — как тянуть грани в разные стороны. Reflection = отрицательный коэффициент масштаба.",
  a: `<p><b>Shear</b> — equivalent to pulling the faces of an object in opposite directions. Simple shear along x:</p>
<p><code>x′ = x + y cot θ,  y′ = y,  z′ = z</code></p>
<div class="mx-row"><span class="mx" data-m="1 cotθ 0 0;0 1 0 0;0 0 1 0;0 0 0 1"></span></div>
<p>Shear is used, for example, to build <b>oblique projections</b> (shear + orthographic projection).</p>
<p><b>Reflection</b> corresponds to <b>negative scale factors</b>: sₓ = −1, s<sub>y</sub> = 1 reflects about the y axis; sₓ = 1, s<sub>y</sub> = −1 about the x axis; both −1 — through the origin.</p>`,
  k: ["x′ = x + y cot θ", "pull faces", "used for oblique projection", "reflection = negative scale"] },

{ l: "4.1", p: 0,
  q: "What is the Current Transformation Matrix (CTM)? How are transformation matrices sent to shaders in modern OpenGL?",
  ru: "CTM — 4×4 матрица в состоянии, применяемая ко всем вершинам (model-view × projection). Сейчас её строят в приложении (mat.h) и шлют uniform'ом, транспонируя (GLSL column-major).",
  a: `<p>In pre-3.1 OpenGL matrices were part of the state (GL_MODELVIEW, GL_PROJECTION, GL_TEXTURE, GL_COLOR, selected with glMatrixMode). Conceptually there was one 4×4 <b>current transformation matrix (CTM)</b> applied to all vertices passing down the pipeline: p′ = Cp. The model-view and projection matrices were concatenated to form it. Operations post-multiply: C ← CT, C ← CR…, so the <b>last operation specified is the first executed</b>.</p>
<p>Now this is emulated in the application with <code>vec.h</code>/<code>mat.h</code> (RotateX/Y/Z, Translate, Scale, Ortho, Frustum, Perspective, LookAt) and a simple stack class replaces the old matrix stacks.</p>
<p>The matrix is sent as a <b>uniform</b>: <code>glUniformMatrix4fv(loc, 1, GL_TRUE, model_view);</code> — GL_TRUE <b>transposes</b> it, because GLSL matrices are <b>column-major</b> while mat.h is row-major. Then in the vertex shader: <code>gl_Position = xform * vPosition;</code>. Sending a matrix (or just an angle) is more efficient than transforming data in the application and resending it.</p>`,
  k: ["CTM applied to all vertices", "model-view × projection", "post-multiplication", "uniform mat4", "transpose: column-major"] },

{ l: "4.1", p: 1,
  q: "What problems do Euler angles have? How do quaternions solve them?",
  ru: "Euler: R = Rz Ry Rx, углы не независимы, трудно интерполировать, gimbal lock (потеря степени свободы). Quaternion q = q0 + q1i + q2j + q3k; поворот p′ = r p r⁻¹, slerp для плавной интерполяции.",
  a: `<p>A rotation about an arbitrary axis can be decomposed into rotations about x, y, z: <code>R(θ) = Rz(θz) Ry(θy) Rx(θx)</code>; θx, θy, θz are the <b>Euler angles</b>. Problems:</p>
<ul><li>hard to <b>interpolate keyframes</b> smoothly; finding Euler angles for every Rᵢ is not efficient;</li>
<li>the angles <b>aren't independent</b> (rotations don't commute);</li>
<li><b>gimbal lock</b> — loss of a degree of freedom when two axes align.</li></ul>
<p><b>Quaternions</b> extend complex numbers to 3D: <code>q = q₀ + q₁i + q₂j + q₃k</code> (one real and three imaginary parts). A rotation by θ about unit axis n is <code>r = (cos θ/2, sin θ/2 · n)</code>; a point is p = (0, x), and the rotated point is <code>p′ = r p r⁻¹</code>.</p>
<p>Process: model-view matrix → quaternion → operations on quaternions → back to a matrix. They express rotations on a sphere smoothly, efficiently and stably. <b>slerp</b> (spherical linear interpolation) takes equal steps on the sphere between quaternions A and B; for several keyframes Shoemake suggested Bézier curves on the sphere (De Casteljau with slerp).</p>
<p>Alternative: find the axis and angle between the final positions and increment only the angle (virtual trackball).</p>`,
  k: ["Euler angles", "gimbal lock", "interpolation problem", "q = q0 + q1i + q2j + q3k", "p′ = r p r⁻¹", "slerp"] },

{ l: "4.1", p: 0,
  q: "How is rotation about an arbitrary axis computed?",
  ru: "Матрица с c = cos θ, s = sin θ, t = 1 − c или формула Родрига; либо разложить на повороты вокруг осей (Euler).",
  a: `<p>Rotate point P around a unit axis n = (x, y, z) by angle θ, with c = cos θ, s = sin θ, t = 1 − c:</p>
<div class="mx-row"><span class="mx" data-m="tx²+c txy−sz txz+sy 0;txy+sz ty²+c tyz−sx 0;txz−sy tyz+sx tz²+c 0;0 0 0 1"></span></div>
<p>Equivalently, the <b>Rodrigues formula</b>: <code>P_rot = P cos θ + (n × P) sin θ + n (n · P)(1 − cos θ)</code>.</p>
<p>Alternatively, decompose into rotations about the coordinate axes (Euler angles) or use quaternions. For a fixed point not at the origin, combine with translations: T(p<sub>f</sub>) R T(−p<sub>f</sub>).</p>`,
  k: ["c, s, t = 1 − c", "Rodrigues formula", "Euler decomposition"] },

/* ---------------- L4.2 ---------------- */
{ l: "4.2", p: 1,
  q: "Explain geometry vs topology in mesh representation. Compare the simple representation, vertex lists and edge lists.",
  ru: "Geometry = координаты вершин, topology = как они соединены. Простой способ дублирует координаты; vertex list: массив вершин + полигоны из индексов; edge list: общие рёбра рисуются один раз.",
  a: `<p>Good data structures <b>separate geometry from topology</b>:</p>
<ul><li><b>Geometry</b> — locations of the vertices;</li><li><b>Topology</b> — organization of vertices and edges (e.g. a polygon is an ordered list of vertices with edges between successive pairs and from the last to the first). Topology holds even if geometry changes.</li></ul>
<p><b>Simple representation:</b> each polygon stores the coordinates of its vertices (<code>vertex[i] = vec3(x1,y1,z1)…</code>). Inefficient and unstructured: to move a vertex we must search for all its occurrences.</p>
<p><b>Vertex list:</b> geometry is stored once in a vertex array; polygons are lists of pointers/indices into it. Moving a vertex changes one entry. But when polygons are drawn by edges, <b>shared edges are drawn twice</b>.</p>
<p><b>Edge list:</b> each edge stores two vertex indices, so shared edges are stored and drawn once; but polygons are not represented explicitly.</p>
<p>Example mesh: 8 nodes, 12 edges, 5 interior polygons, 6 interior (shared) edges.</p>`,
  k: ["geometry = positions", "topology = connectivity", "vertex list = indices into array", "shared edges drawn twice", "edge list"] },

{ l: "4.2", p: 1,
  q: "Explain inward- and outward-facing polygons and the right-hand rule. Compare right- and left-handed coordinate systems.",
  ru: "Порядок вершин против часовой стрелки при взгляде снаружи = outward face (нормаль наружу). {v1,v6,v7} = {v6,v7,v1} ≠ {v1,v7,v6}. Right-handed: положительный поворот CCW; left-handed: z «в экран».",
  a: `<p>The orders {v₁, v₆, v₇} and {v₆, v₇, v₁} are equivalent (same polygon, cyclic shift), but {v₁, v₇, v₆} is different — it faces the other way.</p>
<p><b>Right-hand rule:</b> vertices listed <b>counter-clockwise</b> when seen from outside encircle an <b>outward-pointing normal</b> — an outward-facing polygon. OpenGL can treat inward and outward faces differently (e.g. not render back faces). In the color cube, <code>quad(1,0,3,2)</code> etc. are ordered to get outward normals.</p>
<p><b>Right-handed system:</b> looking down at the origin, positive rotation is CCW. <b>Left-handed:</b> positive rotation is CW; more natural for displays because big z means "far" (into the screen). Z represents depth.</p>`,
  k: ["vertex order matters", "CCW = outward normal", "right-hand rule", "back faces", "left-handed: z into screen"] },

{ l: "4.2", p: 0,
  q: "How is the rotating color cube program built?",
  ru: "8 вершин + 8 цветов; quad(a,b,c,d) даёт 2 треугольника на грань; 6 граней → 12 треугольников, 36 вершин. Один буфер позиций+цветов, idle меняет theta, mouse выбирает ось, шейдер вращает.",
  a: `<ul><li><b>Model:</b> 8 vertices of a unit cube centered at the origin with sides aligned with the axes (<code>point4 vertices[8]</code>), and 8 RGBA vertex colors (black, red, yellow, green, blue, magenta, white, cyan).</li>
<li><code>quad(a,b,c,d)</code> generates <b>two triangles</b> per face (a,b,c and a,c,d) and copies positions and colors into arrays; <code>colorcube()</code> calls quad for 6 faces → 12 triangles, <b>36 vertices and 36 colors</b>. Vertices are ordered for outward normals.</li>
<li><b>init:</b> create VAO; create one buffer of size sizeof(points)+sizeof(colors) with <code>glBufferData(..., NULL, GL_STATIC_DRAW)</code> and fill with two <code>glBufferSubData</code> calls; load shaders with InitShader; connect vPosition and vColor (offset sizeof(points)); get the location of uniform <code>theta</code>.</li>
<li><b>display:</b> clear color + depth buffers, <code>glUniform3fv(thetaLoc, 1, theta)</code>, <code>glDrawArrays(GL_TRIANGLES, 0, NumVertices)</code>, <code>glutSwapBuffers()</code>.</li>
<li><b>mouse:</b> left/middle/right button selects the x/y/z axis. <b>idle:</b> increments theta[axis] (wrapping at 360) and calls glutPostRedisplay.</li>
<li><b>vertex shader:</b> builds/uses the rotation matrix: <code>gl_Position = rot * vPosition;</code> Depth test and double buffering are enabled.</li></ul>`,
  k: ["8 vertices", "quad → 2 triangles", "36 vertices", "glBufferSubData for positions + colors", "idle increments theta", "rotation in shader"] },

{ l: "4.2", p: 1,
  q: "Describe the taxonomy of planar geometric projections.",
  ru: "Parallel: multiview orthographic, axonometric (isometric, dimetric, trimetric), oblique. Perspective: 1-, 2-, 3-point.",
  a: `<p>Classical viewing needs three elements: objects, a viewer with a projection surface, and <b>projectors</b> from the object to the surface. <b>Planar geometric projections</b> project onto a plane; projectors either <b>converge</b> at a center of projection or are <b>parallel</b>. They preserve lines but not necessarily angles (nonplanar projections are needed e.g. for maps).</p>
<ul><li><b>Parallel</b>
  <ul><li><b>Orthographic</b> (projectors orthogonal to the projection plane): <b>multiview orthographic</b> and <b>axonometric</b> — <b>isometric</b>, <b>dimetric</b>, <b>trimetric</b>;</li>
  <li><b>Oblique</b> (arbitrary angle between projectors and plane).</li></ul></li>
<li><b>Perspective</b>: <b>one-point</b>, <b>two-point</b>, <b>three-point</b>.</li></ul>
<p>Computer graphics treats all projections the same and implements them with a single pipeline; classical drawing developed a separate technique for each. Parallel viewing is mathematically the limit of perspective viewing.</p>`,
  k: ["parallel vs perspective", "multiview / axonometric / oblique", "isometric, dimetric, trimetric", "1-, 2-, 3-point"] },

{ l: "4.2", p: 1,
  q: "Compare multiview orthographic, axonometric and oblique projections: their advantages and disadvantages.",
  ru: "Multiview: сохраняет расстояния и углы, но не видно объект целиком. Axonometric: видно 3 грани, линии укорачиваются, углы не сохраняются. Oblique: грань параллельная плоскости сохраняет углы, но видно «сбоку».",
  a: `<p><b>Multiview orthographic</b> — the projection plane is parallel to a principal face; usually front, top and side views.</p>
<ul><li>+ preserves both <b>distances and angles</b>, shapes are preserved → can be used for <b>measurements</b> (building plans, manuals);</li>
<li>− cannot see what the object really looks like, many surfaces are hidden → CAD/architecture often add an isometric view.</li></ul>
<p><b>Axonometric</b> — the projection plane can move relative to the object; classified by how many angles at a corner of a projected cube are equal: three → <b>isometric</b>, two → <b>dimetric</b>, none → <b>trimetric</b>.</p>
<ul><li>+ can see three principal faces of a box; lines are scaled (<b>foreshortened</b>) but scaling factors can be found; used in CAD;</li>
<li>− angles are not preserved (a circle becomes an ellipse); optical illusions (parallel lines seem to diverge); does not look real because far objects are scaled the same as near ones.</li></ul>
<p><b>Oblique</b> — arbitrary relationship between projectors and the projection plane.</p>
<ul><li>+ angles in faces parallel to the projection plane are preserved while we can still see "around" the side; angles can be chosen to emphasize a face (plan oblique, elevation oblique in architecture);</li>
<li>− can't be created with a simple physical camera (needs a bellows camera or special lens).</li></ul>`,
  k: ["multiview: distances + angles, hidden surfaces", "isometric/dimetric/trimetric", "foreshortening", "oblique: front face preserved"] },

{ l: "4.2", p: 1,
  q: "Explain vanishing points and one-, two- and three-point perspective. What are the advantages and disadvantages of perspective projection?",
  ru: "Параллельные линии, не параллельные плоскости, сходятся в vanishing point. 3 точки — ни одна грань не параллельна плоскости; 2 — одно направление параллельно; 1 — одна грань параллельна. Плюс: реализм (diminution). Минус: nonuniform foreshortening, углы сохраняются только в параллельных плоскостях.",
  a: `<p>In perspective projection the projectors converge at the center of projection. Parallel lines on the object that are <b>not parallel to the projection plane</b> converge at a single point in the image — the <b>vanishing point</b>. Hand drawings of perspective use these points.</p>
<p>For a cube:</p>
<ul><li><b>Three-point:</b> no principal face parallel to the projection plane → three vanishing points;</li>
<li><b>Two-point:</b> one principal direction parallel to the projection plane → two vanishing points;</li>
<li><b>One-point:</b> one principal face parallel to the projection plane → one vanishing point.</li></ul>
<p><b>Advantages:</b> objects further from the viewer are projected smaller (<b>diminution</b>) → looks realistic.</p>
<p><b>Disadvantages:</b> equal distances along a line are not projected as equal distances (<b>nonuniform foreshortening</b>); angles are preserved only in planes parallel to the projection plane; harder to construct by hand than parallel projections (but not by computer).</p>`,
  k: ["vanishing point", "1/2/3-point by faces parallel to plane", "diminution", "nonuniform foreshortening", "angles only in parallel planes"] },

/* ---------------- L5.1 ---------------- */
{ l: "5.1", p: 1,
  q: "What are the three aspects of the viewing process? What are OpenGL's default camera and projection?",
  ru: "Positioning the camera (model-view), selecting a lens (projection), clipping (view volume). По умолчанию обе матрицы identity, камера в начале координат смотрит в −z, ортографическая проекция в куб стороной 2.",
  a: `<p>Three aspects of viewing, all implemented in the pipeline:</p>
<ol><li><b>Positioning the camera</b> — setting the <b>model-view</b> matrix;</li>
<li><b>Selecting a lens</b> — setting the <b>projection</b> matrix;</li>
<li><b>Clipping</b> — setting the <b>view volume</b>.</li></ol>
<p><b>Defaults:</b> initially the object and camera frames are the same (model-view = identity). The camera is at the origin pointing in the <b>negative z</b> direction. The default view volume is a cube with sides of length 2 centered at the origin; the default projection matrix is identity and the projection is <b>orthographic</b> (xp = x, yp = y, zp = 0). Objects outside the cube are clipped out.</p>`,
  k: ["model-view = camera position", "projection = lens", "clipping = view volume", "identity defaults", "−z, cube of side 2"] },

{ l: "5.1", p: 1,
  q: "How do we move the camera in OpenGL? Explain the LookAt function and its parameters.",
  ru: "Двигать камеру = двигать мир в обратную сторону: Translate(0,0,−d), d > 0; C = TR. LookAt(eye, at, up): позиция камеры, точка взгляда, вектор «вверх» (не параллелен направлению взгляда).",
  a: `<p>To see objects with both positive and negative z we can <b>move the camera</b> in the +z direction (translate the camera frame) or <b>move the objects</b> in −z (translate the world frame). Both are equivalent and are given by the <b>model-view matrix</b>: <code>Translate(0, 0, −d)</code>, d &gt; 0. Actually the world is moved relative to the camera — the code is the <b>inverse</b> of the desired camera movement.</p>
<p>Any position is reached by rotations and translations. Side view: rotate the scene, then move it away: <code>C = TR</code>, e.g. <code>m = Translate(0,0,−d) * RotateY(−90);</code> (last specified is first applied).</p>
<p><b>LookAt(eye, at, up)</b> (from GLU's gluLookAt, now in mat.h) forms the model-view matrix through a simple interface:</p>
<ul><li><b>eye</b> — location of the camera;</li><li><b>at</b> — the point the camera looks at;</li><li><b>up</b> — the up direction; must <b>not be parallel</b> to the look-at direction.</li></ul>
<p>It can be concatenated with modeling transformations. Other camera APIs: view reference point / view plane normal / view up (PHIGS, GKS-3D); yaw, pitch, roll; elevation, azimuth, twist; direction angles.</p>`,
  k: ["move world instead of camera", "Translate(0,0,−d)", "inverse of camera motion", "LookAt(eye, at, up)", "up not parallel"] },

{ l: "5.1", p: 1,
  q: "What is projection normalization and why is it used? Describe the viewing part of the pipeline.",
  ru: "Любую проекцию превращаем в ортографическую в default view volume. Один pipeline для всех проекций, простое клиппирование против куба, глубина сохраняется до конца для hidden-surface removal.",
  a: `<p><b>Normalization:</b> instead of deriving a different projection matrix for each type of projection, we <b>convert all projections into orthogonal projections with the default view volume</b> (the cube −1…1). The specified view volume is transformed (distorted) into the default one; the distorted object then projects correctly.</p>
<p><b>Pipeline:</b> vertex → <b>model-view</b> transformation → <b>projection</b> transformation (vertex shader output, still 4D) → <b>perspective division</b> (4D → 3D) → <b>clipping</b> against the default cube → <b>projection</b> (3D → 2D).</p>
<p><b>Why:</b></p>
<ul><li>a <b>single pipeline</b> for both perspective and orthogonal viewing; standard transformations can be used;</li>
<li><b>simple, efficient clipping</b> against a fixed cube regardless of projection type;</li>
<li>we stay in 4D homogeneous coordinates as long as possible (both matrices are nonsingular) and <b>delay the final projection</b>, keeping depth needed for <b>hidden-surface removal</b> and shading.</li></ul>`,
  k: ["convert to default orthographic volume", "single pipeline", "clip against cube", "perspective division", "keep depth for HSR"] },

{ l: "5.1", p: 1,
  q: "Derive the simple perspective projection matrix and explain perspective division.",
  ru: "COP в начале координат, плоскость z = d. M = I с последней строкой [0 0 1/d 0] даёт w = z/d. Деление на w: xp = x/(z/d), yp = y/(z/d), zp = d.",
  a: `<p>Center of projection at the origin, projection plane z = d (d &lt; 0). From top and side views (similar triangles):</p>
<p><code>xp = x / (z/d),  yp = y / (z/d),  zp = d</code></p>
<p>This is non-linear (division by z), but in homogeneous coordinates we can write it as a matrix. Take p = [x y z 1]ᵀ and</p>
<div class="mx-row"><span class="mx" data-m="1 0 0 0;0 1 0 0;0 0 1 0;0 0 1/d 0"></span><span class="mx-eq">→ q = [x  y  z  z/d]ᵀ</span></div>
<p>Now w ≠ 1, so we must <b>divide by w</b> to return from homogeneous coordinates — the <b>perspective division</b>. It yields exactly xp = x/(z/d), yp = y/(z/d), zp = d.</p>
<p>So the matrix does the linear part and the division (done by the pipeline after the vertex shader) does the non-linear part.</p>`,
  k: ["similar triangles", "xp = x/(z/d)", "last row [0 0 1/d 0]", "w = z/d", "divide by w"] },

{ l: "5.1", p: 0,
  q: "Derive the orthographic normalization matrix for Ortho(left, right, bottom, top, near, far).",
  ru: "Два шага: T — перенести центр объёма в начало координат, S — масштабировать до сторон длины 2. P = ST, затем Morth обнуляет z.",
  a: `<p><code>Ortho(left, right, bottom, top, near, far)</code> specifies the view volume in camera coordinates (near and far measured from the camera). Normalization finds the transformation that converts it to the default cube:</p>
<ol><li><b>Move the center to the origin:</b> T(−(left+right)/2, −(bottom+top)/2, (near+far)/2);</li>
<li><b>Scale</b> to sides of length 2: S(2/(right−left), 2/(top−bottom), 2/(near−far)).</li></ol>
<div class="mx-row"><span class="mx-eq">P = ST =</span><span class="mx" data-m="2/(r−l) 0 0 −(r+l)/(r−l);0 2/(t−b) 0 −(t+b)/(t−b);0 0 −2/(f−n) −(f+n)/(f−n);0 0 0 1"></span></div>
<p>The final projection sets z = 0 with M<sub>orth</sub> = diag(1, 1, 0, 1), so the general orthographic projection is <code>P = M_orth · S · T</code>. (In practice z is kept for the depth test and dropped at the end.)</p>`,
  k: ["translate center to origin", "scale to size 2", "P = ST", "Morth sets z = 0"] },

{ l: "5.1", p: 0,
  q: "How can an oblique projection be implemented with the standard pipeline?",
  ru: "Oblique = shear + orthographic. Матрица H(θ,φ) сдвигает x и y на z·cot θ и z·cot φ, потом обычная ортографическая проекция: P = Morth S T H.",
  a: `<p>OpenGL projection functions cannot directly produce general parallel (oblique) projections. But the oblique view of a cube looks like the cube has been <b>sheared</b>. So:</p>
<p><b>Oblique projection = shear + orthographic projection.</b></p>
<p>An xy-shear (z unchanged) with angles θ, φ:</p>
<div class="mx-row"><span class="mx-eq">H(θ,φ) =</span><span class="mx" data-m="1 0 −cotθ 0;0 1 −cotφ 0;0 0 1 0;0 0 0 1"></span></div>
<p>Projection matrix: <code>P = M_orth H(θ, φ)</code>, in general <code>P = M_orth S T H(θ, φ)</code>. The matrix STH transforms the original (oblique) clipping volume into the default clipping volume; the distorted object then projects correctly with an orthographic projection.</p>`,
  k: ["shear + orthographic", "H(θ, φ)", "P = Morth S T H", "distorted object projects correctly"] },

{ l: "5.1", p: 1,
  q: "Explain perspective normalization: the matrix N, the choice of α and β, and its effect on hidden-surface removal.",
  ru: "N переводит усечённую пирамиду в куб; после деления z″ = −(α + β/z). α, β выбирают так, чтобы near → −1, far → 1. Порядок по глубине сохраняется, но z искажается, при маленьком near — проблемы точности.",
  a: `<p>Simple perspective: COP at the origin, near plane z = −1, 90° field of view bounded by x = ±z, y = ±z. The matrix with last row [0 0 −1 0] gives x′ = x, y′ = y, z′ = z, w′ = −z → after division x″ = −x/z, y″ = −y/z (independent of the far plane).</p>
<p><b>Generalization:</b></p>
<div class="mx-row"><span class="mx-eq">N =</span><span class="mx" data-m="1 0 0 0;0 1 0 0;0 0 α β;0 0 −1 0"></span><span class="mx-eq">→ x″ = −x/z, y″ = −y/z, z″ = −(α + β/z)</span></div>
<p>The point then projects orthogonally to the desired point regardless of α and β. Choosing</p>
<p><code>α = −(far + near)/(far − near),  β = −2·near·far/(far − near)</code></p>
<p>maps the near plane to z = −1, the far plane to z = 1 and the sides to x = ±1, y = ±1 — the new clipping volume is the default one.</p>
<p><b>Hidden-surface removal:</b> N was chosen so that if z₁ &gt; z₂ in the original volume then z₁′ &gt; z₂′ after the transformation — <b>depth order is preserved</b>, so HSR works after normalization. But z″ = −(α + β/z) <b>distorts distances</b> non-linearly, which can cause <b>numerical (depth precision) problems</b>, especially when the near distance is small.</p>
<p>For <code>Frustum</code> the full matrix is <code>P = N S H</code>: shear to a right pyramid, scale, then N.</p>`,
  k: ["N with α, β and w′ = −z", "z″ = −(α + β/z)", "near → −1, far → 1", "depth order preserved", "precision problems with small near", "P = NSH"] },

{ l: "5.1", p: 1,
  q: "Compare Ortho, Frustum and Perspective. How are the viewing matrices used in an OpenGL program?",
  ru: "Ortho — параллельная проекция (box). Frustum(l,r,b,t,n,f) — перспектива, может быть несимметричной. Perspective(fovy, aspect, near, far) — симметричная, удобнее. В шейдере gl_Position = projection * model_view * vPosition.",
  a: `<ul><li><b>Ortho(left, right, bottom, top, near, far)</b> — orthographic (parallel) view; the view volume is a box in camera coordinates.</li>
<li><b>Frustum(left, right, bottom, top, near, far)</b> — perspective; view volume is a truncated pyramid; allows an <b>unsymmetric</b> frustum. left &lt; right, bottom &lt; top, near &lt; far, near and far positive. Often difficult to get the desired view.</li>
<li><b>Perspective(fovy, aspect, near, far)</b> — less flexible (symmetric only) but <b>more intuitive</b>: field of view angle in y, aspect = w/h of the window, near &lt; far both positive.</li></ul>
<p><b>Usage:</b></p>
<pre><code>// application
model_view = LookAt(eye, at, up);
projection = Ortho(...);  // or Perspective(fov, aspect, near, far)
glUniformMatrix4fv(mv_loc, 1, GL_TRUE, model_view);  // transpose!
// vertex shader
gl_Position = projection * model_view * vPosition;</code></pre>`,
  k: ["Ortho = box", "Frustum unsymmetric", "Perspective(fovy, aspect, near, far)", "aspect = w/h", "projection * model_view * vPosition"] },

/* ---------------- L5.2 ---------------- */
{ l: "5.2", p: 1,
  q: "Why do we need shading? Explain light–material interaction, the rendering equation, and local vs global rendering.",
  ru: "Сфера одним цветом выглядит плоской. Свет частично поглощается, частично рассеивается; бесконечное рассеяние описывает rendering equation (в общем виде не решается). Pipeline — локальный, нам достаточно, чтобы «выглядело правильно».",
  a: `<p>A sphere built from many polygons and colored with one color looks <b>flat</b>. A real sphere looks 3D because light–material interactions give each point a different shade. Shading depends on: <b>light sources</b>, <b>material properties</b>, <b>location of the viewer</b>, <b>surface orientation</b>.</p>
<p><b>Light–material interaction:</b> light hitting an object is partly <b>absorbed</b> and partly <b>scattered (reflected)</b>. The reflected amount determines color and brightness — a surface looks red under white light because red is reflected and the rest absorbed. The scattering depends on smoothness and orientation: smooth surfaces concentrate reflected light near the mirror direction, rough surfaces scatter in all directions.</p>
<p>Light scattered from A hits B, part of it comes back to A, and so on. This infinite scattering and absorption is described by the <b>rendering equation</b> — <b>global</b> (includes shadows and multiple scattering) and <b>cannot be solved in general</b>; ray tracing is a special case for perfectly reflecting surfaces.</p>
<p>Correct shading is a global calculation, which is <b>incompatible with the pipeline</b> that shades each polygon independently (<b>local rendering</b>). In real-time graphics we are happy if things "<b>look right</b>", and there are many techniques to approximate global effects.</p>`,
  k: ["flat-looking sphere", "absorbed vs scattered", "rendering equation, global", "pipeline = local", "look right"] },

{ l: "5.2", p: 0,
  q: "Describe the types of simple light sources used in computer graphics.",
  ru: "Point source (позиция + цвет), distant source (на бесконечности, параллельные лучи), spotlight (направление, cutoff, ослабление cos^e φ), ambient (одинаковый везде).",
  a: `<p>General (area) light sources are hard to work with because we must integrate light from all points of the source. Simple sources:</p>
<ul><li><b>Point source</b> — modeled with a position and a color.</li>
<li><b>Distant source</b> — at infinite distance, so the rays are <b>parallel</b>; given by a direction. In OpenGL the light position is homogeneous: <b>w = 1</b> → finite location, <b>w = 0</b> → parallel source with the given direction.</li>
<li><b>Spotlight</b> — restricts light from an ideal point source: a direction, a <b>cutoff</b> angle, and attenuation proportional to cos<sup>e</sup>φ (φ — angle from the spot direction).</li>
<li><b>Ambient light</b> — the same amount of light everywhere in the scene; models the contribution of many sources and reflecting surfaces.</li></ul>
<p>Light from a point source falls off with distance: factor <code>1/(a + bd + cd²)</code> (pure 1/d² is too harsh; constant and linear terms soften it). Light sources are geometric objects, so their positions are affected by the model-view matrix: lights can move with objects, objects can move with fixed lights, etc.</p>`,
  k: ["point", "distant (w = 0)", "spotlight: direction, cutoff, cosᵉ", "ambient", "1/(a + bd + cd²)"] },

{ l: "5.2", p: 1,
  q: "Describe the Phong reflection model: its components, the vectors it uses and the full equation.",
  ru: "Три компоненты: ambient, diffuse, specular. Четыре вектора: l (к свету), v (к наблюдателю), n (нормаль), r (идеальное отражение). I = kd Id (l·n) + ks Is (v·r)^α + ka Ia.",
  a: `<p>The <b>Phong model</b> is a simple reflection model that can be computed rapidly in real-time hardware.</p>
<p><b>Four vectors</b> (all unit length): <b>l</b> — to the light source, <b>v</b> — to the viewer, <b>n</b> — the normal, <b>r</b> — the perfect reflector, <code>r = 2(l·n)n − l</code>.</p>
<p><b>Three components:</b></p>
<ul><li><b>Diffuse</b> — Lambertian: light scattered equally in all directions, proportional to cos θᵢ = <b>l·n</b>: <code>kd Id (l·n)</code>.</li>
<li><b>Specular</b> — highlights near the mirror direction; drops off as the angle φ between v and r grows: <code>ks Is (v·r)^α</code>, α = <b>shininess</b> coefficient (100–200 → metals, 5–10 → plastic).</li>
<li><b>Ambient</b> — result of multiple interactions with the environment: <code>ka Ia</code>.</li></ul>
<p>For each light source and each color component (without distance terms):</p>
<p><code>I = kd Id (l · n) + ks Is (v · r)^α + ka Ia</code></p>
<p>Contributions from all light sources are added. Each light has separate diffuse, specular, ambient terms with R, G, B → <b>9 coefficients</b> per source (Idr, Idg, Idb, Isr…); materials have <b>9 reflection coefficients</b> (kdr…kab) plus the shininess α. Distance attenuation 1/(a + bd + cd²) multiplies the diffuse and specular terms.</p>`,
  k: ["ambient + diffuse + specular", "l, v, n, r", "r = 2(l·n)n − l", "(v·r)^α shininess", "9 light + 9 material coefficients"] },

{ l: "5.2", p: 1,
  q: "Explain Lambertian (diffuse) reflection and specular reflection.",
  ru: "Lambert: идеальный рассеиватель, отражённый свет ~ cos θi = l·n, не зависит от наблюдателя. Specular: блики около зеркального направления, зависит от угла между v и r, степень α — блеск.",
  a: `<p><b>Lambertian surface</b> — a perfectly <b>diffuse</b> reflector: light is scattered <b>equally in all directions</b>, so the result does not depend on the viewer. The amount reflected is proportional to the vertical component of the incoming light: <code>reflected ~ cos θᵢ = l · n</code> (normalized vectors). Coefficients k<sub>r</sub>, k<sub>g</sub>, k<sub>b</sub> show how much of each color is reflected. If l·n &lt; 0 the light is behind the surface → use max(l·n, 0).</p>
<p><b>Specular surfaces:</b> most surfaces are neither ideal diffusers nor perfect mirrors. Smooth surfaces show <b>specular highlights</b> — light reflected in directions concentrated close to the perfect reflection r. Phong modeled it with a term that drops off as the angle φ between the viewer v and r grows:</p>
<p><code>I_r ~ ks I cos^α φ = ks I (v · r)^α</code></p>
<p>Larger α → smaller, sharper highlight (metal 100–200); small α → wide highlight (plastic 5–10). The highlight depends on the viewer position.</p>`,
  k: ["equal in all directions", "cos θ = l·n", "viewer independent", "highlight near r", "(v·r)^α", "shininess"] },

{ l: "5.2", p: 1,
  q: "What is the modified Phong (Blinn–Phong) model? Why is the halfway vector used?",
  ru: "Вместо (v·r)^α используется (n·h)^β, h = (l + v)/|l + v|. Не нужно считать r для каждой вершины — быстрее. Входит в стандарт OpenGL.",
  a: `<p>The specular term of the Phong model is problematic: it requires computing a new <b>reflection vector r</b> (and view vector) for each vertex.</p>
<p><b>Blinn</b> suggested an approximation with the <b>halfway vector</b> h — the normalized vector halfway between l and v:</p>
<p><code>h = (l + v) / |l + v|</code></p>
<p>Replace <code>(v · r)^α</code> by <code>(n · h)^β</code>; β is chosen to match the shininess. If the vectors are coplanar, the halfway angle ψ is half of the angle between r and v. This is cheaper (no reflection vector) and, for a distant light and viewer, h is constant.</p>
<p>The result is known as the <b>modified Phong</b> or <b>Blinn lighting model</b>; it is specified in the OpenGL standard and used in the course shaders: <code>H = normalize(L + E); sTerm = pow(max(dot(N, H), 0.0), Shininess);</code></p>`,
  k: ["r is expensive", "h = (l + v)/|l + v|", "(n·h)^β", "Blinn model", "OpenGL standard"] },

{ l: "5.2", p: 1,
  q: "How are surface normals computed for a plane, a sphere (implicit and parametric) and a polygonal mesh?",
  ru: "Плоскость/треугольник: n = (p2 − p0) × (p1 − p0), нормализовать. Сфера неявно: градиент f(p) = p·p − 1 → n = p. Параметрически: n = ∂p/∂u × ∂p/∂v. Меш: среднее нормалей соседних граней.",
  a: `<p>l and v are given by the application and r is computed from l and n; the problem is finding <b>n</b>. OpenGL leaves this to the application.</p>
<ul><li><b>Plane / triangle</b> p₀, p₁, p₂: <code>n = (p₂ − p₀) × (p₁ − p₀)</code>, then normalize n ← n/|n|. The plane is n·(p − p₀) = 0 (ax + by + cz + d = 0). The right-hand rule (vertex order) determines the outward face.</li>
<li><b>Sphere, implicit form</b> f(x, y, z) = 0: the normal is the <b>gradient</b>. For f(p) = p·p − 1: n = [∂f/∂x, ∂f/∂y, ∂f/∂z]ᵀ = p (up to a factor 2) — for a sphere at the origin n = p.</li>
<li><b>Parametric form</b> x = cos u sin v, y = cos u cos v, z = sin u: the tangent plane is spanned by ∂p/∂u and ∂p/∂v, so <code>n = ∂p/∂u × ∂p/∂v</code>. Works for quadrics and parametric polynomial (Bézier) surfaces.</li>
<li><b>Polygonal mesh</b> (Gouraud): vertex normal = <b>average of the normals</b> of the faces around the vertex: <code>n = (n₁ + n₂ + n₃ + n₄)/|n₁ + n₂ + n₃ + n₄|</code>. Algorithm (e.g. SMF file with vertices and faces): create a normals array the size of the vertex array; for each face compute its unit normal and add it to its vertices; finally normalize all.</li></ul>
<p>Transformations (especially scaling) change lengths, so normals must be renormalized — GLSL has <code>normalize()</code>.</p>`,
  k: ["cross product of edges", "gradient for implicit", "∂p/∂u × ∂p/∂v", "average adjacent face normals", "normalize"] },

{ l: "5.2", p: 1,
  q: "Compare flat, Gouraud and Phong shading. Which is computed per vertex and which per fragment?",
  ru: "Flat: один цвет на polygon (uniform). Gouraud: Phong-модель в вершинах, интерполяция цветов. Phong shading: интерполяция нормалей, модель в каждом фрагменте — глаже, но дороже.",
  a: `<ul><li><b>Flat shading</b> — a single shade for the whole polygon (e.g. via a uniform). A triangle has one normal; for a distant viewer or no specular term all vertex shades would be identical anyway. Curved surfaces look faceted.</li>
<li><b>Gouraud shading</b> (smooth, <b>per-vertex</b>): find the average normal at each vertex → compute the (modified) Phong model <b>at each vertex</b> in the vertex shader → <b>interpolate vertex shades (colors)</b> across the polygon (varying variable).</li>
<li><b>Phong shading</b> (<b>per-fragment</b>): find averaged vertex normals → <b>interpolate the normals</b> across the polygon → compute the Phong model <b>at each fragment</b> in the fragment shader.</li></ul>
<p><b>Comparison:</b> if the mesh approximates a highly curved surface, Phong shading looks smooth while Gouraud may show edges (and can miss highlights inside a polygon). Phong shading needs much more work — until recently it was not available in real time; now it is done with fragment shaders. Both need mesh data structures to get vertex normals. Note the silhouette edge stays polygonal in both.</p>`,
  k: ["flat = one shade", "Gouraud = light at vertices, interpolate colors", "Phong = interpolate normals, light per fragment", "Phong smoother but costlier"] },

{ l: "5.2", p: 0,
  q: "Explain how the vertex-lighting (Gouraud) and fragment-lighting (Phong) shaders are organized.",
  ru: "Gouraud: в vertex shader переводим позицию и нормаль в eye coords, считаем L, E, H, ambient + diffuse + specular → color; fragment shader просто выводит цвет. Phong: vertex shader передаёт fN, fE, fL, fragment shader нормализует их и считает освещение.",
  a: `<p><b>Per-vertex (Gouraud):</b> uniforms AmbientProduct, DiffuseProduct, SpecularProduct (light color × material), ModelView, Projection, LightPosition, Shininess.</p>
<pre><code>vec3 pos = (ModelView * vec4(vPosition,1)).xyz;     // eye coords
vec3 L = normalize(LightPosition - pos);
vec3 E = normalize(-pos);        vec3 H = normalize(L + E);
vec3 N = normalize(ModelView * vec4(vNormal,0)).xyz;
diffuse  = max(dot(L,N),0) * DiffuseProduct;
specular = pow(max(dot(N,H),0), Shininess) * SpecularProduct;
if(dot(L,N) < 0) specular = 0;   // light behind the surface
color = ambient + diffuse + specular;   // out → interpolated</code></pre>
<p>The fragment shader just outputs <code>vec4(color, 1)</code>.</p>
<p><b>Per-fragment (Phong):</b> the vertex shader only outputs the vectors <code>fN</code> (normal), <code>fE</code> (to eye), <code>fL</code> (to light; if LightPosition.w = 0 it is a direction) — they are interpolated by the rasterizer. The fragment shader normalizes N, E, L, computes H and the same ambient + diffuse + specular per fragment.</p>
<p>The products (e.g. DiffuseProduct = light diffuse × material diffuse) are computed in the application to save shader work.</p>`,
  k: ["eye coordinates", "L, E, H, N", "max(dot, 0)", "specular = 0 if l·n < 0", "interpolate color vs interpolate vectors"] },

{ l: "5.2", p: 0,
  q: "What happens when the computed intensity exceeds 1? Give practical lessons for writing interactive OpenGL programs (Assignment 2).",
  ru: "I > 1: clamp MIN(I,1) — цвет «выгорает» к белому; или перенормировать все I — без пересвета, но темнее/хуже контраст. Уроки A2: idle только при анимации, glutPostRedisplay в конце callback, геометрию слать один раз, правильный порядок матриц.",
  a: `<p><b>Too intense:</b> with several light sources it is easy to get I &gt; 1.</p>
<ul><li><b>Clamp:</b> color = MIN(I, 1). The object can change color, saturating toward white: (0.1, 0.4, 0.8) + (0.5, 0.5, 0.5) = (0.6, 0.9, 1.0).</li>
<li><b>Renormalize</b> all intensities to 0…1 if some I &gt; 1: no oversaturation, but requires computing all I's before rendering; the image may be too bright and contrast a little off.</li>
<li>Image processing on the rendered image (with original I's) gives better results but is costly.</li></ul>
<p><b>Lessons learned from A2:</b></p>
<ul><li>have an <b>idle()</b> function only if something is animated; set it to <b>NULL</b> when the animation is not running;</li>
<li>if a keyboard/mouse/menu interaction changes something on screen, put <b>glutPostRedisplay()</b> at the end of that callback;</li>
<li><b>send geometry only when it changes</b> — if it never changes, send it once;</li>
<li>apply transformation matrices in the <b>correct order</b>.</li></ul>`,
  k: ["clamp MIN(I,1) → white", "renormalize", "idle only when animating", "glutPostRedisplay", "send geometry once", "matrix order"] }
];
