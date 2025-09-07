import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Chat page implements a simple RAG chat client. It posts the user's
 * message to the `/chat` endpoint and streams back the response via
 * Server‑Sent Events (SSE). Each bot message is appended as it
 * arrives. Assumes the backend route has been added to the Express
 * server as described.
 */
export default function Chat() {
  const [input, setInput] = useState('');
  // Initialize messages from localStorage so chat history persists across routes/refreshes.
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('chatHistory');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }); // { role: 'user'|'bot', content: string }
  const [loading, setLoading] = useState(false);

  // Clear the current chat history from state and localStorage
  function clearHistory() {
    setMessages([]);
    try {
      localStorage.removeItem('chatHistory');
    } catch (err) {
      console.warn('Failed to clear chat history', err);
    }
  }

  // Persist messages to localStorage whenever they change. This lets the chat history
  // survive route changes and page reloads.
  React.useEffect(() => {
    try {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    } catch (err) {
      console.warn('Failed to persist chat history', err);
    }
  }, [messages]);

  /**
   * Helper to render message content. It detects URLs in the text and
   * converts internal add‑to‑cart links (e.g. /cart/add/<id>) to
   * react‑router Links so navigation stays within the SPA. External
   * URLs are rendered as normal anchor tags.
   */
  function renderWithLinks(text) {
    // Regex for internal add-to-cart links. It matches either a relative path
    // (/cart/add/<id>) or an absolute URL with any domain (http://domain/cart/add/<id>).
    const internalPattern = /(?:https?:\/\/[^\s]+)?\/cart\/add\/([a-fA-F0-9]{24})/g;
    // Regex for generic http/https URLs
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    // First split by internal links, then handle each part separately
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = internalPattern.exec(text)) !== null) {
      // Push preceding text
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      const fullMatch = match[0];
      // Strip off protocol and domain to produce a client-side path for react-router.
      const path = fullMatch.replace(/^https?:\/\/[^\/]+/, '');
      parts.push(
        <Link key={parts.length} to={path} style={{ color: '#2980b9' }}>
          {fullMatch}
        </Link>
      );
      lastIndex = match.index + fullMatch.length;
    }
    // Push any remaining text after the last match
    parts.push(text.slice(lastIndex));
    // Now split each text fragment by external URLs
    const finalParts = [];
    parts.forEach((fragment) => {
      if (typeof fragment !== 'string') {
        finalParts.push(fragment);
        return;
      }
      let lastPos = 0;
      let urlMatch;
      while ((urlMatch = urlPattern.exec(fragment)) !== null) {
        if (urlMatch.index > lastPos) {
          finalParts.push(fragment.slice(lastPos, urlMatch.index));
        }
        const url = urlMatch[0];
        finalParts.push(
          <a
            key={finalParts.length}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2980b9' }}
          >
            {url}
          </a>
        );
        lastPos = urlMatch.index + url.length;
      }
      finalParts.push(fragment.slice(lastPos));
    });
    return finalParts;
  }

  async function sendMessage(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setInput('');
    setLoading(true);
    // Add placeholder bot message
    setMessages((prev) => [...prev, { role: 'bot', content: '' }]);
    try {
      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const res = await fetch(`${baseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: trimmed }),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split(/\n\n/);
        buffer = lines.pop();
        outer: for (const line of lines) {
          // Each SSE message begins with 'data: '
          const dataLine = line.trim().replace(/^data:\s*/, '');
          if (!dataLine) continue;
          // Check for completion marker
          if (dataLine === '[DONE]') {
            setLoading(false);
            break outer;
          }
          let text = '';
          let doneFlag = false;
          try {
            const parsed = JSON.parse(dataLine);
            text = typeof parsed.response === 'string' ? parsed.response : '';
            doneFlag = parsed.done === true;
          } catch (_) {
            // If parsing fails, ignore this chunk entirely
            continue;
          }
          if (!text) continue;
          setMessages((prev) => {
            const updated = [...prev];
            // Find the last bot message (the current one being built)
            const lastBotIndex = [...updated].reverse().findIndex((m) => m.role === 'bot');
            const actualIndex = lastBotIndex !== -1 ? updated.length - 1 - lastBotIndex : -1;
            if (actualIndex !== -1) {
              updated[actualIndex] = {
                role: 'bot',
                content: updated[actualIndex].content + text,
              };
            } else {
              updated.push({ role: 'bot', content: text });
            }
            return updated;
          });
          if (doneFlag) {
            setLoading(false);
            break outer;
          }
        }
      }
    } catch (err) {
      console.error('Chat error', err);
      setMessages((prev) => [...prev, { role: 'bot', content: 'Error: failed to get response.' }]);
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Chat</h2>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '4px',
          padding: '1rem',
          height: '400px',
          overflowY: 'auto',
          marginBottom: '1rem',
          backgroundColor: '#fdfdfd',
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: '0.5rem',
              textAlign: msg.role === 'user' ? 'right' : 'left',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.5rem 0.75rem',
                borderRadius: '12px',
                backgroundColor: msg.role === 'user' ? '#d1ecf1' : '#e8e8e8',
              }}
            >
              {renderWithLinks(msg.content)}
            </span>
          </div>
        ))}
        {loading && <p>…</p>}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {/* Message entry form */}
        <form onSubmit={sendMessage} style={{ display: 'flex', flexGrow: 1, gap: '0.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{ flexGrow: 1, padding: '0.5rem' }}
            placeholder="Type your message…"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3498db',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Send
          </button>
        </form>
        {/* Clear chat history button */}
        <button
          onClick={clearHistory}
          disabled={loading || messages.length === 0}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#e74c3c',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
