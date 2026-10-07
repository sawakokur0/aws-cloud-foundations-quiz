// Computer Networks: открытые вопросы по лекциям 1–5.
// Формат: { l: лекция, p: 1 если тема вероятна на мидтерме, q: вопрос (EN), ru: суть по-русски,
//           a: образец ответа (EN, HTML), k: что обязательно упомянуть }.
// id вопроса = лекция + ":" + номер внутри лекции, поэтому новые вопросы добавляй в конец своей лекции.
window.NET_OQ = [
/* ---------------- L1 ---------------- */
{ l: "1", p: 1,
  q: "Explain the difference between end devices and intermediary devices. Give examples and list the functions of intermediary devices.",
  ru: "End device — источник или получатель сообщения (ПК, сервер, телефон). Intermediary соединяет и пересылает (switch, router, AP, firewall): регенерирует сигнал, знает пути, сообщает об ошибках.",
  a: `<p>An <b>end device</b> (host) is where a message <b>originates or is received</b>: data starts at one end device, flows through the network and arrives at another. Examples: PCs, laptops, servers, printers, IP phones, smartphones.</p>
<p>An <b>intermediary device</b> interconnects end devices and manages data as it flows through the network. Examples: <b>switches, wireless access points, routers, firewalls</b>. Their functions:</p>
<ul><li>regenerate and retransmit data signals;</li><li>maintain information about which pathways exist in the network;</li><li>notify other devices of errors and communication failures.</li></ul>`,
  k: ["message originates / is received at end device", "switch, router, AP, firewall", "regenerate and retransmit signals", "maintain pathway information", "notify of errors"] },
{ l: "1", p: 0,
  q: "What is a peer-to-peer network? Describe its advantages and disadvantages.",
  ru: "Устройство одновременно клиент и сервер; только для маленьких сетей. Плюсы: просто, дёшево. Минусы: нет централизации, небезопасно, не масштабируется, медленно.",
  a: `<p>In a <b>peer-to-peer</b> network a device can be <b>both a client and a server</b> at the same time, for example a PC that shares a printer and also browses files on another PC. It is recommended only for very small networks.</p>
<p><b>Advantages:</b> easy to set up, less complex, lower cost, good for simple tasks such as transferring files and sharing printers.</p>
<p><b>Disadvantages:</b> no centralized administration, not as secure, not scalable, slower performance (every device serves others while doing its own work).</p>`,
  k: ["client and server at the same time", "small networks only", "easy, cheap, less complex", "no centralized administration", "not secure, not scalable, slower"] },
{ l: "1", p: 1,
  q: "Compare a LAN and a WAN.",
  ru: "LAN: маленькая область, одна организация, высокая скорость. WAN: большая область, соединяет LAN, управляют провайдеры, медленнее.",
  a: `<p>A <b>LAN</b> (Local Area Network) spans a <b>small geographical area</b> such as a home, office or campus. It interconnects end devices, is administered by a <b>single organization or individual</b> and provides <b>high-speed bandwidth</b> to internal devices.</p>
<p>A <b>WAN</b> (Wide Area Network) spans a <b>wide geographical area</b> and interconnects LANs. It is typically administered by <b>one or more service providers</b> and usually provides <b>slower links</b> between LANs. The internet is a worldwide collection of interconnected LANs and WANs.</p>`,
  k: ["small vs wide geographic area", "single organization vs service providers", "high-speed vs slower links", "WAN interconnects LANs"] },
{ l: "1", p: 1,
  q: "Describe the four basic characteristics of a reliable network architecture.",
  ru: "Fault tolerance (несколько путей, packet switching), scalability (расширение без ухудшения), QoS (приоритет голосу и видео), security (инфраструктура + информация, CIA).",
  a: `<ul>
<li><b>Fault tolerance</b> limits the impact of a failure so that the fewest devices are affected. It requires <b>multiple paths</b> (redundancy) and is achieved with <b>packet switching</b>: traffic is split into packets that can each take a different path, unlike circuit switching with a dedicated circuit.</li>
<li><b>Scalability</b>: the network can expand quickly to support new users and applications <b>without degrading service</b> for existing users, because designers follow accepted standards and protocols.</li>
<li><b>Quality of Service (QoS)</b> is the primary mechanism for reliable delivery of content. With a QoS policy the router manages the flow of voice and video traffic so that live video does not pause when demand exceeds bandwidth.</li>
<li><b>Security</b>: network infrastructure security (physical security of devices, preventing unauthorized access) and information security. Goals: <b>confidentiality, integrity, availability</b>.</li></ul>`,
  k: ["fault tolerance: multiple paths, packet switching", "scalability: grow without impact", "QoS: voice/video priority", "security: infrastructure + information", "confidentiality, integrity, availability"] },
{ l: "1", p: 0,
  q: "What is a converged network and what are its benefits?",
  ru: "Одна инфраструктура для данных, голоса и видео с одними правилами вместо трёх отдельных сетей.",
  a: `<p>Before converged networks, an organization was cabled separately for <b>telephone, video and data</b>, and each network used its own technologies, rules and standards.</p>
<p>A <b>converged network</b> carries <b>data, voice and video over the same network infrastructure</b> using one set of rules and standards. Benefits: one network to install and manage, lower cost, and new services such as IP phones and video conferencing on the same links.</p>`,
  k: ["separate networks before", "data, voice, video on one infrastructure", "same rules and standards"] },
{ l: "1", p: 1,
  q: "Compare console, SSH and Telnet as methods of accessing a Cisco device.",
  ru: "Console — физический порт, начальная настройка без сети. SSH — удалённо и зашифровано, рекомендуется. Telnet — удалённо, но всё открытым текстом.",
  a: `<ul>
<li><b>Console</b>: a physical management port. It is used for maintenance and the <b>initial configuration</b>, because the device does not need network connectivity.</li>
<li><b>SSH</b> (Secure Shell): a <b>secure</b> remote CLI connection through a virtual interface over the network. It is the <b>recommended</b> method for remote access.</li>
<li><b>Telnet</b>: an <b>insecure</b> remote CLI connection; user authentication, passwords and commands are sent in <b>plaintext</b>.</li></ul>
<p>All three are used with terminal emulation programs such as PuTTY, Tera Term or SecureCRT.</p>`,
  k: ["console: physical port, initial config", "SSH: encrypted, recommended", "Telnet: plaintext", "PuTTY / Tera Term"] },
{ l: "1", p: 1,
  q: "Describe the primary IOS command modes and how to move between them.",
  ru: "User EXEC (>) → enable → privileged EXEC (#) → configure terminal → global config → line/interface. exit — на уровень вверх, end / Ctrl+Z — сразу в privileged EXEC.",
  a: `<ul>
<li><b>User EXEC</b> (<code>Switch&gt;</code>): limited basic monitoring commands.</li>
<li><b>Privileged EXEC</b> (<code>Switch#</code>): all commands and features. Enter with <code>enable</code>, leave with <code>disable</code>.</li>
<li><b>Global configuration</b> (<code>Switch(config)#</code>): device-wide settings. Enter with <code>configure terminal</code>.</li>
<li><b>Line configuration</b> (<code>(config-line)#</code>): console, SSH, Telnet, AUX access, e.g. <code>line console 0</code>.</li>
<li><b>Interface configuration</b> (<code>(config-if)#</code>): a switch port or router interface, e.g. <code>interface g0/0/0</code>.</li></ul>
<p><code>exit</code> moves up one level; <code>end</code> or <b>Ctrl+Z</b> returns directly to privileged EXEC from any configuration mode. You can move from one subconfiguration mode to another by typing that mode's command.</p>`,
  k: [">  user EXEC", "#  privileged EXEC (enable)", "configure terminal", "line / interface modes", "exit vs end / Ctrl+Z"] },
{ l: "1", p: 1,
  q: "Write the commands to give a switch a hostname, secure console, privileged EXEC and VTY access, encrypt passwords, add a banner and save the configuration.",
  ru: "hostname → line console 0 / password / login → enable secret → line vty 0 15 / password / login → service password-encryption → banner motd → copy run start.",
  a: `<pre><code>Switch&gt; enable
Switch# configure terminal
Switch(config)# hostname Sw-Floor-1
Sw-Floor-1(config)# line console 0
Sw-Floor-1(config-line)# password cisco
Sw-Floor-1(config-line)# login
Sw-Floor-1(config-line)# exit
Sw-Floor-1(config)# enable secret class
Sw-Floor-1(config)# line vty 0 15
Sw-Floor-1(config-line)# password cisco
Sw-Floor-1(config-line)# login
Sw-Floor-1(config-line)# exit
Sw-Floor-1(config)# service password-encryption
Sw-Floor-1(config)# banner motd # Authorized Access Only! #
Sw-Floor-1(config)# end
Sw-Floor-1# copy running-config startup-config</code></pre>
<p><code>login</code> is required for the line password to be checked; <code>enable secret</code> stores an encrypted password; <code>service password-encryption</code> encrypts the plaintext line passwords.</p>`,
  k: ["hostname", "line console 0 + password + login", "enable secret", "line vty 0 15", "service password-encryption", "banner motd # #", "copy running-config startup-config"] },
{ l: "1", p: 1,
  q: "Explain the difference between the running-config and the startup-config. How do you save and how do you remove a configuration?",
  ru: "running-config в RAM: действует сразу, пропадает при выключении. startup-config в NVRAM: грузится при старте. Сохранить copy run start; стереть erase startup-config + reload.",
  a: `<p>The <b>running-config</b> is stored in <b>RAM</b> and reflects the current configuration; changes affect the device <b>immediately</b>, but RAM is volatile, so it is lost when the device is powered off or restarted.</p>
<p>The <b>startup-config</b> is stored in <b>NVRAM</b>; it contains the commands the device loads at startup or reboot and is not lost when power is removed.</p>
<p>Save: <code>copy running-config startup-config</code>. If unsaved changes are wrong, remove them one by one or use <code>reload</code>. If they were saved, use <code>erase startup-config</code> and then <code>reload</code> to clear the running-config.</p>`,
  k: ["running-config = RAM, volatile, immediate", "startup-config = NVRAM, used at boot", "copy running-config startup-config", "reload", "erase startup-config"] },

/* ---------------- L2 ---------------- */
{ l: "2", p: 1,
  q: "List and explain the requirements that network protocols must define for a message.",
  ru: "Encoding, formatting и encapsulation, size, timing (flow control, response timeout, access method), delivery options (unicast, multicast, broadcast).",
  a: `<ul>
<li><b>Message encoding</b>: converting information into a form suitable for transmission (and decoding back).</li>
<li><b>Message formatting and encapsulation</b>: the message must have a specific structure that depends on the message type and channel.</li>
<li><b>Message size</b>: long messages are broken into pieces that meet minimum and maximum frame sizes; each piece has its own addressing and is reassembled at the destination.</li>
<li><b>Message timing</b>: <b>flow control</b> (rate and amount of data), <b>response timeout</b> (how long to wait for a reply) and <b>access method</b> (when a device may send, to deal with collisions).</li>
<li><b>Message delivery options</b>: unicast (one to one), multicast (one to many), broadcast (one to all).</li></ul>`,
  k: ["encoding", "formatting / encapsulation", "size", "flow control, response timeout, access method", "unicast / multicast / broadcast"] },
{ l: "2", p: 0,
  q: "Compare unicast, multicast and broadcast delivery. Which option is missing in IPv6?",
  ru: "Unicast одному, multicast группе, broadcast всем. В IPv6 нет broadcast, есть anycast.",
  a: `<p><b>Unicast</b> is one-to-one communication; <b>multicast</b> is one-to-many, usually a group but not all hosts; <b>broadcast</b> is one-to-all.</p>
<p>Broadcasts are used in IPv4 networks but are <b>not an option for IPv6</b>; IPv6 uses multicast instead and adds <b>anycast</b> as another delivery option.</p>`,
  k: ["one to one", "one to group", "one to all", "no broadcast in IPv6", "anycast"] },
{ l: "2", p: 1,
  q: "Describe the roles of HTTP, TCP, IP and Ethernet when a web page is delivered.",
  ru: "HTTP — как общаются веб-сервер и клиент; TCP — разговоры, гарантия доставки, flow control; IP — глобальная доставка; Ethernet — от NIC к NIC в LAN.",
  a: `<ul>
<li><b>HTTP</b> (application) governs how a web server and a web client interact and defines the content and format of requests and responses.</li>
<li><b>TCP</b> (transport) manages the individual conversations, provides guaranteed delivery and manages flow control.</li>
<li><b>IP</b> (internet) delivers messages globally from the sender to the receiver.</li>
<li><b>Ethernet</b> (network access) delivers messages from one NIC to another NIC on the same Ethernet LAN.</li></ul>
<p>The server encapsulates the page down the stack and the client de-encapsulates it up the stack for the browser.</p>`,
  k: ["HTTP: web client-server", "TCP: conversations, reliable, flow control", "IP: global delivery", "Ethernet: NIC to NIC on LAN"] },
{ l: "2", p: 1,
  q: "What are the benefits of using a layered network model?",
  ru: "Помогает проектировать протоколы, поощряет конкуренцию вендоров, изменения в одном уровне не влияют на другие, общий язык.",
  a: `<ul>
<li>Assists in <b>protocol design</b>, because protocols at a specific layer have defined information they act upon and a defined interface to the layers above and below.</li>
<li>Fosters <b>competition</b>, because products from different vendors can work together.</li>
<li>Prevents technology or capability <b>changes in one layer from affecting</b> other layers.</li>
<li>Provides a <b>common language</b> to describe networking functions and capabilities.</li></ul>
<p>The two layered models are the OSI reference model and the TCP/IP model.</p>`,
  k: ["protocol design, defined interfaces", "vendor interoperability / competition", "changes isolated to one layer", "common language"] },
{ l: "2", p: 1,
  q: "Name the seven layers of the OSI model, describe each briefly, and map them to the TCP/IP model.",
  ru: "7 Application, 6 Presentation, 5 Session → Application; 4 Transport → Transport; 3 Network → Internet; 2 Data link, 1 Physical → Network access.",
  a: `<ol>
<li><b>Physical</b>: activate, maintain and de-activate physical connections; bits.</li>
<li><b>Data link</b>: exchange frames over a common media.</li>
<li><b>Network</b>: exchange individual pieces of data (packets) across the network; addressing and routing.</li>
<li><b>Transport</b>: segment, transfer and reassemble data for individual communications.</li>
<li><b>Session</b>: services to the presentation layer and management of data exchange.</li>
<li><b>Presentation</b>: common representation of data between application services.</li>
<li><b>Application</b>: protocols for process-to-process communication.</li></ol>
<p>TCP/IP: <b>Application</b> = OSI 7, 6, 5; <b>Transport</b> = 4; <b>Internet</b> = 3; <b>Network access</b> = 2 and 1. TCP/IP does not specify the protocols used on the physical medium.</p>`,
  k: ["7 layers in order", "application = 5–7", "transport = 4", "internet = 3", "network access = 1–2"] },
{ l: "2", p: 0,
  q: "Name the standards organizations involved with the internet and with electronic and communications standards, and what each one does.",
  ru: "ISOC, IAB, IETF, IRTF, ICANN, IANA — интернет; IEEE, EIA, TIA, ITU-T — электроника и связь.",
  a: `<p><b>Internet standards:</b> <b>ISOC</b> promotes open development of the internet; <b>IAB</b> manages and develops internet standards; <b>IETF</b> develops and maintains internet and TCP/IP technologies; <b>IRTF</b> does long-term research; <b>ICANN</b> coordinates IP address allocation and domain names; <b>IANA</b> manages IP addresses, domain names and protocol identifiers for ICANN.</p>
<p><b>Electronic and communications standards:</b> <b>IEEE</b> (power, healthcare, telecommunications, networking, e.g. 802.3 and 802.11); <b>EIA</b> (electrical wiring, connectors, 19-inch racks); <b>TIA</b> (radio equipment, cellular towers, VoIP, satellite); <b>ITU-T</b> (video compression, IPTV, broadband such as DSL).</p>
<p>Open standards encourage interoperability, competition and innovation; the organizations are vendor-neutral and non-profit.</p>`,
  k: ["IETF: TCP/IP", "ICANN / IANA: addresses and domains", "IEEE: 802.3, 802.11", "EIA, TIA, ITU-T", "open standards: interoperability"] },
{ l: "2", p: 1,
  q: "Explain encapsulation and de-encapsulation and name the PDU at each layer.",
  ru: "Инкапсуляция сверху вниз: каждый уровень добавляет заголовок; data → segment → packet → frame → bits. Деинкапсуляция снизу вверх: заголовки снимаются.",
  a: `<p><b>Encapsulation</b> is the process where protocols add their information (headers, and a trailer at the data link layer) to the data. It is a <b>top-down</b> process at the sender: each layer does its work and passes the PDU down.</p>
<p>PDUs going down: <b>data</b> (application) → <b>segment</b> (transport) → <b>packet</b> (network) → <b>frame</b> (data link) → <b>bits</b> (physical).</p>
<p><b>De-encapsulation</b> happens at the receiver from the bottom up: each layer strips off its header and passes the data up, from bits to frame, packet, segment and finally data the application can process. Example: a web server encapsulates a page and the client de-encapsulates it for the browser.</p>`,
  k: ["top-down at sender", "headers (and trailer) added", "data, segment, packet, frame, bits", "bottom-up at receiver, headers removed"] },
{ l: "2", p: 0,
  q: "What are segmentation, multiplexing and sequencing, and what are the benefits of segmenting messages?",
  ru: "Segmentation — разбиение, multiplexing — чередование потоков, sequencing — нумерация (TCP). Плюсы: скорость и эффективность.",
  a: `<p><b>Segmenting</b> breaks messages into smaller units. <b>Multiplexing</b> interleaves multiple streams of segmented data on the same link. <b>Sequencing</b> numbers the segments so the message can be reassembled at the destination; TCP is responsible for it.</p>
<p>Benefits of segmenting: <b>increases speed</b>, because large amounts of data can be sent without tying up a link, and <b>increases efficiency</b>, because only the segments that fail to arrive are retransmitted, not the whole data stream.</p>`,
  k: ["segmenting: smaller units", "multiplexing: interleave streams", "sequencing: numbering by TCP", "speed", "efficiency: retransmit only lost segments"] },

/* ---------------- L3 ---------------- */
{ l: "3", p: 1,
  q: "What is the purpose of the physical layer, and which three functional areas do its standards address?",
  ru: "Передаёт биты: берёт кадр и кодирует сигналами. Стандарты: physical components, encoding, signaling.",
  a: `<p>The physical layer <b>transports bits across the network media</b>. It accepts a <b>complete frame</b> from the data link layer and encodes it as a series of signals transmitted onto the local media; this is the last step of encapsulation. The next device receives the bits, rebuilds the frame and decides what to do with it.</p>
<p>Physical layer standards address:</p>
<ul><li><b>Physical components</b>: NICs, interfaces, connectors, cable materials and designs.</li>
<li><b>Encoding</b>: converting the bit stream into predictable patterns the next device recognizes, e.g. Manchester, 4B/5B, 8B/10B.</li>
<li><b>Signaling</b>: how 1 and 0 are represented on the medium — electrical signals on copper, light pulses on fiber, microwave signals on wireless.</li></ul>`,
  k: ["transport bits", "frame → signals", "physical components", "encoding (Manchester)", "signaling: electrical / light / microwave"] },
{ l: "3", p: 1,
  q: "Explain bandwidth, latency, throughput and goodput.",
  ru: "Bandwidth — ёмкость среды (bps); latency — время с задержками; throughput — реально прошедшие биты; goodput = throughput − overhead.",
  a: `<ul>
<li><b>Bandwidth</b>: the capacity at which a medium can carry data, measured in bits per second (bps, Kbps, Mbps, Gbps, Tbps). It depends on the media, technology and laws of physics.</li>
<li><b>Latency</b>: the amount of time, including delays, for data to travel from one point to another.</li>
<li><b>Throughput</b>: the measure of the transfer of bits across the media over a given period; usually lower than bandwidth because of traffic, errors and devices.</li>
<li><b>Goodput</b>: the measure of usable data transferred over a period. <b>Goodput = throughput − traffic overhead</b> (headers, acknowledgments, retransmissions).</li></ul>`,
  k: ["bandwidth = capacity, bps", "latency = time incl. delays", "throughput = actual bits", "goodput = throughput − overhead"] },
{ l: "3", p: 1,
  q: "Describe the limitations of copper cabling and how they are mitigated.",
  ru: "Attenuation — ограничение длины; EMI/RFI — экран и заземление; crosstalk — скрутка пар (cancellation).",
  a: `<p>Copper is inexpensive and easy to install, but:</p>
<ul><li><b>Attenuation</b>: the longer the signal travels, the weaker it gets → mitigated by <b>strict adherence to cable length limits</b> (100 m for UTP).</li>
<li><b>EMI and RFI</b>: electromagnetic and radio frequency interference distort the signal → mitigated by <b>metallic shielding and grounding</b> (STP, coax).</li>
<li><b>Crosstalk</b>: interference from adjacent wires → mitigated by <b>twisting opposing circuit pairs</b> together. In UTP this is called <b>cancellation</b>: the two wires of a pair have opposite polarity, so their magnetic fields cancel each other and outside EMI/RFI.</li></ul>`,
  k: ["attenuation → length limits", "EMI/RFI → shielding, grounding", "crosstalk → twisted pairs", "cancellation"] },
{ l: "3", p: 1,
  q: "Compare UTP, STP and coaxial cable.",
  ru: "UTP: 4 витые пары без экрана, RJ-45, дешёвый, 100 м. STP: экран, лучше от шума, дороже. Coax: жила + оплётка, антенны и кабельный интернет.",
  a: `<ul>
<li><b>UTP</b>: four pairs of colour-coded twisted copper wires in a plastic jacket, <b>no shielding</b>, RJ-45 connectors. The most common medium, least expensive, 10 Mbps–40 Gbps, maximum <b>100 m</b>. Relies on cancellation to limit crosstalk.</li>
<li><b>STP</b>: adds a braided or foil shield around all pairs and foil around each pair, RJ-45. <b>Better noise protection</b> but <b>more expensive and harder to install</b>.</li>
<li><b>Coaxial</b>: a central copper conductor, plastic insulation, a copper braid or foil that acts as the second wire and shield, and an outer jacket. Used to attach <b>antennas</b> to wireless devices and for <b>cable internet</b> customer wiring.</li></ul>`,
  k: ["UTP: no shield, RJ-45, cheap, 100 m", "STP: shielded, costlier, harder", "coax: conductor + braid", "antennas, cable internet"] },
{ l: "3", p: 1,
  q: "When do you use a straight-through cable and when a crossover cable? Give examples.",
  ru: "Straight-through — разные устройства (switch–PC, switch–router, switch–server). Crossover — однотипные (switch–switch, router–router, PC–PC, router–PC).",
  a: `<p>A <b>straight-through</b> cable has the same wiring standard at both ends (T568A–T568A or T568B–T568B). It connects <b>different types</b> of devices: <b>switch to router, switch to PC, switch to server</b>.</p>
<p>A <b>crossover</b> cable has T568A at one end and T568B at the other, so the transmit and receive pairs are crossed. It connects <b>similar</b> devices: <b>switch to switch, router to router, PC to PC</b>, and also <b>router to PC</b> (both act as hosts).</p>
<p>Many modern devices support auto-MDIX and adjust automatically.</p>`,
  k: ["same standard both ends", "switch–PC, switch–router", "T568A + T568B", "switch–switch, router–router, PC–PC, router–PC"] },
{ l: "3", p: 1,
  q: "Compare single-mode and multimode fiber, and compare fiber with UTP.",
  ru: "SMF: маленькое ядро, лазер, далеко, жёлтый. MMF: большое ядро, LED, 550 м, больше дисперсия, оранжевый. Fiber vs UTP: дальше, быстрее, иммунен к EMI, но дороже.",
  a: `<p><b>Single-mode fiber</b>: very small core, uses expensive <b>lasers</b>, long-distance applications, low dispersion, yellow jacket.</p>
<p><b>Multimode fiber</b>: larger core, uses less expensive <b>LEDs</b> that transmit at different angles, up to <b>10 Gbps over 550 m</b>; greater <b>dispersion</b> (spreading of the light pulse over time) limits distance; orange or aqua jacket.</p>
<p><b>Fiber vs UTP</b>: fiber supports 10 Mb/s–100 Gb/s over up to 100 km and is completely immune to EMI, RFI and electrical hazards, but has the highest media cost and requires the most installation skill and safety precautions. UTP supports up to 10 Gb/s over 100 m, is cheapest and easiest. Fiber is used for backbone links between buildings and data distribution facilities, FTTH, long-haul and submarine networks.</p>`,
  k: ["SMF: small core, laser, long distance", "MMF: LED, 550 m, dispersion", "fiber immune to EMI/RFI", "fiber costlier, harder to install", "backbone use"] },
{ l: "3", p: 0,
  q: "Describe the limitations of wireless media and the components of a WLAN.",
  ru: "Coverage, interference, security, shared medium (half-duplex). WLAN: access point + wireless NIC; стандарты 802.11, 802.15, 802.16, 802.15.4.",
  a: `<p>Wireless carries data with radio or microwave frequencies and gives the greatest mobility, but has limitations:</p>
<ul><li><b>Coverage area</b> depends on the physical characteristics of the location.</li>
<li><b>Interference</b> from many common devices.</li>
<li><b>Security</b>: no physical access to a strand of media is needed, so anyone can receive the transmission.</li>
<li><b>Shared medium</b>: WLANs operate in <b>half-duplex</b>, so more users mean less bandwidth each.</li></ul>
<p>A WLAN needs a <b>wireless access point</b> (concentrates wireless signals and connects to the copper infrastructure) and <b>wireless NIC adapters</b> in hosts. Standards: Wi-Fi 802.11, Bluetooth 802.15, WiMAX 802.16, Zigbee 802.15.4.</p>`,
  k: ["coverage", "interference", "security", "shared medium, half-duplex", "AP + wireless NIC"] },
{ l: "3", p: 0,
  q: "Compare the 2.4 GHz and 5 GHz Wi-Fi bands and explain why non-overlapping channels matter.",
  ru: "2.4: дальше и лучше проходит, но много помех и всего 3 канала 1-6-11. 5: больше каналов и меньше помех, но хуже проходит. Перекрытие → co-channel и adjacent interference.",
  a: `<p><b>2.4 GHz</b>: greater range and better propagation, but more interference (Wi-Fi and non-Wi-Fi devices) and not enough channels; only <b>1, 6 and 11</b> are non-overlapping in the US and Europe.</p>
<p><b>5 GHz</b>: less crowded spectrum and more non-overlapping channels (four UNII bands and an ISM band, channel bonding to 40/80/160 MHz), but worse propagation and older devices do not support it.</p>
<p>Each AP uses one channel. Neighbouring APs must use <b>non-overlapping</b> channels; otherwise they cause <b>co-channel</b> and <b>adjacent channel interference</b>.</p>`,
  k: ["2.4: range, propagation", "2.4: interference, channels 1/6/11", "5: more channels, less crowded", "5: worse propagation", "co-channel / adjacent interference"] },

/* ---------------- L4 ---------------- */
{ l: "4", p: 1,
  q: "What is the purpose of the data link layer, and what do the LLC and MAC sublayers do?",
  ru: "Связь NIC–NIC, инкапсуляция пакетов L3 в кадры, обнаружение ошибок. LLC (802.2) — связь с ПО, какой протокол L3. MAC (802.3/802.11) — инкапсуляция, доступ к среде, адресация.",
  a: `<p>The data link layer is responsible for communication between end-device <b>NICs</b>. It lets upper-layer protocols access the physical media, <b>encapsulates Layer 3 packets (IPv4, IPv6) into Layer 2 frames</b>, and performs <b>error detection</b>, rejecting corrupt frames.</p>
<ul><li><b>LLC</b> (Logical Link Control, IEEE 802.2) communicates between the networking software of the upper layers and the device hardware, and places information in the frame identifying which <b>network layer protocol</b> is used.</li>
<li><b>MAC</b> (Media Access Control, IEEE 802.3, 802.11, 802.15) is responsible for <b>data encapsulation</b> (frame structure, MAC addressing, FCS error detection) and <b>media access control</b>; it is implemented in hardware.</li></ul>`,
  k: ["NIC to NIC", "packets → frames", "error detection", "LLC 802.2: identifies L3 protocol", "MAC 802.3: encapsulation, media access, addressing"] },
{ l: "4", p: 1,
  q: "Compare CSMA/CD and CSMA/CA. Why don't modern switched Ethernet LANs need CSMA/CD?",
  ru: "CSMA/CD — legacy Ethernet, обнаруживает коллизию и ждёт случайное время. CSMA/CA — Wi-Fi, объявляет длительность передачи. Коммутаторы full-duplex → коллизий нет.",
  a: `<p>Both are <b>contention-based</b> access methods for <b>half-duplex</b> shared media.</p>
<p><b>CSMA/CD</b> (collision detection) is used on legacy bus-topology and hub-based Ethernet. When devices transmit at the same time, a collision occurs; the devices detect it, <b>wait a random period</b> and retransmit.</p>
<p><b>CSMA/CA</b> (collision avoidance) is used by <b>IEEE 802.11 WLANs</b>. A transmitting device includes the <b>time duration</b> it needs; other devices know how long the medium will be unavailable and wait.</p>
<p>Modern Ethernet LANs use <b>switches in full-duplex</b> mode, where each device sends and receives simultaneously on its own link, so there are no collisions and CSMA/CD is not required.</p>`,
  k: ["contention-based, half-duplex", "CD: detect, random backoff, legacy Ethernet", "CA: announce duration, Wi-Fi", "switches full-duplex → no collisions"] },
{ l: "4", p: 0,
  q: "Describe the common physical WAN and LAN topologies.",
  ru: "WAN: point-to-point, hub and spoke, mesh. LAN: star / extended star; legacy bus и ring.",
  a: `<p><b>WAN topologies:</b> <b>point-to-point</b> — a permanent link between two endpoints, the simplest and most common, with simple protocols because the media is not shared; <b>hub and spoke</b> — like a star, a central site interconnects branch sites through point-to-point links; <b>mesh</b> — every end system connected to every other, high availability but expensive.</p>
<p><b>LAN topologies:</b> end devices are usually connected in a <b>star or extended star</b>, which is easy to install, very scalable and easy to troubleshoot. Legacy technologies used <b>bus</b> (all systems chained together and terminated at each end, early Ethernet) and <b>ring</b> (each system connected to its neighbours, Token Ring).</p>`,
  k: ["point-to-point", "hub and spoke", "mesh: high availability", "star / extended star", "legacy bus, ring"] },
{ l: "4", p: 1,
  q: "Describe the fields of an Ethernet frame and its size limits.",
  ru: "Preamble+SFD 8, dst MAC 6, src MAC 6, Type 2, Data 46–1500, FCS 4. Кадр 64–1518 байт (без preamble); меньше — runt, больше 1500 данных — jumbo.",
  a: `<p>Fields: <b>Preamble and SFD</b> (8 bytes, synchronization, not counted in the frame size), <b>Destination MAC</b> (6), <b>Source MAC</b> (6), <b>Type/Length</b> (2, identifies the encapsulated protocol, e.g. IPv4), <b>Data</b> (46–1500), <b>FCS</b> (4, frame check sequence for error detection).</p>
<p>The minimum frame size is <b>64 bytes</b> and the maximum is <b>1518 bytes</b>. A frame smaller than 64 bytes is a <b>collision fragment or runt</b> and is automatically discarded. A frame with more than 1500 bytes of data is a <b>jumbo or baby giant</b> frame; standard devices drop frames outside the limits, although most Fast and Gigabit Ethernet switches and NICs support jumbo frames.</p>`,
  k: ["preamble 8 not counted", "dst MAC, src MAC 6+6", "type 2, data 46–1500, FCS 4", "64–1518 bytes", "runt / jumbo"] },
{ l: "4", p: 1,
  q: "Describe the structure of an Ethernet MAC address and why hexadecimal is used.",
  ru: "48 бит = 12 hex = 6 байт; первые 24 бита — OUI от IEEE, остальные назначает производитель. Hex: 4 бита на цифру, байт = 2 цифры.",
  a: `<p>An Ethernet MAC address is a <b>48-bit</b> value expressed as <b>12 hexadecimal digits</b> (6 bytes). Hexadecimal is used because one hex digit represents exactly <b>4 bits</b>, so one byte (00000000–11111111) is two hex digits (00–FF), which is much shorter than binary. Leading zeros are always shown (0000 1010 = 0A).</p>
<p>The first <b>24 bits (6 hex digits)</b> are the <b>OUI</b> (organizationally unique identifier), obtained by the vendor from the <b>IEEE</b>; the last 24 bits are a vendor-assigned value unique to each interface. Formats: <code>00-60-2F-3A-07-BC</code>, <code>00:60:2F:3A:07:BC</code>, <code>0060.2F3A.07BC</code>.</p>`,
  k: ["48 bits, 12 hex, 6 bytes", "hex digit = 4 bits", "OUI 24 bits from IEEE", "vendor-assigned 24 bits", "unique per interface"] },
{ l: "4", p: 1,
  q: "Compare unicast, broadcast and multicast MAC addresses and how a switch handles each.",
  ru: "Unicast — один получатель, по таблице; broadcast FF-FF-FF-FF-FF-FF — flood, роутер не пересылает; multicast 01-00-5E / 33-33 — flood без snooping. Source всегда unicast.",
  a: `<ul>
<li><b>Unicast</b>: the unique address of one device, used from a single sender to a single destination. The switch forwards it out the port in its MAC table, or floods it if unknown. ARP (IPv4) or ND (IPv6) finds the destination MAC.</li>
<li><b>Broadcast</b>: destination <code>FF-FF-FF-FF-FF-FF</code> (48 ones). Received and processed by every device on the LAN; flooded out all ports except the incoming port; <b>not forwarded by a router</b>.</li>
<li><b>Multicast</b>: destination <code>01-00-5E-…</code> for IPv4 or <code>33-33-…</code> for IPv6; processed by members of the group. Flooded out all ports except the incoming one unless multicast snooping is configured; not routed unless the router is configured for multicast.</li></ul>
<p>The <b>source MAC is always unicast</b>; broadcast and multicast can only be destinations.</p>`,
  k: ["unicast: one device", "broadcast FF-FF-FF-FF-FF-FF, flooded", "routers don't forward broadcasts", "multicast 01-00-5E / 33-33", "source always unicast"] },
{ l: "4", p: 1,
  q: "Explain how a switch builds its MAC address table and forwards frames.",
  ru: "Learn: по source MAC и порту входа добавляет запись или обновляет таймер (5 минут). Forward: dst MAC есть → в один порт; нет (unknown unicast), broadcast, multicast → flood кроме входящего.",
  a: `<p>A Layer 2 switch makes decisions <b>only on MAC addresses</b>, using its MAC address table (CAM table), which is <b>empty</b> when the switch powers on.</p>
<ol><li><b>Learn</b>: for every incoming frame the switch examines the <b>source MAC address</b> and the port where it entered. If the address is not in the table, it is added with the port; if it exists, its refresh timer is reset (entries are kept for <b>5 minutes</b> by default).</li>
<li><b>Forward</b>: the switch looks up the <b>destination MAC</b>. If a unicast address is in the table, the frame is forwarded out only that port (<b>filtering</b>). If it is not in the table (<b>unknown unicast</b>), the frame is <b>flooded out all ports except the incoming port</b>. Broadcast and multicast frames are also flooded.</li></ol>
<p>Unlike a hub, which repeats bits out every port, a switch sends frames only where needed.</p>`,
  k: ["learn from source MAC + port", "table empty at start, 5-minute aging", "forward by destination MAC", "unknown unicast / broadcast → flood except incoming", "filtering vs hub"] },

/* ---------------- L5 ---------------- */
{ l: "5", p: 1,
  q: "Describe the characteristics of IP: connectionless, best effort and media independent.",
  ru: "Без установки соединения; доставка не гарантируется (нет ACK и переотправки); не зависит от среды. Надёжность даёт TCP. MTU и фрагментация.",
  a: `<ul>
<li><b>Connectionless</b>: IP does not establish a connection before sending and uses no control information such as synchronization or acknowledgments. Connection-oriented service is provided by another protocol, typically TCP.</li>
<li><b>Best effort</b>: IP does not guarantee delivery; it has no mechanism to resend lost data, does not expect acknowledgments and does not know if the destination is operational. This keeps overhead low. IP is therefore <b>unreliable</b>: it cannot fix corrupt packets, retransmit or reorder; other protocols do that.</li>
<li><b>Media independent</b>: IP does not care about the frame type or media; it can travel over copper, fiber or wireless. The network layer learns the <b>MTU</b> from the data link layer; if a packet is larger, an IPv4 router <b>fragments</b> it (adding latency). IPv6 routers do not fragment.</li></ul>`,
  k: ["connectionless: no setup", "best effort: no guarantee, no ACK", "TCP adds reliability", "media independent", "MTU, fragmentation, IPv6 no fragmentation"] },
{ l: "5", p: 1,
  q: "Describe the significant fields of the IPv4 header.",
  ru: "Version (0100), DS (QoS), Header Checksum, TTL, Protocol, Source и Destination по 32 бита.",
  a: `<ul>
<li><b>Version</b>: 4 bits, 0100 for IPv4.</li>
<li><b>Differentiated Services (DS)</b>: used for QoS (formerly Type of Service).</li>
<li><b>Header Checksum</b>: detects corruption in the IPv4 header.</li>
<li><b>Time to Live (TTL)</b>: a Layer 3 hop count; every router decrements it, and when it reaches zero the router discards the packet. Prevents endless loops.</li>
<li><b>Protocol</b>: identifies the next-level protocol: ICMP, TCP, UDP.</li>
<li><b>Source and Destination IPv4 Address</b>: 32 bits each; the most important fields, not changed along the path (except by NAT).</li></ul>`,
  k: ["version 0100", "DS: QoS", "header checksum", "TTL: decrement, 0 = drop", "protocol: TCP/UDP/ICMP", "32-bit addresses"] },
{ l: "5", p: 1,
  q: "What are the limitations of IPv4, and how does IPv6 improve on them? Compare the headers.",
  ru: "IPv4: адреса кончились, NAT ломает end-to-end, сложность. IPv6: 128 бит, упрощённый заголовок 40 байт, без NAT; убраны Flags, Fragment Offset, Checksum; Hop Limit, Traffic Class, Flow Label.",
  a: `<p><b>IPv4 limitations:</b> <b>address depletion</b>; <b>lack of end-to-end connectivity</b>, because private addressing and NAT were created to make IPv4 last; and <b>increased network complexity</b>, because NAT was meant to be temporary and causes latency and troubleshooting problems.</p>
<p><b>IPv6</b>, developed by the IETF, provides an <b>increased address space</b> (128-bit addresses instead of 32), <b>improved packet handling</b> with a simplified header, and <b>eliminates the need for NAT</b>.</p>
<p>The IPv6 header is simplified but not smaller: it is fixed at <b>40 bytes</b>. Fields such as <b>Flags, Fragment Offset and Header Checksum</b> were removed. Key fields: Version (0110), <b>Traffic Class</b> (= DS), <b>Flow Label</b> (20 bits), Payload Length, <b>Next Header</b> (= Protocol), <b>Hop Limit</b> (= TTL), 128-bit source and destination. Optional <b>extension headers</b> sit between the header and the payload; routers do not fragment IPv6 packets.</p>`,
  k: ["address depletion", "NAT, no end-to-end", "128-bit addresses", "simplified 40-byte header", "removed checksum / fragment fields", "Hop Limit, Traffic Class, Flow Label, Next Header"] },
{ l: "5", p: 1,
  q: "How does a host decide whether a destination is local or remote, and what is the role of the default gateway?",
  ru: "IPv4: по своему IP и маске сравнивает с IP получателя. Local → напрямую; remote → на default gateway. Шлюз — роутер в той же сети; без него трафик не выходит из LAN.",
  a: `<p>A host can send packets to itself (loopback 127.0.0.1 or ::1), to <b>local hosts</b> on the same LAN, or to <b>remote hosts</b>. An IPv4 host compares its own <b>IP address and subnet mask</b> with the destination IP address; an IPv6 host uses the network prefix advertised by the local router.</p>
<p>Local traffic is sent out the host interface to be delivered through the switch. Remote traffic is forwarded to the <b>default gateway</b> — a router or Layer 3 switch that has an IP address <b>in the same range as the LAN</b>, can accept data from the LAN and route it to other networks. The gateway is learned statically or via DHCP (IPv4) or router solicitation (IPv6) and is the route of last resort. If a host has no gateway or a wrong one, its traffic <b>cannot leave the LAN</b>.</p>`,
  k: ["compare own IP + mask with destination", "local → directly", "remote → default gateway", "gateway in same subnet", "no gateway → cannot leave LAN"] },
{ l: "5", p: 0,
  q: "Describe the types of routes in a router's routing table and compare static and dynamic routing.",
  ru: "Directly connected (автоматически, C и L), remote (static S или dynamic O/D), default (S*). Static — вручную, для маленьких сетей; dynamic — сам находит сети и новые пути.",
  a: `<ul>
<li><b>Directly connected</b> routes are added automatically when an interface is active and has an address (codes <b>C</b> for the network and <b>L</b> for the interface address).</li>
<li><b>Remote</b> routes are for networks with no direct connection, learned <b>manually</b> (static, code S) or <b>dynamically</b> through a routing protocol (O = OSPF, D = EIGRP).</li>
<li>A <b>default route</b> (S*) forwards traffic when there is no other match.</li></ul>
<p><b>Static routing</b> must be configured and adjusted manually when the topology changes; it suits small non-redundant networks and is often used for a default route. <b>Dynamic routing</b> automatically discovers remote networks, keeps information up to date, chooses the best path and finds new best paths after topology changes.</p>`,
  k: ["directly connected (C, L)", "remote: static or dynamic", "default route S*", "static: manual", "dynamic: discovers, adapts"] },
{ l: "5", p: 1,
  q: "Explain how MAC and IP addresses are used together when a host sends to a local destination and to a remote destination.",
  ru: "IP — от источника до получателя, не меняется. MAC — только по линку. Local: dst MAC получателя. Remote: dst MAC шлюза, dst IP конечного хоста.",
  a: `<p>A device on an Ethernet LAN has a <b>Layer 2 MAC address</b>, used for NIC-to-NIC delivery on the same network, and a <b>Layer 3 IP address</b>, used to deliver the packet from the original source to the final destination.</p>
<p>If the destination is on the <b>same network</b>, the destination MAC in the frame is the MAC of the <b>destination device</b>.</p>
<p>If the destination is on a <b>remote network</b>, the destination IP is still the final host, but the destination MAC is the MAC of the <b>default gateway</b>. Each router then builds a new frame with new MAC addresses for the next link, while the IP addresses stay the same. IPv4 uses <b>ARP</b> and IPv6 uses <b>ICMPv6 ND</b> to find the MAC address.</p>`,
  k: ["MAC: same network only", "IP: end to end", "local: destination's MAC", "remote: gateway's MAC, final host's IP", "ARP / ND"] },
{ l: "5", p: 1,
  q: "Explain how ARP works.",
  ru: "ARP: IPv4 → MAC и ARP table. Ищет IP получателя (local) или шлюза (remote). Нет записи → ARP request broadcast, владелец отвечает unicast reply, запись в таблицу.",
  a: `<p>ARP has two functions: <b>resolving IPv4 addresses to MAC addresses</b> and <b>maintaining an ARP table</b> of IPv4-to-MAC mappings.</p>
<ol><li>To send a frame, the device searches its ARP table for the destination IPv4 address and its MAC.</li>
<li>If the destination is on the <b>same network</b>, it looks for the <b>destination's IPv4 address</b>; if it is on a <b>different network</b>, it looks for the <b>default gateway's IPv4 address</b>.</li>
<li>If an entry is found, its MAC address is used as the destination MAC of the frame.</li>
<li>If no entry is found, the device sends an <b>ARP request</b> as a broadcast (FF-FF-FF-FF-FF-FF). The device that owns the IP replies with a unicast <b>ARP reply</b> containing its MAC, and the mapping is stored in the ARP table.</li></ol>`,
  k: ["IPv4 → MAC", "ARP table", "local: destination IP; remote: gateway IP", "ARP request = broadcast", "ARP reply = unicast"] },
{ l: "5", p: 1,
  q: "Write the commands to perform basic configuration of router R1 and configure interface G0/0/0 with IPv4 192.168.10.1/24 and IPv6 2001:db8:acad:10::1/64. How do you verify it?",
  ru: "hostname, enable secret, line console, line vty 0 4 + transport input, service password-encryption, banner, interface + description + ip address + ipv6 address + no shutdown, copy run start; проверка show ip interface brief, show ip route.",
  a: `<pre><code>Router(config)# hostname R1
R1(config)# enable secret class
R1(config)# line console 0
R1(config-line)# password cisco
R1(config-line)# login
R1(config-line)# line vty 0 4
R1(config-line)# password cisco
R1(config-line)# login
R1(config-line)# transport input ssh telnet
R1(config-line)# exit
R1(config)# service password-encryption
R1(config)# banner motd # Unauthorized access is prohibited! #
R1(config)# interface gigabitEthernet 0/0/0
R1(config-if)# description Link to LAN
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# ipv6 address 2001:db8:acad:10::1/64
R1(config-if)# no shutdown
R1(config-if)# end
R1# copy running-config startup-config</code></pre>
<p>Verify with <code>show ip interface brief</code> / <code>show ipv6 interface brief</code> (address and up/up status), <code>show ip route</code> (C and L entries for 192.168.10.0/24 and 192.168.10.1/32), <code>show interfaces</code> and <code>show running-config</code>.</p>`,
  k: ["hostname, enable secret", "console + vty passwords, login", "service password-encryption, banner", "ip address + mask, ipv6 address /64", "no shutdown", "copy running-config startup-config", "show ip interface brief"] },
{ l: "5", p: 0,
  q: "Why does a Layer 2 switch need a default gateway, and how is it configured? How is a default gateway configured on a host?",
  ru: "Коммутатору шлюз нужен только для удалённого управления из другой сети: ip default-gateway. Хосту — адрес интерфейса роутера в его LAN, в той же сети.",
  a: `<p>A <b>host</b> uses its default gateway when it sends a packet to another network; the gateway is usually the router interface attached to the host's local network (e.g. PC1 addresses a packet to PC3's IP but forwards the frame to R1's G0/0/0). The host IP and the router interface must be in the <b>same network</b>. It is configured in the host's IP settings or by DHCP.</p>
<p>A <b>Layer 2 switch</b> does not route host traffic, but it needs a default gateway so it can be <b>managed remotely from another network</b> (its own SSH/Telnet replies must reach remote admins). Configure it in global configuration mode: <code>ip default-gateway 192.168.10.1</code>, together with a management IP on <code>interface vlan 1</code>.</p>`,
  k: ["host: router interface in same network", "used for remote destinations", "switch: remote management only", "ip default-gateway (global config)"] }
];
