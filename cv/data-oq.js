// Computer Vision: открытые вопросы к мидтерму по лекциям 1–4.2 и практическим темам (OpenCV, дизайн системы).
// Формат: { l: лекция, p: 1 если тема вероятна на мидтерме, q: вопрос (EN), ru: суть по-русски,
//           a: образец ответа (EN, HTML), k: что обязательно упомянуть }.
// id вопроса = лекция + ":" + номер внутри лекции, поэтому новые вопросы добавляй в конец своей лекции.
window.CV_LECS = [
  { k: "1", s: "L1", t: "Introduction & History", ru: "Что такое CV, таймлайн, почему DL взлетел" },
  { k: "2", s: "L2", t: "Image Classification", ru: "Semantic gap, kNN, hyperparameters, splits" },
  { k: "3", s: "L3", t: "Linear Classifiers", ru: "Wx + b, perceptron, logistic, SVM, losses, метрики" },
  { k: "4.1", s: "L4.1", t: "Neural Networks", ru: "Нейрон, слои, активации, forward pass" },
  { k: "4.2", s: "L4.2", t: "Backpropagation", ru: "Chain rule, gates, shapes, gradient check" },
  { k: "ocv", s: "OCV", t: "Image Processing & OpenCV", ru: "BGR, resize, blur, Canny, preprocessing" },
  { k: "sys", s: "SYS", t: "Designing a CV System", ru: "Датасет, split, метрики, overfitting, domain shift" }
];

window.CV_OQ = [
/* ---------------- L1 ---------------- */
{ l: "1", p: 0,
  q: "What is computer vision, and how is it related to machine learning and deep learning?",
  ru: "CV — системы, которые обрабатывают, воспринимают и рассуждают о визуальных данных. DL ⊂ ML ⊂ AI; курс на пересечении CV и DL.",
  a: `<p><b>Computer vision</b> is building artificial systems that <b>process, perceive, and reason about visual data</b> (images and video). <b>Machine learning</b> is building systems that learn from data and experience; <b>deep learning</b> is the part of ML that uses hierarchical algorithms with many layers, loosely inspired by the brain. All of them are part of <b>artificial intelligence</b>.</p>
<p>Modern computer vision is mostly solved with deep learning, so this course is the intersection of CV and DL. Other AI areas that use deep learning are NLP, speech recognition and robotics.</p>`,
  k: ["process, perceive, reason about visual data", "DL ⊂ ML ⊂ AI", "CV ∩ DL"] },

{ l: "1", p: 1,
  q: "What did Hubel and Wiesel discover, and how did it influence neural network design?",
  ru: "1959: нейроны зрительной коры кошки — simple, complex, hypercomplex cells, иерархия. Повлияло на Neocognitron (conv + pool) и CNN.",
  a: `<p>In 1959 Hubel and Wiesel measured the response of neurons in a cat's visual cortex to light stimuli. They found <b>simple cells</b> responding to the orientation of light, <b>complex cells</b> responding to orientation and movement, and <b>hypercomplex cells</b> responding to movement with an end point. Vision is processed <b>hierarchically</b>: simple local features are combined into more complex ones.</p>
<p>This inspired Fukushima's <b>Neocognitron</b> (1980), which interleaved simple cells (≈ convolution) and complex cells (≈ pooling), and later <b>LeNet</b> (1998) and <b>AlexNet</b> (2012) — modern convolutional networks.</p>`,
  k: ["1959, cat visual cortex", "simple / complex / hypercomplex cells", "hierarchy", "Neocognitron → CNN"] },

{ l: "1", p: 1,
  q: "What is the perceptron, and why did Minsky and Papert's result cause disillusionment?",
  ru: "Rosenblatt ~1958, первый обучаемый алгоритм, по сути линейный классификатор. 1969: не может выучить XOR → AI winter для нейросетей.",
  a: `<p>The <b>perceptron</b> (Frank Rosenblatt, ~1958) was one of the earliest algorithms that could learn from data. It was implemented in hardware (weights in potentiometers, a 20×20 = 400-pixel camera) and learned to recognize letters. Today we recognize it as a <b>linear classifier</b>.</p>
<p>In 1969 <b>Minsky and Papert</b> showed that a perceptron <b>cannot learn the XOR function</b>, because XOR is not linearly separable — no single line separates (0,0),(1,1) from (0,1),(1,0). This showed the limits of single-layer models and caused a lot of disillusionment in the field.</p>`,
  k: ["Rosenblatt 1958", "learns from data", "linear classifier", "XOR not linearly separable"] },

{ l: "1", p: 0,
  q: "Describe David Marr's stages of visual representation.",
  ru: "1970s: input image → primal sketch (края, blobs) → 2½-D sketch (ориентация поверхностей, глубина) → 3-D model.",
  a: `<p>In the 1970s David Marr proposed that vision builds representations in stages:</p>
<ol><li><b>Input image</b> — perceived intensities.</li><li><b>Primal sketch</b> — zero crossings, blobs, edges, bars, ends, curves, boundaries.</li><li><b>2½-D sketch</b> — local surface orientation and discontinuities in depth and surface orientation (viewer-centred).</li><li><b>3-D model representation</b> — 3-D models organised hierarchically from surface and volumetric primitives.</li></ol>`,
  k: ["primal sketch", "2½-D sketch", "3-D model", "edges → depth → objects"] },

{ l: "1", p: 1,
  q: "Why did deep learning become successful around 2012? Name the key event.",
  ru: "AlexNet на ImageNet в 2012. Три фактора: данные (ImageNet), вычисления (GPU), алгоритмы (backprop, CNN).",
  a: `<p>The key event was <b>AlexNet</b> (Krizhevsky, Sutskever, Hinton, 2012), a convolutional network that won the <b>ImageNet</b> classification challenge by a large margin. Three factors came together:</p>
<ul><li><b>Data:</b> large labelled datasets such as ImageNet (1000 classes, ~1.4M images, 2009).</li><li><b>Computation:</b> GPUs gave far more GigaFLOPs per dollar than CPUs (AlexNet was trained on a GeForce GTX 580).</li><li><b>Algorithms:</b> backpropagation (1986) and convolutional networks (LeNet 1998), plus ideas like ReLU.</li></ul>
<p>Since then ConvNets are used for classification, detection, segmentation, captioning and more; in 2018 Bengio, Hinton and LeCun received the Turing Award.</p>`,
  k: ["AlexNet 2012", "ImageNet", "data + computation (GPU) + algorithms"] },

{ l: "1", p: 0,
  q: "Name several computer vision approaches from before deep learning and what each tried to do.",
  ru: "Roberts 1963 (края блоков), recognition via parts (generalized cylinders, pictorial structures), Canny 1986 (края), Normalized Cuts 1997 (группировка), SIFT 1999 (matching), Viola–Jones 2001 (лица).",
  a: `<ul><li><b>Larry Roberts (1963):</b> block world — differentiate the image to find edges and feature points.</li>
<li><b>Recognition via parts (1970s):</b> generalized cylinders (Brooks &amp; Binford), pictorial structures (Fischler &amp; Elschlager).</li>
<li><b>Recognition via edge detection (1980s):</b> Canny edge detector (1986), Lowe (1987).</li>
<li><b>Recognition via grouping (1990s):</b> Normalized Cuts (Shi &amp; Malik, 1997) for segmentation.</li>
<li><b>Recognition via matching (2000s):</b> SIFT features (Lowe, 1999).</li>
<li><b>Face detection:</b> Viola &amp; Jones (2001), one of the first successful uses of machine learning in vision.</li></ul>`,
  k: ["Roberts", "parts", "Canny edges", "Normalized Cuts", "SIFT", "Viola–Jones"] },

/* ---------------- L2 ---------------- */
{ l: "2", p: 1,
  q: "What is the semantic gap in image classification? Name the main challenges a classifier must handle.",
  ru: "Компьютер видит сетку чисел 0–255 (например 800×600×3), а не «кошку». Challenges: viewpoint, intraclass variation, fine-grained, clutter, illumination, deformation, occlusion.",
  a: `<p>Image classification assigns an image to one of a fixed set of categories. The <b>semantic gap</b> is the difference between what a human sees (a cat) and what the computer sees: just a big grid of numbers between 0 and 255, e.g. <code>800 × 600 × 3</code> for an RGB image.</p>
<p>The same object can produce completely different pixel values because of:</p>
<ul><li><b>Viewpoint variation</b> — all pixels change when the camera moves;</li><li><b>Intraclass variation</b> — cats look very different from each other;</li><li><b>Fine-grained categories</b> — e.g. Maine Coon vs Ragdoll;</li><li><b>Background clutter</b>, <b>illumination changes</b>, <b>deformation</b>, <b>occlusion</b>.</li></ul>
<p>A good classifier must be <b>invariant</b> to all of these.</p>`,
  k: ["grid of numbers 0–255", "H × W × 3", "viewpoint, illumination, occlusion, deformation…", "invariance"] },

{ l: "2", p: 1,
  q: "Describe the data-driven approach to image classification. Why can't we hard-code a classifier?",
  ru: "Нет очевидного алгоритма «найди кошку» (края и углы не работают). Поэтому: собрать датасет → обучить ML-модель → оценить на новых изображениях.",
  a: `<p>Unlike sorting numbers, there is <b>no obvious algorithm</b> for recognizing a cat: rules based on edges and corners are brittle and must be rewritten for every class. The <b>data-driven approach</b> instead:</p>
<ol><li><b>Collect</b> a dataset of images and labels;</li><li>Use machine learning to <b>train</b> a classifier: <code>train(images, labels) → model</code>;</li><li><b>Evaluate</b> the classifier on new images: <code>predict(model, test_images) → labels</code>.</li></ol>`,
  k: ["no hard-coded rules", "collect dataset", "train", "evaluate on new images"] },

{ l: "2", p: 1,
  q: "How does the k-Nearest Neighbor classifier work? What are its training and prediction complexities?",
  ru: "Запоминает все примеры; для теста находит K ближайших по distance metric и берёт majority vote. Train O(1), predict O(N) — плохо.",
  a: `<p><b>Training:</b> memorize all training images and labels. <b>Prediction:</b> compute the distance (L1 or L2) from the test image to every training image, take the <b>K closest</b>, and return the <b>majority vote</b> of their labels (K = 1 copies the label of the single nearest neighbor).</p>
<p>Training is <b>O(1)</b>, prediction is <b>O(N)</b>. This is bad: we can afford slow training, but we need fast prediction. Larger K smooths the decision boundaries and reduces the effect of outliers; with K &gt; 1 ties must be broken somehow.</p>`,
  k: ["memorize training data", "K closest, majority vote", "train O(1), predict O(N)", "larger K → smoother boundary"] },

{ l: "2", p: 1,
  q: "Compare the L1 and L2 distance metrics.",
  ru: "L1 = Σ|разностей| (Manhattan), зависит от системы координат; L2 = √Σ разностей² (Euclidean), не зависит от поворота. Выбор метрики — hyperparameter.",
  a: `<p><b>L1 (Manhattan):</b> <code>d₁(I₁, I₂) = Σₚ |I₁ᵖ − I₂ᵖ|</code> — sum of absolute pixel differences. It depends on the coordinate system: decision boundaries tend to follow the axes.</p>
<p><b>L2 (Euclidean):</b> <code>d₂(I₁, I₂) = √(Σₚ (I₁ᵖ − I₂ᵖ)²)</code>. It does not change if the coordinate axes are rotated, and penalizes large differences more.</p>
<p>The choice of metric is a <b>hyperparameter</b>. Example: for (1, 2) and (4, 6): L1 = 3 + 4 = 7, L2 = √(9 + 16) = 5.</p>`,
  k: ["L1 = Σ|d|", "L2 = √Σd²", "L1 depends on axes", "hyperparameter"] },

{ l: "2", p: 1,
  q: "What are hyperparameters? Explain how to set them properly using train, validation and test sets.",
  ru: "Выбираются до обучения, не учатся из данных (K, метрика). Не на train (K=1 идеален), не на test (утечка); выбирать на validation, test один раз в конце; cross-validation для малых данных.",
  a: `<p><b>Hyperparameters</b> are choices about the learning algorithm that are <b>not learned from the training data</b> but set before learning, e.g. K and the distance metric in kNN, C in SVM, the learning rate.</p>
<ul><li>Idea 1 — pick what works best on the training data: <b>bad</b>, K = 1 is always perfect on training data.</li>
<li>Idea 2 — split train/test and pick the best on test: <b>bad</b>, we no longer know how the model performs on truly new data.</li>
<li>Idea 3 — split <b>train / validation / test</b>, choose hyperparameters on validation and evaluate on test <b>once at the very end</b>: <b>good</b>.</li>
<li>Idea 4 — <b>cross-validation</b>: split into folds, use each fold as validation in turn and average. Useful for small datasets, rarely used in deep learning because it is expensive.</li></ul>`,
  k: ["not learned from data", "choose on validation", "test once at the end", "cross-validation for small data"] },

{ l: "2", p: 0,
  q: "What is the curse of dimensionality, and why is kNN on raw pixels rarely used?",
  ru: "Для покрытия пространства нужно экспоненциально много точек (4^d; 2^(32·32) ≈ 10^308 бинарных картинок). kNN на пикселях: медленно, L2 неинформативна (сдвиг, рамка, оттенок дают одно расстояние).",
  a: `<p>The <b>curse of dimensionality</b>: to cover a space uniformly, the number of training points needed grows <b>exponentially</b> with the dimension (4 points in 1D, 4² in 2D, 4³ in 3D…). There are about 2^(32·32) ≈ 10^308 possible 32×32 binary images — far more than the ~10^97 elementary particles in the visible universe.</p>
<p>kNN on raw pixels is seldom used because it is <b>very slow at test time</b> and <b>pixel distances are not informative</b>: boxed, shifted and tinted versions of an image can all have the same L2 distance to the original. kNN works well on <b>ConvNet features</b> instead.</p>`,
  k: ["points grow exponentially with dimension", "slow at test time", "pixel L2 not semantic", "kNN on ConvNet features"] },

{ l: "2", p: 0,
  q: "Describe the CIFAR-10 and ImageNet datasets. What is top-5 accuracy?",
  ru: "CIFAR-10: 10 классов, 32×32×3, 50k train / 10k test. ImageNet: 1000 классов, ~1.3M train, 50k val, 100k test, ~256×256; top-5 — верный класс среди 5 предсказанных.",
  a: `<p><b>CIFAR-10:</b> 10 classes, 50,000 training images (5,000 per class) and 10,000 test images, each <b>32×32 RGB</b> (3072 numbers). CIFAR-100 has 100 classes in 20 superclasses.</p>
<p><b>ImageNet:</b> 1000 classes, ~1.3M training images, 50K validation and 100K test images (test labels are secret); images vary in size and are usually resized to 256×256.</p>
<p><b>Top-5 accuracy:</b> the algorithm predicts 5 labels for each image, and the prediction counts as correct if one of them is the true label. (MNIST: 10 digits, 28×28 grayscale — the "Drosophila of CV".)</p>`,
  k: ["CIFAR-10: 10 classes, 32×32×3, 50k/10k", "ImageNet: 1000 classes, 1.3M", "top-5 accuracy"] },

{ l: "2", p: 0,
  q: "Why is image classification called a building block for other vision tasks? Give examples.",
  ru: "Detection = классификация регионов (background, horse, person); captioning = классификация следующего слова; Go = классификация хода.",
  a: `<p>Many tasks can be reduced to repeated classification:</p>
<ul><li><b>Object detection:</b> classify image regions into background, horse, person, car…</li><li><b>Image captioning:</b> at each step classify which word to say next (riding, horse, man, &lt;STOP&gt;).</li><li><b>Playing Go:</b> classify which board position (1,1)…(19,19) to play next.</li></ul>
<p>Classification is also directly useful: medical imaging, galaxy classification, whale recognition.</p>`,
  k: ["detection = classify regions", "captioning = classify next word", "Go = classify next move"] },

/* ---------------- L3 ---------------- */
{ l: "3", p: 1,
  q: "In a linear classifier s = Wx + b, what do W and b represent? What are their shapes for CIFAR-10?",
  ru: "W — по строке весов на класс (шаблон класса, вклад каждого пикселя), b — сдвиг/порог класса. CIFAR-10: x 3072, W 10×3072, b 10, s 10.",
  a: `<p><b>W</b> is the weight matrix with <b>one row per class</b>. Each weight says how much a feature (pixel) contributes to the class score and in which direction. Each row can be viewed as a <b>template</b> of its class: the score is the dot product, i.e. how well the image matches the template. Geometrically, each row is perpendicular to that class's decision hyperplane.</p>
<p><b>b</b> is the bias vector, one value per class, added independently of the input. It <b>shifts the decision boundary</b> away from the origin and works as a threshold / prior preference for the class.</p>
<p>For CIFAR-10: <code>x</code> = 32·32·3 = 3072, <code>W</code> = 10 × 3072, <code>b</code> = 10, <code>s</code> = 10 scores; the prediction is <code>argmax(s)</code>. W and b are the learned <b>parameters</b>.</p>`,
  k: ["row of W per class", "template / feature importance", "b shifts boundary", "W: 10×3072, b: 10"] },

{ l: "3", p: 1,
  q: "Explain the geometric interpretation of a linear classifier. How do w and b define the decision boundary?",
  ru: "Граница — гиперплоскость w·x + b = 0; w перпендикулярен ей и указывает на класс +1; b сдвигает; расстояние |w·x + b|/‖w‖.",
  a: `<p>The classifier computes <code>f(x) = w·x + b</code> and predicts <code>sign(f(x))</code>. The <b>decision boundary</b> is the set where <code>w·x + b = 0</code>: a line in 2D, a plane in 3D, a <b>hyperplane</b> in d dimensions. One side is class +1, the other −1.</p>
<p><b>w</b> is perpendicular to the boundary and points towards the +1 side; <b>b</b> shifts the boundary away from the origin. The distance from x to the boundary is <code>|w·x + b| / ‖w‖</code>, and its size hints at confidence. Scaling w and b by the same constant does not move the boundary. Learning = choosing where the hyperplane goes.</p>`,
  k: ["w·x + b = 0", "hyperplane", "w ⊥ boundary", "b shifts", "distance |f(x)|/‖w‖"] },

{ l: "3", p: 1,
  q: "Why can't a single linear classifier solve XOR? How can this limitation be overcome?",
  ru: "XOR не линейно разделим: ни одна прямая не отделит (0,0),(1,1) от (0,1),(1,0). Решение: нелинейные признаки (x₁x₂, x²) или нейросеть с активациями.",
  a: `<p>A linear classifier can only draw one straight hyperplane. In XOR, (0,0) and (1,1) belong to one class and (0,1), (1,0) to the other: the classes lie on opposite diagonals, so <b>no single line</b> separates them — the data is <b>not linearly separable</b> (Minsky &amp; Papert, 1969). The same holds for concentric circles.</p>
<p>Fixes: (1) <b>feature transforms</b> — add <code>x₁², x₁x₂, x₂²</code>; the product <code>x₁·x₂</code> is 1 only for (1,1), and with degree-2 features logistic regression reaches 100% on XOR; a circle <code>x₁² + x₂² = r²</code> becomes a hyperplane. (2) A <b>neural network</b> with hidden layers and non-linear activations.</p>`,
  k: ["not linearly separable", "XOR diagonals", "feature map x₁x₂", "neural network with activation"] },

{ l: "3", p: 1,
  q: "Describe the perceptron learning rule. What are its guarantees and limitations?",
  ru: "w = 0; если y(w·x + b) ≤ 0 → w += ηyx, b += ηy; повторять до прохода без ошибок. Сходится на separable (≤ (R/γ)² ошибок), иначе нет; не лучшая граница, нет вероятностей.",
  a: `<ol><li>Start with <code>w = 0, b = 0</code>, labels <code>y ∈ {−1, +1}</code>.</li><li>For each example compute <code>yᵢ(w·xᵢ + b)</code>.</li><li>If it is ≤ 0 (a mistake), update <code>w ← w + η yᵢ xᵢ</code>, <code>b ← b + η yᵢ</code>.</li><li>Repeat passes until a pass has no mistakes.</li></ol>
<p>A missed positive pulls w towards x; a missed negative pushes it away. <b>Guarantee</b> (Novikoff, 1962): if the data is separable with margin γ and ‖x‖ ≤ R, the perceptron makes at most <b>(R/γ)²</b> mistakes. <b>Limits:</b> on non-separable data it never settles; on separable data it stops at <i>some</i> separator, not the best one; it gives no probabilities; it cannot solve XOR.</p>`,
  k: ["update only on mistakes", "w += ηyx, b += ηy", "converges if separable", "no probabilities, not best boundary"] },

{ l: "3", p: 1,
  q: "How does logistic regression turn a score into a probability? What loss does it use and why?",
  ru: "σ(w·x + b) = P(y=1|x), score 0 → 0.5. Binary cross-entropy: штрафует уверенные ошибки, convex, градиент (p − y)x.",
  a: `<p>Logistic regression applies the sigmoid to the linear score: <code>P(y = 1 | x) = σ(w·x + b)</code>, <code>σ(z) = 1/(1 + e⁻ᶻ)</code>. Score 0 gives probability 0.5, so the boundary is the same hyperplane, but the output is a probability in (0, 1).</p>
<p>It is trained with <b>binary cross-entropy</b>: <code>L = −(1/n) Σ [y log p + (1 − y) log(1 − p)]</code>. Confident mistakes cost the most (for y = 1: p = 0.9 → 0.105, p = 0.1 → 2.303); the loss is <b>convex</b> (one global minimum); it is the negative log-likelihood of a Bernoulli model. The gradient is simple — <code>∇w = Xᵀ(p − y)/n</code> — "error × input", and every example contributes, unlike the perceptron.</p>`,
  k: ["sigmoid", "P(y=1|x)", "binary cross-entropy", "convex", "gradient (p − y)x"] },

{ l: "3", p: 1,
  q: "What is a linear SVM? Explain the margin, support vectors and the role of C.",
  ru: "Выбирает границу с максимальным margin (2/‖w‖); границу задают только support vectors. Soft margin: ½‖w‖² + CΣhinge. Большое C → узкий margin, overfit; малое → шире, глаже.",
  a: `<p>Many lines can separate the data; the <b>SVM</b> picks the one with the <b>largest margin</b> — the widest "street" between the classes, width <code>2/‖w‖</code>. Hard margin: <code>min ½‖w‖²</code> subject to <code>yᵢ(w·xᵢ + b) ≥ 1</code>. Only the points on the margin, the <b>support vectors</b>, determine the boundary.</p>
<p><b>Soft margin</b> allows violations: <code>min ½‖w‖² + C Σ max(0, 1 − yᵢ(w·xᵢ + b))</code> (hinge loss). <b>Large C:</b> few violations, narrow margin — risk of overfitting. <b>Small C:</b> wider margin, more violations — smoother model. An SVM outputs raw scores (<code>decision_function</code>), not probabilities.</p>`,
  k: ["maximum margin 2/‖w‖", "support vectors", "hinge loss", "C trade-off"] },

{ l: "3", p: 1,
  q: "What is a loss function? Write the multiclass SVM loss and explain it.",
  ru: "Loss измеряет, насколько плох W; L = средний data loss + λR(W). SVM: Lᵢ = Σ_{j≠y} max(0, sⱼ − s_y + Δ): верный класс должен быть выше остальных на margin.",
  a: `<p>A <b>loss function</b> tells how good the current classifier is: low loss = good classifier. Over the dataset: <code>L(W) = (1/N) Σ Lᵢ(f(xᵢ, W), yᵢ) + λR(W)</code> — data loss plus regularization. Training means finding the W that minimizes L.</p>
<p><b>Multiclass SVM (hinge) loss:</b> <code>Lᵢ = Σ_{j≠yᵢ} max(0, sⱼ − s_{yᵢ} + Δ)</code>, usually Δ = 1. The correct class should score higher than every other class by at least the margin; each wrong class that comes within Δ adds a penalty. Example: scores (2.1, 1.7, 0.4), true class 2nd: <code>max(0, 2.1 − 1.7 + 1) + max(0, 0.4 − 1.7 + 1) = 1.4 + 0 = 1.4</code>. Min loss 0, max ∞; with all scores ≈ 0 the loss ≈ C − 1.</p>`,
  k: ["low loss = good", "data loss + regularization", "max(0, sⱼ − s_y + 1)", "margin Δ"] },

{ l: "3", p: 1,
  q: "Explain softmax and cross-entropy loss. What is the expected loss at initialization?",
  ru: "Softmax: exp и нормировка → вероятности, сумма 1. CE = −log p верного класса. При scores ≈ 0: p = 1/C, L = log C (3 → 1.099, 10 → 2.303).",
  a: `<p><b>Softmax</b> interprets raw scores as probabilities: <code>P(Y = k | x) = e^{sₖ} / Σⱼ e^{sⱼ}</code> — exponentiate (all positive), then normalize (sum to 1). Example: scores (2.8, 1.2, −0.9) → (16.445, 3.320, 0.407) / 20.171 → (0.815, 0.165, 0.020).</p>
<p><b>Cross-entropy loss:</b> <code>Lᵢ = −log P(Y = yᵢ | xᵢ)</code> — maximize the probability of the correct class. Min 0 (only if P = 1), max ∞. At initialization all scores ≈ 0, so each P = 1/C and <b>L ≈ log C</b> (3 classes: 1.099; 10 classes: 2.303) — a sanity check. For numerical stability subtract max(s) before exponentiating.</p>`,
  k: ["exp then normalize", "sum to 1", "−log p of true class", "init loss = log C", "subtract max"] },

{ l: "3", p: 1,
  q: "Compare the multiclass SVM loss with cross-entropy loss.",
  ru: "Обе на тех же scores. SVM удовлетворяется, когда margin выполнен (loss 0), CE никогда не 0 и всегда тянет верный класс выше; CE даёт вероятности, default для классификации.",
  a: `<p>Both use the same scores <code>s = Wx + b</code>; only the loss differs.</p>
<ul><li><b>SVM loss</b> is satisfied once the correct class beats others by the margin: scores [5, 2, 1], [5, 3.9, 3.9] and [5, −5, −5] all give loss 0. Small changes in scores do not change it.</li>
<li><b>Cross-entropy</b> is never fully satisfied (0.066, 0.510, 0.000 for the same examples): it always wants the correct class further ahead and gives a gradient even for correct examples.</li>
<li>Cross-entropy outputs <b>probabilities</b> and is the default for classification; hinge gives a maximum margin.</li></ul>`,
  k: ["same scores, different loss", "SVM = 0 after margin", "CE never zero", "CE gives probabilities"] },

{ l: "3", p: 0,
  q: "Why is cross-entropy preferred over squared error for classification?",
  ru: "Через sigmoid при уверенной ошибке (p = 0.01, y = 1) градиент MSE ≈ 0.02, у CE ≈ 0.99 — в 50 раз сильнее; MSE через sigmoid не convex.",
  a: `<p>With a sigmoid output and a confidently wrong prediction (y = 1, p = 0.01):</p>
<ul><li>Squared error: <code>∂L/∂z = 2(p − y)·p(1 − p) ≈ 0.020</code> — the sigmoid's flat tail kills the gradient exactly when the model is most wrong.</li>
<li>Cross-entropy: <code>∂L/∂z = p − y ≈ −0.990</code> — about 50× stronger.</li></ul>
<p>Also, squared error through a sigmoid is <b>not convex</b> in w (flat regions), while cross-entropy with a linear model is convex.</p>`,
  k: ["sigmoid saturation", "weak MSE gradient", "CE gradient p − y", "non-convex"] },

{ l: "3", p: 1,
  q: "What is regularization? Compare L1 and L2 regularization.",
  ru: "λR(W) в loss держит модель простой и снижает overfitting. L2 = Σw² — маленькие веса; L1 = Σ|w| — точные нули (отбор признаков). В sklearn C = 1/λ.",
  a: `<p><b>Regularization</b> adds a penalty <code>λR(W)</code> to the loss to keep the model simple and reduce overfitting; it also chooses among equally good W (if W gives zero loss, so does 2W).</p>
<ul><li><b>L2:</b> <code>R(W) = Σ w²</code> — shrinks all weights towards small values (weight decay).</li><li><b>L1:</b> <code>R(W) = Σ |w|</code> — drives many weights to <b>exactly zero</b>, i.e. selects features (at C = 0.1, L1 kept 7 of 30 features losing under one point of accuracy).</li></ul>
<p>In scikit-learn <code>C = 1/λ</code>: smaller C means a stronger penalty. Tune it with cross-validation.</p>`,
  k: ["penalty λR(W)", "prevents overfitting", "L2 small weights", "L1 exact zeros", "C = 1/λ"] },

{ l: "3", p: 1,
  q: "Why is accuracy not always enough? Define precision, recall and F1.",
  ru: "При дисбалансе и разной цене ошибок accuracy скрывает важные ошибки (98.2%, но 2 пропущенных рака). Precision = TP/(TP+FP), recall = TP/(TP+FN), F1 = 2PR/(P+R).",
  a: `<p>Accuracy counts all errors equally. With imbalanced classes or errors of different cost it hides what matters: on breast-cancer data a model had <b>98.2% accuracy</b> but missed <b>2 cancers</b>.</p>
<ul><li><b>Precision</b> = <code>TP / (TP + FP)</code> — of the predicted positives, how many are correct.</li><li><b>Recall</b> = <code>TP / (TP + FN)</code> — of the actual positives, how many were found (malignant: 40/42 = 0.952).</li><li><b>F1</b> = <code>2PR / (P + R)</code> — harmonic mean.</li></ul>
<p>The confusion matrix shows all of them; ROC AUC evaluates ranking at every threshold, and the decision threshold can be moved to trade precision for recall (a business choice).</p>`,
  k: ["imbalanced / unequal cost", "precision TP/(TP+FP)", "recall TP/(TP+FN)", "F1", "threshold"] },

{ l: "3", p: 0,
  q: "Why should features be scaled before training a linear classifier?",
  ru: "Признаки от тысячных до тысяч → градиенты и штрафы неравные, медленная сходимость. StandardScaler: 0.947 → 0.982. Fit scaler только на train.",
  a: `<p>When features range from thousandths to thousands, gradients and regularization penalties treat them unequally: optimization converges slowly or not at all, and the penalty shrinks small-scale features too much. On breast-cancer data: raw features → 0.947 test accuracy and a ConvergenceWarning; with <code>StandardScaler</code> → 0.982 and fast convergence.</p>
<p>Rule: <b>fit the scaler on training data only</b> and apply the same transform to validation/test (a pipeline does this automatically); otherwise test information leaks into training.</p>`,
  k: ["different feature ranges", "convergence", "StandardScaler", "fit on train only"] },

{ l: "3", p: 0,
  q: "Compare generative and discriminative linear classifiers using LDA and logistic regression.",
  ru: "LDA — generative: каждый класс Gaussian с общей Σ → линейная граница w = Σ⁻¹(μ₁ − μ₀), closed form. Logistic/SVM — discriminative: моделируют границу напрямую, меньше предположений.",
  a: `<p><b>LDA (generative):</b> assumes each class is Gaussian with its own mean μₖ and a shared covariance Σ, models how x is distributed in each class, and derives the boundary by Bayes' rule. The result is linear: <code>w = Σ⁻¹(μ₁ − μ₀)</code>. Closed form, no iterations.</p>
<p><b>Logistic regression and SVM (discriminative):</b> model the boundary / P(y|x) directly, with fewer assumptions about the data. On the breast-cancer data all five linear models were within about 2 points (logistic 0.981, LDA 0.960) — all draw a hyperplane, only the loss differs.</p>`,
  k: ["generative models p(x|y)", "shared covariance", "discriminative models boundary", "all produce a hyperplane"] },

{ l: "3", p: 0,
  q: "What are the strengths and limitations of linear classifiers?",
  ru: "Плюсы: быстрые, интерпретируемые, сильный baseline (текст), вероятности, мало hyperparameters. Минусы: только прямые границы, нужен feature engineering, чувствительны к масштабу и корреляциям.",
  a: `<p><b>Strengths:</b> fast to train and predict; weights are easy to explain; strong baseline in high dimensions (e.g. TF-IDF text); probabilities with logistic regression; few hyperparameters (mainly C).</p>
<p><b>Limits:</b> only straight boundaries in the given features (one template per class); curved structure needs feature engineering; sensitive to feature scale; correlated features give unstable weights; perceptron and SVM give no probabilities. For images, one template per class is too weak — this motivates neural networks.</p>`,
  k: ["fast, interpretable", "strong baseline", "only linear boundaries", "one template per class"] },

/* ---------------- L4.1 ---------------- */
{ l: "4.1", p: 1,
  q: "Compare a biological neuron with an artificial neuron.",
  ru: "Дендриты → входы, сила синапса → веса, тело клетки → взвешенная сумма, порог срабатывания → активация, аксон → выход. Вдохновлены мозгом, но не модель мозга.",
  a: `<table><thead><tr><th>Biological</th><th>Artificial</th></tr></thead><tbody>
<tr><td>Dendrites receive signals</td><td>Inputs x₁…xₙ</td></tr><tr><td>Synapse strength (changes with experience)</td><td>Weights wᵢ (change during training)</td></tr><tr><td>Cell body integrates</td><td>Weighted sum Σwᵢxᵢ + b</td></tr><tr><td>Fires if threshold reached</td><td>Activation g(·)</td></tr><tr><td>Axon sends spike</td><td>Output a to the next layer</td></tr></tbody></table>
<p>Differences: ANNs need many labelled examples, are digital and run on GPUs, are mostly fixed after training and consume a lot of energy; the brain (~86 bn neurons, ~20 W) is electrochemical, massively parallel and learns continuously. Neural networks are <b>inspired by</b> the brain, not a model of it.</p>`,
  k: ["dendrites = inputs", "synapse = weight", "cell body = sum", "firing = activation", "inspired, not a model"] },

{ l: "4.1", p: 1,
  q: "Why is a non-linear activation function essential in a neural network?",
  ru: "Без активации слои схлопываются: W₂(W₁x) = (W₂W₁)x = W′x — это один линейный классификатор. Нелинейность даёт кривые границы и смысл глубине.",
  a: `<p>Without an activation, stacking linear layers gives <code>W₂(W₁x) = (W₂W₁)x = W′x</code>: the product of matrices is a single matrix, so <b>any stack of linear layers collapses into one linear layer</b> — a 100-layer network would still be a linear classifier with straight boundaries.</p>
<p>A non-linear activation (e.g. ReLU) between layers lets the network bend the decision boundary: the first layer learns many features/templates, and the second combines them non-linearly. This is what lets networks solve XOR or concentric circles. <b>Depth adds power only with an activation between layers.</b></p>`,
  k: ["W₂W₁ = W′", "collapses to linear", "curved boundaries", "depth needs activation"] },

{ l: "4.1", p: 1,
  q: "Compare common activation functions. Why is ReLU the default?",
  ru: "Sigmoid (0,1) и tanh (−1,1) насыщаются — градиент ≈ 0 на краях; ReLU max(0,z) дешёвый, наклон 1 при z>0, но может «умереть»; Leaky ReLU чинит; GELU в Transformers.",
  a: `<ul><li><b>Sigmoid</b> 1/(1 + e⁻ᶻ), range (0, 1): saturates, not zero-centred.</li><li><b>tanh</b>, range (−1, 1): zero-centred, still saturates.</li><li><b>ReLU</b> max(0, z), range [0, ∞): default — cheap, slope exactly 1 for positive inputs; units can "die" (always output 0).</li><li><b>Leaky ReLU</b> max(0.01z, z): fixes dead units.</li><li><b>GELU</b> z·Φ(z): standard in Transformers.</li></ul>
<p><b>Saturation</b> means the gradient is almost zero at the flat ends (σ′ = σ(1 − σ) ≈ 0.01 at σ = 0.99), so learning stalls. ReLU does not saturate for positive inputs, which is why deep networks train well with it. Rule: ReLU in hidden layers, sigmoid only at the output for binary tasks.</p>`,
  k: ["sigmoid/tanh saturate", "ReLU max(0, z)", "dead units → Leaky ReLU", "ReLU default in hidden layers"] },

{ l: "4.1", p: 1,
  q: "Describe the two-layer network f(x) = W₂·max(0, W₁x + b₁) + b₂ for CIFAR-10. How many parameters does it have, and why is it better than a linear classifier?",
  ru: "3072 → 100 hidden (ReLU) → 10. Параметры 3072·100 + 100 + 100·10 + 10 = 308 310. Первый слой — много шаблонов, второй их смешивает: несколько мод на класс.",
  a: `<p>Input: 32×32×3 = <b>3072</b> pixels. The first layer <code>W₁</code> (100 × 3072) with ReLU produces <b>100 hidden units</b>; the second layer <code>W₂</code> (10 × 100) produces <b>10 class scores</b>.</p>
<p>Parameters: <code>3072·100 + 100 + 100·10 + 10 = 308 310</code>.</p>
<p>A linear classifier has one template per class, so a horse facing left and one facing right are blended into a two-headed template. Here the first layer learns <b>100 templates</b>, and the second layer <b>mixes</b> them (horse = 0.7·left-facing + 0.6·right-facing), so one class can have several modes and boundaries can be curved.</p>`,
  k: ["3072 → 100 → 10", "308 310 parameters", "many templates", "second layer combines"] },

{ l: "4.1", p: 1,
  q: "Name the five components of a neural network. Which of them are learned?",
  ru: "Neurons, connections, weights & biases, propagation, learning rule. Учатся только веса и biases; остальное — design choices (hyperparameters).",
  a: `<ol><li><b>Neurons</b> — sum their inputs and apply an activation.</li><li><b>Connections</b> — carry outputs to the next layer.</li><li><b>Weights &amp; biases</b> — the learnable numbers, strength of each connection.</li><li><b>Propagation</b> — how values flow forward layer by layer.</li><li><b>Learning rule</b> — how weights change to reduce error (gradient descent).</li></ol>
<p>Only <b>weights and biases</b> are learned (parameters). Architecture, activation function and learning rate are design choices (hyperparameters).</p>`,
  k: ["neurons, connections, weights, propagation, learning rule", "only W and b learned", "hyperparameters chosen"] },

{ l: "4.1", p: 0,
  q: "Describe the training loop of a neural network.",
  ru: "Forward (предсказание) → loss (MSE/CE) → backward (chain rule, ∂L/∂w) → update w ← w − η∂L/∂w → repeat много эпох.",
  a: `<ol><li><b>Forward:</b> inputs flow through the layers to a prediction.</li><li><b>Loss:</b> measure the error, e.g. MSE or cross-entropy.</li><li><b>Backward:</b> backpropagation (chain rule) computes ∂L/∂w for every weight.</li><li><b>Update:</b> step against the gradient, <code>w ← w − η·∂L/∂w</code> (η = learning rate).</li><li><b>Repeat</b> for many epochs until the loss is low.</li></ol>
<p>In PyTorch: <code>loss = loss_fn(model(x), y)</code>, <code>opt.zero_grad()</code>, <code>loss.backward()</code>, <code>opt.step()</code>.</p>`,
  k: ["forward", "loss", "backward", "update w ← w − η∂L/∂w", "epochs"] },

{ l: "4.1", p: 0,
  q: "What are the main learning paradigms and network types, and where do they appear in computer vision?",
  ru: "Supervised (метки; классификация, детекция), unsupervised (структура без меток; autoencoders), reinforcement (награды; роботы). Типы: MLP, CNN, RNN/LSTM, Transformer, Autoencoder/GAN, Siamese.",
  a: `<p><b>Paradigms:</b> <b>supervised</b> — labelled pairs (x, y), most of CV (classification, detection); <b>unsupervised</b> — no labels, find structure (clusters, compressed representations; autoencoders, self-supervised learning); <b>reinforcement</b> — an agent acts and receives rewards (robotics, games).</p>
<p><b>Network types:</b> feedforward/MLP (fixed-size vectors), <b>CNN</b> (images, filters slide over the image), RNN/LSTM/GRU (sequences, hidden state), Transformer (attention between tokens/patches; ViT, DETR, SAM), autoencoder and GAN (compression, generation), Siamese (comparing two inputs, face verification).</p>`,
  k: ["supervised / unsupervised / reinforcement", "MLP, CNN, RNN, Transformer, GAN"] },

{ l: "4.1", p: 0,
  q: "What are the strengths and limitations of neural networks? How should overfitting be handled?",
  ru: "Плюсы: нелинейность, автоизвлечение признаков, GPU, обобщение. Минусы: дорого, black box, overfit, нужны большие данные. Против overfit — не уменьшать сеть, а большая сеть + регуляризация.",
  a: `<p><b>Strengths:</b> learn non-linear patterns; extract features automatically; parallel computation on GPUs; generalize to unseen data.</p>
<p><b>Limitations:</b> expensive to train; hard to interpret ("black box"); can overfit; need large, well-labelled datasets.</p>
<p>Practical tip: do <b>not</b> shrink the network to fight overfitting (small networks are harder to optimize and give worse results); use a <b>larger network with stronger regularization</b> (weight decay, dropout), plus more data / augmentation.</p>`,
  k: ["non-linear, automatic features", "expensive, black box", "overfitting", "big net + regularization"] },

/* ---------------- L4.2 ---------------- */
{ l: "4.2", p: 1,
  q: "What is backpropagation and why do we need it?",
  ru: "Алгоритм вычисления ∂L/∂w для всех весов за один forward + один backward (≈ 2–3 forward). Вручную невозможно, численно — 2 forward на вес (616 000 для 308 310 весов).",
  a: `<p>To update every weight with gradient descent we need <code>∂L/∂w</code> for each of possibly hundreds of thousands of weights (308 310 in the CIFAR two-layer net).</p>
<ul><li><b>By hand:</b> pages of algebra, redone for every architecture — infeasible.</li><li><b>Numerically:</b> two forward passes per weight ≈ 616 000 passes per update — far too slow.</li><li><b>Backpropagation:</b> represent the computation as a graph and apply the <b>chain rule</b> from the loss backwards; one forward and one backward pass give the gradients of <b>all</b> weights, costing about 2–3× a forward pass, because intermediate results are reused.</li></ul>`,
  k: ["∂L/∂w for every weight", "chain rule on a computational graph", "one forward + one backward", "numerical too slow"] },

{ l: "4.2", p: 1,
  q: "Explain the rule 'downstream = local × upstream' on a computational graph. Work through f = (x + y)·z for x = −2, y = 5, z = −4.",
  ru: "Каждый узел умножает пришедший сверху градиент на свою локальную производную. q = 3, f = −12; ∂f/∂z = q = 3, ∂f/∂q = z = −4, ∂f/∂x = ∂f/∂y = −4.",
  a: `<p>Break the computation into simple nodes. A node <code>z = f(x)</code> receives the <b>upstream</b> gradient ∂L/∂z, multiplies it by its <b>local</b> gradient ∂z/∂x, and passes the <b>downstream</b> gradient ∂L/∂x = (∂z/∂x)·(∂L/∂z) to its inputs. No node needs to know the rest of the network.</p>
<p><b>Forward:</b> q = x + y = 3, f = q·z = −12. <b>Backward</b> (start with ∂f/∂f = 1):</p>
<ul><li>Multiply node: ∂f/∂z = q = <b>3</b>, ∂f/∂q = z = −4.</li><li>Add node: ∂q/∂x = ∂q/∂y = 1 → ∂f/∂x = <b>−4</b>, ∂f/∂y = <b>−4</b>.</li></ul>
<p>Check: x + 0.01 → f = −12.04, change −0.04 = −4 × 0.01 ✔.</p>`,
  k: ["downstream = local × upstream", "q = 3, f = −12", "∂z = 3, ∂x = ∂y = −4", "numerical check"] },

{ l: "4.2", p: 1,
  q: "Describe how gradients flow through add, multiply, max and copy gates.",
  ru: "add — distributor (копирует градиент всем), multiply — swapper (upstream × другой вход), max — router (всё большему входу, как ReLU), copy — adder (градиенты веток суммируются).",
  a: `<ul><li><b>Add → distributor:</b> passes the upstream gradient unchanged to every input.</li><li><b>Multiply → swapper:</b> the gradient for one input is upstream × the <b>other</b> input.</li><li><b>Max → router:</b> all gradient goes to the larger input, zero to the rest; ReLU works this way (gradient passes only where the input was positive).</li><li><b>Copy → adder:</b> when a value feeds several branches, their gradients are <b>summed</b> (use <code>+=</code>).</li></ul>
<p>A sigmoid can be one node with local gradient σ(1 − σ); at σ = 0.99 it is ≈ 0.01 — saturation.</p>`,
  k: ["add distributes", "multiply swaps", "max routes (ReLU)", "copy adds"] },

{ l: "4.2", p: 1,
  q: "How is backpropagation done for y = Wx with matrices? What is the shape rule?",
  ru: "∂L/∂W = (∂L/∂y)·xᵀ, ∂L/∂x = Wᵀ·(∂L/∂y). Градиент имеет ту же форму, что и переменная; Jacobian не строят; забыл формулу — подгони транспонирования по shapes.",
  a: `<p>For <code>y = Wx</code>: <code>∂L/∂W = (∂L/∂y)·xᵀ</code> and <code>∂L/∂x = Wᵀ·(∂L/∂y)</code>.</p>
<p><b>Shape rule:</b> a gradient always has the same shape as its variable. Example (last CIFAR layer): W is 10×3072, x is 3072×1, ∂L/∂y is 10×1 → (10×1)·(1×3072) = 10×3072 ✔ matches W.</p>
<p>The full Jacobian (10 × 30 720 entries, mostly zeros) is never built. If you forget the formula, arrange the transposes until the shapes match.</p>`,
  k: ["(∂L/∂y)xᵀ", "Wᵀ(∂L/∂y)", "gradient has variable's shape", "no full Jacobian"] },

{ l: "4.2", p: 0,
  q: "Walk through the backward pass of the spam network (output 0.636, y = 1). What patterns appear?",
  ru: "L = −ln 0.636 = 0.452; ∂L/∂z = p − y = −0.364; выходные веса −0.364·[0.8, 0]; через ReLU H2 блокирован; W₁ строка H1 −0.255·[1,0,1]; 0.7 → 0.729.",
  a: `<ol><li>Loss: <code>L = −ln 0.636 = 0.452</code>.</li><li>Sigmoid + BCE: <code>∂L/∂z = p − y = −0.364</code>.</li><li>Output weights (multiply swaps in hidden outputs): <code>−0.364 × [0.8, 0] = [−0.291, 0]</code>.</li><li>Hidden outputs: <code>−0.364 × [0.7, 0.2] = [−0.255, −0.073]</code>.</li><li>Through ReLU: H2's input was −0.1, so its gradient is <b>blocked</b> → [−0.255, 0].</li><li>W₁ row H1: <code>−0.255 × [1, 0, 1]</code> — the weight for "win = 0" gets no update.</li><li>Update with η = 0.1: <code>0.7 − 0.1·(−0.291) = 0.729</code>, so the network becomes more confident the email is spam.</li></ol>`,
  k: ["p − y = −0.364", "multiply swaps", "ReLU blocks negative input", "zero input → no update", "0.7 → 0.729"] },

{ l: "4.2", p: 1,
  q: "What is gradient checking and what are the common backpropagation mistakes?",
  ru: "Сравнить аналитический градиент с численным [f(w+h) − f(w−h)]/2h, h ≈ 1e-5, rel. error < 1e-7. Ошибки: = вместо += на ветках, нет cache, неверная маска ReLU, нет zero_grad.",
  a: `<p><b>Gradient check:</b> compare the analytic gradient with the numerical centred difference <code>[f(w + h) − f(w − h)] / 2h</code>, h ≈ 1e-5, on a few random weights. Relative error <code>|a − n| / max(|a|, |n|)</code> below 1e-7 means backward is correct; ~1e-4 is acceptable with ReLU kinks; 1e-2 means a bug. Numerical: slow but easy to get right (reference); analytic: fast and exact but easy to break.</p>
<p><b>Common mistakes:</b> overwriting gradients at branches (use <code>+=</code>, not <code>=</code>); forgetting to cache the inputs during forward; wrong ReLU mask (pass the gradient where the input was positive); forgetting <code>zero_grad()</code> in PyTorch, which accumulates gradients across steps.</p>`,
  k: ["centred difference", "relative error < 1e-7", "+= at branches", "cache, ReLU mask, zero_grad"] },

{ l: "4.2", p: 0,
  q: "How are layers implemented in a modular way for backpropagation?",
  ru: "У каждого слоя forward (считает выход и кэширует входы) и backward(dout) (возвращает local × upstream). Autograd в PyTorch хранит граф и вызывает backward в обратном порядке.",
  a: `<p>Every layer (Linear, ReLU, Multiply, loss…) implements two methods:</p>
<ul><li><code>forward(inputs)</code> — computes the output and <b>caches</b> what backward will need (e.g. x and y for a multiply).</li><li><code>backward(dout)</code> — takes the upstream gradient and returns <b>local × upstream</b> for each input (for multiply: <code>dx = dout·y</code>, <code>dy = dout·x</code>).</li></ul>
<p>A network is a chain of such layers: forward calls them in order, backward in reverse order. PyTorch <b>autograd</b> records this graph automatically and <code>loss.backward()</code> runs every backward.</p>`,
  k: ["forward + cache", "backward(dout)", "reverse order", "autograd"] },

/* ---------------- OpenCV ---------------- */
{ l: "ocv", p: 1,
  q: "How is an image represented in OpenCV/NumPy? What changes after converting it to grayscale?",
  ru: "Массив (H, W, 3), uint8 0–255, порядок каналов BGR. После BGR2GRAY: (H, W), один канал — взвешенная сумма B, G, R.",
  a: `<p>OpenCV loads an image as a NumPy array of shape <code>(height, width, channels)</code>, e.g. (480, 640, 3), dtype <b>uint8</b> with values 0–255, channels in <b>BGR</b> order. A pixel is <code>img[y, x]</code> (row first).</p>
<p><code>cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)</code> produces <code>(H, W)</code> — <b>one channel</b>, each value an intensity ≈ 0.299R + 0.587G + 0.114B. The data becomes 3× smaller but color information is lost.</p>`,
  k: ["(H, W, C)", "uint8 0–255", "BGR order", "gray = (H, W), 1 channel"] },

{ l: "ocv", p: 1,
  q: "What are the most common mistakes when using cv2.imread, cv2.cvtColor, cv2.resize and cv2.GaussianBlur?",
  ru: "imread → BGR и None при отсутствии файла; RGB2GRAY вместо BGR2GRAY; resize принимает (w, h); ядро Gaussian нечётное и положительное.",
  a: `<ul><li><b>imread</b> returns <b>BGR</b>, not RGB, and returns <b>None</b> (no error) if the path is wrong — check <code>if img is None</code>.</li>
<li><b>cvtColor</b>: after imread the code must be <code>COLOR_BGR2GRAY</code> / <code>COLOR_BGR2RGB</code>; <code>RGB2GRAY</code> swaps the red and blue weights.</li>
<li><b>resize</b> takes <code>dsize = (width, height)</code>, while <code>img.shape</code> is <code>(height, width, channels)</code>; it also distorts the aspect ratio.</li>
<li><b>GaussianBlur</b> kernel size must be <b>positive and odd</b>: (3, 3), (5, 5); (4, 4) raises an error. medianBlur takes a single odd integer.</li>
<li><b>Display</b>: <code>plt.imshow</code> expects RGB, so BGR images look blue.</li></ul>`,
  k: ["BGR", "None check", "dsize (w, h)", "odd kernel", "BGR2RGB for matplotlib"] },

{ l: "ocv", p: 1,
  q: "Why is Gaussian blur often applied before Canny edge detection? Describe the Canny steps.",
  ru: "Canny на градиентах, шум даёт ложные края; blur убирает высокочастотный шум. Шаги: сглаживание → градиент → non-max suppression → double threshold → hysteresis.",
  a: `<p>Canny (John Canny, 1986) detects edges from <b>intensity gradients</b>. Noise produces small sharp intensity changes that create large gradients and therefore <b>false edges</b>. A Gaussian blur is a low-pass filter that removes high-frequency noise, so the remaining edges are real object boundaries.</p>
<p><b>Steps:</b> (1) Gaussian smoothing; (2) gradient magnitude and direction (Sobel); (3) <b>non-maximum suppression</b> to thin edges to one pixel; (4) <b>double threshold</b> (low/high) into strong and weak edges; (5) <b>hysteresis</b> — keep weak edges only if connected to strong ones. Output: a binary edge map (0/255) of the same height and width.</p>`,
  k: ["gradient-based", "noise → false edges", "blur removes noise", "NMS, double threshold, hysteresis"] },

{ l: "ocv", p: 1,
  q: "Give the advantages and disadvantages of converting images to grayscale before classification.",
  ru: "Плюсы: 3→1 канал, меньше данных и параметров, быстрее, нужен для Canny/threshold. Минусы: теряется цвет — критично, если класс определяется цветом (болезни листьев, спелость, сортировка мусора).",
  a: `<p><b>Advantages:</b> 3 channels → 1, so the input is 3× smaller: faster preprocessing and training, fewer model parameters, less sensitivity to the color tint of lighting; many operations (Canny, thresholding, histogram equalization) require one channel.</p>
<p><b>Disadvantages:</b> color information is lost. If the class depends on color — diseased leaves with yellow/brown spots, fruit ripeness, red vs green traffic lights, plastic vs paper — different colors with similar brightness become identical and accuracy drops. Decision depends on the task.</p>`,
  k: ["3× less data", "faster", "loses color", "task-dependent"] },

{ l: "ocv", p: 1,
  q: "Propose preprocessing operations for images with different resolutions, lighting conditions and noise, and justify each.",
  ru: "Resize к фиксированному размеру (вход модели), нормализация /255 или mean/std (свет, стабильность), denoise Gaussian/median (шум), equalization/CLAHE (свет), augmentation на train.",
  a: `<ul><li><b>Resize</b> to a fixed size (e.g. 224×224) — the model and batches need one input size.</li>
<li><b>Normalization</b> — scale to [0, 1] or standardize with training mean/std; consistent input range, more stable training.</li>
<li><b>Denoising</b> — Gaussian blur for sensor noise, median blur for salt-and-pepper noise, with small kernels so details are kept.</li>
<li><b>Lighting correction</b> — histogram equalization / CLAHE (on the brightness channel for color images).</li>
<li><b>Color conversion</b> — BGR → RGB for the model; HSV for color-based segmentation.</li>
<li><b>Data augmentation</b> (training set only) — flips, rotations, brightness changes for robustness to viewpoint and illumination.</li></ul>`,
  k: ["resize", "normalize", "denoise", "lighting correction", "augmentation on train"] },

{ l: "ocv", p: 1,
  q: "Does applying more preprocessing always improve classification accuracy? Explain with examples.",
  ru: "Нет: можно удалить полезную информацию (grayscale убирает цвет пятен, сильный blur стирает детали, маленький resize), усилить шум (equalization), исказить класс (flip 6→9). Проверять на validation.",
  a: `<p><b>No.</b> Each preprocessing step changes the information available to the classifier and can hurt:</p>
<ul><li><b>Grayscale</b> removes color that may define the class (disease spots, ripeness).</li><li><b>Strong blur</b> (e.g. 25×25) erases small details and texture.</li><li><b>Aggressive resizing</b> to a tiny resolution loses fine structures.</li><li><b>Histogram equalization</b> on dark, noisy images amplifies the noise.</li><li><b>Unrealistic augmentation</b>: a vertical flip turns a "6" into a "9".</li><li><b>Train/test mismatch</b>: different preprocessing on test lowers accuracy.</li></ul>
<p>Every step should be justified by the task and verified on a validation set.</p>`,
  k: ["no", "can remove useful information", "concrete example", "validate each step"] },

{ l: "ocv", p: 0,
  q: "Compare mean, Gaussian, median and bilateral filters. When would you use each?",
  ru: "Mean — простое среднее, сильно размывает края; Gaussian — взвешенное, общий шум; median — salt-and-pepper, сохраняет края; bilateral — сглаживает, сохраняя края, но медленный.",
  a: `<ul><li><b>Mean</b> (<code>cv2.blur</code>): average of the window; simple but blurs edges strongly.</li>
<li><b>Gaussian</b> (<code>cv2.GaussianBlur(img, (k, k), σ)</code>): weighted average, centre pixels weigh more; good for general Gaussian sensor noise and before edge detection. Kernel odd.</li>
<li><b>Median</b> (<code>cv2.medianBlur(img, k)</code>): median of the window; best for <b>salt-and-pepper</b> noise because isolated extreme pixels are ignored, and edges are preserved better.</li>
<li><b>Bilateral</b> (<code>cv2.bilateralFilter</code>): averages only similar-intensity neighbours, so it smooths flat regions while <b>preserving edges</b>; slower.</li></ul>`,
  k: ["mean blurs edges", "Gaussian weighted", "median → salt-and-pepper", "bilateral preserves edges"] },

{ l: "ocv", p: 0,
  q: "What do thresholding and histogram equalization do? When does a fixed global threshold fail?",
  ru: "Threshold: пиксель > t → 255, иначе 0 (возвращает (ret, img)). Equalization растягивает гистограмму → контраст. Фиксированный порог ломается при разном освещении → Otsu, adaptive, CLAHE.",
  a: `<p><b>Thresholding</b> (<code>_, mask = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)</code>) makes a binary image: pixels above the threshold become 255, others 0. It returns a tuple (threshold, image).</p>
<p><b>Histogram equalization</b> (<code>cv2.equalizeHist(gray)</code>, one channel only) spreads the intensity histogram over the full range, increasing contrast; <b>CLAHE</b> does it locally and amplifies noise less.</p>
<p>A fixed global threshold fails when <b>lighting differs</b> between or within images (night vs day, shadows). Alternatives: <b>Otsu</b> (threshold chosen per image from its histogram), <b>adaptive thresholding</b> (local threshold per neighbourhood), or equalization first.</p>`,
  k: ["binary 0/255", "returns tuple", "equalization → contrast", "Otsu / adaptive for varying light"] },

{ l: "ocv", p: 0,
  q: "Why are edge maps alone a poor input when the class depends on color? What would you use instead?",
  ru: "Edges — бинарная карта границ: цвет потерян ещё на grayscale, интенсивности тоже. Подать цветное изображение (RGB, нормализованное) или цвет + edges.",
  a: `<p>An edge map from Canny is binary (0 or 255) and keeps only boundaries and shape. Color is already lost at the grayscale step, and Canny also discards intensity. Objects of the same shape but different colors (red vs green apple, plastic vs glass bottle) give identical edge maps, so the classifier cannot separate them.</p>
<p>Instead feed the <b>color image</b> (resized, BGR → RGB, normalized), possibly in HSV, or combine color features with edges so the model sees both color and shape.</p>`,
  k: ["edges keep only shape", "color lost", "same shape → same edges", "feed color image"] },

/* ---------------- System design ---------------- */
{ l: "sys", p: 1,
  q: "How would you organize and split a dataset of 2,000 images for a 4-class classification system?",
  ru: "Папка/CSV на класс, проверка меток, баланса, дубликатов (leakage). Split 80/20 → 1600/400 или 70/15/15 → 1400/300/300, stratified.",
  a: `<p><b>Organization:</b> one folder per class (or a CSV with filename and label); check labels, count images per class (balance), remove duplicates and corrupted files, and make sure near-identical images are not in both train and test (<b>data leakage</b>).</p>
<p><b>Split:</b> e.g. <b>80/20</b> → 1600 train, 400 test; or with validation <b>70/15/15</b> → 1400 train, 300 validation, 300 test. Use a <b>stratified</b> split so each part keeps the class proportions (balanced: 400/100 per class for 80/20). Validation is for hyperparameters; test is used once at the end.</p>`,
  k: ["folder per class", "balance, duplicates, leakage", "80/20 = 1600/400", "stratified", "validation set"] },

{ l: "sys", p: 1,
  q: "A model has 95% training accuracy and 62% test accuracy. Diagnose the problem and propose solutions. How would underfitting look?",
  ru: "Overfitting: запомнил train. Решения: больше данных, augmentation, L2/dropout, early stopping, подбор на val. Underfitting: оба низкие → более сложная модель, лучше признаки.",
  a: `<p>The large gap between training (95%) and test (62%) accuracy means <b>overfitting</b>: the model memorized the training images (including noise) instead of learning general patterns.</p>
<p><b>Solutions:</b> collect more data; <b>data augmentation</b>; <b>regularization</b> (L2 / weight decay, dropout); early stopping; choose hyperparameters on a validation set; for neural networks, keep a large network but regularize more.</p>
<p><b>Underfitting</b> looks different: both training and test accuracy are low and similar (e.g. 60% / 58%) — the model is too simple; use a more powerful model or better features.</p>`,
  k: ["overfitting = train ≫ test", "augmentation, more data", "regularization, early stopping", "underfitting = both low"] },

{ l: "sys", p: 1,
  q: "Which metric would you use to evaluate a classifier, and how does class imbalance affect your choice?",
  ru: "Баланс → accuracy + confusion matrix. Дисбаланс → accuracy обманывает (всегда мажоритарный класс = высокая accuracy), нужны per-class precision/recall, macro-F1.",
  a: `<p>With <b>balanced</b> classes and equal error costs, <b>accuracy</b> (correct / total) is a good summary, together with a <b>confusion matrix</b> showing which classes are confused.</p>
<p>With <b>imbalanced</b> classes accuracy is misleading: with 2,400 OK and 600 defective items, a model that always predicts "OK" has 80% accuracy and finds no defects. Then use <b>per-class recall</b> (how many defects are found), <b>precision</b>, <b>macro F1</b>, and possibly move the decision threshold according to the cost of errors.</p>`,
  k: ["accuracy for balanced", "confusion matrix", "imbalance → majority class trap", "recall, precision, macro F1"] },

{ l: "sys", p: 1,
  q: "A model works well on your photos but poorly on photos from another phone. Why, and how would you fix it?",
  ru: "Domain/distribution shift: другая камера (разрешение, цвет, шум), свет, фон, ракурс. Решение: разнообразные данные, augmentation (яркость, цвет, blur), нормализация, fine-tuning.",
  a: `<p>This is <b>domain (distribution) shift</b>: the test photos come from a different distribution than the training data. Another phone has a different resolution, sensor noise, color processing and lens; photos may also differ in lighting, background and viewpoint. The model learned features specific to my phone and conditions and does not generalize.</p>
<p><b>Fixes:</b> collect training data from many devices and conditions; use augmentation (brightness, contrast, color jitter, blur, crops); normalize inputs consistently; fine-tune on a small labelled set from the new phone.</p>`,
  k: ["domain shift", "different camera / lighting / background", "diverse data", "augmentation, fine-tuning"] },

{ l: "sys", p: 0,
  q: "Explain the difference between a class score and a class probability.",
  ru: "Score — сырое Wx + b (logit), любое число; probability — softmax(scores), [0, 1], сумма 1. Argmax совпадает.",
  a: `<p>A <b>class score</b> is the raw output of the classifier, e.g. <code>sₖ = wₖ·x + bₖ</code> (a logit): any real number, possibly negative; only the ordering matters, and scores are not on a common, interpretable scale.</p>
<p>A <b>class probability</b> is obtained with <b>softmax</b>: <code>pₖ = e^{sₖ} / Σⱼ e^{sⱼ}</code>. Each value lies in [0, 1] and they sum to 1, so it can be read as confidence and used with cross-entropy loss or a decision threshold. Softmax is monotonic, so argmax (the predicted class) is the same.</p>`,
  k: ["score = raw Wx + b", "any real number", "softmax", "[0, 1], sum 1", "same argmax"] },

{ l: "sys", p: 0,
  q: "Why must the test set be used only once? What goes wrong if you select models or hyperparameters on it?",
  ru: "Test должен оценивать работу на новых данных. Если выбирать по нему, он становится validation → оценка завышена (утечка). Подбирать на val/CV, test один раз в конце.",
  a: `<p>The test set estimates how the model performs on <b>new, unseen data</b>. If we try many models or hyperparameters (e.g. K = 1…20) and pick the best test score, the test set has influenced the choice — it effectively becomes a validation set, and the reported accuracy is <b>optimistically biased</b> (we picked what happened to fit those particular images).</p>
<p>Correct procedure: tune on a <b>validation set</b> or with <b>cross-validation</b>; touch the test set only once at the very end.</p>`,
  k: ["test = unseen data", "selection on test → biased", "tune on validation / CV", "test once"] },

{ l: "sys", p: 0,
  q: "Outline the steps to design a computer vision classification system from scratch.",
  ru: "Определить классы → собрать и разметить разнообразные данные → split train/val/test → preprocessing и augmentation → baseline (kNN/linear) → NN/CNN → метрика, confusion matrix → проверка на новых условиях.",
  a: `<ol><li><b>Define</b> the classes and what counts as correct.</li><li><b>Collect and label</b> diverse data (devices, lighting, backgrounds); check balance and duplicates.</li><li><b>Split</b> into train / validation / test (stratified).</li><li><b>Preprocess</b>: resize, BGR → RGB, normalize; augment the training set.</li><li><b>Train</b> a baseline (kNN or linear classifier), then a stronger model (neural network / CNN); tune hyperparameters on validation.</li><li><b>Evaluate</b> once on test with a suitable metric (accuracy or macro F1) and a confusion matrix; analyse errors.</li><li><b>Test robustness</b> on data from new conditions (domain shift) before deployment.</li></ol>`,
  k: ["define classes", "collect diverse data", "split", "preprocess", "baseline → NN", "metric"] }
];
