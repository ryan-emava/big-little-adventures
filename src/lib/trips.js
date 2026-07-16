import tripsData from "../data/trips.json";

export const CLIENT_GUID = "21985a98-1505-4435-8317-6e3c0c3a0205";

export function getClientTrips(clientId = CLIENT_GUID) {
  return Object.entries(tripsData[clientId] || {}).map(([guid, trip]) => ({
    guid,
    ...trip,
  }));
}

export function getTripByGuid(clientId, guid) {
  return tripsData[clientId]?.[guid] || null;
}

export function getAllTrips() {
  return Object.entries(tripsData).flatMap(([clientId, trips]) =>
    Object.entries(trips || {}).map(([guid, trip]) => ({
      clientId,
      guid,
      ...trip,
    }))
  );
}

