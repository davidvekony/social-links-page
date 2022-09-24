import styles from './Links.module.css'

type Link = {
  label: string,
  url: string,
}

const links: Link[] = [
  {
    label: 'Twitter',
    url: 'https://twitter.com/VekonyDavid',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/davidvekony'
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/vekonydavid/'
  }
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
