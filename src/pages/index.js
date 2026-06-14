import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import TerminalText from '@site/src/components/TerminalText';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)} style={{ backgroundColor: 'var(--cm-obsidiana)', minHeight: '60vh', display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--cm-cyan-electrico)' }}>
      <div className="container">
        <TerminalText
          text=">_ WELCOME_TO_CODE_ME"
          color="pink"
          speed={60}
        />
        <h1 className="hero__title" style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <img src={useBaseUrl('/img/logos/logo.svg')} alt="Code Me Logo" style={{ maxWidth: '700px', width: '100%', height: 'auto' }} />
        </h1>
        <p className="hero__subtitle" style={{ color: 'var(--cm-verde-terminal)', fontFamily: 'var(--cm-font-mono)', fontSize: '1.2rem', marginBottom: '2rem' }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/corporativa/"
            style={{
              backgroundColor: 'var(--cm-rosa-ajolote)',
              borderColor: 'var(--cm-rosa-ajolote)',
              color: 'var(--cm-obsidiana)',
              fontFamily: 'var(--cm-font-mono)',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              textDecoration: 'none'
            }}>
            &gt;_ INICIAR KERNEL
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Bienvenido | ${siteConfig.title}`}
      description="Brand Guidelines y UI Kit para Code Me. Development-First Education.">
      <HomepageHeader />
      <main style={{ backgroundColor: 'var(--cm-obsidiana)', padding: '4rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 style={{ color: 'var(--cm-cyan-electrico)', fontFamily: 'var(--cm-font-mono)' }}>&gt;_ DOCUMENTACIÓN OFICIAL DE MARCA</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', lineHeight: '1.6', marginTop: '1rem' }}>
            Explora la arquitectura visual, el modelo cromático y las leyes de UI/UX de Code Me. Todo diseñado bajo el estricto concepto <i>"Development-First"</i> para las próximas generaciones de programadores.
          </p>
        </div>
      </main>
    </Layout>
  );
}
