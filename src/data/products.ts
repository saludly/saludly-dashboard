import supplementImage from "../assets/product-supplement.jpg";
import ivTherapyImage from "../assets/product-iv-therapy.jpg";
import massageImage from "../assets/product-massage.jpg";
import labPanelImage from "../assets/product-lab-panel.jpg";

export type ProductCategory = "Suplementos" | "Terapias IV" | "Masajes" | "Laboratorio";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  detail: string;
  image: string;
  action: "Agregar" | "Reservar";
  featured?: boolean;
}

export const products: Product[] = [
  { id: "vitamina-d3-k2", name: "Vitamina D3 + K2", category: "Suplementos", description: "Apoyo dirigido para huesos, inmunidad y niveles óptimos de vitamina D.", price: 89000, detail: "60 cápsulas · 2.000 UI", image: supplementImage, action: "Agregar", featured: true },
  { id: "magnesio-glicinato", name: "Magnesio glicinato", category: "Suplementos", description: "Fórmula de alta absorción para descanso, recuperación y función muscular.", price: 76000, detail: "90 cápsulas · 300 mg", image: supplementImage, action: "Agregar" },
  { id: "omega-3", name: "Omega-3 concentrado", category: "Suplementos", description: "EPA y DHA purificados para apoyar el perfil cardiovascular y lipídico.", price: 112000, detail: "60 cápsulas · 1 g", image: supplementImage, action: "Agregar" },
  { id: "fibra-soluble", name: "Fibra soluble", category: "Suplementos", description: "Mezcla diaria para apoyar la digestión y el control del colesterol LDL.", price: 68000, detail: "30 porciones · 210 g", image: supplementImage, action: "Agregar" },
  { id: "terapia-iv-recuperacion", name: "Terapia IV Recuperación", category: "Terapias IV", description: "Sesión supervisada de hidratación y micronutrientes para recuperación integral.", price: 320000, detail: "Sesión · 60 minutos", image: ivTherapyImage, action: "Reservar", featured: true },
  { id: "terapia-iv-inmunidad", name: "Terapia IV Inmunidad", category: "Terapias IV", description: "Protocolo intravenoso con evaluación profesional previa y fórmula personalizada.", price: 350000, detail: "Sesión · 75 minutos", image: ivTherapyImage, action: "Reservar" },
  { id: "masaje-recuperacion", name: "Masaje de recuperación", category: "Masajes", description: "Trabajo muscular profundo para aliviar tensión y favorecer la movilidad.", price: 145000, detail: "Sesión · 60 minutos", image: massageImage, action: "Reservar" },
  { id: "masaje-relajante", name: "Masaje relajante", category: "Masajes", description: "Sesión restaurativa enfocada en descanso, respiración y manejo del estrés.", price: 125000, detail: "Sesión · 60 minutos", image: massageImage, action: "Reservar" },
  { id: "panel-112", name: "Panel completo de 112 biomarcadores", category: "Laboratorio", description: "Evaluación integral para conocer tus principales sistemas de salud.", price: 690000, detail: "Toma de muestra incluida", image: labPanelImage, action: "Reservar", featured: true },
  { id: "panel-metabolico", name: "Seguimiento metabólico", category: "Laboratorio", description: "Glucosa, insulina y HbA1c para seguir tu evolución cada ocho semanas.", price: 195000, detail: "Resultados en 48 horas", image: labPanelImage, action: "Reservar" },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(price);

export const findProduct = (id: string) => products.find((product) => product.id === id);