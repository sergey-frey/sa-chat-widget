import { Component } from "preact";
import type { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
  fallback?: (error: Error, reset: () => void) => ComponentChildren | undefined;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;

    if (error) {
      if (this.props.fallback) {
        const result = this.props.fallback(error, this.reset);
        if (result !== undefined) return <>{result}</>;
      }

      return (
        <div style={{ padding: "1rem", color: "red", fontFamily: "monospace" }}>
          <strong>Ошибка валидации ответа API</strong>
          <pre style={{ marginTop: "0.5rem", whiteSpace: "pre-wrap", fontSize: "0.75rem" }}>
            {error.message}
          </pre>
          <button onClick={this.reset} style={{ marginTop: "0.5rem" }}>
            Повторить
          </button>
        </div>
      );
    }

    return <>{this.props.children}</>;
  }
}
