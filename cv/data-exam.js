// Computer Vision: мидтерм по вариантам. Variant 1 = официальный образец, Variant 2 и 3 составлены в том же формате.
// Формат: { id, title, src, qs: [{ n, t: тема, ctx: условие (HTML), parts: [{ l: буква, p: баллы, q: вопрос (HTML), a: решение (EN, HTML), why: на что смотрят (RU) }] }] }.
// Самооценка хранится по ключу id варианта + "." + номер вопроса + буква, поэтому буквы не переименовывай.
window.CV_EXAMS = [
{ id: "v1", title: "Variant 1", src: "официальный образец", qs: [
  { n: 1, t: "Image Processing & OpenCV", ctx: `<p>A student is building a system to classify healthy and diseased plant leaves. The collected images have different resolutions, lighting conditions, and some contain image noise.</p>`,
    parts: [
      { l: "a", p: 6, q: "Propose three preprocessing operations that could be useful. For each operation, explain why you would use it.",
        a: `<ol>
<li><b>Resize to a fixed size</b> (e.g. <code>cv2.resize(img, (224, 224))</code>). The images have different resolutions, but a classifier needs inputs of the same size, and all images in a batch must have the same shape.</li>
<li><b>Noise removal</b> with a Gaussian or median filter (<code>cv2.GaussianBlur(img, (5, 5), 0)</code>, <code>cv2.medianBlur(img, 3)</code>). Some images contain noise; a small kernel removes it without destroying the disease spots.</li>
<li><b>Lighting / intensity normalization</b>: scale pixels to [0, 1] (<code>img / 255.0</code>) or standardize with the training mean and std; optionally histogram equalization / CLAHE on the brightness channel. The lighting conditions differ, and normalization makes the input distribution consistent and training more stable.</li>
</ol>
<p>Also acceptable: BGR → RGB conversion, cropping the leaf from the background, data augmentation (flips, rotations, brightness changes) on the training set.</p>`,
        why: "3 операции × 2 балла: название + причина, связанная с условием (разные размеры, свет, шум). Без «why» половина балла." },
      { l: "b", p: 4, q: "The student converts every image to grayscale. Give one advantage and one disadvantage of doing this for plant-disease classification.",
        a: `<p><b>Advantage:</b> 3 channels become 1, so the input is 3× smaller: faster processing, fewer model parameters, and less sensitivity to the color tint of the lighting.</p>
<p><b>Disadvantage:</b> color information is lost. Plant diseases are often visible as <b>color changes</b> (yellow or brown spots on a green leaf); in grayscale a yellow spot and a green area of similar brightness can look the same, so accuracy may drop.</p>`,
        why: "Минус обязательно привязать к задаче: болезнь видна по цвету." },
      { l: "c", p: 5, q: `Consider the following code. Identify two problems and provide the corrected code.<pre><code>img = cv2.imread("leaf.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
blur = cv2.GaussianBlur(gray, (4, 4), 0)</code></pre>`,
        a: `<ol><li><b>Wrong color conversion code.</b> <code>cv2.imread</code> loads images in <b>BGR</b> order, so the code must be <code>COLOR_BGR2GRAY</code>. With <code>RGB2GRAY</code> the red and blue weights are swapped and the gray values are wrong.</li>
<li><b>Invalid kernel size.</b> The Gaussian kernel size must be <b>positive and odd</b>; <code>(4, 4)</code> raises an error. Use <code>(3, 3)</code> or <code>(5, 5)</code>.</li></ol>
<pre><code>img = cv2.imread("leaf.jpg")
if img is None:                      # optional: file not found check
    raise FileNotFoundError("leaf.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 0)</code></pre>`,
        why: "2 проблемы с объяснением + исправленный код. Проверка на None — бонус, не замена одной из двух." },
      { l: "d", p: 5, q: `A student says: "Applying more preprocessing always improves classification accuracy." Do you agree? Explain using one example.`,
        a: `<p><b>No, I disagree.</b> Preprocessing can remove information the classifier needs or add artifacts. Each step must be justified by the task and checked on the validation set.</p>
<p><b>Example:</b> for plant-disease classification, converting to grayscale removes the yellow/brown color of disease spots, and a strong blur (e.g. a 25×25 kernel) erases small spots and texture. Both steps are "more preprocessing", but they make healthy and diseased leaves look alike, so accuracy goes <b>down</b>. Another example: histogram equalization on a dark noisy image amplifies the noise.</p>`,
        why: "Позиция (disagree) + механизм (теряется информация) + конкретный пример." }
    ] },
  { n: 2, t: "Image Classification", ctx: `<p>A classifier produces the following scores:</p>
<div class="tbl"><table><thead><tr><th>Image</th><th>Cat</th><th>Dog</th><th>Bird</th><th>True class</th></tr></thead><tbody>
<tr><td>A</td><td>2.4</td><td>0.7</td><td>−0.2</td><td>Cat</td></tr>
<tr><td>B</td><td>0.3</td><td>1.2</td><td>1.8</td><td>Dog</td></tr>
<tr><td>C</td><td>−0.5</td><td>0.4</td><td>2.1</td><td>Bird</td></tr>
<tr><td>D</td><td>1.4</td><td>1.6</td><td>0.2</td><td>Dog</td></tr></tbody></table></div>`,
    parts: [
      { l: "a", p: 4, q: "Write the predicted class for A, B, C, and D.",
        a: `<p>Predicted class = the class with the <b>highest score</b> (argmax).</p>
<ul><li>A: max(2.4, 0.7, −0.2) = 2.4 → <b>Cat</b></li><li>B: max(0.3, 1.2, 1.8) = 1.8 → <b>Bird</b></li><li>C: max(−0.5, 0.4, 2.1) = 2.1 → <b>Bird</b></li><li>D: max(1.4, 1.6, 0.2) = 1.6 → <b>Dog</b></li></ul>`,
        why: "По 1 баллу за изображение." },
      { l: "b", p: 4, q: "Calculate classification accuracy. Show your calculation.",
        a: `<p>Compare with the true classes: A Cat = Cat ✔, B Bird ≠ Dog ✘, C Bird = Bird ✔, D Dog = Dog ✔.</p>
<p><code>accuracy = correct / total = 3 / 4 = 0.75 = 75%</code></p>`,
        why: "Формула + подстановка + ответ в процентах." },
      { l: "c", p: 4, q: "Which image was incorrectly classified?",
        a: `<p><b>Image B.</b> Its true class is Dog, but the Bird score (1.8) is higher than the Dog score (1.2), so the model predicted Bird.</p>`,
        why: "Назвать B и сказать, почему: какой score выше." },
      { l: "d", p: 4, q: "Explain the difference between a class score and a class probability.",
        a: `<p>A <b>class score</b> is the raw output of the model (e.g. <code>s = Wx + b</code>, a logit). It can be any real number, including negative values, and scores do not sum to anything meaningful; only their order matters.</p>
<p>A <b>class probability</b> is obtained by passing the scores through <b>softmax</b>: <code>pₖ = e^{sₖ} / Σⱼ e^{sⱼ}</code>. Each probability is between 0 and 1 and they <b>sum to 1</b>, so they can be read as the model's confidence. Softmax keeps the order, so the predicted class (argmax) is the same.</p>`,
        why: "Score = любое число; probability = [0, 1], сумма 1; связь через softmax." },
      { l: "e", p: 4, q: "The model achieves 95% training accuracy but 62% test accuracy. What is the likely problem? Give one possible solution.",
        a: `<p><b>Overfitting:</b> the model memorized the training data (including noise) and does not generalize to new images; the big gap between train (95%) and test (62%) shows this.</p>
<p><b>Solutions</b> (one is enough): collect more training data; use <b>data augmentation</b> (flips, rotations, brightness changes); add <b>regularization</b> (L2 / weight decay, dropout); early stopping; tune hyperparameters on a validation set.</p>`,
        why: "Диагноз overfitting + одно решение с пояснением." }
    ] },
  { n: 3, t: "Linear Classifier", ctx: `<p>Consider a three-class linear image classifier: <code>s = Wx + b</code></p>
<div class="mx-row"><span class="mx-eq">x =</span><span class="mx" data-m="2;−1"></span><span class="mx-eq">W =</span><span class="mx" data-m="1 2;−1 1;2 −1"></span><span class="mx-eq">b =</span><span class="mx" data-m="0;1;−1"></span></div>
<p>Classes: 0 = Cat, 1 = Dog, 2 = Bird</p>`,
    parts: [
      { l: "a", p: 12, q: "Calculate s = Wx + b. Show every step.",
        a: `<p>Each score is the dot product of one row of W with x, plus the bias of that class.</p>
<p><b>Step 1: Wx</b></p>
<ul><li>Row 0: <code>1·2 + 2·(−1) = 2 − 2 = 0</code></li>
<li>Row 1: <code>(−1)·2 + 1·(−1) = −2 − 1 = −3</code></li>
<li>Row 2: <code>2·2 + (−1)·(−1) = 4 + 1 = 5</code></li></ul>
<p><b>Step 2: + b</b></p>
<ul><li><code>s₀ = 0 + 0 = 0</code></li><li><code>s₁ = −3 + 1 = −2</code></li><li><code>s₂ = 5 + (−1) = 4</code></li></ul>
<div class="mx-row"><span class="mx-eq">s =</span><span class="mx" data-m="0;−2;4"></span></div>`,
        why: "Wx построчно (≈ 2 балла на строку), прибавление b, итоговый вектор. Ошибка в знаке теряет баллы этой строки." },
      { l: "b", p: 3, q: "What class does the classifier predict?",
        a: `<p><code>argmax(0, −2, 4) = 2</code> → <b>Bird</b> (score 4 is the highest).</p>`,
        why: "Индекс 2 и имя класса." },
      { l: "c", p: 5, q: "Explain in your own words what W and b represent.",
        a: `<p><b>W (weights)</b> is a matrix with <b>one row per class</b>. Each row says how much each input feature (pixel) contributes to that class score and in which direction: a positive weight increases the score, a negative one decreases it. Visually, each row can be seen as a <b>template</b> of the class; the score measures how well the image matches it. Geometrically, each row defines the orientation of a hyperplane (w is perpendicular to the decision boundary).</p>
<p><b>b (bias)</b> is one number per class added to its score independently of the input. It <b>shifts</b> the decision boundary away from the origin and acts like a threshold or prior preference for the class (e.g. Bird gets −1 here). W and b are the learnable <b>parameters</b> found during training.</p>`,
        why: "W: строка на класс, вклад признаков, шаблон; b: сдвиг/порог не зависит от x; оба учатся." },
      { l: "d", p: 5, q: "Why can't a single linear classifier correctly separate every possible dataset? You may include a small drawing.",
        a: `<p>A linear classifier separates classes with a <b>straight line / hyperplane</b> (<code>w·x + b = 0</code>). If the classes are <b>not linearly separable</b>, no single line can put all points on the correct side.</p>
<p><b>Example — XOR:</b> points (0,0) and (1,1) are class A, (0,1) and (1,0) are class B. Any line that separates (0,0) from (0,1) leaves another point on the wrong side (Minsky &amp; Papert, 1969). Another example: one class inside a circle, the other around it (concentric rings).</p>
<pre><code>x2
 1 | B     A
 0 | A     B
   +--------- x1
     0     1     no straight line separates A from B</code></pre>
<p>Fix: add non-linear features (e.g. <code>x₁·x₂</code>, <code>x₁²</code>) or use a neural network with non-linear activations.</p>`,
        why: "Гиперплоскость + non-separable + пример (XOR/круг), желательно рисунок." }
    ] },
  { n: 4, t: "Understand the CV Pipeline", ctx: `<p>A student wrote the following image-processing pipeline:</p>
<pre><code>img = cv2.imread("cat.jpg")
img = cv2.resize(img, (224, 224))
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blur, 100, 200)</code></pre>`,
    parts: [
      { l: "a", p: 5, q: "Write the dimensions of img after resizing.",
        a: `<p><code>img.shape = (224, 224, 3)</code>: height 224, width 224, 3 color channels (B, G, R), dtype uint8. <code>cv2.resize</code> takes <code>(width, height)</code>; here both are 224.</p>`,
        why: "Три числа: H, W и 3 канала." },
      { l: "b", p: 5, q: "What happens to the number of channels after BGR2GRAY?",
        a: `<p>It goes from <b>3 channels to 1</b>. The shape changes from (224, 224, 3) to <b>(224, 224)</b>: each pixel is now one intensity value 0–255, a weighted sum of B, G and R (≈ 0.114B + 0.587G + 0.299R).</p>`,
        why: "3 → 1 и новая shape." },
      { l: "c", p: 5, q: "Explain why Gaussian blur might be applied before Canny edge detection.",
        a: `<p>Canny finds edges from <b>intensity gradients</b> (derivatives). Noise creates small sharp intensity changes, which produce large gradients and therefore <b>false edges</b>. Gaussian blur is a low-pass filter: it smooths out high-frequency noise and small texture, so Canny keeps the real object boundaries and the edge map is cleaner. (Canny's first internal step is also Gaussian smoothing; the extra blur gives more control.)</p>`,
        why: "Градиенты чувствительны к шуму → ложные края; blur убирает шум." },
      { l: "d", p: 5, q: "Suppose the classification task depends strongly on object color. Would you feed edges alone to the classifier? Explain your decision.",
        a: `<p><b>No.</b> The edge map is a binary image (0 or 255) that keeps only boundaries and shape. Color information was already lost at the grayscale step, and Canny removes the intensities too. Two objects with the same shape but different colors (e.g. a red and a green apple) give the same edges.</p>
<p>I would feed the <b>color image</b> (resized, converted BGR → RGB and normalized), or combine color with edge features, so the model can use both color and shape.</p>`,
        why: "Нет + почему (цвет потерян) + что подать вместо." }
    ] },
  { n: 5, t: "Design Your Own CV System", ctx: `<p>You need to develop a system that classifies waste into <b>Plastic | Paper | Glass | Other</b>. You have collected 2,000 images.</p>`,
    parts: [
      { l: "a", p: 3, q: "How would you organize the dataset?",
        a: `<p>One folder per class (<code>plastic/</code>, <code>paper/</code>, <code>glass/</code>, <code>other/</code>) or a CSV file with <code>filename, label</code>. Check that labels are correct, count images per class to check <b>class balance</b>, remove duplicates and corrupted files, and make sure near-identical photos do not end up in both train and test. Then split into <code>train/</code>, <code>val/</code>, <code>test/</code> with the same class subfolders.</p>`,
        why: "Структура по классам + проверка меток/баланса/дубликатов." },
      { l: "b", p: 3, q: "Propose a train/test split and calculate the number of images in each part.",
        a: `<p><b>80% / 20%</b> stratified split: train = 2000 · 0.8 = <b>1600</b>, test = 2000 · 0.2 = <b>400</b>. If classes are balanced, that is 400 train and 100 test images per class.</p>
<p>Better with a validation set: <b>70 / 15 / 15</b> → 1400 train, 300 validation (for hyperparameters), 300 test (used once at the end).</p>`,
        why: "Пропорция + посчитанные числа; stratified и val — плюс." },
      { l: "c", p: 3, q: "Give two preprocessing operations you would consider.",
        a: `<ol><li><b>Resize</b> all images to one size (e.g. 224×224) and convert BGR → RGB, because the network needs a fixed input.</li>
<li><b>Normalize</b> pixel values to [0, 1] (/255) or standardize; plus <b>data augmentation</b> on the training set (flips, rotations, brightness changes) because waste appears in different positions and lighting.</li></ol>
<p>Keep color: it helps to tell paper, glass and plastic apart, so grayscale is not a good idea.</p>`,
        why: "Две операции с причиной." },
      { l: "d", p: 3, q: "What metric would you use to evaluate your classifier? Explain why.",
        a: `<p>If the four classes are roughly balanced: <b>accuracy</b> (correct / total), plus a <b>confusion matrix</b> to see which classes are confused (e.g. plastic vs glass).</p>
<p>If classes are imbalanced (e.g. many "Other"), accuracy is misleading — a model that always predicts the majority class looks good. Then use <b>per-class precision / recall</b> and <b>macro F1</b>.</p>`,
        why: "Метрика + обоснование через баланс классов." },
      { l: "e", p: 3, q: "Your model performs very well on your dataset but poorly when tested using photos taken by another student's phone. Give one possible reason.",
        a: `<p><b>Domain shift:</b> the new photos come from a different distribution than the training data — a different camera (resolution, color processing, noise), different lighting, background or viewpoint. The model learned features specific to my phone and conditions and does not generalize. Fix: collect more diverse data from different phones and conditions, use augmentation (brightness, color, blur), normalize inputs.</p>`,
        why: "Одна причина (другая камера/свет/фон = другое распределение) с объяснением." }
    ] }
] },

{ id: "v2", title: "Variant 2", src: "составлен по образцу", qs: [
  { n: 1, t: "Image Processing & OpenCV", ctx: `<p>A team builds a system that classifies bananas as <b>Unripe | Ripe | Overripe</b> from photos taken with phones at a market. Photos have different sizes, some are dark, and some old images contain salt-and-pepper noise.</p>`,
    parts: [
      { l: "a", p: 6, q: "Propose three preprocessing operations that could be useful. For each operation, explain why you would use it.",
        a: `<ol><li><b>Resize</b> to a fixed size (e.g. 128×128): photos have different sizes, the model needs one input size.</li>
<li><b>Median filter</b> <code>cv2.medianBlur(img, 3)</code>: it is the best filter for <b>salt-and-pepper</b> noise because the median ignores isolated black/white pixels while keeping edges.</li>
<li><b>Brightness normalization</b>: scale to [0, 1] and/or equalize the V channel in HSV (or CLAHE) so dark photos look similar to bright ones without changing the hue that encodes ripeness.</li></ol>
<p>Also fine: BGR → RGB, cropping the banana from the background, augmentation on train.</p>`,
        why: "Median именно под salt-and-pepper; про свет — не трогать цвет." },
      { l: "b", p: 4, q: "Would you convert the images to grayscale for this task? Give one argument for and one against, and your decision.",
        a: `<p><b>For:</b> 3× less data, faster training, fewer parameters. <b>Against:</b> ripeness is defined by <b>color</b> (green → yellow → brown spots); grayscale maps different colors with similar brightness to the same value. <b>Decision:</b> keep color (RGB or HSV), because the main feature of the task is color.</p>`,
        why: "За, против и решение, привязанное к цвету." },
      { l: "c", p: 5, q: `Identify two problems in the code and provide the corrected code.<pre><code>img = cv2.imread("banana.jpg")
small = cv2.resize(img, 64, 64)
den = cv2.medianBlur(small, (3, 3))
plt.imshow(den)</code></pre>`,
        a: `<ul><li><code>cv2.resize</code> needs the size as a <b>tuple</b> <code>(width, height)</code>: <code>(64, 64)</code>.</li>
<li><code>cv2.medianBlur</code> takes one <b>odd integer</b> kernel size, not a tuple: <code>3</code>.</li>
<li><code>plt.imshow</code> expects <b>RGB</b>, but OpenCV images are <b>BGR</b>: the yellow banana will look blue. Convert first.</li></ul>
<pre><code>img = cv2.imread("banana.jpg")
small = cv2.resize(img, (64, 64))
den = cv2.medianBlur(small, 3)
plt.imshow(cv2.cvtColor(den, cv2.COLOR_BGR2RGB))</code></pre>`,
        why: "Достаточно двух из трёх с объяснением + исправленный код." },
      { l: "d", p: 5, q: `A student says: "Data augmentation should also be applied to the test set to make the evaluation more robust." Do you agree? Explain.`,
        a: `<p><b>No.</b> Augmentation is a training technique: it creates extra variations so the model learns invariance and overfits less. The <b>test set must represent real, unseen data</b> as it will appear in use; changing it makes the reported accuracy no longer an honest estimate and makes results incomparable. Example: randomly darkening test photos measures performance on artificial images, not on real market photos. (Test-time augmentation with averaging is a separate technique and does not change the test labels or data distribution.)</p>`,
        why: "Только train; test = реальные данные, честная оценка." }
    ] },
  { n: 2, t: "Image Classification", ctx: `<p>A classifier produces the following scores:</p>
<div class="tbl"><table><thead><tr><th>Image</th><th>Car</th><th>Truck</th><th>Bike</th><th>True class</th></tr></thead><tbody>
<tr><td>A</td><td>1.2</td><td>3.1</td><td>0.4</td><td>Truck</td></tr>
<tr><td>B</td><td>2.5</td><td>2.2</td><td>−0.3</td><td>Car</td></tr>
<tr><td>C</td><td>0.1</td><td>0.9</td><td>1.7</td><td>Truck</td></tr>
<tr><td>D</td><td>−0.4</td><td>0.2</td><td>2.6</td><td>Bike</td></tr>
<tr><td>E</td><td>1.9</td><td>2.0</td><td>0.5</td><td>Car</td></tr></tbody></table></div>`,
    parts: [
      { l: "a", p: 4, q: "Write the predicted class for each image.",
        a: `<ul><li>A: 3.1 → <b>Truck</b></li><li>B: 2.5 → <b>Car</b></li><li>C: 1.7 → <b>Bike</b></li><li>D: 2.6 → <b>Bike</b></li><li>E: 2.0 → <b>Truck</b></li></ul>`,
        why: "argmax по строке." },
      { l: "b", p: 4, q: "Calculate the accuracy and list the misclassified images.",
        a: `<p>Correct: A, B, D. Wrong: <b>C</b> (Truck predicted as Bike) and <b>E</b> (Car predicted as Truck, 2.0 vs 1.9).</p><p><code>accuracy = 3 / 5 = 0.6 = 60%</code></p>`,
        why: "Формула, подстановка, какие ошибочны." },
      { l: "c", p: 4, q: "Convert the scores of image A into probabilities with softmax. Show the steps.",
        a: `<ol><li>Exponentiate: <code>e^1.2 = 3.320</code>, <code>e^3.1 = 22.198</code>, <code>e^0.4 = 1.492</code></li>
<li>Sum: <code>3.320 + 22.198 + 1.492 = 27.010</code></li>
<li>Normalize: Car <code>3.320 / 27.010 = 0.123</code>, Truck <code>22.198 / 27.010 = 0.822</code>, Bike <code>1.492 / 27.010 = 0.055</code></li></ol>
<p>Check: 0.123 + 0.822 + 0.055 = 1.000. The highest probability is still Truck.</p>`,
        why: "exp → сумма → деление; сумма = 1." },
      { l: "d", p: 4, q: "Why is a k-Nearest Neighbor classifier with L2 distance on raw pixels rarely used for images?",
        a: `<ul><li><b>Slow at test time:</b> prediction compares the test image with all N training images, O(N), while training is O(1) — the opposite of what we want.</li>
<li><b>Pixel distances are not informative:</b> a shifted, boxed or tinted version of the same image can have the same L2 distance to the original as a completely different image; the distance does not capture semantics.</li>
<li><b>Curse of dimensionality:</b> images have thousands of dimensions, so covering the space needs exponentially many examples.</li></ul>`,
        why: "Минимум два аргумента из трёх." },
      { l: "e", p: 4, q: "Another model gets 60% training accuracy and 58% test accuracy. What is the likely problem? Give one solution.",
        a: `<p><b>Underfitting:</b> both accuracies are low and close, so the model is too simple to capture the patterns (e.g. a linear classifier on data that is not linearly separable). It is not overfitting — there is no big train/test gap.</p>
<p><b>Solution:</b> use a more powerful model (a neural network with hidden layers / a CNN), add better features, train longer or reduce regularization.</p>`,
        why: "Underfitting (оба низкие) + решение." }
    ] },
  { n: 3, t: "Linear Classifier", ctx: `<p>Consider a three-class linear classifier <code>s = Wx + b</code>:</p>
<div class="mx-row"><span class="mx-eq">x =</span><span class="mx" data-m="1;3"></span><span class="mx-eq">W =</span><span class="mx" data-m="2 −1;0 1;−1 2"></span><span class="mx-eq">b =</span><span class="mx" data-m="1;−2;0"></span></div>
<p>Classes: 0 = Apple, 1 = Banana, 2 = Orange</p>`,
    parts: [
      { l: "a", p: 10, q: "Calculate s = Wx + b. Show every step.",
        a: `<ul><li><code>s₀ = 2·1 + (−1)·3 + 1 = 2 − 3 + 1 = 0</code></li>
<li><code>s₁ = 0·1 + 1·3 + (−2) = 3 − 2 = 1</code></li>
<li><code>s₂ = (−1)·1 + 2·3 + 0 = −1 + 6 = 5</code></li></ul>
<div class="mx-row"><span class="mx-eq">s =</span><span class="mx" data-m="0;1;5"></span></div>`,
        why: "Каждая строка по шагам." },
      { l: "b", p: 3, q: "What class does the classifier predict?",
        a: `<p><code>argmax(0, 1, 5) = 2</code> → <b>Orange</b>.</p>`, why: "Индекс и имя класса." },
      { l: "c", p: 6, q: "The true class is Banana. Compute the multiclass SVM (hinge) loss with margin Δ = 1.",
        a: `<p><code>L = Σ_{j≠y} max(0, sⱼ − s_y + 1)</code>, with <code>s_y = s₁ = 1</code>.</p>
<ul><li>j = Apple: <code>max(0, 0 − 1 + 1) = max(0, 0) = 0</code></li>
<li>j = Orange: <code>max(0, 5 − 1 + 1) = max(0, 5) = 5</code></li></ul>
<p><code>L = 0 + 5 = 5</code>. Orange beats the correct class by a lot, so the loss is large.</p>`,
        why: "Формула, два члена, сумма." },
      { l: "d", p: 6, q: "A student stacks two linear layers without an activation: f(x) = W₂(W₁x). Is this more powerful than one linear classifier? Explain.",
        a: `<p><b>No.</b> <code>W₂(W₁x) = (W₂W₁)x = W′x</code>: the product of two matrices is one matrix, so the whole stack collapses into a <b>single linear layer</b> with the same straight decision boundaries (biases also combine into one bias). Depth adds power only with a <b>non-linear activation</b> between layers, e.g. <code>f(x) = W₂·max(0, W₁x + b₁) + b₂</code> with ReLU; then the first layer can learn many templates and the second can combine them, giving curved boundaries (e.g. solving XOR).</p>`,
        why: "W₂W₁ = W′ + роль активации." }
    ] },
  { n: 4, t: "Understand the CV Pipeline", ctx: `<p>Consider the pipeline (the original photo is 720 × 1280, H × W):</p>
<pre><code>img = cv2.imread("road.jpg")
img = cv2.resize(img, (320, 240))
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, mask = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)</code></pre>`,
    parts: [
      { l: "a", p: 5, q: "Write the shape of img after resizing.",
        a: `<p><code>(240, 320, 3)</code>. <code>cv2.resize</code> takes <b>(width, height)</b> = (320, 240), but NumPy shape is <b>(height, width, channels)</b>. Writing (320, 240, 3) is the classic mistake.</p>`,
        why: "Порядок (h, w, c)." },
      { l: "b", p: 5, q: "Write the shapes of hsv and gray.",
        a: `<p><code>hsv</code>: <b>(240, 320, 3)</b> — still 3 channels (Hue, Saturation, Value). <code>gray</code>: <b>(240, 320)</b> — 1 channel.</p>`,
        why: "HSV остаётся 3 канала." },
      { l: "c", p: 5, q: "What values does mask contain? Explain what the threshold line does.",
        a: `<p>Binary thresholding: every pixel with intensity <b>&gt; 127 becomes 255</b> (white), all others become <b>0</b> (black). So <code>mask</code> has shape (240, 320) and contains only 0 and 255. <code>cv2.threshold</code> returns a tuple <code>(ret, image)</code>, where <code>ret</code> is the threshold used; <code>_</code> discards it.</p>`,
        why: "0/255, правило > 127, кортеж." },
      { l: "d", p: 5, q: "The photos are taken both during the day and at night. Will a fixed threshold of 127 work well? What would you use instead?",
        a: `<p><b>No.</b> At night most pixels are darker than 127, so the mask becomes almost all black; during the day it may be mostly white. A global fixed threshold does not adapt to lighting. Better: <b>Otsu's method</b> (<code>cv2.THRESH_BINARY + cv2.THRESH_OTSU</code>) which picks the threshold per image from its histogram, <b>adaptive thresholding</b> (<code>cv2.adaptiveThreshold</code>) that uses a local threshold per neighbourhood, or histogram equalization / CLAHE before thresholding.</p>`,
        why: "Нет + Otsu / adaptive / equalization." }
    ] },
  { n: 5, t: "Design Your Own CV System", ctx: `<p>A factory wants to classify products on a conveyor as <b>OK | Scratch | Dent | Crack</b>. You have 3,000 images: 2,400 OK and 200 of each defect.</p>`,
    parts: [
      { l: "a", p: 3, q: "How would you organize the dataset?",
        a: `<p>Folders per class (<code>ok/</code>, <code>scratch/</code>, <code>dent/</code>, <code>crack/</code>) or a CSV with filename and label; labels checked by an expert, duplicates removed, and images of the same physical product kept in the same split to avoid leakage. Record the class counts: the data is <b>imbalanced</b> (80% OK).</p>`,
        why: "Структура + дисбаланс + leakage." },
      { l: "b", p: 3, q: "Propose a train/validation/test split and calculate the number of images in each part and per class.",
        a: `<p><b>70 / 15 / 15, stratified</b>: train 2100, val 450, test 450.</p>
<ul><li>OK: 1680 / 360 / 360</li><li>Each defect: 140 / 30 / 30</li></ul>
<p>Stratification keeps 80/20 proportions in every part; without it a split could contain almost no cracks.</p>`,
        why: "Посчитаны части и по классам." },
      { l: "c", p: 3, q: "Why is accuracy a bad metric here? Which metric would you use?",
        a: `<p>A model that always says "OK" gets <code>2400 / 3000 = 80%</code> accuracy but finds <b>zero</b> defects. Use <b>per-class recall</b> (especially for defects — a missed crack is expensive), <b>precision</b>, <b>macro F1</b> and the <b>confusion matrix</b>.</p>`,
        why: "Пример «всегда OK» + recall / macro-F1." },
      { l: "d", p: 3, q: "Give two preprocessing or augmentation operations you would use and why.",
        a: `<ol><li><b>Augmentation of defect images</b> (flips, small rotations, brightness/contrast changes) to get more examples of the rare classes and make the model robust to product orientation and lighting.</li>
<li><b>Resize + normalization</b> (fixed size, /255) and optionally <b>CLAHE / contrast enhancement</b>, because scratches are thin low-contrast details. Avoid strong blur: it would erase scratches.</li></ol>`,
        why: "Две операции с причиной, привязанной к дефектам." },
      { l: "e", p: 3, q: "After a new camera is installed on the line, performance drops. Give one possible reason and a fix.",
        a: `<p><b>Domain shift:</b> the new camera has a different resolution, color response, noise or angle, so the input distribution differs from the training data. Fix: collect and label images from the new camera and fine-tune, augment for brightness/color/blur, normalize inputs consistently.</p>`,
        why: "Domain shift + способ исправить." }
    ] }
] },

{ id: "v3", title: "Variant 3", src: "составлен по образцу", qs: [
  { n: 1, t: "Image Processing & OpenCV", ctx: `<p>A dashcam system must classify traffic signs. Frames are captured at night and during the day, signs appear at different sizes, and some frames have motion blur and sensor noise.</p>`,
    parts: [
      { l: "a", p: 6, q: "Propose three preprocessing operations that could be useful. For each operation, explain why you would use it.",
        a: `<ol><li><b>Crop the sign region and resize</b> to a fixed size (e.g. 32×32 or 64×64): signs have different sizes, and the classifier needs a fixed input; cropping removes background clutter.</li>
<li><b>Contrast / brightness correction</b> (CLAHE on the V channel, or normalization): day and night frames have very different brightness.</li>
<li><b>Light denoising</b> (Gaussian 3×3 or bilateral filter): removes sensor noise while keeping the sign borders.</li></ol>`,
        why: "Три операции, каждая с причиной из условия." },
      { l: "b", p: 4, q: "A student applies cv2.GaussianBlur with a (25, 25) kernel to remove the noise. Give one advantage and one disadvantage.",
        a: `<p><b>Advantage:</b> strong noise removal — the image becomes very smooth. <b>Disadvantage:</b> such a large kernel also <b>blurs edges and small details</b> (the digits on a speed-limit sign, thin symbols), and the frames already have motion blur; the classifier may no longer distinguish 30 from 80. A small kernel (3×3, 5×5) is a better compromise.</p>`,
        why: "Плюс и минус, минус — потеря деталей." },
      { l: "c", p: 5, q: `Identify two problems in the code and provide the corrected code.<pre><code>img = cv2.imread("sign.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
eq = cv2.equalizeHist(img)
thresh = cv2.threshold(eq, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)</code></pre>`,
        a: `<ol><li><code>cv2.equalizeHist</code> works only on a <b>single-channel</b> image, but it gets the 3-channel <code>img</code> → error. It should use <code>gray</code>.</li>
<li><code>cv2.threshold</code> returns a <b>tuple</b> <code>(ret, image)</code>; <code>thresh</code> would be a tuple, not an image. Unpack it.</li></ol>
<pre><code>img = cv2.imread("sign.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
eq = cv2.equalizeHist(gray)
_, thresh = cv2.threshold(eq, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)</code></pre>`,
        why: "Две ошибки + исправленный код." },
      { l: "d", p: 5, q: `A student says: "Traffic signs are recognized by their shape, so converting to HSV is useless." Do you agree? Explain.`,
        a: `<p><b>Disagree.</b> Color is a key cue for signs (red = prohibition/stop, blue = mandatory, yellow = warning). In <b>HSV</b> the color (Hue) is separated from brightness (Value), so red stays "red" in the H channel at night and in sunlight. This makes color segmentation with <code>cv2.inRange</code> robust to lighting and helps to find and classify signs. Shape and color together work better than shape alone.</p>`,
        why: "Позиция + почему HSV полезен (hue отделён от яркости)." }
    ] },
  { n: 2, t: "Image Classification (kNN)", ctx: `<p>Training points (2D features) and labels:</p>
<div class="tbl"><table><thead><tr><th>Point</th><th>Features</th><th>Label</th></tr></thead><tbody>
<tr><td>P1</td><td>(0, 0)</td><td>Cat</td></tr><tr><td>P2</td><td>(2, 4)</td><td>Dog</td></tr><tr><td>P3</td><td>(4, 2)</td><td>Cat</td></tr><tr><td>P4</td><td>(5, 5)</td><td>Dog</td></tr><tr><td>P5</td><td>(3, 4)</td><td>Dog</td></tr></tbody></table></div>
<p>Test point <b>T = (3, 2)</b>.</p>`,
    parts: [
      { l: "a", p: 6, q: "Compute the L1 (Manhattan) distance from T to every training point.",
        a: `<p><code>d₁ = |x₁ − x₂| + |y₁ − y₂|</code></p>
<ul><li>P1: |3 − 0| + |2 − 0| = 3 + 2 = <b>5</b></li><li>P2: |3 − 2| + |2 − 4| = 1 + 2 = <b>3</b></li><li>P3: |3 − 4| + |2 − 2| = 1 + 0 = <b>1</b></li><li>P4: |3 − 5| + |2 − 5| = 2 + 3 = <b>5</b></li><li>P5: |3 − 3| + |2 − 4| = 0 + 2 = <b>2</b></li></ul>`,
        why: "Формула и пять расстояний." },
      { l: "b", p: 4, q: "What do 1-NN and 3-NN predict?",
        a: `<p><b>1-NN:</b> nearest is P3 (d = 1) → <b>Cat</b>.</p><p><b>3-NN:</b> three nearest are P3 (1, Cat), P5 (2, Dog), P2 (3, Dog) → majority vote 2 Dog vs 1 Cat → <b>Dog</b>.</p><p>The prediction changes with K, which is why K must be tuned.</p>`,
        why: "Оба ответа с соседями." },
      { l: "c", p: 4, q: "Is K a parameter or a hyperparameter? How should it be chosen?",
        a: `<p>K is a <b>hyperparameter</b>: it is not learned from the training data but chosen before training. Choose it by trying several values and picking the one with the best accuracy on a <b>validation set</b> (or with k-fold <b>cross-validation</b> for small datasets); then evaluate once on the test set.</p>`,
        why: "Hyperparameter + validation / CV." },
      { l: "d", p: 3, q: "What are the training and prediction time complexities of Nearest Neighbor with N examples? Why is that a problem?",
        a: `<p>Training <b>O(1)</b> (just memorize the data); prediction <b>O(N)</b> (compare with every training example). It is the wrong way round: we can afford slow training, but prediction must be fast in deployment.</p>`,
        why: "O(1) / O(N) и почему плохо." },
      { l: "e", p: 3, q: "A classmate tries K = 1…20 and reports the K with the best test accuracy as the final result. What is wrong?",
        a: `<p>The test set was used to <b>choose a hyperparameter</b>, so it is no longer unseen data: the reported accuracy is optimistically biased and does not show how the model will perform on new data. K should be chosen on a validation set (or by cross-validation), and the test set used <b>only once at the very end</b>.</p>`,
        why: "Test нельзя использовать для подбора." }
    ] },
  { n: 3, t: "Linear Classifier & Softmax", ctx: `<p>Consider a linear classifier <code>s = Wx + b</code>:</p>
<div class="mx-row"><span class="mx-eq">x =</span><span class="mx" data-m="1;2"></span><span class="mx-eq">W =</span><span class="mx" data-m="1 0;0 1;1 −1"></span><span class="mx-eq">b =</span><span class="mx" data-m="0;0;1"></span></div>
<p>Classes: 0 = Stop, 1 = Yield, 2 = Speed limit</p>`,
    parts: [
      { l: "a", p: 8, q: "Calculate s = Wx + b. Show every step.",
        a: `<ul><li><code>s₀ = 1·1 + 0·2 + 0 = 1</code></li><li><code>s₁ = 0·1 + 1·2 + 0 = 2</code></li><li><code>s₂ = 1·1 + (−1)·2 + 1 = 1 − 2 + 1 = 0</code></li></ul>
<div class="mx-row"><span class="mx-eq">s =</span><span class="mx" data-m="1;2;0"></span></div>`,
        why: "Построчно." },
      { l: "b", p: 2, q: "What class is predicted?",
        a: `<p><code>argmax(1, 2, 0) = 1</code> → <b>Yield</b>.</p>`, why: "Индекс и имя." },
      { l: "c", p: 8, q: "The true class is Stop. Compute the softmax probabilities and the cross-entropy loss.",
        a: `<ol><li><code>e¹ = 2.718</code>, <code>e² = 7.389</code>, <code>e⁰ = 1</code>; sum = <code>11.107</code></li>
<li><code>p = (2.718, 7.389, 1) / 11.107 = (0.245, 0.665, 0.090)</code></li>
<li><code>L = −ln p_Stop = −ln 0.245 = 1.408</code></li></ol>
<p>The loss is above <code>ln 3 = 1.099</code> (the value for a random guess), because the model prefers the wrong class.</p>`,
        why: "exp, сумма, вероятности, −ln верного класса." },
      { l: "d", p: 7, q: "Without computing numbers for W, explain how one gradient-descent step would change the scores for this example.",
        a: `<p>For softmax + cross-entropy, <code>∂L/∂sⱼ = pⱼ − 1[j = y]</code> = <code>(0.245 − 1, 0.665, 0.090) = (−0.755, 0.665, 0.090)</code>.</p>
<p>Gradient descent moves against the gradient: the <b>Stop score goes up</b> (negative gradient), the <b>Yield and Speed-limit scores go down</b>, Yield the most because it has the largest wrong probability. For the weights, <code>∂L/∂W = (∂L/∂s)·xᵀ</code>, so the Stop row of W moves <b>towards x</b> and the Yield row moves away from x; <code>W ← W − η∂L/∂W</code>. After the step the probability of Stop increases and the loss decreases.</p>`,
        why: "p − onehot, направление изменения scores, связь с W." }
    ] },
  { n: 4, t: "Understand the CV Pipeline", ctx: `<p>The dashcam frame is 480 × 640 (H × W):</p>
<pre><code>img = cv2.imread("frame.jpg")
crop = img[100:300, 200:400]
crop = cv2.resize(crop, (64, 32))
x = crop.astype("float32") / 255.0
x = x.flatten()</code></pre>`,
    parts: [
      { l: "a", p: 5, q: "Write the shape of crop after slicing.",
        a: `<p>Rows 100–300 → 200 pixels high, columns 200–400 → 200 pixels wide: <code>(200, 200, 3)</code>. Slicing is <code>img[y1:y2, x1:x2]</code>, rows first.</p>`,
        why: "(200, 200, 3)." },
      { l: "b", p: 5, q: "Write the shape of crop after resizing.",
        a: `<p><code>cv2.resize(crop, (64, 32))</code> means width 64, height 32 → shape <code>(32, 64, 3)</code>. The square crop is stretched to 2:1, so the sign is distorted.</p>`,
        why: "(32, 64, 3), не (64, 32, 3)." },
      { l: "c", p: 5, q: "What are the length and value range of x after the last line?",
        a: `<p><code>32 · 64 · 3 = 6144</code> values in a 1-D vector, each in <b>[0, 1]</b> (float32) after dividing uint8 values 0–255 by 255.</p>`,
        why: "6144 и [0, 1]." },
      { l: "d", p: 5, q: "x is fed into a linear classifier with 43 sign classes. Give the shapes of W, b and s, and the number of parameters.",
        a: `<p><code>W: 43 × 6144</code>, <code>b: 43</code>, <code>s = Wx + b: 43</code> scores. Parameters: <code>43 · 6144 + 43 = 264 192 + 43 = 264 235</code>.</p>`,
        why: "Shapes и подсчёт." }
    ] },
  { n: 5, t: "Design Your Own CV System", ctx: `<p>You build an app that recognizes dishes: <b>Beshbarmak | Plov | Manti | Baursak</b>. You collected 3,200 images (800 per class) from social media.</p>`,
    parts: [
      { l: "a", p: 3, q: "How would you organize and clean the dataset?",
        a: `<p>Folder or CSV label per class; check labels manually (social media tags are noisy), remove duplicates and reposts (the same photo must not appear in train and test), remove images where the dish is not visible, check that classes are balanced (800 each).</p>`,
        why: "Структура + шумные метки + дубликаты." },
      { l: "b", p: 3, q: "Propose a train/validation/test split and calculate the numbers.",
        a: `<p><b>80 / 10 / 10</b> stratified: 2560 / 320 / 320 → per class 640 / 80 / 80.</p>`,
        why: "Посчитанные числа." },
      { l: "c", p: 3, q: "Social-media photos are heavily filtered. Give two preprocessing or augmentation steps.",
        a: `<ol><li><b>Color / brightness augmentation</b> (random brightness, contrast, saturation, hue shifts) on train so the model does not rely on a particular filter.</li>
<li><b>Resize + normalization</b> (fixed size, /255 or mean/std) plus random crops and flips for different framing.</li></ol>`,
        why: "Два шага с причиной." },
      { l: "d", p: 3, q: "Which metric would you use and why?",
        a: `<p>Classes are <b>balanced</b> (800 each), so <b>accuracy</b> is meaningful; add a <b>confusion matrix</b> to see which dishes are confused (e.g. manti vs baursak) and per-class recall.</p>`,
        why: "Метрика + связь с балансом." },
      { l: "e", p: 3, q: "A classmate trains 20 models and reports the best test accuracy as the final result. What is wrong?",
        a: `<p>Choosing the model by test accuracy turns the test set into a validation set: the result is <b>optimistically biased</b> (we picked the model that happened to fit the test set). Model selection must use a validation set or cross-validation; the test set is used once at the end.</p>`,
        why: "Test для выбора модели = утечка." }
    ] }
] }
];
