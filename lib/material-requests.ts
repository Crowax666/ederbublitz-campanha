export const MATERIAL_OPTIONS = [
  { id: "santinhos", label: "Santinhos" },
  { id: "adesivos", label: "Adesivos" },
  { id: "perfurados", label: "Perfurados para carro" },
  { id: "bandeiras", label: "Bandeiras" },
  { id: "praguinhas", label: "Praguinhas" },
  { id: "digital", label: "Material digital" },
] as const;

export const QUANTITY_OPTIONS = [
  { id: "pequena", label: "Pequena — uso individual" },
  { id: "media", label: "Média — equipe ou bairro" },
  { id: "grande", label: "Grande — ação ou evento" },
  { id: "combinar", label: "Prefiro combinar com a equipe" },
] as const;

export const HELP_OPTIONS = [
  { id: "individual", label: "Distribuição pessoal" },
  { id: "bairro", label: "Ajudar no meu bairro" },
  { id: "evento", label: "Ação ou evento" },
  { id: "apoio", label: "Organizar um ponto de apoio" },
] as const;

export const FULFILLMENT_OPTIONS = [
  { id: "retirada", label: "Posso retirar" },
  { id: "combinar-entrega", label: "Quero combinar a entrega" },
] as const;

export type MaterialId = (typeof MATERIAL_OPTIONS)[number]["id"];
export type MaterialRequestDetails = {
  items: MaterialId[];
  quantity: string;
  help: string;
  fulfillment: string;
};

const materialIds = new Set<string>(MATERIAL_OPTIONS.map((item) => item.id));
const quantityIds = new Set<string>(QUANTITY_OPTIONS.map((item) => item.id));
const helpIds = new Set<string>(HELP_OPTIONS.map((item) => item.id));
const fulfillmentIds = new Set<string>(FULFILLMENT_OPTIONS.map((item) => item.id));

export function isValidMaterialId(value: string): value is MaterialId {
  return materialIds.has(value);
}

export function isValidQuantity(value: string) {
  return quantityIds.has(value);
}

export function isValidHelp(value: string) {
  return helpIds.has(value);
}

export function isValidFulfillment(value: string) {
  return fulfillmentIds.has(value);
}

export function encodeMaterialRequest(details: MaterialRequestDetails) {
  return `material:${JSON.stringify(details)}`;
}

export function decodeMaterialRequest(value: string): MaterialRequestDetails | null {
  if (!value.startsWith("material:")) return null;
  try {
    const parsed = JSON.parse(value.slice("material:".length)) as Partial<MaterialRequestDetails>;
    const items = Array.isArray(parsed.items)
      ? parsed.items.filter((item): item is MaterialId => typeof item === "string" && isValidMaterialId(item))
      : [];
    if (!items.length || !isValidQuantity(String(parsed.quantity || "")) || !isValidHelp(String(parsed.help || "")) || !isValidFulfillment(String(parsed.fulfillment || ""))) return null;
    return {
      items,
      quantity: String(parsed.quantity),
      help: String(parsed.help),
      fulfillment: String(parsed.fulfillment),
    };
  } catch {
    return null;
  }
}

export function optionLabel(options: ReadonlyArray<{ id: string; label: string }>, id: string) {
  return options.find((option) => option.id === id)?.label || id;
}
