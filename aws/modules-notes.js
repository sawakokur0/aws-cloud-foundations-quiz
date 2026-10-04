// Сборник по модулям: ключевые моменты слайдов Student Guide M01–M10 (ACFv2).
window.MODULE_NOTES = [
{ id: "m1", code: "M01", title: "Cloud Concepts Overview", ru: "Основы облака", html: `
<h3>1. Что такое облако</h3>
<ul>
  <li><b>Cloud computing</b> — это on-demand доставка IT-ресурсов (вычисления, хранилища, базы, приложения) <b>через интернет</b> с оплатой <b>pay-as-you-go</b>.</li>
  <li>Главная идея: инфраструктура — это <b>software, а не hardware</b>. Сервер не покупают и не ставят в стойку, его создают за минуты и удаляют, когда он не нужен.</li>
  <li>В традиционной модели нужны помещение, люди, охрана и капитальные вложения, железо закупается долго, а мощность приходится покупать «на пик», угадывая заранее.</li>
</ul>
<table>
  <tr><th>Модель сервиса</th><th>Что даёт</th><th>Пример</th></tr>
  <tr><td><b>IaaS</b></td><td>базовые кирпичики: сеть, серверы, диски. Больше всего контроля</td><td>EC2, VPC, EBS</td></tr>
  <tr><td><b>PaaS</b></td><td>платформа, железо и ОС не твоя забота, ты деплоишь код</td><td>Elastic Beanstalk, RDS, Lambda</td></tr>
  <tr><td><b>SaaS</b></td><td>готовый продукт, ничего не настраиваешь</td><td>почта, Trusted Advisor, Shield</td></tr>
</table>
<ul>
  <li><b>Deployment models:</b> <b>Cloud</b> (всё в облаке), <b>Hybrid</b> (облако соединено с локальной инфраструктурой), <b>On-premises / private cloud</b> (виртуализация в своём дата-центре).</li>
  <li><b>Аналоги:</b> файрвол → security groups и network ACL, роутер и свитч → VPC и ELB, серверы → EC2 и AMI, SAN/NAS/DAS → EBS, EFS и S3, СУБД → RDS.</li>
</ul>
<h3>2. Шесть преимуществ облака</h3>
<ol class="nums">
  <li><b>Trade capital expense for variable expense</b> — вместо капитальных вложений (capex) платишь за потребление.</li>
  <li><b>Benefit from massive economies of scale</b> — AWS закупает в огромных объёмах для сотен тысяч клиентов и снижает цены.</li>
  <li><b>Stop guessing capacity</b> — масштабируешься по факту, без переплаты за простаивающее и без нехватки.</li>
  <li><b>Increase speed and agility</b> — ресурсы появляются за минуты, а не за недели.</li>
  <li><b>Stop spending money on running and maintaining data centers</b> — не тратишься на стойки, электричество и охлаждение.</li>
  <li><b>Go global in minutes</b> — разворачиваешься в любом регионе мира за несколько кликов.</li>
</ol>
<h3>3. Что такое AWS</h3>
<ul>
  <li><b>Web service</b> — программа, доступная по сети через API со стандартным форматом (JSON или XML). AWS — набор таких сервисов, которые работают вместе как кирпичики.</li>
  <li>Сервис выбирают по бизнес-целям и техническим требованиям. Например, вычисления: полный контроль → <b>EC2</b>, только код без серверов → <b>Lambda</b>, деплой веб-приложения → <b>Elastic Beanstalk</b>, простой сайт → <b>Lightsail</b>, контейнеры → <b>ECS / EKS / Fargate</b>, AWS в своём дата-центре → <b>Outposts</b>.</li>
  <li><b>Три способа работать с AWS:</b> <b>Management Console</b> (графический интерфейс), <b>AWS CLI</b> (команды и скрипты), <b>SDK</b> (из кода: Python, Java и т. д.). Все три отправляют одни и те же API-вызовы.</li>
</ul>
<h3>4. AWS Cloud Adoption Framework (CAF)</h3>
<ul>
  <li>Переход в облако не происходит мгновенно. Нужна стратегия, согласованная по всей организации: люди, процессы и технологии. CAF — набор рекомендаций для этого.</li>
  <li>CAF разделён на <b>6 perspectives</b> (направлений). Каждое состоит из <b>capabilities</b> (возможностей), за которые отвечают определённые люди.</li>
</ul>
<table>
  <tr><th>Business-перспективы</th><th>Technical-перспективы</th></tr>
  <tr><td><b>Business</b> — IT служит целям бизнеса (финансы, стратегия)</td><td><b>Platform</b> — архитектура и provisioning compute, сети, хранилищ</td></tr>
  <tr><td><b>People</b> — обучение, штат, оргизменения (HR)</td><td><b>Security</b> — IAM, обнаружение, защита данных, инциденты</td></tr>
  <tr><td><b>Governance</b> — портфель, проекты, лицензии, риски (CIO)</td><td><b>Operations</b> — мониторинг, изменения, DR, ежедневная работа</td></tr>
</table>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Определение: on-demand + через интернет + pay-as-you-go.</li>
  <li>Шесть преимуществ дословно. Ловушка: «Pay for racking, stacking, and powering servers» — это <b>не</b> преимущество.</li>
  <li>«System administration as a service» — такой модели <b>нет</b>.</li>
  <li>Доступ к AWS: Console, CLI, SDK. Marketplace и звонки в поддержку — это не способы доступа.</li>
</ul></div>`},

{ id: "m2", code: "M02", title: "Cloud Economics and Billing", ru: "Экономика и биллинг", html: `
<h3>1. Основы ценообразования</h3>
<ul>
  <li><b>Три драйвера стоимости:</b> <b>compute</b> (почасово или посекундно, зависит от типа инстанса), <b>storage</b> (обычно за GB), <b>data transfer</b> (исходящий трафик агрегируется и оплачивается; <b>входящий бесплатный</b>, с редкими исключениями).</li>
  <li>Трафик между сервисами <b>внутри одного региона</b> обычно бесплатный.</li>
  <li><b>Как платят:</b> pay for what you use; pay less when you reserve; pay less when you use more (tiered pricing у S3, EBS, EFS); pay even less as AWS grows (снижения цен благодаря economies of scale).</li>
</ul>
<table>
  <tr><th>Reserved Instances (до 75% скидки)</th><th>Скидка</th></tr>
  <tr><td><b>AURI</b> — All Upfront</td><td>самая большая</td></tr>
  <tr><td><b>PURI</b> — Partial Upfront</td><td>средняя</td></tr>
  <tr><td><b>NURI</b> — No Upfront</td><td>самая маленькая</td></tr>
</table>
<ul>
  <li><b>Free Tier</b> — бесплатный год для новых клиентов, но только для <b>определённых</b> сервисов и объёмов.</li>
  <li><b>Сервисы без отдельной платы:</b> VPC, IAM, Consolidated Billing, Elastic Beanstalk, Auto Scaling, CloudFormation, OpsWorks. Ресурсы, которые они создают (EC2 и т. д.), оплачиваются.</li>
</ul>
<h3>2. Total Cost of Ownership (TCO)</h3>
<ul>
  <li><b>TCO</b> — оценка всех прямых и косвенных затрат на систему. Нужна, чтобы сравнить on-premises и AWS и обосновать переезд.</li>
  <li>Затраты on-premises: <b>серверы</b> (железо, ПО, помещение), <b>хранилища</b>, <b>сеть</b>, <b>IT-персонал</b>. Плюс электричество, охлаждение, площади.</li>
  <li><b>AWS Pricing Calculator</b> — оценить месячные затраты, найти, где сэкономить, смоделировать решение до запуска, подобрать типы инстансов и контракты. Оценка показывает: итог за первые 12 месяцев, upfront и monthly.</li>
  <li><b>Hard benefits</b> — измеримая экономия (железо, операции, персонал). <b>Soft benefits</b> — продуктивность разработчиков, гибкость, глобальный охват, довольные клиенты.</li>
</ul>
<h3>3. AWS Organizations</h3>
<ul>
  <li>Объединяет <b>несколько аккаунтов</b> для централизованного управления: группы аккаунтов (<b>OU</b>, organizational units), политики на группы, автоматизация создания аккаунтов через API, <b>consolidated billing</b>.</li>
  <li><b>Consolidated billing:</b> один счёт на все аккаунты, видно расходы каждого, объёмные скидки за суммарное использование. Бесплатно.</li>
  <li><b>SCP</b> (service control policy) ограничивает, какие сервисы и действия доступны аккаунтам в OU. SCP <b>не выдаёт прав</b>, а задаёт <b>максимум</b>. Действует даже на root этих аккаунтов.</li>
  <li>Organizations <b>не заменяет</b> IAM-политики внутри аккаунта. Итоговые права = пересечение SCP и IAM.</li>
  <li>Настройка: 1) создать организацию → 2) создать OU → 3) создать SCP → 4) проверить ограничения.</li>
</ul>
<h3>4. Billing and Cost Management</h3>
<table>
  <tr><th>Инструмент</th><th>Для чего</th></tr>
  <tr><td><b>Billing Dashboard</b></td><td>общая картина расходов, тренды, топ сервисов</td></tr>
  <tr><td><b>Bills</b></td><td>месячные счета по сервисам, регионам и аккаунтам</td></tr>
  <tr><td><b>Cost Explorer</b></td><td>графики расходов за <b>последние 13 месяцев</b> и прогноз на <b>3 месяца</b>; бесплатный</td></tr>
  <tr><td><b>Budgets</b></td><td>бюджет и оповещения, когда расходы превышают план или прогноз</td></tr>
  <tr><td><b>Cost and Usage Report</b></td><td>самые подробные данные по часам или дням, выгружаются в S3, обновляются раз в день</td></tr>
</table>
<h3>5. Техническая поддержка</h3>
<table>
  <tr><th>План</th><th>Для кого</th></tr>
  <tr><td><b>Basic</b></td><td>всем бесплатно: customer service, документация, форумы, 6 core-проверок Trusted Advisor, Personal Health Dashboard</td></tr>
  <tr><td><b>Developer</b></td><td>тестирование и ранняя разработка</td></tr>
  <tr><td><b>Business</b></td><td>production-нагрузки, полный набор проверок Trusted Advisor</td></tr>
  <tr><td><b>Enterprise</b></td><td>критичные для бизнеса системы, персональный <b>TAM</b> (Technical Account Manager)</td></tr>
</table>
<ul>
  <li><b>Proactive guidance</b> — TAM, <b>best practices</b> — Trusted Advisor, <b>account assistance</b> — Support Concierge (биллинг и аккаунт).</li>
  <li><b>Severity:</b> Critical (бизнес под угрозой) → Urgent → High → Normal → Low.</li>
</ul>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Входящий трафик бесплатный, исходящий платный.</li>
  <li>Billing за 3 месяца назад смотрят в <b>Cost Explorer</b>. Оценка будущих затрат — <b>Pricing Calculator</b>.</li>
  <li>Для скидки RI <b>не обязательно</b> платить всё сразу (есть PURI и NURI).</li>
  <li>Free Tier — это не «всё бесплатно 12 месяцев».</li>
  <li>Четыре плана поддержки: Basic, Developer, Business, Enterprise.</li>
</ul></div>`},

{ id: "m3", code: "M03", title: "AWS Global Infrastructure Overview", ru: "Глобальная инфраструктура", html: `
<h3>1. Из чего состоит инфраструктура</h3>
<div class="flow">
  <span class="node">Region<br><small>географическая область</small></span><span class="arr">⊃</span>
  <span class="node">Availability Zones<br><small>обычно 2+ в регионе</small></span><span class="arr">⊃</span>
  <span class="node">Data centers<br><small>1+ в каждой AZ</small></span>
</div>
<ul>
  <li><b>Region</b> — географическая область, например London или N. Virginia. Внутри обычно <b>две или больше AZ</b>. Регионы связаны backbone-сетью AWS. <b>Данные не уходят из региона</b>, пока ты сам их не реплицируешь.</li>
  <li><b>Как выбирать регион:</b> требования к данным и законы (data governance), близость к клиентам (latency), какие сервисы доступны в регионе, стоимость (в разных регионах цены разные).</li>
  <li><b>Availability Zone</b> — один или несколько дата-центров с отдельным питанием, сетью и охлаждением, физически отделённые от других AZ. Между AZ — быстрые каналы с низкой задержкой. AWS рекомендует размещать ресурсы <b>в нескольких AZ</b>.</li>
  <li><b>Data center</b> — обычно 50 000–80 000 серверов. Один дата-центр относится только к одной AZ.</li>
  <li><b>Points of Presence:</b> <b>edge locations</b> и небольшое число <b>Regional edge caches</b>. Используются <b>CloudFront</b> (CDN) для доставки контента ближе к пользователю, а также Route 53, Shield и WAF.</li>
</ul>
<h3>2. Свойства инфраструктуры</h3>
<table>
  <tr><th>Свойство</th><th>Что значит</th></tr>
  <tr><td><b>Elastic and scalable</b></td><td>ресурсы подстраиваются под рост и падение нагрузки</td></tr>
  <tr><td><b>Fault tolerant</b></td><td>работает при отказе компонентов благодаря встроенной избыточности</td></tr>
  <tr><td><b>Highly available</b></td><td>минимальный простой без участия человека</td></tr>
</table>
<h3>3. Категории сервисов</h3>
<table>
  <tr><th>Категория</th><th>Основные сервисы курса</th></tr>
  <tr><td>Compute</td><td>EC2, EC2 Auto Scaling, Lambda, Elastic Beanstalk, ECS, EKS, ECR, Fargate</td></tr>
  <tr><td>Storage</td><td>S3, EBS, EFS, S3 Glacier</td></tr>
  <tr><td>Database</td><td>RDS, Aurora, DynamoDB, Redshift</td></tr>
  <tr><td>Networking and Content Delivery</td><td>VPC, ELB, CloudFront, Route 53, Direct Connect, VPN, Transit Gateway</td></tr>
  <tr><td>Security, Identity, and Compliance</td><td>IAM, Organizations, Cognito, Artifact, KMS, Shield</td></tr>
  <tr><td>Cost Management</td><td>Cost and Usage Report, Budgets, Cost Explorer</td></tr>
  <tr><td>Management and Governance</td><td>Console, Config, CloudWatch, Auto Scaling, CLI, Trusted Advisor, Well-Architected Tool, CloudTrail</td></tr>
</table>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>CloudFront использует <b>edge locations</b>.</li>
  <li>Регион ближе к пользователям <b>уменьшает</b> задержку.</li>
  <li>Регион = 2+ AZ. Ловушка: «один дата-центр в нескольких AZ» — неверно.</li>
  <li>Edge locations <b>не обязаны</b> находиться рядом с регионами.</li>
  <li><b>IAM и Route 53 — глобальные</b> сервисы, EC2 и Lambda — региональные. VPC живёт на уровне региона, подсеть — на уровне AZ.</li>
</ul></div>`},

{ id: "m4", code: "M04", title: "AWS Cloud Security", ru: "Безопасность", html: `
<h3>1. Shared responsibility model</h3>
<table>
  <tr><th>AWS: security <b>OF</b> the cloud</th><th>Клиент: security <b>IN</b> the cloud</th></tr>
  <tr><td>физическая охрана дата-центров, железо, сеть, виртуализация, изоляция инстансов, хост-ОС, утилизация дисков</td><td>гостевая ОС на EC2 (патчи), приложения, данные, IAM, security groups, сетевые настройки, шифрование, пароли</td></tr>
</table>
<ul>
  <li><b>IaaS</b> (EC2, EBS, VPC) — клиент отвечает за больше вещей. <b>PaaS</b> (RDS, Beanstalk, Lambda) — AWS берёт на себя ОС, патчи БД и файрвол. <b>SaaS</b> (Trusted Advisor, Shield, Chime) — клиент ничего не обслуживает.</li>
  <li>Пример: Oracle на <b>EC2</b> — патчи ставит клиент, Oracle в <b>RDS</b> — AWS. Настройка доступа к бакету S3, SSH-ключи и MFA — клиент. Изоляция сети между клиентами и защита от сбоев в регионах — AWS.</li>
</ul>
<h3>2. IAM</h3>
<ul>
  <li>Управляет доступом к ресурсам AWS: <b>кто</b>, <b>к чему</b> и <b>как</b>. Бесплатный и глобальный.</li>
  <li><b>Компоненты:</b> <b>user</b> (человек или приложение с постоянными учётными данными), <b>group</b> (набор пользователей), <b>policy</b> (JSON-документ с правами), <b>role</b> (набор прав, который временно принимают).</li>
  <li><b>Доступ:</b> <b>programmatic</b> (access key ID + secret access key для CLI и SDK) и <b>console</b> (12-значный account ID или alias, имя, пароль, MFA).</li>
  <li><b>MFA</b> — дополнительный код с устройства помимо пароля.</li>
  <li><b>Как IAM решает:</b> по умолчанию всё <b>implicit deny</b>. Есть explicit deny → запрещено всегда. Иначе есть explicit allow → разрешено. Иначе — запрещено.</li>
  <li><b>Identity-based policies</b> прикрепляются к user, group или role и бывают <b>managed</b> (отдельные, многоразовые) и <b>inline</b> (встроены в одну сущность). <b>Resource-based policies</b> прикрепляются к ресурсу (например, bucket policy) и бывают только inline.</li>
  <li><b>Groups:</b> пользователь может быть в нескольких группах; группы <b>не вкладываются</b> друг в друга; группы по умолчанию нет.</li>
  <li><b>Role</b> не привязана к одному человеку и выдаёт <b>временные</b> учётные данные. Пример: приложению на EC2 нужен S3 — создают роль с доступом к S3 и прикрепляют её к инстансу, ключи в коде не хранят.</li>
</ul>
<h3>3. Защита нового аккаунта</h3>
<ul>
  <li><b>Root user</b> имеет неограниченный доступ, ему нельзя запретить действия. Используется только для задач, доступных одному root: <b>сменить support plan</b>, пароль root, восстановить права IAM, изменить настройки аккаунта.</li>
  <li><b>Шаги:</b> 1) перестать пользоваться root: создать IAM-админа, <b>удалить access keys root</b>, включить парольную политику; 2) включить <b>MFA</b>; 3) включить <b>CloudTrail</b> (журнал всех API-вызовов); 4) включить <b>billing reports</b> (Cost and Usage Report).</li>
  <li><b>Best practices:</b> MFA, удалить ключи root, отдельные пользователи с наименьшими правами, права через группы, сильная парольная политика, делегирование через роли вместо передачи паролей, мониторинг через CloudTrail.</li>
</ul>
<h3>4. Защита аккаунтов</h3>
<ul>
  <li><b>Organizations + SCP</b> — ограничение сервисов на уровне OU. Права пользователя = пересечение SCP и IAM.</li>
  <li><b>AWS KMS</b> — создание и управление ключами шифрования, логирует использование ключей в CloudTrail, ключи хранятся в HSM (FIPS 140-2).</li>
  <li><b>Amazon Cognito</b> — регистрация и вход пользователей в веб- и мобильные приложения, в том числе через Google и Facebook.</li>
  <li><b>AWS Shield</b> — защита от DDoS. <b>Standard</b> включён бесплатно, <b>Advanced</b> платный.</li>
</ul>
<h3>5. Защита данных</h3>
<ul>
  <li><b>Data at rest</b> (на диске) — шифрование через KMS (EBS, S3, EFS, RDS и др.). <b>Data in transit</b> (в сети) — <b>TLS</b> (бывший SSL), HTTPS. Сертификаты выдаёт <b>AWS Certificate Manager</b>.</li>
  <li>Новые бакеты и объекты S3 <b>приватные</b> по умолчанию. Инструменты доступа: <b>S3 Block Public Access</b> (перекрывает всё остальное), IAM policies, bucket policies, ACL (устаревший способ), проверка разрешений в Trusted Advisor.</li>
</ul>
<h3>6. Соответствие требованиям</h3>
<ul>
  <li>Программы: <b>сертификации</b> (ISO 27001 и др.), <b>законы и регуляции</b> (GDPR, HIPAA), <b>фреймворки</b> (CIS).</li>
  <li><b>AWS Config</b> — оценивает, аудирует и проверяет <b>конфигурации ресурсов</b>, хранит историю изменений.</li>
  <li><b>AWS Artifact</b> — скачать отчёты о соответствии (ISO, PCI, SOC) и принять соглашения.</li>
</ul>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>AWS = security <b>of</b>, клиент = security <b>in</b>. Шифрование данных и security groups — «in».</li>
  <li>После первого входа рекомендуется <b>удалить access keys root</b>.</li>
  <li>Только root может <b>сменить support plan</b>.</li>
  <li>Дополнительный слой входа в консоль — <b>MFA</b>.</li>
  <li>Оценивать конфигурации ресурсов умеет <b>AWS Config</b>, а <b>не</b> KMS.</li>
  <li>Explicit deny всегда сильнее allow.</li>
</ul></div>`},

{ id: "m5", code: "M05", title: "Networking and Content Delivery", ru: "Сети и доставка контента", html: `
<h3>1. Основы сетей</h3>
<ul>
  <li><b>IPv4</b> — 32 бита (192.0.2.0), <b>IPv6</b> — 128 бит.</li>
  <li><b>CIDR</b> — адрес + «/число»: сколько бит слева фиксированы (сеть), остальные свободны (хосты). <code>/32</code> — один адрес, <code>0.0.0.0/0</code> — весь интернет.</li>
  <li><b>OSI:</b> 7 Application (HTTP), 4 Transport (TCP/UDP), 3 Network (IP, роутеры), 2 Data link (MAC, свитчи), 1 Physical.</li>
</ul>
<h3>2. Amazon VPC</h3>
<ul>
  <li><b>VPC</b> — логически изолированная часть AWS, твоя виртуальная сеть: выбираешь диапазон IP, создаёшь подсети, таблицы маршрутов и шлюзы.</li>
  <li>VPC принадлежит <b>одному региону</b> и может охватывать несколько AZ. <b>Подсеть</b> — в <b>одной AZ</b>, бывает public или private.</li>
  <li>Размер VPC: от <b>/28</b> (16 адресов) до <b>/16</b> (65 536). Диапазон VPC после создания <b>не меняется</b>. CIDR подсетей не пересекаются.</li>
  <li><b>5 зарезервированных адресов</b> в каждой подсети: .0 (сеть), .1 (роутер VPC), .2 (DNS), .3 (на будущее), .255 (broadcast). В /24 доступно <b>251</b>.</li>
  <li><b>Публичный IP:</b> автоматически (auto-assign на подсети) или <b>Elastic IP</b> — постоянный, его можно перепривязывать; за неиспользуемый может взиматься плата.</li>
  <li><b>Elastic network interface</b> — виртуальная сетевая карта, которую можно перевесить на другой инстанс вместе с её адресами.</li>
  <li><b>Route table:</b> правила «destination → target». В каждой есть <b>local route</b> (внутри VPC), его нельзя удалить. Подсеть связана ровно с одной таблицей.</li>
</ul>
<h3>3. Сетевые подключения VPC</h3>
<table>
  <tr><th>Компонент</th><th>Что соединяет</th></tr>
  <tr><td><b>Internet gateway</b></td><td>VPC ↔ интернет. Маршрут <code>0.0.0.0/0 → igw</code> делает подсеть публичной</td></tr>
  <tr><td><b>NAT gateway</b></td><td>даёт частной подсети выход в интернет без входящих соединений; ставится в публичную подсеть</td></tr>
  <tr><td><b>VPC sharing</b></td><td>несколько аккаунтов работают в одной общей VPC</td></tr>
  <tr><td><b>VPC peering</b></td><td>VPC ↔ VPC (в аккаунте, между аккаунтами и регионами). Диапазоны не должны пересекаться, <b>транзитивности нет</b></td></tr>
  <tr><td><b>Site-to-Site VPN</b></td><td>VPC ↔ твой дата-центр через зашифрованный туннель (virtual private gateway)</td></tr>
  <tr><td><b>Direct Connect</b></td><td>выделенный частный канал от твоей сети к AWS</td></tr>
  <tr><td><b>VPC endpoints</b></td><td>доступ к сервисам AWS без интернета. <b>Gateway endpoint</b> — S3 и DynamoDB (бесплатно), <b>interface endpoint</b> — остальные (PrivateLink)</td></tr>
  <tr><td><b>Transit Gateway</b></td><td>хаб «звезда» вместо паутины peering, когда VPC сотни</td></tr>
</table>
<h3>4. Безопасность VPC</h3>
<table>
  <tr><th></th><th>Security group</th><th>Network ACL</th></tr>
  <tr><td>Уровень</td><td><b>инстанс</b></td><td><b>подсеть</b></td></tr>
  <tr><td>Правила</td><td>только <b>allow</b></td><td><b>allow и deny</b></td></tr>
  <tr><td>Состояние</td><td><b>stateful</b>: ответ пропускается сам</td><td><b>stateless</b>: обратный трафик нужно разрешить явно</td></tr>
  <tr><td>Порядок</td><td>оцениваются все правила</td><td>по номерам, от меньшего к большему</td></tr>
  <tr><td>По умолчанию</td><td>входящий запрещён, исходящий разрешён</td><td>default ACL разрешает всё; custom ACL запрещает всё</td></tr>
</table>
<h3>5. Amazon Route 53</h3>
<ul>
  <li>Высокодоступный <b>DNS</b>: переводит имена (www.example.com) в IP-адреса. Регистрирует домены, проверяет здоровье ресурсов (health checks).</li>
  <li><b>Routing policies:</b> <b>Simple</b> (один ресурс), <b>Weighted</b> (доли трафика), <b>Latency</b> (регион с меньшей задержкой), <b>Geolocation</b> (по местоположению пользователя), <b>Geoproximity</b> (по местоположению ресурсов), <b>Failover</b> (active-passive, переход на запасной сайт), <b>Multivalue answer</b> (до 8 здоровых записей).</li>
  <li>Пример failover: основная запись ведёт на балансировщик приложения, запасная — на статический сайт в S3.</li>
</ul>
<h3>6. Amazon CloudFront</h3>
<ul>
  <li><b>CDN</b> — сеть кеширующих серверов по миру. Отдаёт копию контента из ближайшей точки, ускоряет и статический, и динамический контент.</li>
  <li>Инфраструктура: <b>edge locations</b> (популярный контент) и <b>Regional edge caches</b> (менее популярный, между edge и origin).</li>
  <li>Преимущества: fast and global, security at the edge (защита от DDoS, бесплатные TLS-сертификаты), highly programmable, deeply integrated with AWS, cost-effective (без минимальных обязательств).</li>
  <li><b>Платишь за:</b> исходящий трафик, HTTP(S)-запросы, invalidation сверх 1000 путей в месяц, выделенный IP для SSL.</li>
</ul>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Минимальная подсеть <b>/28</b>, максимальная VPC <b>/16</b>. В /24 доступно <b>251</b> адрес.</li>
  <li>Частной подсети для выхода в интернет нужен <b>NAT gateway</b>.</li>
  <li>При создании VPC по умолчанию создаётся <b>main route table</b>. IGW и подсети создаются отдельно.</li>
  <li>Необязательная защита на уровне подсети — <b>network ACL</b>. Защита инстанса — <b>security group</b>.</li>
</ul></div>`},

{ id: "m6", code: "M06", title: "Compute", ru: "Вычисления", html: `
<h3>1. Обзор вычислительных сервисов</h3>
<table>
  <tr><th>Подход</th><th>Сервисы</th><th>Когда</th></tr>
  <tr><td>Виртуальные машины (IaaS)</td><td>EC2</td><td>нужен полный контроль над ОС</td></tr>
  <tr><td>Serverless</td><td>Lambda</td><td>код по событию или расписанию, без серверов</td></tr>
  <tr><td>Контейнеры</td><td>ECS, EKS, Fargate, ECR</td><td>микросервисы, переносимость</td></tr>
  <tr><td>PaaS</td><td>Elastic Beanstalk</td><td>веб-приложения: загрузил код, и оно работает</td></tr>
</table>
<p>Выбор зависит от дизайна приложения, характера нагрузки и того, что хочешь настраивать сам. Неправильный выбор снижает производительность.</p>
<h3>2. Amazon EC2</h3>
<ul>
  <li><b>Elastic</b> — легко менять количество серверов, <b>Compute</b> — CPU и память, <b>Cloud</b> — размещены в облаке. Полный контроль над гостевой ОС (Windows или Linux).</li>
  <li><b>Шаги запуска:</b>
    <ol class="nums">
      <li><b>AMI</b> — шаблон корневого тома с ОС и ПО, launch permissions, block device mapping. Источники: Quick Start, My AMIs, Marketplace, Community (на свой риск). Свой AMI можно скопировать в другие регионы.</li>
      <li><b>Instance type</b> — CPU, память, хранилище, сеть. Категории: general purpose (t3, m5), compute optimized (c5), memory optimized (r5), storage optimized, accelerated computing. Имя <code>t3.large</code>: семейство t, поколение 3, размер large.</li>
      <li><b>Network</b> — VPC, подсеть, автоматический публичный IP.</li>
      <li><b>IAM role</b> — если ПО на инстансе обращается к другим сервисам (хранится в instance profile; можно прикрепить и позже).</li>
      <li><b>User data</b> — скрипт при <b>первом</b> запуске.</li>
      <li><b>Storage</b> — корневой том и дополнительные: размер, тип, удалять ли при terminate, шифрование.</li>
      <li><b>Tags</b> — метки key-value для фильтрации, автоматизации, учёта затрат и доступа.</li>
      <li><b>Security group</b> — файрвол вне ОС: порт, протокол, источник.</li>
      <li><b>Key pair</b> — публичный ключ хранит AWS, приватный ты. Linux: вход по SSH. Windows: расшифровка пароля администратора.</li>
    </ol></li>
  <li><b>EBS vs Instance store:</b> данные на EBS переживают stop/start. <b>Instance store</b> — временный диск хоста, данные <b>теряются</b> при остановке.</li>
  <li><b>Жизненный цикл:</b> pending → running ⇄ stopping/stopped (только у EBS-backed) → shutting-down → terminated. Reboot не меняет IP.</li>
  <li>После stop/start меняются <b>публичный IP и публичный DNS</b>, приватный остаётся. Нужен постоянный публичный адрес — <b>Elastic IP</b>.</li>
  <li><b>Metadata:</b> <code>http://169.254.169.254/latest/meta-data/</code> — сведения об инстансе изнутри (IP, ID, регион, user data).</li>
  <li><b>CloudWatch:</b> basic monitoring раз в 5 минут бесплатно, detailed раз в 1 минуту платно; история хранится 15 месяцев.</li>
</ul>
<h3>3. Оптимизация затрат EC2</h3>
<table>
  <tr><th>Модель</th><th>Суть</th><th>Когда</th></tr>
  <tr><td><b>On-Demand</b></td><td>почасово без обязательств, есть в Free Tier</td><td>короткие и непредсказуемые нагрузки, разработка</td></tr>
  <tr><td><b>Reserved</b></td><td>1 или 3 года, оплата сразу, частично или без предоплаты</td><td>стабильная предсказуемая нагрузка</td></tr>
  <tr><td><b>Scheduled Reserved</b></td><td>резерв по расписанию (день, неделя, месяц) на год</td><td>регулярные задачи, например ежемесячные отчёты</td></tr>
  <tr><td><b>Spot</b></td><td>неиспользуемые мощности со скидкой; могут забрать с уведомлением за <b>2 минуты</b></td><td>гибкое время старта и окончания, пакетные задачи</td></tr>
  <tr><td><b>Dedicated Instances</b></td><td>железо только под твой аккаунт</td><td>требования изоляции</td></tr>
  <tr><td><b>Dedicated Hosts</b></td><td>целый физический сервер</td><td>свои лицензии (BYOL), compliance</td></tr>
</table>
<p>Посекундная оплата — On-Demand, Reserved и Spot на Amazon Linux и Ubuntu.</p>
<p><b>Четыре столпа оптимизации затрат:</b> <b>right size</b> (подобрать размер по метрикам; сначала right size, потом reserve), <b>increase elasticity</b> (выключать неиспользуемое, автоскейлинг), <b>optimal pricing model</b> (сочетать типы покупки, рассмотреть Lambda), <b>optimize storage choices</b> (менять размер и тип EBS, удалять старые снапшоты, использовать S3 lifecycle). Это постоянный процесс: теги, метрики, ответственные.</p>
<h3>4. Контейнеры</h3>
<ul>
  <li><b>Контейнер</b> упаковывает код со всеми зависимостями и работает одинаково везде. Контейнеры легче и быстрее виртуальных машин: не содержат целую ОС, делят ОС хоста.</li>
  <li><b>Docker</b> — платформа для сборки и запуска контейнеров. Контейнер создаётся из <b>image</b>.</li>
  <li><b>Amazon ECS</b> — оркестрация Docker-контейнеров на кластере. Кластер на <b>EC2</b> (больше контроля) или на <b>Fargate</b> (серверами управлять не нужно).</li>
  <li><b>Kubernetes</b> — open-source оркестратор, <b>Amazon EKS</b> — управляемый Kubernetes на AWS.</li>
  <li><b>Amazon ECR</b> — реестр Docker-образов.</li>
</ul>
<h3>5. AWS Lambda</h3>
<ul>
  <li><b>Serverless</b>: код запускается только по событию или расписанию, оплата за время выполнения и вызовы. Встроенная отказоустойчивость и автоматическое масштабирование.</li>
  <li><b>Event sources:</b> S3, DynamoDB, SNS, SQS, API Gateway, ALB, EventBridge и др. Можно вызвать и вручную (консоль, SDK, CLI).</li>
  <li><b>Настройка функции:</b> runtime, <b>execution role</b>, trigger, код, память <b>128–10 240 MB</b>, таймаут.</li>
  <li><b>Лимиты:</b> память до <b>10 240 MB</b>, таймаут до <b>15 минут</b>, пакет 250 MB (распакованный), до 1000 одновременных запусков на регион (мягкий лимит).</li>
  <li>Примеры: остановка и запуск EC2 по расписанию; создание миниатюр, когда в S3 загружена картинка.</li>
</ul>
<h3>6. AWS Elastic Beanstalk</h3>
<ul>
  <li>Управляемый сервис для веб-приложений: сам делает provisioning, балансировку, масштабирование, мониторинг здоровья. К ресурсам под ним остаётся доступ.</li>
  <li>Платформы: <b>Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker</b>. Серверы: Apache, NGINX, IIS и др.</li>
  <li><b>За сам Beanstalk не платят</b>, только за ресурсы под ним.</li>
</ul>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Остановить можно только инстанс с корневым томом EBS.</li>
  <li>4 постоянных + утроение нагрузки в конце месяца → <b>4 Reserved + 8 On-Demand</b>.</li>
  <li>Ежемесячные отчёты → <b>Scheduled Reserved</b>. Долгая предсказуемая нагрузка → <b>Reserved</b>.</li>
  <li>Не делить хост с другими клиентами → <b>Dedicated Instances</b>.</li>
  <li>При запуске обязательно указать <b>instance type и AMI</b>.</li>
  <li>Контейнеры <b>не содержат</b> целую ОС.</li>
</ul></div>`},

{ id: "m7", code: "M07", title: "Storage", ru: "Хранилища", html: `
<h3>Сравнение хранилищ</h3>
<table>
  <tr><th>Сервис</th><th>Тип</th><th>Суть</th></tr>
  <tr><td><b>Instance store</b></td><td>временный блочный</td><td>диск хоста, данные пропадают при остановке</td></tr>
  <tr><td><b>EBS</b></td><td>блочный</td><td>постоянный «жёсткий диск» для <b>одного</b> EC2 в одной AZ</td></tr>
  <tr><td><b>EFS</b></td><td>файловый (NFS)</td><td>общая файловая система для <b>многих</b> EC2 одновременно</td></tr>
  <tr><td><b>S3</b></td><td>объектный</td><td>файлы-объекты в бакетах, доступ по URL откуда угодно</td></tr>
  <tr><td><b>S3 Glacier</b></td><td>архив</td><td>очень дёшево, извлечение от минут до часов</td></tr>
</table>
<h3>1. Amazon EBS</h3>
<ul>
  <li><b>Block storage</b>: чтобы изменить один символ в файле на 1 GB, меняется один блок. В <b>object storage</b> перезаписывается весь объект.</li>
  <li>Тома <b>автоматически реплицируются внутри своей AZ</b>, бэкапятся снапшотами в S3. Используются как загрузочные диски, для файловых систем, баз и корпоративных приложений.</li>
  <li><b>Типы:</b> SSD — <b>General Purpose (gp)</b> (по умолчанию: загрузочные тома, dev и test) и <b>Provisioned IOPS (io)</b> (критичные базы, больше 16 000 IOPS). HDD — <b>Throughput Optimized (st1)</b> (big data, логи, потоковые данные) и <b>Cold (sc1)</b> (редкий доступ, самый дешёвый). <b>HDD не могут быть загрузочными.</b> Максимальный размер тома 16 TiB.</li>
  <li><b>Возможности:</b> снапшоты на момент времени, шифрование без доплаты, увеличение объёма и смена типа без остановки (elastic volumes). Снапшоты можно копировать между регионами.</li>
  <li><b>Цена:</b> за выделенные GB в месяц (у io ещё за выделенные IOPS) и снапшоты за GB в месяц. Входящий трафик бесплатный, между регионами платный.</li>
</ul>
<h3>2. Amazon S3</h3>
<ul>
  <li>Данные — <b>objects</b> в <b>buckets</b>. Объём практически не ограничен, один объект до <b>5 TB</b>. Надёжность <b>11 девяток</b> (99,999999999%). Данные хранятся избыточно в нескольких AZ региона.</li>
  <li>Бакет создаётся <b>в конкретном регионе</b>, а его имя должно быть <b>уникальным во всём мире</b>. Адрес бывает path-style или virtual-hosted-style URL.</li>
  <li><b>Классы хранения:</b> Standard; Intelligent-Tiering (сам переносит между уровнями); Standard-IA (редкий доступ); One Zone-IA (редкий доступ, одна AZ); Glacier; Glacier Deep Archive (самый дешёвый).</li>
  <li><b>Lifecycle policies</b> автоматически переносят объекты в более дешёвый класс или удаляют их.</li>
  <li><b>Применение:</b> хранение данных приложений, статический веб-хостинг, бэкапы и DR, staging для big data, раздача контента.</li>
  <li><b>Платишь:</b> за GB в месяц, исходящий трафик в другие регионы, запросы PUT, COPY, POST, LIST и GET. <b>Не платишь:</b> за входящий трафик и передачу в CloudFront или EC2 в том же регионе.</li>
  <li>Standard: 11 девяток надёжности и 4 девятки доступности. Standard-IA: 3 девятки доступности.</li>
</ul>
<h3>3. Amazon EFS</h3>
<ul>
  <li>Файловое хранилище по сети, протокол <b>NFSv4</b>, работает с Linux-AMI. Размер растёт и уменьшается автоматически, платишь за использованное, масштабируется до петабайт.</li>
  <li>Подходит для big data, обработки медиа, CMS, веб-серверов, домашних каталогов.</li>
  <li><b>Mount target</b> создаётся по одному на AZ в подсети VPC. Инстансы подключаются к ближайшему.</li>
</ul>
<h3>4. Amazon S3 Glacier</h3>
<ul>
  <li>Архив с очень низкой ценой и надёжностью <b>11 девяток</b>. Цена зависит от региона.</li>
  <li><b>Термины:</b> <b>archive</b> — любой хранимый объект; <b>vault</b> — контейнер для архивов; <b>vault access policy</b> — кто имеет доступ. <b>Vault Lock</b> фиксирует политику для compliance.</li>
  <li><b>Извлечение:</b> Expedited — <b>1–5 минут</b> (дороже всего), Standard — <b>3–5 часов</b>, Bulk — <b>5–12 часов</b> (дешевле всего).</li>
  <li>Glacier и S3: объект до 40 TB вместо 5 TB, задержка минуты и часы вместо миллисекунд, хранение дешевле, а извлечение платное.</li>
  <li><b>Шифрование:</b> по умолчанию AES-256; в S3 варианты SSE-S3, SSE-KMS и SSE-C.</li>
  <li>Используется для медиаархивов, медицинских записей, регуляторного хранения, научных данных, вместо ленточных библиотек.</li>
</ul>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Имя бакета уникально <b>во всём мире</b>, но бакет живёт в <b>одном регионе</b>.</li>
  <li>S3 реплицирует объекты в <b>несколько AZ одного региона</b>.</li>
  <li>По умолчанию данные S3 <b>не</b> публичные.</li>
  <li>Много EC2 одновременно к одному хранилищу → <b>EFS</b>.</li>
  <li>EBS реплицируется <b>внутри AZ</b>, данные <b>не теряются</b> при остановке инстанса.</li>
  <li>Vault в Glacier — <b>контейнер для архивов</b>.</li>
</ul></div>`},

{ id: "m8", code: "M08", title: "Databases", ru: "Базы данных", html: `
<h3>Managed и unmanaged</h3>
<p>Своя база on-premises: ты отвечаешь за железо, питание, ОС, установку и патчи СУБД, бэкапы, отказоустойчивость, масштабирование. База на EC2 снимает с тебя железо. <b>Managed</b>-сервис (RDS) снимает ещё ОС, патчи, бэкапы и HA. Ты занимаешься только данными и оптимизацией приложения.</p>
<h3>1. Amazon RDS</h3>
<ul>
  <li>Управляемая <b>реляционная</b> база в облаке. Движки: <b>Aurora, PostgreSQL, MySQL, MariaDB, Oracle, SQL Server</b>.</li>
  <li><b>DB instance:</b> класс (CPU, память, сеть) и хранилище (General Purpose SSD, Provisioned IOPS). Размещается в VPC, обычно в частной подсети.</li>
  <li><b>Multi-AZ:</b> primary в одной AZ <b>синхронно</b> реплицируется на standby в другой. При сбое происходит автоматическое переключение, приложение подключается по тому же endpoint.</li>
  <li><b>Read replicas:</b> <b>асинхронная</b> репликация для read-heavy нагрузки, разгружают primary от чтения. Реплику можно повысить до primary <b>вручную</b>, можно разместить в другом регионе ближе к пользователям.</li>
  <li><b>RDS подходит:</b> сложные транзакции и запросы, средняя и высокая нагрузка (до 30 000 IOPS), один узел, высокая надёжность.</li>
  <li><b>RDS не подходит:</b> огромные скорости записи (150 000 в секунду), шардирование, простые GET/PUT (это задача NoSQL), кастомизация СУБД.</li>
  <li><b>Цена:</b> clock-hour billing (пока инстанс работает), движок, класс, On-Demand или Reserved (1 или 3 года), хранилище и бэкапы, Single-AZ или Multi-AZ, исходящий трафик (входящий бесплатный).</li>
</ul>
<h3>2. Amazon DynamoDB</h3>
<table>
  <tr><th></th><th>Relational (SQL)</th><th>Non-relational (NoSQL)</th></tr>
  <tr><td>Хранение</td><td>строки и столбцы</td><td>key-value, документы, графы</td></tr>
  <tr><td>Схема</td><td>фиксированная</td><td>динамическая</td></tr>
  <tr><td>Масштабирование</td><td><b>вертикальное</b></td><td><b>горизонтальное</b></td></tr>
</table>
<ul>
  <li>Быстрая и гибкая <b>NoSQL</b>: задержка в несколько миллисекунд на любом масштабе, без лимитов на размер таблиц и throughput, работает только на SSD, модели key-value и document.</li>
  <li><b>Компоненты:</b> <b>table</b> (коллекция данных) → <b>item</b> (набор атрибутов, уникальный по ключу) → <b>attribute</b> (базовый элемент данных).</li>
  <li><b>Primary key:</b> partition key или partition + sort key.</li>
  <li><b>Query</b> — эффективный поиск по primary key (с необязательным фильтром по sort key) и по вторичным индексам. <b>Scan</b> — перебор всей таблицы, чтобы найти элементы по <b>любому атрибуту</b>.</li>
  <li>Глобальные таблицы реплицируются в выбранные регионы. Подходит для mobile, web, игр, adtech, IoT, хранения сессий.</li>
</ul>
<h3>3. Amazon Redshift</h3>
<ul>
  <li>Быстрое управляемое <b>хранилище данных</b> (data warehouse) для аналитики через <b>SQL и BI-инструменты</b>.</li>
  <li><b>Columnar storage</b> и <b>massively parallel processing</b>: данные и запросы распределены по узлам. Масштабируется добавлением узлов без простоя, шифрование встроено.</li>
  <li>Применение: корпоративное хранилище данных, big data, аналитика в SaaS-продуктах.</li>
</ul>
<h3>4. Amazon Aurora</h3>
<ul>
  <li>Корпоративная реляционная база, <b>совместимая с MySQL и PostgreSQL</b>, полностью управляемая.</li>
  <li>Высокая производительность и доступность: <b>несколько копий данных в нескольких AZ</b>, постоянный бэкап в S3, самовосстанавливающееся хранилище, восстановление после сбоя обычно меньше чем за 60 секунд.</li>
</ul>
<table>
  <tr><th>Задача</th><th>Сервис</th></tr>
  <tr><td>Корпоративная реляционная база</td><td>RDS / Aurora</td></tr>
  <tr><td>NoSQL на любом масштабе</td><td>DynamoDB</td></tr>
  <tr><td>Аналитика, хранилище данных</td><td>Redshift</td></tr>
  <tr><td>Нужен доступ к ОС или то, чего нет в RDS</td><td>база на EC2</td></tr>
</table>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Состояние сессий сотен тысяч пользователей → <b>DynamoDB</b>.</li>
  <li>Поиск по атрибуту, который не является ключом → <b>Scan</b>.</li>
  <li>SQL + BI для анализа → <b>Redshift</b>.</li>
  <li>MySQL-приложение с HA и автобэкапами → <b>Aurora</b>.</li>
  <li>Attribute — <b>fundamental data element</b>.</li>
  <li>Multi-AZ работает синхронно, read replica — асинхронно.</li>
</ul></div>`},

{ id: "m9", code: "M09", title: "Cloud Architecture", ru: "Архитектура", html: `
<h3>1. AWS Well-Architected Framework</h3>
<p>Единый подход к оценке архитектур и набор best practices, собранных AWS после разбора тысяч архитектур клиентов. Состоит из <b>6 pillars</b>. Шестой, <b>sustainability</b>, добавлен в 2021 году.</p>
<table>
  <tr><th>Pillar</th><th>Цель</th><th>Design principles</th></tr>
  <tr><td><b>Operational Excellence</b></td><td>запускать и мониторить системы, постоянно улучшать процессы</td><td>operations as code; frequent, small, reversible changes; регулярно улучшать процедуры; anticipate failure; учиться на всех сбоях</td></tr>
  <tr><td><b>Security</b></td><td>защищать данные, системы и активы</td><td>strong identity foundation (least privilege); <b>enable traceability</b>; security at all layers; автоматизировать безопасность; защищать данные at rest и in transit; keep people away from data; готовиться к инцидентам</td></tr>
  <tr><td><b>Reliability</b></td><td>работать правильно и стабильно, восстанавливаться после сбоев</td><td>automatically recover from failure; тестировать восстановление; scale horizontally; stop guessing capacity; manage change in automation</td></tr>
  <tr><td><b>Performance Efficiency</b></td><td>эффективно использовать ресурсы при меняющейся нагрузке</td><td><b>democratize advanced technologies</b>; go global in minutes; <b>use serverless architectures</b>; experiment more often; consider mechanical sympathy</td></tr>
  <tr><td><b>Cost Optimization</b></td><td>избегать лишних расходов</td><td>Cloud Financial Management; consumption model; measure overall efficiency; stop spending on undifferentiated heavy lifting; <b>analyze and attribute expenditure</b></td></tr>
  <tr><td><b>Sustainability</b></td><td>снижать влияние облачных нагрузок на окружающую среду</td><td>понимать влияние, максимизировать утилизацию, минимизировать ресурсы</td></tr>
</table>
<ul>
  <li>Области Performance Efficiency: <b>selection, review, monitoring, tradeoffs</b>.</li>
  <li><b>AWS Well-Architected Tool</b> — сервис для ревью нагрузок по фреймворку с планом улучшений.</li>
</ul>
<h3>2. Reliability и availability</h3>
<ul>
  <li>«Everything fails, all the time» (Werner Vogels). Проектируй с расчётом на отказы.</li>
  <li><b>Reliability</b> — способность системы работать, когда это нужно пользователю. Измеряется через <b>MTBF</b> (mean time between failures) = MTTF + MTTR.</li>
  <li><b>Availability</b> — доля времени нормальной работы: normal operation time / total time. Записывается в девятках: <b>five 9s</b> = 99,999%.</li>
  <li><b>High availability</b>: система выдерживает частичную деградацию, простой минимален, участие человека минимально.</li>
  <li><b>Факторы доступности:</b> <b>fault tolerance</b> (встроенная избыточность), <b>scalability</b> (рост без изменения дизайна), <b>recoverability</b> (быстро восстановиться после катастрофы). Высокая доступность стоит денег, это компромисс.</li>
</ul>
<h3>3. AWS Trusted Advisor</h3>
<ul>
  <li>Онлайн-инструмент: смотрит на весь аккаунт и даёт рекомендации по best practices в реальном времени.</li>
  <li><b>5 категорий:</b> <b>Cost Optimization</b> (простаивающие ресурсы, резервирование), <b>Performance</b>, <b>Security</b> (MFA на root, парольная политика, открытые security groups), <b>Fault Tolerance</b> (снапшоты, несколько AZ), <b>Service Limits</b> (использование выше 80% лимита).</li>
  <li>Статусы: зелёный (всё хорошо), жёлтый (стоит посмотреть), красный (нужно действовать). Basic даёт 6 core-проверок, Business и Enterprise — все.</li>
</ul>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Traceability — <b>не</b> область Performance Efficiency (это принцип Security).</li>
  <li>Принцип облачного дизайна — <b>assume everything will fail</b>.</li>
  <li>Пять категорий Trusted Advisor: cost optimization, performance, security, fault tolerance, service limits.</li>
  <li>Работает при отказе части компонентов → <b>fault tolerance</b>. Минимальный простой без людей → <b>highly available</b>.</li>
  <li>Работа тогда, когда нужно пользователю → <b>reliability</b>.</li>
</ul></div>`},

{ id: "m10", code: "M10", title: "Auto Scaling and Monitoring", ru: "Масштабирование и мониторинг", html: `
<h3>1. Elastic Load Balancing</h3>
<ul>
  <li>Распределяет входящий трафик по целям (<b>EC2, контейнеры, IP-адреса, Lambda</b>) в одной или нескольких AZ и сам масштабируется вместе с трафиком.</li>
  <li><b>Как работает:</b> <b>listener</b> принимает соединения на порту и протоколе → правила → <b>target group</b> → балансировщик проверяет <b>health</b> целей и шлёт трафик только здоровым.</li>
</ul>
<table>
  <tr><th>Тип (в слайдах v2)</th><th>Уровень OSI</th><th>Для чего</th></tr>
  <tr><td><b>Application LB</b></td><td>7</td><td>HTTP/HTTPS, маршрутизация по содержимому запроса, микросервисы и контейнеры</td></tr>
  <tr><td><b>Network LB</b></td><td>4</td><td>TCP, UDP, TLS, миллионы запросов в секунду, ультранизкая задержка, резкие скачки трафика, статический IP</td></tr>
  <tr><td><b>Gateway LB</b></td><td>3</td><td>сторонние виртуальные appliance (файрволы, анализ трафика)</td></tr>
</table>
<div class="trap"><b>Внимание:</b> в слайдах три типа — ALB, NLB и <b>Gateway</b>, а knowledge check M10 называет <b>Application, Network и Classic</b>. На тесте ориентируйся на варианты в вопросе: если есть Classic и нет Gateway, выбирай Classic.</div>
<ul>
  <li><b>Use cases:</b> высокая доступность и отказоустойчивость, контейнеры, автоскейлинг вместе с CloudWatch, гибридные среды, вызов Lambda по HTTP(S).</li>
  <li><b>Мониторинг балансировщика:</b> метрики CloudWatch, <b>access logs</b> (подробности запросов), <b>CloudTrail</b> (кто, что и когда вызывал в API).</li>
</ul>
<h3>2. Amazon CloudWatch</h3>
<ul>
  <li>Мониторинг ресурсов AWS и приложений в реальном времени. Собирает <b>стандартные и custom-метрики</b>.</li>
  <li><b>Alarms</b> отправляют уведомление в <b>SNS</b> или выполняют действие EC2 Auto Scaling или EC2.</li>
  <li><b>Events (rules)</b> — реакция на изменения в среде: событие отправляется в target (например, Lambda).</li>
  <li><b>Алярм по static threshold</b> задаётся так: namespace, metric (например, CPUUtilization), <b>statistic</b> (average, sum, min, max), <b>period</b>, условие (&gt;, &lt;, ≥, ≤ и порог), действие. Слово «около» порогом не бывает, и statistic указывать обязательно.</li>
  <li>Алярм может строиться и по anomaly detection или metric math.</li>
</ul>
<h3>3. Amazon EC2 Auto Scaling</h3>
<ul>
  <li>Поддерживает доступность приложения: <b>добавляет и удаляет EC2</b> по заданным условиям, находит нездоровые инстансы и заменяет их.</li>
  <li><b>Auto Scaling group</b> — набор EC2, которые масштабируются как одно целое. Задаются <b>minimum, maximum и desired capacity</b>.</li>
  <li><b>Scale out</b> — добавить инстансы, <b>scale in</b> — убрать.</li>
  <li><b>Launch configuration / template</b> — шаблон инстанса: AMI, тип инстанса, тома EBS, security groups, key pair.</li>
  <li><b>Способы масштабирования:</b> поддерживать текущее количество, <b>manual</b> (меняешь min, max или desired), <b>scheduled</b> (по расписанию), <b>dynamic</b> (по метрикам, например CPU выше 60%), <b>predictive</b> (машинное обучение, вместе с AWS Auto Scaling).</li>
</ul>
<div class="steps">
  <div><b>1.</b> CloudWatch-алярм: средний CPU группы выше 60% в течение 5 минут.</div>
  <div><b>2.</b> EC2 Auto Scaling запускает новый инстанс по launch configuration.</div>
  <div><b>3.</b> Auto Scaling регистрирует инстанс в Elastic Load Balancing.</div>
  <div><b>4.</b> ELB проверяет здоровье инстанса и начинает слать ему трафик.</div>
</div>
<ul>
  <li><b>AWS Auto Scaling</b> — <b>отдельный</b> сервис: scaling plans для нескольких типов ресурсов (EC2, Spot Fleets, задачи ECS, таблицы DynamoDB, реплики Aurora).</li>
</ul>
<div class="key"><h3>Запомнить для теста</h3><ul>
  <li>Масштабирование по спросу — <b>ELB + EC2 Auto Scaling</b>.</li>
  <li>Уведомления по алярмам CloudWatch — <b>SNS</b>.</li>
  <li>Балансировщику нужен <b>listener</b>, чтобы принимать трафик.</li>
  <li>Метрики RDS и EC2 — <b>CloudWatch</b>. Журнал всех API-вызовов для аудита — <b>CloudTrail</b>.</li>
  <li>Элементы ASG: min, max, desired. Launch configuration: AMI, instance type, EBS.</li>
  <li>Нездоровая цель: трафик перестаёт к ней идти, уходит на здоровые и возвращается, когда цель снова здорова.</li>
</ul></div>`}
];
