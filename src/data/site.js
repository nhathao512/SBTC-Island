export const siteConfig = {
  name: 'SBTC ISLAND — ĐẢO KHỦNG LONG',
  shortName: 'SBTC ISLAND',
  community: 'SBTC VN',
  region: 'SEA',
  logo: '/images/logo.png',
  heroImage: '/images/hero.jpg',
  banner: '/images/banner.jpg',
  gallery: [
    '/images/server-01.jpg',
    '/images/server-02.jpg',
    '/images/server-03.jpg',
    '/images/server-04.jpg',
  ],
  discordImage: '/images/discord.jpg',

  // Feature announcement images (in src/assets/)
  featureImages: {
    showmatch:   new URL('../assets/20vs20.png', import.meta.url).href,
    overpacking: new URL('../assets/overpacking.png', import.meta.url).href,
    mouthCarry:  new URL('../assets/ngam_mangkhunglong.png', import.meta.url).href,
    mixpack:     new URL('../assets/tuongtackhacloai.png', import.meta.url).href,
    banner:      new URL('../assets/SBTC_Server_Banner.png', import.meta.url).href,
  },
}
