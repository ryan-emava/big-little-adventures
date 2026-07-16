import tripsJson from "../data/trips.json";

export function flattenTripData(trip) {
  if (!trip) return null;
  const amenities = trip.hotel?.amenities?.join("\n") || "";
  const addons =
    trip.addons?.map((a) => `${a.title} | ${a.description}`).join("\n") || "";
  return {
    headline: trip.overview?.headline || "",
    subhead: trip.overview?.subhead || "",
    destination: trip.overview?.destination || "",
    preparedByLine: trip.overview?.preparedByLine || "",
    travelers: trip.travelers?.count || "",
    sleeps: trip.travelers?.sleeps || "",
    dateRange: trip.travelers?.dateRange || "",
    airlineLabel: trip.flights?.airline || "",
    departDate: trip.flights?.departure?.date || "",
    departFromCode: trip.flights?.departure?.from?.code || "",
    departFromCity: trip.flights?.departure?.from?.city || "",
    departToCode: trip.flights?.departure?.to?.code || "",
    departToCity: trip.flights?.departure?.to?.city || "",
    departDepart: trip.flights?.departure?.departTime || "",
    departArrive: trip.flights?.departure?.arriveTime || "",
    departStops: trip.flights?.departure?.stops || "",
    departTime: trip.flights?.departure?.duration || "",
    departSeg1: trip.flights?.departure?.segment1?.flight || "",
    departSeg1Detail: trip.flights?.departure?.segment1?.detail || "",
    departSeg2: trip.flights?.departure?.segment2?.flight || "",
    departSeg2Detail: trip.flights?.departure?.segment2?.detail || "",
    departBarcode: trip.flights?.departure?.barcode || "",
    returnDate: trip.flights?.return?.date || "",
    returnFromCode: trip.flights?.return?.from?.code || "",
    returnFromCity: trip.flights?.return?.from?.city || "",
    returnToCode: trip.flights?.return?.to?.code || "",
    returnToCity: trip.flights?.return?.to?.city || "",
    returnDepart: trip.flights?.return?.departTime || "",
    returnArrive: trip.flights?.return?.arriveTime || "",
    returnStops: trip.flights?.return?.stops || "",
    returnTime: trip.flights?.return?.duration || "",
    returnSeg1: trip.flights?.return?.segment1?.flight || "",
    returnSeg1Detail: trip.flights?.return?.segment1?.detail || "",
    returnSeg2: trip.flights?.return?.segment2?.flight || "",
    returnSeg2Detail: trip.flights?.return?.segment2?.detail || "",
    returnBarcode: trip.flights?.return?.barcode || "",
    hotelName: trip.hotel?.name || "",
    hotelTagline: trip.hotel?.tagline || "",
    hotelRating: trip.hotel?.rating || "",
    hotelCheckin: trip.hotel?.checkin || "",
    hotelCheckout: trip.hotel?.checkout || "",
    hotelNights: trip.hotel?.nights || "",
    roomOccupancy: trip.hotel?.room?.occupancy || "",
    roomType: trip.hotel?.room?.type || "",
    roomNote: trip.hotel?.room?.note || "",
    hotelNote: trip.hotel?.note || "",
    amenities,
    honeymoonTitle: trip.hotel?.honeymoon?.title || "",
    honeymoonGift: trip.hotel?.honeymoon?.description || "",
    addons,
    totalPrice: trip.pricing?.totalPrice || "",
    totalWithoutFlights: trip.pricing?.totalWithoutFlights || "",
    depositAmount: trip.pricing?.deposit?.amount || "",
    depositDue: trip.pricing?.deposit?.dueDate || "",
    fullAmount: trip.pricing?.fullPayment?.amount || "",
    fullDue: trip.pricing?.fullPayment?.dueDate || "",
    paidToDate: trip.pricing?.payments?.paidToDate || "",
    balanceDue: trip.pricing?.payments?.balanceDue || "",
    packagePrice: trip.pricing?.payments?.packagePrice || "",
    adultsLabel: trip.pricing?.breakdown?.adults?.label || "",
    adultsPrice: trip.pricing?.breakdown?.adults?.price || "",
    childLabel: trip.pricing?.breakdown?.child?.label || "",
    childPrice: trip.pricing?.breakdown?.child?.price || "",
    promoLabel: trip.pricing?.breakdown?.promotion?.label || "",
    promoAmount: trip.pricing?.breakdown?.promotion?.amount || "",
    optionsAmount: trip.pricing?.breakdown?.optionsAmount || "",
    payInDestination: trip.pricing?.breakdown?.payInDestination || "",
    advisor: trip.contact?.advisor || "",
    advisorFull: trip.contact?.advisorFull || "",
  };
}

export function getTripData(guid) {
  const trip = tripsJson[guid];
  return trip ? flattenTripData(trip) : null;
}

export function getAllTripsData() {
  return Object.entries(tripsJson).map(([guid, trip]) => ({
    guid,
    ...flattenTripData(trip),
  }));
}
