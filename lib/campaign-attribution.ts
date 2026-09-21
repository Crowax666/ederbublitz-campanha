const CAMPAIGN_SEPARATOR = "::";

export function buildCampaignKey(campaign?: string, content?: string) {
  if (content) return `${campaign || "sem-campanha"}${CAMPAIGN_SEPARATOR}${content}`;
  return campaign;
}

export function splitCampaignKey(value?: string | null) {
  if (!value) return { campaign: undefined, content: undefined };
  const separator = value.indexOf(CAMPAIGN_SEPARATOR);
  if (separator < 0) return { campaign: value, content: undefined };
  return {
    campaign: value.slice(0, separator) || "sem-campanha",
    content: value.slice(separator + CAMPAIGN_SEPARATOR.length) || undefined,
  };
}
