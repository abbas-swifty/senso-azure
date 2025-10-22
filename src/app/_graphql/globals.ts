import { LINK_FIELDS } from './link'
import { MEDIA, MEDIA_FIELDS } from './media'

export const HEADER = `
  Header {
    navItems {
      enableSubMenu
      link ${LINK_FIELDS({ disableAppearance: true })}
      subMenuItems {
        showAs
        menuHeading
        subMenuLinks {
          ${MEDIA}
          link ${LINK_FIELDS({ disableAppearance: true })}
          enableSubMenuTwo
          subMenuTwo {
            ${MEDIA}
            link ${LINK_FIELDS({ disableAppearance: true })}
          }
        }
      }
		}
  }
`

export const HEADER_QUERY = `
query Header {
  ${HEADER}
}
`

export const FOOTER = `
  Footer {
    copyright
    navItemParent {
      id
      navTitle
      navItems {
        link ${LINK_FIELDS({ disableAppearance: true })}
      }
    }
  }
`

export const FOOTER_QUERY = `
query Footer {
  ${FOOTER}
}
`

export const SETTINGS = `
  Settings {
    productsPage {
      slug
    }
    siteLogo {
      id 
      filename
      alt
      width
      height
      url
    }
    siteCurrency
    enableDelivery
    deliveryValue
    socials {
      link ${LINK_FIELDS({ disableAppearance: true })}
    }
    createAccountBanner {
      id 
      filename
      alt
      width
      height
      url
    }
    loginBanner {
      id 
      filename
      alt
      width
      height
      url
    }
    recoverPasswordBanner {
      id 
      filename
      alt
      width
      height
      url
    }
  }
`

export const SETTINGS_QUERY = `
query Settings {
  ${SETTINGS}
}
`
