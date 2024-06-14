export function getResubscribeUrl(email: string, uuid: string) {
  const emailBase64 = Buffer.from(email).toString("base64");
  return `${process.env.PRODUCTION_URL}/newsletter/resubscribe/${emailBase64}/${uuid}`;
}

export function getUnsubscribeUrl(email: string, uuid: string) {
  const emailBase64 = Buffer.from(email).toString("base64");
  return `${process.env.PRODUCTION_URL}/newsletter/unsubscribe/${emailBase64}/${uuid}`;
}
