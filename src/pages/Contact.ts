export default function Contact(): string {
  return `
    <h1>Contact</h1>

    <section class="card">
      <form id="contact-form">
        <div style="display:grid; gap:.75rem;">
          <div>
            <label for="name">Name</label><br/>
            <input id="name" name="name" type="text" required
                   style="width:100%;padding:.6rem .75rem;border-radius:var(--radius);
                   border:1px solid #2f343c;background:transparent;color:var(--text);" />
          </div>

          <div>
            <label for="email">Email</label><br/>
            <input id="email" name="email" type="email" required
                   style="width:100%;padding:.6rem .75rem;border-radius:var(--radius);
                   border:1px solid #2f343c;background:transparent;color:var(--text);" />
          </div>

          <div>
            <label for="message">Message</label><br/>
            <textarea id="message" name="message" rows="5" required
                      style="width:100%;padding:.6rem .75rem;border-radius:var(--radius);
                      border:1px solid #2f343c;background:transparent;color:var(--text);"></textarea>
          </div>

          <button class="btn" type="submit">Send</button>
          <p id="contact-status" class="muted"></p>
        </div>
      </form>
    </section>
  `;
}