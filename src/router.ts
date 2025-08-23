export class Router {
  private routes: { path: string | RegExp; render: () => string | Promise<string>; onMount?: () => void }[] = [];

  constructor(private outlet: HTMLElement) {
    window.addEventListener('hashchange', () => this.handle());
    window.addEventListener('load', () => this.handle());
  }

  register(route: { path: string | RegExp; render: () => string | Promise<string>; onMount?: () => void }) {
    this.routes.push(route);
  }

  async handle() {
    const hash = location.hash.replace('#', '') || '/';
    const match = this.routes.find(r =>
      typeof r.path === 'string' ? r.path === hash : r.path.test(hash)
    ) ?? this.routes.find(r => r.path === '/');

    const html = await (match?.render() ?? '<p>Not found</p>');
    this.outlet.innerHTML = html;
    match?.onMount?.();
  }
}