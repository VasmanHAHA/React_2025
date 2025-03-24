import { Header } from '@/widgets/Header/header';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function MantinePage() {
  return (
    <>
      <Header />
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
