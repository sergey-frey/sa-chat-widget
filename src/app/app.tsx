import { useState } from "preact/hooks";

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  return <section></section>;
}
