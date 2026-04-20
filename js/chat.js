/* ============================================
   CHAT — AI chat with typewriter effect
   ============================================ */

const chatData = {
  'ai pipeline': 'At Locus, I run AI security and AI governance for a logistics AI platform serving 1.5B+ deliveries. The stack: LLM security guardrails (input/output), prompt injection testing on every model-facing surface, PII redaction before inference, model inventory with version pinning, and AI-assisted SAST/SCA/secrets scanning on the AI-assisted code itself. Aligned to NIST AI RMF and ISO/IEC 42001. MLSecOps is just DevSecOps with teeth for model supply chain, prompt attacks, and inference-time abuse.',
  'llm governance': 'LLM governance isn\'t policy-on-paper. It\'s three things working together: policy (acceptable use, data classification, model inventory), controls (input/output guardrails, prompt injection defense, PII redaction, rate limiting, indirect injection filters on RAG sources), and oversight (AI DPIA, AI TPRM, human-in-the-loop for high-risk decisions). At Locus I mapped this to NIST AI RMF and ISO/IEC 42001, with EU AI Act risk categorization for high-risk automated decisions. Governance that doesn\'t ship controls is theatre.',
  'ai dpia': 'An AI DPIA isn\'t a GDPR checkbox. I run it as a joint CISO + DPO exercise: legal basis for training data and inference, purpose specification, automated decision-making assessment under EU AI Act high-risk categories, cross-border transfer analysis under GDPR and DPDPA, and model-specific risk (prompt injection, model inversion, membership inference). That last part is why treating AI privacy and AI security as one function beats siloing them.',
  'ai red team': 'Vedha is my autonomous AI pentester — a Shannon fork. It plans, executes, and reports across OWASP Top 10 for LLMs: prompt injection, insecure output handling, training data poisoning, model denial of service, supply chain, sensitive information disclosure, insecure plugin design, excessive agency, overreliance, and model theft. Plus jailbreak chains, indirect injection via RAG sources, data-extraction probes, and the full web/API pentest surface. Open source. Built in the open.',
  'crisis': 'At Meditab I was appointed directly by the Group Chairman during an active crisis — a large-scale PHI breach with ongoing ransomware across a 5,000+ person organization. I built incident response and resilience from scratch, stood up a 24x7 SOC across 3 geographies with 25+ professionals, and restored secure operations while delivering HITRUST i1, SOC 2 Type II, ISO 27001, ISO 27701, and HIPAA. AI incident response now sits on top of that same playbook — model compromise and prompt attack response extend the same muscle.',
  'zero trust': 'Deployed company-wide Zero Trust at Byju\'s Great Learning — Google Workspace Enterprise Plus, Cortex XDR, Palo Alto firewalls — covering 100+ countries, 2,000+ employees, 5,000+ contracted teachers. At Locus I layered phishing-resistant IAM on top: Okta FastPass with FIDO2, CASB, multi-channel DLP. Zero Trust isn\'t a product. It\'s identity-first architecture, and it\'s now the substrate I build AI security controls on top of.',
  'bug bounty': 'Launched red-teaming and a bug bounty program at Locus — now extended with AI red teaming via Vedha. My own path started in bug bounty hunting before CISO roles. That offensive mindset is why my defensive programs are built around what attackers actually try: prompt injection chains, indirect injection via RAG, model evasion, data extraction, and the same boring stuff that still works — phishing, supply chain, stale secrets.',
  'board': 'I translate AI risk and cyber risk into board-level business strategy. Every CISO role has reported directly to CEO or CTO. Boards don\'t buy CVE counts — they buy risk appetite translated into revenue and regulatory posture. When I delivered ISO certifications at Great Learning, it unlocked 50+ enterprise B2B deals with global banks, Big4, and Big Tech. With AI, the boardroom question is the same: what does this unlock, what does it put at risk, and how do we govern it?',
  'open source': 'I built Teachmint\'s entire AppSec pipeline using open-source tooling — Semgrep, Trivy, OWASP ZAP, SonarQube — covering SAST, SCA, DAST, container scanning, and IaC security. Zero enterprise licensing. Now I ship AI security tools in the open: Verida (SAST/SCA false-positive reduction with AI triage), Vedha (autonomous AI pentester), Nimantrika (safe outbound automation). Security tools should be transparent and community-driven.',
  'mlsecops': 'MLSecOps extends DevSecOps to the ML/LLM lifecycle. On top of SAST, SCA, DAST, and secrets scanning: training data integrity, model provenance and signing, adversarial robustness testing, prompt injection test suites, model theft detection, and inference-time abuse monitoring. I build these pipelines with open-source tooling, custom AI guardrails, and MCP integrations. Governance sits on top via NIST AI RMF and ISO/IEC 42001.',
  'teach': 'At Teachmint I led IT, Security, Privacy, and Compliance for a global edtech SaaS — 35M+ student records across 33 countries. Teachmint built the world\'s first AI-enabled connected classroom. I secured 600+ schools, 4,500+ smart classrooms, 15,000+ customized devices. GDPR, COPPA, DPDPA. Recognized as CISO of the Year in 2022 and 2023.',
  'ikea': 'At Locus (Ingka / IKEA), I lead AI security, AI governance, privacy, and compliance for a cloud-native logistics AI platform across 30+ jurisdictions. Post-acquisition I led security due diligence that drove remediation of 70,000+ vulnerabilities (current-role scope), delivered SOC 2 Type II, and stood up AI security governance aligned to NIST AI RMF and ISO/IEC 42001. Lean team of 5, $1M budget, 96% reduction in late-stage vulnerabilities.',
  'tcs': 'At TCS I supported corporate security governance and architecture across enterprise data centers, cloud environments, and critical infrastructure — including the EKA supercomputer used for Chandrayaan 2 and Mangalyaan. Contributed to SOC deployment handling 200K+ EPS and security modernization across 1,000+ remote offices.',
  'default': 'Good question. Devam runs AI security and AI governance at Locus (Ingka / IKEA). A decade across AI SaaS, healthcare, logistics, edtech, robotics, and defense — translating AI risk and cyber risk into board-level business strategy. Ask about: AI governance at Locus, AI DPIA playbook, AI red teaming (Vedha), LLM security, MLSecOps, the Meditab crisis, Zero Trust, Teachmint, IKEA/Locus, TCS, board-level reporting, or open-source AI security tools.'
};

function getAIResponse(q) {
  const ql = q.toLowerCase();
  if (ql.includes('dpia') || (ql.includes('ai') && ql.includes('privacy'))) return chatData['ai dpia'];
  if (ql.includes('red team') || ql.includes('pentest') || ql.includes('vedha') || ql.includes('jailbreak') || ql.includes('owasp llm')) return chatData['ai red team'];
  if (ql.includes('mlsecops') || ql.includes('ml security') || ql.includes('model security') || ql.includes('model supply')) return chatData['mlsecops'];
  if (ql.includes('llm') && (ql.includes('govern') || ql.includes('policy') || ql.includes('guardrail'))) return chatData['llm governance'];
  if (ql.includes('govern') && (ql.includes('ai') || ql.includes('llm'))) return chatData['llm governance'];
  if (ql.includes('ai') && (ql.includes('pipeline') || ql.includes('secure') || ql.includes('rmf') || ql.includes('42001') || ql.includes('eu ai act'))) return chatData['ai pipeline'];
  if (ql.includes('prompt injection') || ql.includes('llm security')) return chatData['ai pipeline'];
  if (ql.includes('crisis') || ql.includes('meditab') || ql.includes('breach') || ql.includes('ransomware')) return chatData['crisis'];
  if (ql.includes('zero trust') || ql.includes('iam')) return chatData['zero trust'];
  if (ql.includes('bug') || ql.includes('bounty') || ql.includes('offensive')) return chatData['bug bounty'];
  if (ql.includes('board') || ql.includes('strateg') || ql.includes('ceo') || ql.includes('business')) return chatData['board'];
  if (ql.includes('open source') || ql.includes('appsec') || ql.includes('tooling') || ql.includes('verida') || ql.includes('nimantrika')) return chatData['open source'];
  if (ql.includes('teach') || ql.includes('edtech') || ql.includes('student')) return chatData['teach'];
  if (ql.includes('ikea') || ql.includes('locus') || ql.includes('ingka') || ql.includes('logistic')) return chatData['ikea'];
  if (ql.includes('tcs') || ql.includes('tata') || ql.includes('eka') || ql.includes('supercomputer')) return chatData['tcs'];
  return chatData['default'];
}

const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

function escapeHTML(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// SAFETY: chatData must be developer-controlled static strings only. Never add user input to chatData.
// The typewriterMsg function has HTML tag pass-through logic that writes raw innerHTML.
function typewriterMsg(text, callback) {
  const d = document.createElement('div');
  d.className = 'chat-msg';
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble typing-effect';
  d.innerHTML = '<div class="chat-avatar ai">DS</div>';
  d.appendChild(bubble);
  chatMessages.appendChild(d);

  let i = 0;
  const speed = 12; // ms per character
  const chunkSize = 3; // characters per frame for speed

  function type() {
    if (i < text.length) {
      // Handle HTML tags — write them instantly
      if (text[i] === '<') {
        const closeIdx = text.indexOf('>', i);
        if (closeIdx !== -1) {
          bubble.innerHTML += text.substring(i, closeIdx + 1);
          i = closeIdx + 1;
        } else {
          bubble.innerHTML += escapeHTML(text[i]);
          i++;
        }
      } else {
        const chunk = text.substring(i, Math.min(i + chunkSize, text.length));
        // Check if chunk contains start of HTML tag
        const tagIdx = chunk.indexOf('<');
        if (tagIdx > 0) {
          bubble.innerHTML += escapeHTML(chunk.substring(0, tagIdx));
          i += tagIdx;
        } else if (tagIdx === 0) {
          // Will be handled in next iteration
          bubble.innerHTML += escapeHTML(text[i]);
          i++;
        } else {
          bubble.innerHTML += escapeHTML(chunk);
          i += chunkSize;
        }
      }
      chatMessages.scrollTop = chatMessages.scrollHeight;
      setTimeout(type, speed);
    } else {
      if (callback) callback();
    }
  }
  type();
}

function addMsg(text, isUser) {
  const d = document.createElement('div');
  d.className = 'chat-msg';
  const safeText = isUser ? escapeHTML(text) : text;
  d.innerHTML = `<div class="chat-avatar ${isUser ? 'user' : 'ai'}">${isUser ? 'You' : 'DS'}</div><div class="chat-bubble">${safeText}</div>`;
  chatMessages.appendChild(d);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

let chatBusy = false;

function handleChat() {
  const q = chatInput.value.trim();
  if (!q || chatBusy) return;
  chatBusy = true;
  addMsg(q, true);
  chatInput.value = '';

  // Typing dots indicator
  const typing = document.createElement('div');
  typing.className = 'chat-msg';
  typing.id = 'typingIndicator';
  typing.innerHTML = '<div class="chat-avatar ai">DS</div><div class="chat-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  const response = getAIResponse(q);
  const delay = 600 + Math.random() * 400;

  setTimeout(() => {
    const t = document.getElementById('typingIndicator');
    if (t) t.remove();
    // Use typewriter for AI responses — plain text only (no innerHTML)
    typewriterMsg(response, () => { chatBusy = false; });
  }, delay);
}

chatSend.addEventListener('click', handleChat);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleChat(); });
