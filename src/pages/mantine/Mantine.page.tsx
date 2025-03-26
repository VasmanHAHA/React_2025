import { Header } from '@/shared/widgets/header/header';
import { ColorSchemeToggle } from './components/color-scheme-toggle/ColorSchemeToggle';
import { Welcome } from './components/welcome/Welcome';

export function MantinePage() {
  return (
    <>
      <Header />
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
