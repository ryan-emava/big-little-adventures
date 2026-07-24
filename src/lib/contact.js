// Business contact info — single source for the footer, CTAs, and API-failure
// fallbacks. TODO: replace with the real public email/phone before launch.
// Fields set to null are simply not rendered.
export const contact = {
  email: "katie@biglittleadventures.co",
  phone: "817-694-8126",
  advisorName: "Katie",
}

// Social profiles — rendered in the footer. Entries set to null are hidden.
export const social = {
  facebook: 'https://www.facebook.com/biglittleadventurestx',
  instagram: 'https://www.instagram.com/biglittleadventurestx',
}

// Business identity for the footer / legal pages.
export const business = {
  legalName: "Big Little Adventures",
  location: 'Fort Worth, TX', // e.g. "Fort Worth, TX" — hidden until set
  foundedYear: 2026,
  // Texas has no seller-of-travel law, but FL/CA/WA/HI regulate selling to their
  // residents — host agencies hold those registrations and usually require their
  // affiliates to display the HOST's numbers plus "independent affiliate of …"
  // wording. TODO: ask the host agency for their required disclosure line and
  // paste it here verbatim. Hidden until set.
  sellerOfTravel: null,
}
