export type BiomarkerStatus = "optimal" | "attention" | "critical";

export interface Biomarker {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  low: number;
  high: number;
  status: BiomarkerStatus;
  about: string;
}

/** [name, value, unit, low, high, status, about] */
type Row = [string, number, string, number, number, "o" | "a" | "c", string];

const STATUS = { o: "optimal", a: "attention", c: "critical" } as const;

const RAW: Record<string, Row[]> = {
  Hematology: [
    ["Hemoglobin", 14.6, "g/dL", 13.5, 17.5, "o", "Carries oxygen from the lungs to every tissue in the body."],
    ["Hematocrit", 43.2, "%", 38.8, 50, "o", "The share of blood volume made up of red cells."],
    ["Red blood cells", 4.9, "M/µL", 4.5, 5.9, "o", "Cells responsible for oxygen transport."],
    ["White blood cells", 11.4, "K/µL", 4, 11, "a", "Immune cells; elevations often follow infection or inflammation."],
    ["Platelets", 244, "K/µL", 150, 400, "o", "Cell fragments that let blood clot and wounds close."],
    ["MCV", 89, "fL", 80, 100, "o", "Average red cell size, useful for classifying anemia."],
    ["MCH", 30.1, "pg", 27, 33, "o", "Average hemoglobin carried per red cell."],
    ["MCHC", 33.6, "g/dL", 32, 36, "o", "Hemoglobin concentration inside red cells."],
    ["RDW", 15.4, "%", 11.5, 14.5, "a", "Variation in red cell size; a rising value can precede anemia."],
    ["Neutrophils", 62, "%", 40, 70, "o", "First-line immune cells against bacterial infection."],
    ["Lymphocytes", 24, "%", 20, 45, "o", "Immune cells driving long-term, targeted defense."],
    ["Monocytes", 7, "%", 2, 10, "o", "Cells that clear debris and support tissue repair."],
    ["Eosinophils", 6.8, "%", 0, 5, "a", "Often elevated with allergies or parasitic exposure."],
    ["Basophils", 0.6, "%", 0, 2, "o", "Rare immune cells involved in allergic response."],
    ["MPV", 10.2, "fL", 7.5, 11.5, "o", "Average platelet size, a marker of platelet turnover."],
    ["Reticulocytes", 1.2, "%", 0.5, 2.5, "o", "Young red cells; shows how fast marrow is producing."],
  ],
  Hormones: [
    ["TSH", 4.9, "mIU/L", 0.4, 4, "a", "Pituitary signal that sets thyroid output."],
    ["Free T4", 1.1, "ng/dL", 0.8, 1.8, "o", "The main circulating thyroid hormone."],
    ["Free T3", 2.6, "pg/mL", 2.3, 4.2, "o", "The active thyroid hormone driving metabolic rate."],
    ["Reverse T3", 21, "ng/dL", 8, 25, "o", "An inactive thyroid metabolite that rises under stress."],
    ["Total testosterone", 402, "ng/dL", 300, 1000, "o", "Primary androgen affecting muscle, mood and drive."],
    ["Free testosterone", 6.1, "pg/mL", 8.7, 25, "c", "The unbound fraction available to tissues."],
    ["SHBG", 62, "nmol/L", 18, 54, "a", "Binding protein that controls how much sex hormone is free."],
    ["DHEA-S", 210, "µg/dL", 100, 500, "o", "Adrenal precursor to sex hormones."],
    ["Cortisol (AM)", 22.4, "µg/dL", 6, 18, "c", "Main stress hormone; should peak in the morning."],
    ["Estradiol", 26, "pg/mL", 10, 40, "o", "Estrogen affecting bone, mood and vascular health."],
    ["Progesterone", 0.6, "ng/mL", 0.2, 1.4, "o", "Balances estrogen and supports sleep quality."],
    ["LH", 4.8, "IU/L", 1.7, 8.6, "o", "Pituitary signal that triggers sex hormone production."],
    ["FSH", 3.9, "IU/L", 1.5, 12.4, "o", "Pituitary signal governing reproductive function."],
    ["Prolactin", 11.2, "ng/mL", 4, 15.2, "o", "Pituitary hormone; high levels can suppress sex hormones."],
    ["IGF-1", 148, "ng/mL", 98, 282, "o", "Reflects growth hormone activity and tissue repair."],
    ["Parathyroid hormone", 41, "pg/mL", 15, 65, "o", "Regulates calcium balance and bone turnover."],
    ["Insulin (fasting)", 14.8, "µIU/mL", 2, 10, "c", "Elevated fasting insulin is an early sign of resistance."],
    ["Leptin", 12.4, "ng/mL", 1, 18, "o", "Fat-derived hormone signalling energy stores to the brain."],
  ],
  "Metabolic & glucose": [
    ["Glucose (fasting)", 104, "mg/dL", 70, 99, "a", "Blood sugar after an overnight fast."],
    ["HbA1c", 5.9, "%", 4, 5.6, "a", "Average blood sugar across the last three months."],
    ["HOMA-IR", 3.8, "index", 0.5, 2, "c", "Estimate of how resistant your cells are to insulin."],
    ["C-peptide", 2.4, "ng/mL", 0.8, 3.9, "o", "Shows how much insulin the pancreas is producing."],
    ["Uric acid", 6.1, "mg/dL", 3.4, 7, "o", "Purine waste product tied to gout and kidney stones."],
    ["Lactate", 1.4, "mmol/L", 0.5, 2.2, "o", "Byproduct of anaerobic energy production."],
    ["Adiponectin", 9.6, "µg/mL", 4, 26, "o", "Fat-derived hormone that improves insulin sensitivity."],
    ["Fructosamine", 232, "µmol/L", 205, 285, "o", "Short-term average of blood sugar, about two weeks."],
  ],
  Lipids: [
    ["Total cholesterol", 214, "mg/dL", 125, 200, "a", "Sum of all cholesterol carried in the blood."],
    ["LDL cholesterol", 148, "mg/dL", 0, 100, "c", "The main atherogenic particle driving plaque buildup."],
    ["HDL cholesterol", 48, "mg/dL", 40, 90, "o", "Helps move cholesterol back out of artery walls."],
    ["Triglycerides", 168, "mg/dL", 0, 150, "a", "Circulating fat; rises with sugar and alcohol intake."],
    ["Non-HDL cholesterol", 166, "mg/dL", 0, 130, "a", "All atherogenic cholesterol in one number."],
    ["ApoB", 112, "mg/dL", 0, 90, "c", "Counts the particles that actually cause plaque."],
    ["ApoA1", 142, "mg/dL", 120, 200, "o", "The main protein on protective HDL particles."],
    ["Lipoprotein(a)", 34, "nmol/L", 0, 75, "o", "A largely inherited cardiovascular risk particle."],
    ["LDL particle number", 1420, "nmol/L", 0, 1000, "c", "Total LDL particles, often more telling than LDL-C."],
    ["Small dense LDL", 32, "mg/dL", 0, 20, "a", "The smallest, most artery-damaging LDL subfraction."],
    ["Remnant cholesterol", 32, "mg/dL", 0, 24, "a", "Cholesterol in triglyceride-rich remnant particles."],
    ["Cholesterol / HDL ratio", 4.5, "ratio", 0, 3.5, "a", "A quick summary of overall lipid balance."],
  ],
  Vitamins: [
    ["Vitamin D (25-OH)", 21, "ng/mL", 30, 80, "c", "Supports bone density, immunity and mood."],
    ["Vitamin B12", 388, "pg/mL", 200, 900, "o", "Essential for nerves and red blood cell formation."],
    ["Folate", 9.2, "ng/mL", 3, 20, "o", "Needed for DNA synthesis and healthy cell division."],
    ["Vitamin B6", 14, "µg/L", 5, 50, "o", "Cofactor in neurotransmitter and amino acid metabolism."],
    ["Vitamin B1", 118, "nmol/L", 70, 180, "o", "Thiamine, central to converting food into energy."],
    ["Vitamin A", 52, "µg/dL", 32, 78, "o", "Supports vision, skin and immune barriers."],
    ["Vitamin E", 11.4, "mg/L", 5.5, 17, "o", "A fat-soluble antioxidant protecting cell membranes."],
    ["Vitamin K1", 0.62, "ng/mL", 0.1, 2.2, "o", "Required for clotting and directing calcium to bone."],
    ["Vitamin C", 0.7, "mg/dL", 0.4, 2, "o", "Antioxidant needed for collagen and immune function."],
    ["Biotin", 402, "ng/L", 200, 1200, "o", "Supports hair, skin and fatty acid metabolism."],
    ["Niacin", 28, "µg/L", 20, 90, "o", "Feeds the NAD pathway that powers cellular energy."],
    ["Omega-3 index", 4.1, "%", 8, 12, "c", "Share of omega-3 in red cell membranes."],
    ["Omega-6 / Omega-3", 12.4, "ratio", 0, 4, "c", "Higher ratios track with chronic inflammation."],
    ["Coenzyme Q10", 0.82, "µg/mL", 0.5, 1.8, "o", "Antioxidant central to mitochondrial energy output."],
  ],
  Minerals: [
    ["Ferritin", 38, "ng/mL", 30, 300, "o", "The body's stored iron reserve."],
    ["Iron", 88, "µg/dL", 60, 170, "o", "Circulating iron available for hemoglobin."],
    ["Transferrin saturation", 24, "%", 20, 50, "o", "How full your iron transport proteins are."],
    ["TIBC", 342, "µg/dL", 250, 450, "o", "Total capacity of blood to carry iron."],
    ["Magnesium (RBC)", 4.1, "mg/dL", 4.2, 6.8, "a", "Cellular magnesium, involved in 300+ enzymes."],
    ["Zinc", 78, "µg/dL", 70, 120, "o", "Supports immunity, wound healing and testosterone."],
    ["Copper", 96, "µg/dL", 70, 140, "o", "Needed for iron transport and connective tissue."],
    ["Selenium", 118, "µg/L", 70, 150, "o", "Antioxidant mineral essential for thyroid conversion."],
    ["Calcium", 9.4, "mg/dL", 8.6, 10.3, "o", "Tightly regulated mineral for bone, nerve and muscle."],
    ["Phosphorus", 3.5, "mg/dL", 2.5, 4.5, "o", "Partners with calcium in bone and energy transfer."],
    ["Sodium", 140, "mmol/L", 135, 145, "o", "Governs fluid balance and nerve signalling."],
    ["Potassium", 4.3, "mmol/L", 3.5, 5.2, "o", "Critical for heart rhythm and muscle contraction."],
    ["Chloride", 102, "mmol/L", 98, 107, "o", "Works with sodium to maintain acid-base balance."],
    ["Iodine", 92, "µg/L", 100, 200, "a", "Raw material the thyroid needs to make hormone."],
  ],
  "Liver & kidney": [
    ["ALT", 46, "U/L", 7, 35, "a", "Liver enzyme that rises with hepatic stress or fat."],
    ["AST", 32, "U/L", 8, 33, "o", "Enzyme from liver and muscle tissue."],
    ["GGT", 58, "U/L", 8, 40, "a", "Sensitive to alcohol and biliary strain."],
    ["ALP", 78, "U/L", 44, 121, "o", "Enzyme from liver and bone."],
    ["Total bilirubin", 0.9, "mg/dL", 0.2, 1.2, "o", "Pigment from red cell breakdown, cleared by the liver."],
    ["Albumin", 4.4, "g/dL", 3.5, 5, "o", "Main blood protein; reflects liver output and nutrition."],
    ["Total protein", 7.1, "g/dL", 6, 8.3, "o", "All circulating proteins combined."],
    ["Creatinine", 1.02, "mg/dL", 0.7, 1.3, "o", "Muscle waste product filtered by the kidneys."],
    ["eGFR", 88, "mL/min", 90, 120, "a", "Estimated kidney filtration rate."],
    ["BUN", 16, "mg/dL", 7, 20, "o", "Urea nitrogen, a marker of protein turnover and hydration."],
    ["Cystatin C", 0.94, "mg/L", 0.5, 1.1, "o", "A kidney filtration marker independent of muscle mass."],
    ["Urine albumin / creatinine", 18, "mg/g", 0, 30, "o", "Detects early kidney vessel damage."],
  ],
  "Inflammation & immunity": [
    ["hs-CRP", 3.8, "mg/L", 0, 1, "c", "The core marker of low-grade systemic inflammation."],
    ["ESR", 14, "mm/hr", 0, 20, "o", "A slower, general indicator of inflammation."],
    ["Homocysteine", 12.8, "µmol/L", 0, 10, "a", "Elevations link to vascular and cognitive risk."],
    ["Fibrinogen", 388, "mg/dL", 200, 400, "o", "Clotting protein that also rises with inflammation."],
    ["Interleukin-6", 3.1, "pg/mL", 0, 2, "a", "A signalling molecule driving inflammatory response."],
    ["TNF-alpha", 1.8, "pg/mL", 0, 2.8, "o", "Inflammatory messenger involved in immune activation."],
    ["Immunoglobulin G", 1120, "mg/dL", 700, 1600, "o", "The main long-term antibody class."],
    ["Immunoglobulin A", 218, "mg/dL", 70, 400, "o", "Antibody protecting mucosal surfaces."],
    ["Immunoglobulin E", 142, "IU/mL", 0, 100, "a", "Antibody tied to allergic sensitivity."],
    ["Complement C3", 118, "mg/dL", 90, 180, "o", "Part of the innate immune cascade."],
    ["ANA screen", 0.4, "index", 0, 1, "o", "Screening marker for autoimmune activity."],
    ["Thyroid peroxidase antibodies", 42, "IU/mL", 0, 35, "a", "Signals autoimmune activity against the thyroid."],
  ],
  "Cardiovascular & other": [
    ["Troponin (hs)", 4.2, "ng/L", 0, 14, "o", "Released when heart muscle cells are injured."],
    ["NT-proBNP", 68, "pg/mL", 0, 125, "o", "Rises when the heart is under pressure or volume strain."],
    ["Myeloperoxidase", 320, "pmol/L", 0, 470, "o", "Marker of inflamed, unstable arterial plaque."],
    ["Cortisol / DHEA ratio", 0.11, "ratio", 0, 0.08, "a", "Balance between catabolic and restorative adrenal output."],
    ["PSA", 0.9, "ng/mL", 0, 4, "o", "Prostate screening marker."],
    ["Telomere length", 6.9, "kb", 6, 12, "o", "A rough proxy for cellular aging."],
  ],
};

const CATEGORY_ES: Record<string, string> = {
  Hematology: "Hematología",
  Hormones: "Hormonas",
  "Metabolic & glucose": "Metabolismo y glucosa",
  Lipids: "Lípidos",
  Vitamins: "Vitaminas",
  Minerals: "Minerales",
  "Liver & kidney": "Hígado y riñón",
  "Inflammation & immunity": "Inflamación e inmunidad",
  "Cardiovascular & other": "Cardiovascular y otros",
};

const NAME_ES: Record<string, string> = {
  Hemoglobin: "Hemoglobina", Hematocrit: "Hematocrito", "Red blood cells": "Glóbulos rojos", "White blood cells": "Glóbulos blancos", Platelets: "Plaquetas", Neutrophils: "Neutrófilos", Lymphocytes: "Linfocitos", Monocytes: "Monocitos", Eosinophils: "Eosinófilos", Basophils: "Basófilos", Reticulocytes: "Reticulocitos",
  "Free T4": "T4 libre", "Free T3": "T3 libre", "Reverse T3": "T3 reversa", "Total testosterone": "Testosterona total", "Free testosterone": "Testosterona libre", "Cortisol (AM)": "Cortisol matutino", Estradiol: "Estradiol", Progesterone: "Progesterona", Prolactin: "Prolactina", "Parathyroid hormone": "Hormona paratiroidea", "Insulin (fasting)": "Insulina en ayunas", Leptin: "Leptina",
  "Glucose (fasting)": "Glucosa en ayunas", "Uric acid": "Ácido úrico", Lactate: "Lactato", Adiponectin: "Adiponectina", Fructosamine: "Fructosamina",
  "Total cholesterol": "Colesterol total", "LDL cholesterol": "Colesterol LDL", "HDL cholesterol": "Colesterol HDL", Triglycerides: "Triglicéridos", "Non-HDL cholesterol": "Colesterol no HDL", "Lipoprotein(a)": "Lipoproteína(a)", "LDL particle number": "Número de partículas LDL", "Small dense LDL": "LDL pequeñas y densas", "Remnant cholesterol": "Colesterol remanente", "Cholesterol / HDL ratio": "Relación colesterol / HDL",
  "Vitamin D (25-OH)": "Vitamina D (25-OH)", "Vitamin B12": "Vitamina B12", Folate: "Folato", "Vitamin B6": "Vitamina B6", "Vitamin B1": "Vitamina B1", "Vitamin A": "Vitamina A", "Vitamin E": "Vitamina E", "Vitamin K1": "Vitamina K1", "Vitamin C": "Vitamina C", Biotin: "Biotina", Niacin: "Niacina", "Omega-3 index": "Índice omega-3", "Coenzyme Q10": "Coenzima Q10",
  Ferritin: "Ferritina", Iron: "Hierro", "Transferrin saturation": "Saturación de transferrina", "Magnesium (RBC)": "Magnesio eritrocitario", Zinc: "Zinc", Copper: "Cobre", Selenium: "Selenio", Calcium: "Calcio", Phosphorus: "Fósforo", Sodium: "Sodio", Potassium: "Potasio", Chloride: "Cloruro", Iodine: "Yodo",
  "Total bilirubin": "Bilirrubina total", Albumin: "Albúmina", "Total protein": "Proteína total", Creatinine: "Creatinina", "Urine albumin / creatinine": "Albúmina / creatinina en orina",
  Homocysteine: "Homocisteína", Fibrinogen: "Fibrinógeno", "Interleukin-6": "Interleucina-6", "Immunoglobulin G": "Inmunoglobulina G", "Immunoglobulin A": "Inmunoglobulina A", "Immunoglobulin E": "Inmunoglobulina E", "Complement C3": "Complemento C3", "ANA screen": "Prueba ANA", "Thyroid peroxidase antibodies": "Anticuerpos contra la peroxidasa tiroidea",
  "Troponin (hs)": "Troponina ultrasensible", Myeloperoxidase: "Mieloperoxidasa", "Cortisol / DHEA ratio": "Relación cortisol / DHEA", "Telomere length": "Longitud de telómeros",
};

const ABOUT_ES: Record<string, string> = {
  Hematology: "Ayuda a evaluar las células sanguíneas, el transporte de oxígeno y la respuesta inmunitaria.",
  Hormones: "Refleja señales hormonales relacionadas con metabolismo, energía, estrés y función reproductiva.",
  "Metabolic & glucose": "Ayuda a comprender el control de la glucosa, la insulina y el metabolismo energético.",
  Lipids: "Aporta información sobre las grasas en sangre y el riesgo cardiovascular.",
  Vitamins: "Mide un nutriente esencial para el funcionamiento, la reparación y la protección del organismo.",
  Minerals: "Evalúa un mineral esencial para el equilibrio celular y distintas funciones del organismo.",
  "Liver & kidney": "Ayuda a evaluar la función del hígado, los riñones y el equilibrio metabólico.",
  "Inflammation & immunity": "Aporta información sobre inflamación, defensas y actividad del sistema inmunitario.",
  "Cardiovascular & other": "Contribuye a valorar la salud cardiovascular y el envejecimiento celular.",
};

export const biomarkers: Biomarker[] = Object.entries(RAW).flatMap(([category, rows]) =>
  rows.map(([name, value, unit, low, high, s, about]) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: NAME_ES[name] ?? name,
    category: CATEGORY_ES[category] ?? category,
    value,
    unit,
    low,
    high,
    status: STATUS[s],
    about: ABOUT_ES[category] ?? about,
  })),
);

export const categories = Object.keys(RAW).map((category) => CATEGORY_ES[category] ?? category);

export const statusLabel: Record<BiomarkerStatus, string> = {
  optimal: "Óptimo",
  attention: "Atención",
  critical: "Atención crítica",
};

export const countBy = (status: BiomarkerStatus) =>
  biomarkers.filter((b) => b.status === status).length;

export interface HealthIndicator {
  label: string;
  value: string;
  unit: string;
  note: string;
  status: BiomarkerStatus;
  /** Share of the overall health score, 0–1. Only /100 scores are weighted. */
  weight: number;
}

export const healthIndicators: HealthIndicator[] = [
  { label: "Puntaje cardiovascular", value: "62", unit: "/ 100", note: "ApoB y número de partículas LDL elevados", status: "critical", weight: 0.25 },
  { label: "Puntaje metabólico", value: "69", unit: "/ 100", note: "La resistencia a la insulina es el principal factor", status: "attention", weight: 0.25 },
  { label: "Resiliencia inmunitaria", value: "86", unit: "/ 100", note: "Buena respuesta con inflamación leve", status: "optimal", weight: 0.2 },
  { label: "Estado nutricional", value: "74", unit: "/ 100", note: "Vitamina D y omega-3 por debajo del rango", status: "attention", weight: 0.15 },
  { label: "Equilibrio hormonal", value: "68", unit: "/ 100", note: "Testosterona libre por debajo del rango", status: "attention", weight: 0.15 },
  { label: "Edad biológica", value: "41.2", unit: "años", note: "3,4 años por encima de la edad cronológica", status: "attention", weight: 0 },
  { label: "Frecuencia cardiaca en reposo", value: "58", unit: "lpm", note: "Promedio móvil de 30 días", status: "optimal", weight: 0 },
  { label: "VO₂ máx.", value: "44.8", unit: "mL/kg/min", note: "Cuartil superior para tu grupo de edad", status: "optimal", weight: 0 },
];

/** Weighted average of the /100 indicator scores. */
export const overallHealthScore = Math.round(
  healthIndicators
    .filter((i) => i.weight > 0)
    .reduce((sum, i) => sum + Number.parseFloat(i.value) * i.weight, 0),
);
