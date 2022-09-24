import styles from './Links.module.css'

type Link = {
  label: string,
  url: string,
}

const links: Link[] = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/vekonydavid/'
  },
  {
    label: 'GitHub',
    url: 'https://github.com/davidvekony'
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/davidvekony/'
  },
  {
    label: 'Telegram',
    url: 'https://t.me/davidvekony'
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/VekonyDavid',
  },
]

function Links() {
  return (
    <nav className={styles.links}>
    {links.map((link) => (
      <a key={link.url} href={link.url} className={styles.link}>{link.label}</a>
    ))}
    </nav>
  )
}

export default Links
