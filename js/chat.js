/* ============================================
   CHAT — AI chat with typewriter effect
   ============================================ */

const chatData = {
  'ai pipeline': 'At Locus, I established AI security governance with automated guardrails using Claude Code Security, Snyk MCP, Wiz, and CodeRabbit. The key is treating AI-assisted code the same as human code — SAST, SCA, secrets detection — plus AI-specific controls: prompt injection testing, model integrity checks, and output sanitization. I built custom tooling with Cursor and Claude to secure the entire AI-driven software delivery pipeline.',
  'crisis': 'At Meditab, I was appointed directly by the Group Chairman during an active crisis — a large-scale PHI breach with ongoing ransomware incidents across a 5,000+ person organization. I built incident response and resilience programs from scratch, established 24x7 SOC operations across 3 geographies with a team of 25+, and restored secure operations while simultaneously achieving HITRUST i1, SOC 2 Type II, ISO 27001, ISO 27701, and HIPAA certifications.',
  'zero trust': 'I deployed company-wide Zero Trust at Byju\'s Great Learning using Google Workspace Enterprise Plus, Cortex XDR, and Palo Alto firewalls — covering 100+ countries, 2,000+ employees, and 5,000+ contracted teachers. At Locus, I implemented phishing-resistant IAM with Okta FastPass and FIDO2, plus CASB and multi-channel DLP controls. Zero Trust isn\'t a product — it\'s an architecture philosophy I apply at every organization.',
  'bug bounty': 'I launched red-teaming exercises and a bug bounty program at Locus to strengthen proactive threat detection. My own journey started in bug bounty hunting before transitioning into enterprise security leadership — that offensive mindset shapes how I build defensive programs. I think like an attacker to protect like a defender.',
  'board': 'I translate cyber risk into board-level business strategy. At every CISO role, I\'ve reported directly to CEOs or CTOs. I quantify risk in business terms — not CVE counts. When I delivered ISO certifications at Great Learning, it enabled 50+ enterprise B2B deals. Security isn\'t a cost center when you can show it opens revenue.',
  'open source': 'I built Teachmint\'s entire AppSec pipeline using open-source tooling — Semgrep, Trivy, OWASP ZAP, SonarQube — covering SAST, SCA, DAST, container scanning, and IaC security. This eliminated enterprise licensing costs entirely. I also ship open-source tools myself: a Slack security bot with Claude API, and Velora, an AI security scanner I\'m currently building.',
  'teach': 'At Teachmint, I led IT, Security, Privacy, and Compliance for a global edtech SaaS platform supporting 35M+ student records across 33 countries. Teachmint built the world\'s first AI-enabled connected classroom technology. I secured this ecosystem across 600+ schools, supporting 4,500+ smart classrooms powered by 15,000+ customized devices. I was recognised as CISO of the Year in both 2023 and 2022.',
  'ikea': 'At Locus (acquired by Ingka Group / IKEA), I lead global security, privacy, and compliance for a cloud-native logistics platform operating across 30+ jurisdictions. Following the acquisition, I led security due diligence that drove remediation of 70,000+ vulnerabilities, delivered SOC 2 Type II, and established AI security governance. I report directly to the CEO with a lean team of 5 and $1M budget.',
  'tcs': 'At TCS, I was part of the corporate security team supporting governance and architecture across enterprise data centers, cloud environments, and critical infrastructure — including the EKA supercomputer used for Chandrayaan 2 and Mangalyaan. I contributed to SOC deployment handling 200K+ EPS and security modernization across 1,000+ remote offices.',
  'default': 'Great question. Devam has 10+ years across AI SaaS, healthcare, logistics, edtech, robotics, and defence. His approach is AI-first security leadership — embedding automation into operations and translating cyber risk into board-level strategy. Try asking about: AI pipeline security, crisis leadership, Zero Trust, the Meditab crisis, Teachmint, IKEA/Locus, TCS, board-level reporting, or open-source security.'
};

function getAIResponse(q) {
  const ql = q.toLowerCase();
  if (ql.includes('ai') && (ql.includes('pipeline') || ql.includes('secure') || ql.includes('govern'))) return chatData['ai pipeline'];
  if (ql.includes('crisis') || ql.includes('meditab') || ql.includes('breach') || ql.includes('ransomware')) return chatData['crisis'];
  if (ql.includes('zero trust') || ql.includes('iam')) return chatData['zero trust'];
  if (ql.includes('bug') || ql.includes('bounty') || ql.includes('red team') || ql.includes('offensive')) return chatData['bug bounty'];
  if (ql.includes('board') || ql.includes('strateg') || ql.includes('ceo') || ql.includes('business')) return chatData['board'];
  if (ql.includes('open source') || ql.includes('appsec') || ql.includes('tooling')) return chatData['open source'];
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
